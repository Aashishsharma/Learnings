# Consistency

In distributed systems, consistency may mean many things.  

1. One is that each replica node has the same view of data at a given point in time. 
2. The other is that each read request gets the value of the recent write.

## Types of consistency

#### 1. Eventual consistency

1. Weakest consistency model
2. Ensures that all the replicas will eventually return the same value to the read request, but the returned value isn’t meant to be the latest value
3. Used in DNS system
4. Advantages - High availability

#### 2. Casual consistency

1. Ensures that the order of causally related operations in a distributed system is preserved
2. E.g - whatsapp group chat / facebook post reply, order is important
3. Implemented using Vector clock / dependency tracking 

#### Vector clocks
See Sequencer.md

#### Dependency tracking
Each message in in't metadata stores info about the message / action that is is dependent on