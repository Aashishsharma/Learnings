## Index
1. **NoSQL** - not only SQL, non-relational, flexible DB, json objs. to store data
2. **NoSSQL-Advantages** -(5) 1. flexible schema, 2. all data can be stored in single collection (insert/retrival fast, in this case), 3. Adding new column is easier due to flexible schema, 4. use where availablity is preferred over consistency (analytical systems), 5. handles big data very well, 6. scalable
3. **NoSQL-Disadvantages** -(7) 1. schema(managed at app level, rather than at DB level), 2. ACID props not guranteed, 3. no to financial systems, 4. not read efficient(to read a field, entire doc. needs to be read, SQL uses cursor), 5. Relations not implicit(no foreign key), 6. Joins are hard (need to do manually), 7. No normalization
4. **SQL-ADV** - (4) 1. Normalization, 2. ACID, 3. read efficient(using cursors) 4. Implicit relations
5. **NoSQL-ADV** - (3) 1. fixed schema (memory wasted if optional field), 2. insert/retrieve might require multiple joins, 3. adding columns later is expensive(requires DB lock)
6. **Types of NoSQL** - 1. Document based(using json) (mongoDB, couchDB), 2. colunm based(Optimised to read and write data in columns instead of rows, used for analytics) (Apache cassendra), 3. Key-Value stores(ideal for huge databases with very simple data) (Redis, couchbase server), 4. Cahce systems (Redis, memcache), 5. GraphDB (Neo4j)


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
