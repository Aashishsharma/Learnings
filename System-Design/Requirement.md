# Understanding requirements

## Capacity planning

1. Calculate RPS for 1 web/app server
2. Calculate no of web / app servers required based on no of daily active users
3. Calculate no. of storage servers required


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

Understanding Requirements:

Functional Requirements:
Identifying core features
User stories
Non-functional Requirements:
Performance
Scalability
Reliability
Security
Architecture Patterns:

Client-Server Architecture:
Distributed systems
Load balancing
Microservices Architecture:
Service decomposition
Inter-service communication
Deployment strategies
Event-Driven Architecture:
Pub/Sub model
Event sourcing
CQRS (Command Query Responsibility Segregation)
Database Design:

Relational Databases:
Entity-Relationship Modeling (ERD)
Normalization
Indexing
NoSQL Databases:
Document-oriented databases
Key-value stores
Graph databases
Scalability and Performance:

Horizontal Scaling:
Load balancing
Sharding
Vertical Scaling:
Increasing resources (CPU, RAM)
Database optimization techniques
Caching:
CDN caching
In-memory caching (e.g., Redis)
System Design Tools and Techniques:

UML (Unified Modeling Language):
Use case diagrams
Class diagrams
Sequence diagrams
Design Patterns:
Creational, Structural, and Behavioral patterns
Singleton, Factory, Observer, etc.
API Design:

RESTful APIs:
Resource modeling
HTTP methods
Authentication and authorization
GraphQL:
Query language
Schema design
Resolver functions
Security:

Authentication and Authorization:
JWT (JSON Web Tokens)
OAuth
Role-based access control (RBAC)
Data Encryption:
TLS/SSL
Encryption algorithms
Data masking
Fault Tolerance and Reliability:

Redundancy:
Replication
Failover
Monitoring and Alerting:
Health checks
Logging
Metrics collection
Deployment and Infrastructure:

Cloud Services:
AWS, Azure, Google Cloud
Infrastructure as Code (IaC)
Containerization:
Docker
Kubernetes
Continuous Integration/Continuous Deployment (CI/CD):
Jenkins, GitLab CI/CD, CircleCI
Performance Optimization:

Database Optimization:
Query optimization
Index optimization
Caching Strategies:
CDN caching
In-memory caching (e.g., Redis)
Content Delivery Networks (CDNs):
Content caching
Edge computing