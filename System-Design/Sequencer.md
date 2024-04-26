# Sequencer

Sequencer assigns unique numbers to events or messages, ensuring that the events are processed in the correct order by all nodes in the system.

In normal DB - we use auto increment for a table, but what about Distributed DB's? auto increment one 1 table will start from 1 for all the tables which are sharded.  

Hence sequencer is used. 

**Sequencer is mostly used to analyze performance based on logs to replicate user behavior** 

**FB scenario - (where all steps 3 and 4 occur concurrenty)**  

1. User A posts an update.
2. User B comments on the post.
3. User C reacts to User B's comment.
4. User D replies to User B's comment.

We need sequencer to assign unique incremental Id to each of this event, otherwise there order might break since the requests are being processed by multiple nodes.

**possible solution** - use userId and timetamp to identify the event, **issue** - clock skew between multiple nodes, **clock skew solution** - use synchronized clocks, **issue** - performance imapct in highly concurrent distributed systems. Hence sequencer is used.

### System design for Sequencer

#### Requirements

1. Unique (64 bit for large range of vals)
2. Scalable
3. Available

#### 1. Using UUID

Each server / node in distributed system to generate UUID (it is 128 bit number).  
Collision possibility - very low, but still possible  
Issue - string 128 bit no. in DB as PK in DB makes indexing slower

#### 2. Using Range handler

Here we will have range handler micro-service which will have reserved range of Ids. For e.g. it will have range of Ids from 1 to 1 Billion, then 1 Billion 1 to 2 Billion and so on.  
Each node withing thw system will request for the range, lets say node 1 gets 1 to 1 Billion range, node 2 gets 1 Billion 1 to 2 Billion rnage.  
Now Node 1 and Node 2 can incrmentallty use these ranges provided by the range handler microservice for each of it's events.  
When all the range is used up, query the microservice to get a new range of Ids

![alt text](PNG/seq1.PNG "Title")  


**Now that we used UUID to distinguish between events, we need ordering of those events to know the sequence in which events occured**

Below are some ways to get sequence of events

#### 1. Using Unix timestamp

We can have a server which will return unique timestamp and then the node can assing this timesatmp along with the ID.  
But the server which provides unique timesatmp would be Single Point Of Failure (SPOF).  
**Solution** - we can use multiple unix timestamp providers servers and can add load balancing to solve SPOF

#### 2. Twitter Snowflake

![alt text](PNG/seq1.PNG "Title")  

Here we are using 64bit UUID, so out of total 64 bits  

1. **1 sign bit** - always 0 indicating that the OD will alys be positive
2. **41 bits** for epoch timestamp (in milliscond) - these epoch time would act as uniuw identifiers
3. **10 worker bits** - each worker node within the system will have Id in bits fromat so total (1024 worker nodes)
4. **12 bit sequence** - last 12 bits will be sequence in incremental format, so toal 4096 incremental Ids, in a given millisecond. Hence in highlt concurrent distributed system, in 1 milliscond, we can handle upto 4096 req. per milliscond per worker node with unique ID generated in a sequnce, and when a req. is not hit within the same milliscond (not concrrently) we will have different epoch time 

**Nodejs example**

```javascript
const Snowflake = require('snowflake-id').Snowflake;
// Initialize Snowflake with worker ID and optional epoch
const snowflake = new Snowflake(1); // Assuming worker ID is 1
// Generate Snowflake IDs
console.log(snowflake.nextId());
console.log(snowflake.nextId());
```

#### 3. Using Lamport Clocks 

- **Initialization:** Each process or node initializes its Lamport clock to zero.
- **Event Timestamping:** Every time a process performs an event, it increments its Lamport clock by one to timestamp the event.
- **Message Timestamping:** When a process sends a message, it includes its current Lamport timestamp with the message.
- **Message Reception:** Upon receiving a message, the receiving process updates its Lamport clock to be the maximum of its current timestamp and the timestamp received in the message, plus one. This ensures that the Lamport clock of the receiving process reflects a timestamp greater than any event it has observed so far.

##### Lamport Clocks Example

- **Initial State:** Both processes start with Lamport clocks initialized to zero.

- **Event at Process P1:**
  - P1 performs a local computation.
  - P1's Lamport clock: 1
  - P1 sends a message to P2 with its Lamport timestamp (1).
  
- **Event at Process P2:**
  - P2 receives the message from P1.
  - P2's Lamport clock: max(0, 1) + 1 = 2
  - P2 processes the received message.
  
- **Another Event at Process P2:**
  - P2 performs another local computation.
  - P2's Lamport clock: 3
  - P2 sends a reply message to P1 with its Lamport timestamp (3).
  
- **Event at Process P1:**
  - P1 receives the reply message from P2.
  - P1's Lamport clock: max(1, 3) + 1 = 4
  - P1 processes the received message.

Now, let's analyze the Lamport timestamps associated with these events:

- Event 1 (P1 computation): Lamport timestamp = 1
- Event 2 (P1 sends message to P2): Lamport timestamp = 1
- Event 3 (P2 receives message from P1): Lamport timestamp = 2
- Event 4 (P2 computation): Lamport timestamp = 3
- Event 5 (P2 sends reply to P1): Lamport timestamp = 3
- Event 6 (P1 receives reply from P2): Lamport timestamp = 4

#### 4. Using vector clocks 

Vector clocks are another logical clock mechanism used in distributed systems to order events and capture causal relationships between them. Unlike Lamport clocks, which assign a single timestamp to each process, vector clocks maintain a vector of timestamps, with each entry representing the timestamp of a particular process.

Let's consider a simple example involving three processes (P1, P2, and P3) in a distributed system where each process maintains a vector clock with three entries, corresponding to the three processes.

Initially, all vector clocks are initialized to zeros:

- P1: [0, 0, 0]
- P2: [0, 0, 0]
- P3: [0, 0, 0]

Now, let's simulate some events happening at each process and see how vector clocks evolve:

##### Event at Process P1:

- P1 increments its own entry: [1, 0, 0]
- P1 sends a message to P2.

##### Event at Process P2 (upon receiving message from P1):

- P2 increments its own entry: [0, 1, 0] (since P2's clock was [0, 0, 0] before)
- P2 updates its vector clock by taking the maximum of its own and the received clock: [1, 1, 0]
- P2 sends a message to P3.

##### Event at Process P3 (upon receiving message from P2):

- P3 increments its own entry: [0, 0, 1] (since P3's clock was [0, 0, 0] before)
- P3 updates its vector clock by taking the maximum of its own and the received clock: [1, 1, 1]

Now, let's analyze the resulting vector clocks:

- P1: [1, 0, 0]
- P2: [1, 1, 0]
- P3: [1, 1, 1]

From the vector clocks, we can infer the following:

- Process P1 has seen its own event.
- Process P2 has seen its own event and the event from P1.
- Process P3 has seen events from both P1 and P2.

The vector clock reflects the causal relationships between events. For example, event at P1 precedes the event at P2 because the vector clock entry for P1 is less than the entry for P2 in P2's vector clock.


| Usage Scenarios                | Twitter Snowflake                                          | Lamport Clock                                               | Vector Clock                                                |
|--------------------------------|------------------------------------------------------------|-------------------------------------------------------------|-------------------------------------------------------------|
| Unique ID Generation           | ✓ Generates unique IDs at scale.                          | ✗ Not suitable for generating unique IDs.                   | ✗ Not suitable for generating unique IDs.                   |
| Event Ordering                 | ✓ Last 12 bits can be used for event ordering within a time window. | ✓ Provides partial event ordering based on timestamp.       | ✓ Provides partial event ordering based on causal relations.|
| Causality Tracking             | ✗ Does not track causal relations between events.         | ✗ Limited capability to track causal relations.             | ✓ Tracks causal relations between events accurately.       |
| Concurrency Resolution         | ✓ Handles concurrency by ensuring unique IDs.             | ✗ Does not resolve concurrency issues.                     | ✓ Resolves concurrency issues by tracking event dependencies.|
| Distributed Systems            | ✓ Suitable for generating unique IDs in distributed systems. | ✓ Suitable for establishing event order in distributed systems. | ✓ Suitable for tracking causal relations in distributed systems.|

