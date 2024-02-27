# Understanding requirements

## Starting with System Design

### TODO

1. Event driven architecture
2. Microservice architecture
3. Time-series DB

**Below are the points we need to cover in any system design interview (RESHADE)**

**RESHADE** - (Requirements, Estimation, Storage Schema, HLD, API Design, Detailed Design, Evaluation)

1. **Requirements** - Get func and non-func requirements from the interviewer
2. **Estimation (optional)** - do resource estimation based on req. (like daily active users = 500M, then calc no. of servers)
3. **Storage schema (optional)** - design DB schema at high level
5. **High level design** - figure out building blocks / custom blocks/services
6. **API design** - these are API calls, and are generally a translation of our functional requirements
7. **Detailed Design** - The detailed design starts by recognizing the limitations of the high-level design, and refine futher on non-happy paths
8. **Evaluation** - here we need to justify how our design fulfills the functional and non-functional requirements

## Resource estimation

1. Calculate RPS for 1 web/app server
2. Calculate no of web / app servers required based on no of daily active users
3. Calculate storage requirements
4. Calcualte Bandwidth requirements


### Step 1. Calculate RPS for server with 240 GB RAM and 72 CPU cores

There are 2 types of requests - 
1. CPU bound - involves CPU (maths calculation, loops)
2. Memory bound - involves memory (storing intermediate results, immage uploads)


Given: (AWS bare metal specification e.g.)
- RAM size = 240 GB
- Number of CPU cores = 72
- Memory-bound request time = 50 milliseconds
- CPU-bound request time = 200 milliseconds

How to calculate the Requests Per Second (RPS) the server can handle, assuming there are equal numbers of requests made for CPU-bound and memory-bound scenarios?

### Calculation:

#### Step 1: Calculate RPS for Memory-bound Requests

\[ \text{Memory per core} = \frac{240 \times 1024}{72} \, \text{MB} = \frac{245760}{72} \, \text{MB} \approx 3413.33 \, \text{MB} \]

\[ \text{RPS}_{\text{memory}} = \frac{\text{Memory per core} \times 240 \times 1024}{0.05} = \frac{3413.33 \times 240 \times 1024}{0.05} \]

\[ \text{RPS}_{\text{memory}} \approx \frac{83056819}{0.05} \approx 1661136 \, \text{RPS} \]

#### Step 2: Calculate RPS for CPU-bound Requests

\[ \text{RPS}_{\text{CPU}} = \frac{72}{0.2} = \frac{72}{0.2} = 360 \, \text{RPS} \]

#### Step 3: Find the Minimum of the Two RPS Values

\[ \text{RPS} = \min(\text{RPS}_{\text{memory}}, \text{RPS}_{\text{CPU}}) = \min(1661136, 360) \]

\[ \text{RPS} = 360 \, \text{RPS} \]

So, the server can handle up to 360 requests per second, as the CPU-bound requests are the bottleneck in this scenario.  

If there are DB requests, we need to consider DB latency as well (MYSQL can handle 1000 queries per second).

It all depends on the computational-intensive tasks that we run (e.g. image processing may only allow a maximum of 50 RPS)

### Step 2. now we know RPS for a server, based on time / request, calculate no of app/web server required

Given: 
- Daily active users (DAU) = 500M
- Number of daily request / user = 20

### Calculation:

No. of daily requests = (DAU) * daily request per user = 500M * 20 = 1 Billion

No. of request / sec = 1 Billion / 24 * 60 * 60 = 115K

No. of servers = req per sec / RPS 1 server can handle = 115K / 360 (from step 1) = 320 servers

### Step 3 - Calculate storage requirements (mostly calcualted for a year)

Given: (twitter)
- DAU  = 250 M
- Daily tweets 3
- Image tweets = 10% of daily tweets (avg image size = 200KB)
- Video tweets = 5% of daily tweets (avg video size = 3MB)
- Text tweets (avg size = 250B)

### Calculation:

1. Daily tweets = 250 * 3 = 750 M
2. Image tweets = 750M * 10% = 75M * 200KB = 15,000 GB = 15TB
3. Video tweets = 750M * 5% = 37.5M * 3 MB = 112,500 GB = 112.5TB
4. Text tweets = 750M * 85% = 637.5 M * 250 B = 159 GB = 0.15TB

Total storage per day = (15 + 112 + 0.15) = 128TB  
Total storage per yesr = 365 * 128 TB = 46.72 PB (peta bytes)

### Step 4 - Bandwidth requirements
 
 Given: no given, we already know 128 TB of data is stroed every day in twitter so,

1. Incoming traffic bandwidth = 128 TB / 24 * 60 * 6O = 96GBps / 8 = 12 Gbps (bandwidth measured in bits not bytes)
2. Outgoing traffic bandwidth = single user view 5- tweets per day (10 % image tweets, 5 % video tweets)

1. DAU = 250M, 
2. total tweets viewed per second = 250M * 50 (daily tweet views) / 24 * 60 * 60 = 145 K
3. Bandwidth for tweets = 250M * 50 * 85% / 86400 = 0.3Gbps
4. SImilarly bandwidth for images = 23 Gbps, for videos = 174 Gbps

Total outgoing bandwidth = 209 Gbps


