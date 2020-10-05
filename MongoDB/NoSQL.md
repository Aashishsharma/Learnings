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
1. Updates/ consistency is a problem. (ACID properties is not guranteed)
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
