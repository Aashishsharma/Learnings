# Architecture

## 1. Monolithic Architecture

1. Designing software applications where the entire application is built as a single unit
2. Multipe modules, but only one artifact
3. Shared resources - memory and CPU is shared
4. Different modules interact via method call, as opposed to network call in case of microservices, so faster

#### Modular Monolithic architecture

1. Start with monolithic architecture, but ensure that all the modules are loosely coupled
2. When you think scalibility becomes an issue, convert large modules to microservices

#### Disadvantages
1. Framework / Language lock
2. Difficult to distribute development
3. Difficult to scale - we can scale using autoscaling (increasing servers count, e.g. EC2 servers), but entire application is spin up in the new instance as well. E.g. in marriage, there is buffet and load on certain counter (pani-puri), scaling monolithic app is like setting up a new buffet instead of just increasing no. of counters for (pani-puri)

## 2. Client server Architecture


## 3. Microservices Architecture
## 4. Service-oriented Architecture
## 5. Event-driven Architecture
## 6. Event-driven microservices Architecture
