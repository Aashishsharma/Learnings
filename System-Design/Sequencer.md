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

