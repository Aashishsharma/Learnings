## Index
1. **NoSQL** - not only SQL, non-relational, flexible DB, json objs. to store data
2. **NoSSQL-Advantages** -(5) 1. flexible schema, 2. all data can be stored in single collection (insert/retrival fast, in this case), 3. Adding new column is easier due to flexible schema, 4. use where availablity is preferred over consistency (analytical systems), 5. handles big data very well, 6. scalable
3. **NoSQL-Disadvantages** -(7) 1. schema(managed at app level, rather than at DB level), 2. ACID props not guranteed, 3. no to financial systems, 4. not read efficient(to read a field, entire doc. needs to be read, SQL uses cursor), 5. Relations not implicit(no foreign key), 6. Joins are hard (need to do manually), 7. No normalization
4. **SQL-ADV** - (4) 1. Normalization, 2. ACID, 3. read efficient(using cursors) 4. Implicit relations
5. **NoSQL-ADV** - (3) 1. fixed schema (memory wasted if optional field), 2. insert/retrieve might require multiple joins, 3. adding columns later is expensive(requires DB lock)
6. **Types of NoSQL** - 1. Document based(using json) (mongoDB, couchDB), 2. colunm based(Optimised to read and write data in columns instead of rows, used for analytics) (Apache cassendra), 3. Key-Value stores(ideal for huge databases with very simple data) (Redis, couchbase server), 4. Cahce systems (Redis, memcache), 5. GraphDB (Neo4j)

## What is NoSQL
1. It is not NoSQL but is it Not Only SQL
2. It is a non relational DB (no Tables)
3. Flexible DB used in big data and real-time web apps

## SQL vs NoSQL
#### Advantages of NoSQL
**SQL**
1. Uses fixed tables,using foreign keys  
like employee table - name, age, and address ID, then address is a separate table, with addID as freign key.  
2. Fixed schema.  
3. Thus is address tables as street, district etc, and few records do not have those, memory is wasted.  
4. Insert and retrival require joins, as all req. data is not stored in same table  
5. Adding new column at later stage is expensive, it requires DB lock, to make changes
**NoSQL**
1. Uses json objects to store data.  
2. Schema is flexible. It is managed at application level rather than at DB level.  
3. All data can be stored in a single collection, insert, retrival is easy and little fast (in most cases you need to read and write same structure of data, thus only one collection needs to be queried, in SQL you need to query employee and address table)  
4. Adding new column later is easy due to flexible schema.  
5. Used is systems where availability is preferred over consistency.  
6. Generally used in analytical systems
7. Handles big data very well
8. Scalability is a big advantage

#### Disadvantages
1. Updates/ consistency is a problem. (ACID properties is not guranteed) (ACID properties can still be achieved if we put all the required data updated from different collections in one collection (nested collection), and updating only one collection is always ACID compatible)
2. So not used in financial systems.
3. Not read efficient  
e.g. read age from employee tables, every time whole record/document is read, and then age field is filtered  
In SQL, cursor is moved to age column and only age is read  
4. Relations are not implict  
e.g. in SQL, addID is a foreign key, i.e, addID cannot contain any ID which is not in the employee table this is implicit.  
Not available in NoSQL
5. Joins are hard  
e.g. If you have 2 NoSQL tables, then join is manual, find relevent column in 1st tables, by reading entire block, do same thing in other table and then merge manually. No thing is left outer, inner join etc.
6. Normaliztion not available

#### Types of NoSQL
1. Document Databases (MondoDB, CouchDB)  
Store data similar to JSON. Completely schemaless at DB level. So applications can be very dynamic.  
In such apps, user can create their own custom profile, like some will have address, bio and other things, some can just use name
2. Column DataBases (Apache Cassendra)  
Optimised to read and write data in columns instead of rows.  
Great for analytics as it reduces dick I/O requests
3. Key-Value Stores (Redis, Couchbase server)  
ideal for huge databases with very simple data
4. Cache Systems (Redis, Memcache)
5. Graph Databases (Neo4J)


**Sharding**
