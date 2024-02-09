# Load Balancer

The job of the load balancer is to fairly divide all clients’ requests among the pool of available servers

LBs can be placed between  

1. between client and web / app server
2. between web (generally server static content) and app (app server has all the business logic) server
3. between app server and DB server

**What does load balancer do**  -

1. Healthcheck of servers in the pool
2. TLS termination (learn more about TLS) - since request is terminated at LB itself, end servers burden is reduced
3. Can avoid Denial of Service attack

## Types of load balancers

1. Global server load balancing (GSLB): GSLB involves the distribution of traffic load across multiple geographical regions.
2. Local load balancing: This refers to load balancing achieved within a data center. They behave like a reverse proxy.

**Stateless and Stateful load balancers**  

1. Stateful - The stateful LB incorporates state information in its algorithm to perform load balancing.
![alt text](PNG/lb1.PNG "Title")  
2. Stateless - maintains no state. Mostly uses consistent hashing algo to reroute requests

#### LB types based on layers

1. **Layer 4 LB** - load balancing done at transport layer based on protocol (TCP / UDP),  ensure that the same (TCP/UDP) communication ends up being forwarded to the same back-end server
2. **Layer 7 LB** - load balancing done at application url, LB check req.url, http headers and cookies to decide which end server the request needs to be redirected to.

**LB 4 vs LB 7 which to use when** - LB 4 is faster (used as Gloabl LB ), LB 7 (used as Local LB) takes responsibilities like rate limiting users, HTTP routing, and header rewriting.  
Mostly combination of L4 and L7 is used in large sace system

### Different LB tiers

1. **Tier-0 and Tier-1 LB** - this layer LBs divides incoming traffic on the basis of IP or some other algorithm like round-robin. DNS can be considered as the tier-0 load balancer
2. **Tier-2 LB** - this inclide Layer 4 LBs. Tier-2 LBs make sure that for any connection, all incoming packets are forwarded to the same tier-3 LBs. 
3. **Tier-3 LB** - this include Layer 7 LBs. these LBs are in direct contact with the back-end servers

### Another LB types

1. Hardware LBs - fast bu expensive, Hard to configre are hardware level hence rarely used
2. Software LBs - Programatically configured
3. Cloud LBs - Cloud owners (AWS) provide LBs