# Pub-Sub

Is an asynchronous service-to-service communication method.  

![alt text](PNG/pub-sub.PNG "Title")

**Here it is imp to note that a publisher can publish a message from one node and subscribers from another node in a distributed system can consume the message**

## Use case

1. Replicating data: The pub-sub system can be used to distribute changes. For example, in a leader-follower protocol, the leader sends the changes to its followers via a pub-sub system.
2. Remember in case of distributed cache Redis, we used pub-sub model so that one server can publish the invalidate key and the rest of redis servers can subscribe to it and invalidate that key at their end.
3. Broadcasting messages

### API design

1. ```create(topic_ID, topic_name)```
2. ```write(topic_ID, message)```
3. ```read(topic_ID)```
4. ```subscribe(topic_ID)```
5. ```unsubscribe(topic_ID)```
6. ```delete_topic(topic_ID)```

**building block required for Pub-sub model**  

### Approach 1 - using Distributed MQ (don't use this approach)

![alt text](PNG/pub-sub2.PNG "Title")  

**Database**: We’ll use a relational database that will store the subscription details. For example, we need to store which consumer has subscribed to which topic.  
**Topic queue**: Each topic will be a distributed messaging queue. So 2 topics = 2 Rabbit MQ servers.

But using MQs we’ll copy the same message for a topic in all subscriber queues, which is unnecessary duplication and takes up space.

**Approach 2 - Using message broker (use this approach)** -  

**Message broker** - 
1. It maintains the list of subscribers interested in each topic and manages the routing of messages accordingly.
2. Delivers published messages to all subscribers interested in the corresponding topics
3. It also does message routing 

#### Using redis as message broker

**Below code is same code we used in Distributed cache**

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
// STEP 1 - Create Redis client instances for each server
redisConfigurations.forEach(config => {
    const client = redis.createClient(config);
    // STEP 2 - , you can handle connection and error events for each client
    client.on('connect', () => {
        console.log(`Connected to Redis server at ${config.host}:${config.port}`);
        // STEP 3 - 
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
    // STEP 4 - listen to the message event
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
    // STEP 5 - 
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