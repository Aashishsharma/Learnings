## Redis
Open source in memory data structure store. can be used as DB (to save data to disk) or as a cache or message broker  
Key-value store  

```javascript
const Redis = require('redis');
const redisClient = Redis.createClient() // this will connect to local redis instance
// for prod we pass {url: redis-server-url} in createClient Method

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

