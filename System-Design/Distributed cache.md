# Distributed Cache

A distributed cache is a caching system where multiple cache servers coordinate to store frequently accessed data

## API design

Key-value stores, like ordinary hash tables, provide two primary functions, which are get and put.

1. get api
```get(key)``` - in eventual consistency, there might be more than one value returned against a key
2. put api
```put(key, value)``` - A value can be a blob, image, server name, or anything the user wants to store, we generally don't store blobs, but we can definitely store links to those blobs 

## Cache writing policies

1. **Write-through cache** - written to cache as well as DB (concurrently or sequentially) **(Consistent, but latency since data needs to be written to DB as well)**
2. **Write-back cache** - writeen to the cache and later flushed to the underlying storage. But when is the data flushed to DB? (1. If cache becomes full 2. Time-based (after certain interval)) **(inconsistent but fast)**
3. **Write-around cache** - data written only in DB, and data is written to cache only after a cache miss **(consistent, but slow (due to cache miss))**

**Ask in interview** - You need data consistency or performance, based on that choose write policy.

**Note - while building apps, we need to define write policies (tools like redis can't), because we need to decide under which table cache data needs to be written**  

## Cache eviction policies

1. Least recently used (LRU)
2. Least frequently used (LFU)
3. FIFO

#### Setting eviction policy in redis

1. You need to connect to redis server using redis cli
2. Run command - ```CONFIG SET maxmemory-policy allkeys-lru```
3. allkeys-lru - LRU policy, similarly - allkeys-lfu
4. No option for this in redis npm package

**alternatively, we can specify expiry time in node js while setting up the key**

```javascript
 client.setex(key, 24*60*60, value, function(err, result) {
    //check for success/failure here
  });
```

## Cache invalidation

Nodejs code to daily invalidate the cache

```javascript
const redis = require('redis');
const cron = require('node-cron');
// Redis client
const client = redis.createClient();
// Connect to Redis
client.on('connect', () => {
    console.log('Connected to Redis');
});
// Error handling
client.on('error', (err) => {
    console.error('Redis Error:', err);
});
// Cache invalidation logic
function invalidateCache() {
    // Flush the entire Redis cache
    client.flushall((err, reply) => {
        if (err) {
            console.error('Error invalidating cache:', err);
        } else {
            console.log('Cache invalidated:', reply);
        }
    });
}
// Schedule cache invalidation daily at 2:00 AM
cron.schedule('0 2 * * *', () => {
    console.log('Running cache invalidation...');
    invalidateCache();
}, {
    timezone: 'Your/Timezone' // Specify your timezone here
});
```

Note above code needs to be separate app, instead of this while setting the key-value pair, specify expirty data / ttl  
**OR - connect to redis insance using redic-cli and f=run flushall command**

## Distribued redis cache

If we are connected to multiple redis servers and lets say appserver1 updates DB as well as cache for redisserver1, as below code 

```javascript
// mock updateDB
const updateDB = (err, success) => {
    if(err) {
        next()
    } else {
        redisclient.del(`key`);
        redisclient.set(key, newVal);
    }
}
```

But now the redisserver2 will still refer to old data in it's cache for the same key, because we did not do redisclient2.del(key, newVal)

**Solution - use pub/sub messaging pattern in redis**

```javascript
const redis = require('redis');
// Define Redis server configurations
const redisConfigurations = [
    { host: 'localhost', port: 6379 },
    { host: 'redis.example.com', port: 6380 },
    // Add more configurations as needed
];
// Create an array to store Redis client instances
const redisClients = [];
// Create Redis client instances for each server
redisConfigurations.forEach(config => {
    const client = redis.createClient(config);
    // Optionally, you can handle connection and error events for each client
    client.on('connect', () => {
        console.log(`Connected to Redis server at ${config.host}:${config.port}`);
        // Subscribe to the keyInvalidation channel for each client
        client.subscribe('keyInvalidation', (err, count) => {
            if (err) {
                console.error(`Error subscribing to keyInvalidation channel for ${config.host}:${config.port}:`, err);
            } else {
                console.log(`Subscribed to keyInvalidation channel for ${config.host}:${config.port}`);
            }
        });
    });
    client.on('error', (err) => {
        console.error(`Error connecting to Redis server at ${config.host}:${config.port}:`, err);
    });
    // Add the client instance to the array
    redisClients.push(client);
});
// Set up a pub/sub channel for invalidation messages
const pubSubClient = redis.createClient();
// Subscribe to a channel to listen for invalidation messages
pubSubClient.subscribe('keyInvalidation');

// Example: Perform operations on each Redis server
redisClients.forEach((client, index) => {
    // listen to the message event
    client.on('message', (channel, key) => {
        // Handle invalidation messages received from the pub/sub channel
        if (channel === 'keyInvalidation') {
            console.log(`Received invalidation message for ${key}`);
            // Perform invalidation operation (e.g., delete the key)
            client.del(key);
        }
    }); 
    // Set the key and publish invalidation message
    const key = `key${index}`;
    const value = `value${index}`;
    client.set(key, value, (err, reply) => {
        if (err) {
            console.error(`Error setting key ${key} for client ${index}:`, err);
        } else {
            console.log(`Key set successfully for client ${index}:`, reply);
            // Publish an invalidation message for the key
            pubSubClient.publish('keyInvalidation', key);
        }
    });
});


const updateKey = (key) => {
    // code to update DB
    client.del(key);
    client..publish('keyInvalidation', key, (err, count) => {
    if (err) {
        console.error('Error publishing message:', err);
    } else {
        console.log(`Published message for invalidating key ${key} to ${count} subscribers`);
    }
    });
}

// apiendpoint
app.get('/update/key', (req, res) => {
    await updateKey(key_from_req)
})


// Optionally, close connections to Redis servers when done
redisClients.forEach(client => {
    client.quit();
});
// Close pub/sub connection
pubSubClient.quit();
```
