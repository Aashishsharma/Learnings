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