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

## DynamoDB commands

| API | Example AWS CLI Command | Purpose | Returns / Action |
|------|-------------------------|---------|------------------|
| **PutItem** | `aws dynamodb put-item --table-name Users --item '{"UserId":{"S":"U101"},"Name":{"S":"Ashish"}}'` | Create a new item or replace an existing one. | Writes an item. |
| **GetItem** | `aws dynamodb get-item --table-name Users --key '{"UserId":{"S":"U101"}}'` | Retrieve a single item by primary key. | Returns one item. |
| **UpdateItem** | `aws dynamodb update-item --table-name Users --key '{"UserId":{"S":"U101"}}' --update-expression "SET #N = :name" --expression-attribute-names '{"#N":"Name"}' --expression-attribute-values '{":name":{"S":"Rahul"}}'` | Update specific attributes of an item. | Updates an item. |
| **DeleteItem** | `aws dynamodb delete-item --table-name Users --key '{"UserId":{"S":"U101"}}'` | Delete an item by primary key. | Deletes an item. |
| **Query** | `aws dynamodb query --table-name Orders --key-condition-expression "CustomerId = :c" --expression-attribute-values '{":c":{"S":"C101"}}'` | Retrieve all items with the same Partition Key. | Returns one or more related items. |
| **Scan** | `aws dynamodb scan --table-name Users` | Read every item in the table. | Returns all (or filtered) items. |
| **BatchGetItem** | `aws dynamodb batch-get-item --request-items file://batch-get.json` | Retrieve multiple items from one or more tables. | Returns multiple items. |
| **BatchWriteItem** | `aws dynamodb batch-write-item --request-items file://batch-write.json` | Write or delete multiple items in one request. | Writes/deletes multiple items. |

#### Conditional writes
| API | Example AWS CLI Command | Purpose | Returns / Action |
|------|-------------------------|---------|------------------|
| **PutItem (Conditional)** | `aws dynamodb put-item --table-name Users --item '{"UserId":{"S":"U101"},"Name":{"S":"Ashish"}}' --condition-expression "attribute_not_exists(UserId)"` | Insert the item **only if it doesn't already exist**. | Prevents overwriting an existing item. |
| **UpdateItem (Conditional)** | `aws dynamodb update-item --table-name Users --key '{"UserId":{"S":"U101"}}' --update-expression "SET Age = :a" --condition-expression "Age < :max" --expression-attribute-values '{":a":{"N":"30"},":max":{"N":"40"}}'` | Update an item **only if a condition is true**. | Prevents invalid updates. |
| **DeleteItem (Conditional)** | `aws dynamodb delete-item --table-name Users --key '{"UserId":{"S":"U101"}}' --condition-expression "Status = :s" --expression-attribute-values '{":s":{"S":"INACTIVE"}}'` | Delete an item **only if a condition is true**. | Prevents accidental deletion. |

#### functions that can be used in conditinal writes
| Condition Function / Operator | Example | Purpose |
|-------------------------------|---------|---------|
| **attribute_exists()** | `attribute_exists(UserId)` | Succeeds only if the attribute exists. |
| **attribute_not_exists()** | `attribute_not_exists(UserId)` | Succeeds only if the attribute does not exist (prevent duplicates). |
| **attribute_type()** | `attribute_type(Age, N)` | Checks that an attribute is of a specific data type. |
| **begins_with()** | `begins_with(OrderId, "ORD")` | Checks whether a string begins with a prefix. |
| **contains()** | `contains(Tags, "AWS")` | Checks whether a string, list, or set contains a value. |
| **size()** | `size(Name) < 20` | Checks the length of a string, list, or binary data. |
| **BETWEEN** | `Price BETWEEN :p1 AND :p2` | Checks if a value lies within a range. |

- **we also have >,<,>=, AND, OR, IN, NOT**

### Indexing
- 2 ways to query data - 
| Operation | Can query non-key attribute? | Efficient? |
| --------- | ---------------------------- | ---------- |
| **Query** - will use indexing | ❌ No                         | ✅ Yes      |
| **Scan** - will read every row  | ✅ Yes                        | ❌ No       |

| Feature | LSI (Local Secondary Index) | GSI (Global Secondary Index) |
|---------|------------------------------|------------------------------|
| **Purpose** | Query the same Partition Key using a different Sort Key. | Query using a completely different Partition Key (and optional Sort Key). |
| **Partition Key** | **Same** as the table's Partition Key. | **Different** from the table's Partition Key. |
| **Sort Key** | Must be different from the table's Sort Key. | Optional and can be different. |
| **Created** | Only when the table is created. | Can be created anytime, even after the table exists. |
| **Example** | Table: `CustomerId + OrderId` → LSI: `CustomerId + OrderDate` | Table: `CustomerId + OrderId` → GSI: `Status + OrderDate` |

```text
Orders
PK = CustomerId
SK = OrderId
```

| CustomerId | OrderId | OrderDate  | Status  |
| ---------- | ------- | ---------- | ------- |
| C101       | O1      | 2026-01-01 | SHIPPED |
| C101       | O2      | 2026-01-15 | PENDING |
| C102       | O3      | 2026-01-20 | SHIPPED |

```text
LSI
PK = CustomerId      (same)
SK = OrderDate       (different)
```
- Show Customer C101's orders sorted by OrderDate.

```text
GSI
PK = Status
SK = OrderDate
```
- Show all SHIPPED orders, regardless of customer.

![alt text](PNG/DDB12.PNG "Title")  
![alt text](PNG/DDB13.PNG "Title")  

