# DynamoDB
| Feature | Description | Why It Matters |
|----------|-------------|----------------|
| **Fully Managed (Serverless)** | AWS manages servers, patching, replication, backups, and scaling automatically. | No infrastructure management; focus only on application logic. |
| **Single-Digit Millisecond Latency** | Provides consistently low read/write latency at any scale. | Ideal for real-time applications such as gaming, e-commerce, and IoT. |
| **Automatic Scaling** | Supports on-demand mode or provisioned capacity with auto scaling. | Handles traffic spikes without manual intervention. |
| **Flexible Schema (NoSQL)** | Stores key-value and document data; items in the same table can have different attributes. | Easy to evolve application data without schema migrations. |
| **High Availability & Durability** | Data is automatically replicated across multiple Availability Zones within a region. | Built-in fault tolerance and high availability without extra configuration. |

- goto DynamoDB, click on create table
- notice we don't need to create a DB, since it is serverless, DB is already created, just create tables

| Key | Formal Definition |
|------|-------------------|
| **Partition Key** - same as primary key in RDBMS | An attribute whose value determines the partition in which an item is stored. Items with the same partition key belong to the same logical group. |
| **Sort Key** | An optional second key that uniquely identifies and orders items sharing the same partition key, enabling efficient range and ordered queries. |

```text
Table: Orders
Partition Key : CustomerId
Sort Key      : OrderId
```

**Partition Key**: Finds the customer's group. (can have only unique values)
**Sort Key**: Finds the specific order within that customer's group. using sort key, now primary key becomes (Partition key + sort key), so now partiton key can have duplicate values, only the combination of partiton + sort key needs to be unique now

```
Get all orders of Customer C101
→ Partition Key = C101

Get Order O1002 of Customer C101
→ Partition Key = C101
→ Sort Key = O1002
```

![alt text](PNG/DDB1.PNG "Title")   

## DynamoDB Read/Write capacity
![alt text](PNG/DDB2.PNG "Title")  
![alt text](PNG/DDB3.PNG "Title")  
![alt text](PNG/DDB4.PNG "Title")  
- Read capacity is of 2 types (We have DynamboDB read replicas, so doe we want eventual consistency? or strong consistency?) - For strong consistency - 1 RCU is consumed per read/second for 4 KB data, for eventual consistency 0.5 RCU is consumed per read/second for 4 KB of data
![alt text](PNG/DDB5.PNG "Title")  
![alt text](PNG/DDB6.PNG "Title")  
![alt text](PNG/DDB7.PNG "Title")  
![alt text](PNG/DDB8.PNG "Title")  
![alt text](PNG/DDB9.PNG "Title")  
![alt text](PNG/DDB10.PNG "Title")  
![alt text](PNG/DDB11.PNG "Title")  
![alt text](PNG/DDB12.PNG "Title")  
![alt text](PNG/DDB13.PNG "Title")  

