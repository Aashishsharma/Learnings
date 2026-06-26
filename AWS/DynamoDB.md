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
# DynamoDB Secondary Indexes (LSI vs GSI)

## Step 1: Original Table

Suppose the table is:

```text
PK = CustomerId
SK = OrderId
```

| CustomerId | OrderId | OrderDate | Status |
|------------|----------|-----------|---------|
| C101 | O1 | Jan 10 | SHIPPED |
| C101 | O2 | Jan 20 | PENDING |
| C102 | O3 | Jan 15 | SHIPPED |

Internally, DynamoDB organizes the data like this:

```text
Customer C101
    O1
    O2

Customer C102
    O3
```

Since the data is organized by **CustomerId**, you can efficiently query:

```text
CustomerId = C101
```

or

```text
CustomerId = C101
OrderId = O2
```

---

#### Local Secondary Index (LSI)

Suppose you now want to ask:

> Show all orders of Customer C101 sorted by OrderDate.

Problem:

The table is sorted by **OrderId**, not **OrderDate**.

Create an LSI:

```text
PK = CustomerId      (same as table)
SK = OrderDate       (different)
```

AWS builds another index:

```text
Customer C101
    Jan10 → O1
    Jan20 → O2

Customer C102
    Jan15 → O3
```

Notice:

- Still grouped by **CustomerId**
- Only the ordering inside each customer changes.

Hence the name **Local Secondary Index**.

---

#### Global Secondary Index (GSI)

Now suppose you want:

> Show all SHIPPED orders.

The original table cannot answer this efficiently because it is organized by CustomerId.

Create a GSI:

```text
PK = Status
SK = OrderDate
```

AWS builds another index:

```text
SHIPPED
    Jan10 → O1
    Jan15 → O3

PENDING
    Jan20 → O2
```

Now DynamoDB can directly query:

```text
Status = SHIPPED
```

without scanning the table.

---

#### Visual Comparison

Original Table

```text
Customer
├── C101
│     O1
│     O2
└── C102
      O3
```

LSI

```text
Customer
├── C101
│     Jan10
│     Jan20
└── C102
      Jan15
```

- Same customers
- Different ordering

---

GSI

```text
Status
├── SHIPPED
│      O1
│      O3
└── PENDING
       O2
```

- Completely new grouping
- Organized by Status instead of Customer

---

#### Summary

| Feature | LSI | GSI |
|---------|-----|-----|
| Partition Key | Same as table | Different from table |
| Sort Key | Different | Optional, can be different |
| Purpose | Alternate sorting within the same partition | Query by a completely different attribute |
| Example | Customer → Orders by OrderDate | Status → Orders |

#### One-liner
- **LSI:** Same Partition Key, different Sort Key.
- **GSI:** Different Partition Key (and optional Sort Key), creating a completely new way to query the data.

![alt text](PNG/DDB12.PNG "Title")  
![alt text](PNG/DDB13.PNG "Title")  

| Index Type | Maximum per Table | Can be Added Later? |
|------------|-------------------|---------------------|
| **LSI (Local Secondary Index)** | **5** | ❌ No (must be created when the table is created) |
| **GSI (Global Secondary Index)** | **20 (default quota)** | ✅ Yes |

**In our query we need to specify which Index to be used** - 
```bash
aws dynamodb query \
  --table-name Orders \
  --index-name StatusIndex \ 
  --key-condition-expression "Status = :s"
```
