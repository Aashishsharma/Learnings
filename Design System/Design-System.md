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
1. Network latency
-Do data compression while sending response, (do only id data is huge)  
-Cache static data  
2. Memory latency (optimum use of memory)
-Use weak/soft refrecnes (WeakMap, WeakSet), to free up memory
3. Disk latency (while doing I/O, db queries)
-3.1 While logging   
logging is a sequential I/O, means disk already know the memory_location where the next write would be. So since it is sequential I/O, disk latency is low, but logging need to be done asynchronously & try and log as many info at once.  
-3.2 DB Disk latency  
Schema optimization (Normalization), creating Indexes  
At hardware level - use SSD Disk(faster), user disks with higher IOPS(I/O per second)
4. CPU latency  
4.1 - Inefficient code (algorithms)  
4.2 - Context Switching - 

#### 2. Concurrency
#### 3. Caching 