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


