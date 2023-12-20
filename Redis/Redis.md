## Redis

Open source in memory data structure store. can be used as DB (to save data to disk) or as a cache or message broker  
Key-value store  

### Redis commands and DS types

#### 1. SET, GET, DEL, EXISTS (STRINGS)

1. SET name ashish
2. GET name // o/p - ashish
3. DEL name
4. EXISTS name returns 0 or 1
5. flushall
6. KEYS * - get all keys
7. TTL name - // -1 - since no expiration is set
8. SETEX name 10 ashish - set name to ashish with ttl - 10s

#### 2. Arrays (use in messaging apps to show 5 recent messages of users)

1. LPUSH friends ashish - add at start of array
2. LRANGE friends 0 -1 // from index 0 to last item
3. RPUSH freinds sharma - add at end of array
4. LPOP / RPOP - remove elems from array

#### 3. Sets

1. SADD hobbies 'weight lifting'
2. SMEMBERS hobbies - print all memebers
3. SREM hobbies 'weight lifting'

#### 4. Hashes

1. HSET person name ashish - create hash DS person, and hash elem has name as key and ashish as value
2. HGET person name - ashish
3. HGETALL person - get all hash elems of person
4. HDEL person
5. HEXISTS person name

```javascript
// syntax
import { createClient } from 'redis';

const client = createClient(); 
client.on('error', (err) => console.log('Redis Client Error', err));
await client.connect();
await client.set('key', 'value');
const value = await client.get('key');

// we can use all Redis commands using this lib
// raw Redis commands
await client.HSET('key', 'field', 'value');
await client.HGETALL('key');

// friendly JavaScript commands
// same as redis commands used in redis terminal
await client.hSet('key', 'field', 'value');
await client.hGetAll('key');
```

```javascript
import { createClient } from 'redis';
const redisClient = createClient(); // this will connect to local redis instance (port - 6379)
// for prod we pass {url: redis-server-url} in createClient Method
// e.g. redis url - 'redis://alice:foobared@awesome.redis.server:6380'

const DEFAULT_EXPIRATION = 3600 // 1 hr

function getOrSetCache(key, cb) {
  return new Promise((resolve, reject) => {
   // first try and get data from redis based on key
    redisClient.get(key, async (error, data) => {
   if (error) return reject(error)
   // if data found in redis cache, return cached data
      if (data != null) return resolve (JSON.parse(data))
      // data not is redis
     // call the api/db, using cb function passed, due to this getOrSetCache func becomes generic
      const freshData = await cb()
      // once actual data is got set in cache and return the data
      // setex - set the key with expiration
      redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(freshData))
      resolve(freshData)
    })
  })
}

app.get("/photos/:id", async (req, res) => {
  // make sure that key is unique by appending id queryparam to the key
  const photo = await getorSetCache('photos:${req.params.id}', async () => {
  const {data} = await axios.get('https://jsonplaceholder.typicode.com/photos/${req.params.id}')
 return data
  })
  res.json(photo);

  // this getorSetCache can be used in all endpoints, just cb func needs to have
  // implementation based on the endpoint
})

```
