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
#### 3. Caching - (Data which is read a lot and doesnot change frequently is a candidate for caching)
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
Ability to increase its throughput by adding more hardware capacity
#### 1. Vertical scaling - only 1 machine, but increase it's capacity (cpu, ram), limited scalibility
#### 2. Horizontal scaling - add more machine/hardware, unlimited scalibility  

**Scalibility principle**  
1. Decentralization - specialized services, more worker nodes (doing same job)
2. Independence - each worker needs to be independent

### **Ways to achieve scalibility** 
#### 1. Modularity - Business logic needs to be split into modules (order module, user module)
#### 2. Replication - replicate nodes, dbs  
Replicate nodes - Problem - if session is used on server, then the next request from client might go to some other node where the session is not created for that client. To solve this, use JWT (since user data is stored in the client side), if we still need to use server session, send the cookie to client with user data + node id, where the session is created, and when next time client makes the request, the load balancer gets the node id from cookie and reroutes the request to same node (this is called sticky session), other option - store session data in Redis (since it is distributed cache system)  
**Note - in multi-threading, we can use OS level locks to manage shared resources like reading a file. In replication, we cannot use OS level locks, since there is not just 1 OS, due to multiple nodes(machine), in this case we need to create a lock table, and when one node is accessing a shared resource, add new record in the lock table, once done release the lock on that row**  
![alt text](PNG/DB-replica.PNG "Title")  
In Master-slave - synchronous replica, when write query comes to DB, it is executed in master replica, and then DB will replicate same transaction on all the replica nodes, and only when this is successful, the execution returns to the server, which then sends response to client, this way it is consistent but will have high latency writes hence used in backup replicas

#### 3. Vertical partitioning (Micro-services)  
Create service of each business domain (Inventory, Order, Catalog, User) such that  
Inventory service connected to Invenotry DB, order service to order DB and so on.  
So instaed of having 1 DB, it is now partitioned vertically, so different tables in different DB. (Note - common tables should not be present in these different DBs)  
Verticle partitioning can scale only upto certain limit, if we have only 2 business domains, then only 2 different DBs. Also id order DB has large amount of data as compared to user DB, then orderDB would be bottleneck.  
So **Horizontal partitioning** -   
Partition the Vertically partitioned DB (OrderDB) in smaller dataset, rows are partitioned  
1. Range based partitioning - Distribution of data can be uneven 
2. Hash based partitioning (use consistent hashing algo)- data evenly distributed but, range queries (get rows between 100 and 400) are inefficient  

**Note - partitioned DBs no longer support ACID properties**  
But how does app know which partitioned DB to pass the query to? this is handled by DBs themeselves. We don't have to worry as app developer for e.g.  
1. MongoDB - it provides client (mongoClient package npm) router which is cluster aware (knows how many clusters are avaialble and what partition method (range/hash) is used and re-routes the request to appropriate partitioned DB)  
This is the case only when DB is partitioned horizontally, in case of vertical partition, we have already partitioned DB into separate DB and each separate DB is attached to the service like (Inventory service connected to Inventary DB) see above

#### 4. Load balancers
Each service can have 100 replicas which will have 100 Ips, so which one to call. Load balancer does this job. Client need send the request only to load balancer.  
Services have internal load balancers, in K8 (internal services) and app is exposed on external load balancers (in K8 - Ingress)  
**Discovery services** - keep track of each all instances of different services (catalog, user, inventory) are alive along with their IP addresses.  
Load balancer calls this discovery service, gets IPs of the service in needs to call, and based on the routing algo we define (Round robin, Least connection, Least res time)  
in K8, we don't have to worry about Discovery service, handeled by default for internal pods  

2 Types of LBs  
1. Hardware load balancers
2. Software load balancer (Apache, nginx)

#### 5. Micro-service architecture
Use when
1. Frequent Deployment
2. Independent deployment
3. Independent developmenst
4. Independent Services

Before micro-services we had SOA (Service oriented architecture)  
SOA -  
Each service has own tech stack, frameworks  
Each service can be scaled independently  
But all services accessed same DB  

In micro-service architecture  
Sepearte service and separate DB for each businness domain, like (Order, Inventory, User)  

**Problems with micro-services**  
1. Micro-service transactions  
See below example, we need to book an order, since we are using micro-services architecture (vertical partitioning as per business domains), we have 3 services (inventory, order and shipment) with their own DB, and different DBs don't have ACID properties  
So if an order is made, the app needs to ensure 3 things  
1. Call inventory service and deduct the count of product from inventory DB
2. Call shipment service and ensure the product can be delivered to the desired location, and add shipment related detials to shipment table
3. Call order service and add new order in the order DB  
Now we cannot gurantee consistency or ACID props here  
![alt text](PNG/ms-transaction.PNG "title")  
two solve this we have 2 solutions  
1. Distributed ACID transactions using 2PC (2 phase commit)  
Call inventory, shipment and order services, check if order can be placed then acquire locks on those tables, then commit the transaction  
Since we acquire locks, other requests can't do a write which defeats the purpose of scalibility, and we are using micro-services for scaling  
2. Using Saga pattern (Solves Distributed ACID transactions)  
Instead of acquiring locks, make the updates in the DB, like (update inventory, create shipment record, place order), anywhere the transaction fails (let's say we updated the invenotry, but shipment on that address not possible), undo the changes in the inventory DB. (We need to write the entire undo logic) DB won't handle.  
But what would happen, if while doing undo, the inventory DB goes down?  use Event driven transactions  
**Event driven transactions**  
Use message queue  
The idea is to use messaging system, so that the main service can publish events to messaging queues and each micro-service (inventory, order) can subscribe to specific events and when that event occurs, they execute the process, if any service can't do the transaction (like shipment service says order can't be delivered to this location), then shipment service will send another event to messaging queue - (undo order transaction), which would be subscribed by the order service and to the necessary changes
![alt text](PNG/event-driven-transaction.PNG "title")  












