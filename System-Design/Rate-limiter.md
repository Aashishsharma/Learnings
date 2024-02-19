# Rate limiter

It prevents  

1. Denial of Service (DoS) attach
2. Avoid server side resource consumption
3. Can be applied at (user-based, IP-based, API-endpoint based)

## System design of Rate limiter

### Requirements

**Functional**
1. limit the number of requests a client can send to an API within a time window
2. make the limit of requests per window configurable

**Non-functional**
1. Available
2. Low latency
3. Scalable

### 1. Rate limiter with centralized DB
Use Radis like cache, store IP and counter (no. of requests hit by IP), this way if threshold is met, give limit reached message to client.  
**Drawback** - SPOF, increase in latency if an enormous number of requests hit the centralized database

### 2. Rate limiter with distributed DB
The problem with this approach is that a client could exceed a rate limit—at least momentarily, while the state is being collected from everyone

### Building blocks used

![alt text](PNG/rl1.PNG "Title")  

### HLD

A rate limiter can be deployed as a separate service that will interact with a web server.
AWS profides **API gateway for rate-limiting** - while configurung API gateways  
**click on "Throttling" in the Method Execution pane.**  
**Set the "Rate" and "Burst" values to specify the rate limiting configuration. For example, you can set the rate to 100 requests per second and the burst to 200 requests.**

