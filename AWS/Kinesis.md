# Kinesis
**Amazon Kinesis Data Streams (KDS)** is a **real-time data streaming and processing service** that continuously ingests, stores, and processes streams of data from multiple producers, allowing multiple consumers to independently read and replay the same data.

One liner - 

> **Kinesis is a durable, ordered, append-only stream of events that allows multiple independent consumers to process and replay the same data in real time.**
---
### What is a Real-time Data Streaming / Processing Service?
A real-time data streaming service processes a **continuous flow of events** as they occur, instead of processing them in batches.
### Example: E-commerce Order Processing
Whenever a user places an order:
```json
{
  "orderId": "O123",
  "amount": 500
}
```
the event should be processed by:

- Analytics Service → Generate business metrics
- Fraud Detection Service → Detect suspicious transactions
- Dashboard Service → Show live order counts
- Data Warehouse Loader → Persist data for reporting
And this should happen **immediately**, as the events occur.
---
## Core Architecture
```text
Web App / Mobile App
    │
    └──► OrderPlaced Event
                │
                ▼
        +----------------------+
        |   Kinesis Stream     |
        +----------------------+
                │
      ┌─────────┼─────────┐
      ▼         ▼         ▼
Analytics   Fraud Detection   Dashboard
 Service        Service        Service
```
Important:
- All consumers can read the **same records**.
- Consumers are **independent**.
- Consumers maintain their **own progress**.
---
### The Most Fundamental Concept: Append-only Log
Kinesis stores events as an **append-only log**.
```text
Kinesis Stream
Record1 ──► Record2 ──► Record3 ──► Record4 ──► Record5 ──► ...
```
New records are always:
```text
APPENDED →
```
They are never:
- Modified ❌
- Overwritten ❌
- Inserted in the middle ❌

### Why is this important?
- Historical events remain available.
- Consumers can replay old records.
- Event history is preserved.
- Consumers can resume after failures.
---
### Records
Each event written to Kinesis is called a **Record**.
```text
{
  partitionKey,
  sequenceNumber,
  data
}
```
Example:
```json
{
  "partitionKey": "Customer123",
  "sequenceNumber": "495859384759",
  "data": {
    "orderId": "O123",
    "amount": 500
  }
}
```
#### Record fields
- **partitionKey**
  - Determines which shard stores the record.
- **sequenceNumber**
  - Unique ordered identifier within a shard.
- **data**
  - Actual business payload.
---

### Shards
A Stream is divided into multiple **Shards**.
A shard is the unit of:
- Throughput
- Storage
- Ordering
```text
Kinesis Stream  
┌─────────────────┐    ┌─────────────────┐
│    Shard 0      │    │    Shard 1      │
│ M1 → M2 → M3    │    │ M4 → M5 → M6    │
└─────────────────┘    └─────────────────┘
```
---
#### Why Shards?
Suppose your website receives:
```text
1 Million orders / second
```
One machine cannot process all of them.
Kinesis distributes records:
```text
Shard 0 ──► 100K records/sec
Shard 1 ──► 100K records/sec
Shard 2 ──► 100K records/sec
...
```
Benefits:
- Spread load across machines.
- Increase throughput.
- Preserve ordering within a shard.
- Scale horizontally by adding more shards.
---

### Partition Key
Producer writes:
```text
putRecord(
    partitionKey = customerId,
    data = ...
)
```
Internally:

```text
customerId ──► hash(customerId) ──► Choose Shard ──► Store Record
```
Notice:

```text
Same customerId ──► Same shard ──► Ordered processing
```
---

### Ordering Guarantee
Within a shard:
```text
Shard 0
M1 ──► M2 ──► M3
↓
Consumer receives
M1 ──► M2 ──► M3
```
Ordering is guaranteed.
Across shards:
```text
Shard 0           Shard 1
M1 ──► M3         M2 ──► M4
```
No global ordering.
---
### Multiple Consumers
```text
Kinesis Stream
M1 ──► M2 ──► M3 ──► M4 ──► M5
Analytics
M1 ──► M2 ──► M3 ──► M4 ──► M5
Fraud Detection
M1 ──► M2 ──► M3 ──► M4 ──► M5
Dashboard
M1 ──► M2 ──► M3 ──► M4 ──► M5
```
All consumers can read the same records independently.

Example:
```text
Analytics        ──► Processed till M1000
Fraud Detection  ──► Processed till M500
Dashboard        ──► Processed till M950
```
---

### Replaying Messages (Most Important Feature)
Suppose the stream contains:

```text
Kinesis Stream
M1 ──► M2 ──► M3 ──► M4 ──► M5
```
Analytics:

```text
M1 ──► M2 ──► M3 ──► M4 ──► M5
                          ↑
                 Last processed
```
After 6 months:

```text
Recommendation Engine
```
is introduced.
It can start from:
```text
M1 ──► M2 ──► M3 ──► M4 ──► M5
```
and process the entire history.

This is called:
> **Replay**

---

#### How does Replay work?
Each consumer stores:
```text
Last processed sequence number
```
Example:
```text
Analytics
Sequence Number = 1000
```
If Analytics crashes:
```text
Crash ──► Restart ──► Resume from ──► Sequence Number = 1001
```
If a new consumer starts:

- **TRIM_HORIZON**
  - Read from oldest available record.
- **LATEST**
  - Read only new incoming records.
- **AT_TIMESTAMP**
  - Read from a specific timestamp.
---

#### Data Retention
Records are retained for:

```text
Default ──► 24 hours
Maximum ──► 365 days
```
During this period:

- Records remain immutable.
- Multiple consumers can read them.
- Consumers can replay them multiple times.

---
---
# The 5 Fundamental Principles of Kinesis
1. **Append-only**
   - Records are only added, never modified.
2. **Partitioning**
   - Records are distributed across shards using partition key.
3. **Ordering**
   - Ordering is guaranteed within a shard.
4. **Replayability**
   - Consumers can re-read old records.
5. **Independent Consumers**
   - Multiple consumers can read the same stream independently.
---

**Another example** - real time data processing /streaming, we do analytics of clicks on websites, web sote has 1000s of clickable buttons / links, and 1000s of clients are clicking and we want to peform analytics  
![alt text](PNG/kinesis1.PNG "Title")  
**here notice importance of replaying the messages** - if customer profile service goes down, or we pushed some bug where we did not analyse events properly, Kinesis alloow is to replay all the events for customer profile services for a given point in time