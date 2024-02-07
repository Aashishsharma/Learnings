## Design System concepts

#### 1. Load balancer
A **reverse proxy** server is a type of proxy server that typically sits behind the firewall in a private network and directs client requests to the appropriate backend server.  
It is used for load balancing  
###### 1. PM2
**PM2 is a process manager**. PM2 is daemon process manager that will help you manage and keep your application online.  
PM2 is not a **network load balancer**, but when used in cluster mode, it can act as a normal load balancer  
1. PM2  
**Installation** -  npm install pm2@latest -g  
**Start app** - pm2 start app.js --name <app_name>  
**managing processes**  
$ pm2 restart app_name  
$ pm2 reload app_name  
$ pm2 stop app_name  
$ pm2 delete app_name  
$ pm2 ls  

**Cluster mode** -  pm2 start app.js -i max  
For Node.js applications, PM2 includes an automatic load balancer that will share all HTTP[s]/Websocket/TCP/UDP connections between each spawned processes.  

**Graceful start/shutdown**  
To allow graceful restart/reload/stop processes, make sure you intercept the SIGINT signal and clear everything needed (like database connections, processing jobs…) before letting your application exit.
```javascript
//shutdown
process.on('SIGINT', function() {
   db.stop(function(err) {
     process.exit(err ? 1 : 0);
   });
});

//start
app.listen(0, function() {
  console.log('Listening on port ' + listener.address().port);
  // Here we send the ready signal to PM2
  process.send('ready');
});

pm2 start app.js --wait-ready
```

**Deploying on cloud**  
Generate an ecosystem.config.js template with: - pm2 init  
npm install pm2  

```javascript
{
  "scripts": {
    "start": "pm2-runtime start ecosystem.config.js --env production"
  }
}
```

**What is a load balancer**  
It helps distribute load across multiple resources  
It also keeps track of thses resources, and if the server is unavaible, it stops sending signal to that server  
It can be used at Web server level, db level  

**Load balancer algorithms**  
1. Round Robin 
2. Round robin with wighted server
3. Least connection
4. Least res time
5. Source IP hash
6. Url hash

###### 3. Nginx - It is an http load balancer
Other LB's - HAProxy – A TCP load balancer.  
**Using Nginx**
1. Install nginx - sudo apt-get install nginx
2. configs - 
To reload your configuration, you can stop or restart NGINX, or send signals to the master process  
nginx -s <SIGNAL>  
where <SIGNAL> can be one of the following:  
quit – Shut down gracefully  
reload – Reload the configuration file  
reopen – Reopen log files  
stop – Shut down immediately (fast shutdown)  
3. config files -  
By default the file is named nginx.conf and is placed in the /etc/nginx directory
sample nginx.conf file -   
```javascript
user nobody; # a directive in the 'main' context
events {
    # configuration of connection processing
}
http {
    # Configuration specific to HTTP and affecting all virtual servers  
    server {
        # configuration of HTTP virtual server 1       
        location /one {
            # configuration for processing URIs starting with '/one'
        }
        location /two {
            # configuration for processing URIs starting with '/two'
        }
    }    
    server {
        # configuration of HTTP virtual server 2
    }
}
stream {
    # Configuration specific to TCP/UDP and affecting all virtual servers
    server {
        # configuration of TCP virtual server 1 
    }
}
```
4. http load balancing and it's algorithms
```javascript
http {
    upstream backend {
    	# no load balancing method is specified for Round Robin or
    	least_conn; # least connection or
    	ip_hash; or
    	hash $request_uri consistent; or
    	least_time header;
    	# use only any one of the above or leave the default
        server backend1.example.com weight=5;
        server backend2.example.com;
        server 192.0.0.1 backup;
    }
}
```

###### 4. Using Elastic load balancer service from AWS

#### 2. Caching
Cache is like a short term memory with less space but is faster and contains most recently accessed data  
It cas be added at browsers, or web apps  
**Types**  
1. App server cache  
Place cache on a request layer, whenever same req. comes return response from cache  
But when load balancer is used, req, can be redirected to any server (so cache miss will happen), in this case use (Distributed/Global cache)  
2. Distributed cache - (Redis) 
Each node has it's own cache  
Cache is divided using consistent hashing function such that req. node knows where to look into within distributed cache  
Here cache space can be increased by increasing no. of nodes
3. Global cache
All nodes use same cache
4. CDN - content delivery network  
Used for serving static data  
First req. goes to CDN for data, if not found cdn will query backend servers and then cache that data  
Use Akamai tool to flush cdn cache  

**Cache invalidation**  why? - if data changes (like in DB)  
For CDN use akamai
**Types**  
1. Write through cache - write to cahce and DB at the same time (higher latency for write operations)
2. Write around cache - write data to storage directly (will have cahce miss scenario)
3. Write back cache - write data to cahce, and periodically update DB (data loss in case of crash)

**Cache eviction(removal) policy**  
When cahce is full, we need to evict/remove cache data to add new cache data  
1. FIFO
2. LIFO
3. Least recently used - implemnted using doubly linked list and hash function containing reference of the node
4. Least frequently used

#### 3. Sharding
see mongoDB docs

#### 4. Proxy server (Apigee)
Sits between client and server and can be used to -  
log requests, transform requests by addinh/removing req. headers  


