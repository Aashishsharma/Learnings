## 1. Performance
## 2. Scalibility
## 3. Reliability
## 4. Security
## 5. Deployment
## 6. Tech stack

## 1. Performance
How fast or responsive a system is under given load and under given hardware.  
How to identigy performance issue?  
It is caused due to some queue build-up in some part of the app (network queue, db queue, OS run queue)  
And reason for queue build-up  
1. Inefficient slow processing (inefficient code)
2. Serial resource access
3. Limited resource capability

#### 1. Latency
1. **Network latency**
-Do data compression while sending response, (do only id data is huge)  
-Cache static data  
2. **Memory latency** (optimum use of memory)
-Use weak/soft refrecnes (WeakMap, WeakSet), to free up memory
3. **Disk latency** (while doing I/O, db queries)
-3.1 **While logging**   
logging is a sequential I/O, means disk already know the memory_location where the next write would be. So since it is sequential I/O, disk latency is low, but logging need to be done asynchronously & try and log as many info at once.  
-3.2 **DB Disk latency**  
Schema optimization (Normalization), creating Indexes  
At hardware level - use SSD Disk(faster), user disks with higher IOPS(I/O per second)
4. **CPU latency**  
4.1 - Inefficient code (algorithms)  
4.2 - **Context Switching** - how to avoid?  
Batch multiple calls (batch DB calls and get data at once)  
Use Single threaded model, this way the main thread is always on CPU and avoids context switching  
Reduce thread pool size, that way, less no. of processes in 1 pool, less context switching, e.g. K8 pods

#### 2. Concurrency
Using mutliple threads
#### 3. Caching 
At mutliple levels  
1. Server level - Redis
2. Session cache - user session data
3. Static data cache (css/js) - CDN
4. HTTP cache - browser cache (browser caches css/js files) - See REST_API module  

**Caching data at server**  
1. **Exclusive cache** - each node withing the cluster has it's own cache, so cache duplicate at diff. nodes also if the next req. is forwarded to some other node, that that node might not have the cached data  
2. **Shared cache** - Cache data stored in only one particular external node, this will have extra network hop for the nodes to reach out to this external cache

##### limitations of cache (cache hit ratio = # of cache hits/# of request)
1. Limited memory space  
Only cache frequently used data  
Cache small objs
2. Cache invalidation / cache inconsistency (stale data in cache)  
Using TTL - 
High TTL value - increase cache hits but also increases cache inconsistency  
Low TTL value - decreases cache inconsistency but decreases cache hits  
**Note - if caching strategy is bad it can affect performance negatively**

## 2. Scalibility
