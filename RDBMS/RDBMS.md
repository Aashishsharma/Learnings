# Index

1. **ER Model** - Entity(Object) have attributes(simple, multivalued, derived, composite), relationship(association between entities, are also tables, e.g.(cutomer is 1 table, account is another table, thus depositor is relation with attributes(custID, accntNum, access-date) since access date/other related attributes don't make sense in cust/acct table)), cardinalities(1:1,1:many,many:many), keys(super(set of attributes uniquely identify tuple), candidate(minimal of super), primary(any 1 of candidate))
2. **SQL** - Rules - (**in select** - (distinct, all, as(for display), limit, rownum, top(useful to find nth greates/smallest - to find 5th greatest- nested query find top 5, then min of 5), aggregate(min, max, sum, cnt, avg)), **in from** - (as - (imp when querying same table again (find all branches where asset greater then brooklyn branch), same table as branchNM and asset), in from branch as T, branch as S, where T.asset>S.asset, select - T.branchNM), **in where** - (and, between, like(to match substring), **order by** - only attributes from select, desc, for sorting in display, **group by - cloumnNm** - group multiple tuples having same val, then use aggregate funcs), **having - aggr func** - predicates in having clause are applied after groups are created)
3. **Nested queries** - after where clause - (in, not in, some, all, exists, not exists, unique) get tuples from 1 qurey and use that as input for outer query (both queries having different table makes this powerful), similar to join
(joins can be faster - (because the server might be able to optimize it better), nested queries - better readibility)
4. **Joins** - combine data or rows from two or more tables based on a common field, types(inner, left/right/full outer), inside from (table-1 join type table-2 on cloumnNm), natural - (ordering of tuples, frst common, thrn of left tsble then right - table-1 natural full outer join table-2)
5. **Functional dependencies** - func dep(A->B), rules(reflexivity(B subset of A e.g.(XY->X n XY->Y), augmentation(A->C then AB->CB), transitivity, union(A->B, A->C then A->BC), decomposition(oppo. of union), pseutransitivity(A->B, YB->C, then AY->C), if AB determine all other columns of the table then AB is a candidate key)
6. **Normalization** - why(avoid data redundancy n modification anamolies), 1-NF(must have a key, all attributes must have atomic(is relative, if system req. full date every time, then full date is atomic otherwise DD,MM n YY are atomic) values), 2-NF(1-NF + non key attributes(not part of candidate key) must not depend on subset of candidate key, convert to 2-NF - if func dep A->B violates, then move column A,B to new table n A is primary key), 3-NF(2-NF + non-prime attributes must be non-transitively dependent on every super key(non-prime key must be dependent on superkey), convert to 3-NF same as 2-NF), BCNF(non-prime **+ prime attributes** must depend on super/candidate key), EKNF(less strict than BCNF - instead of all attributes, only some/managable attributes), Denormalization(normalization not good for analytical systema - harms performance, do de-normalization after normalization, store query result in table/materialized view)
7. **DB design steps** - (1. Req. gathering 2. create ER diagram 3. convert ER to tables(1. create table for each entity, 2. for 1:many relations, use foreign key in manywala table, 3. form many:many relations - create new table na dd PK of both tables as FK in new table) 4. Idenfity Func deps 5. Normalize 6. Modify ER after Normalize 7. Create DB 8. Create queries 9. do Indexing)
8. **DB indexing** - index file(constins search key and pointer to actual record), types(**1. Ordered** - (1. Primary - (order of tuples and order of index is same, for secondary index (must be dense), not same), mostly search key is primary key), 2. Dense index - all unique vals for key also available in index search key, sparse - !all available), 3. Multilevel **2. Hash index** - search keys are uniformly distributed among buckets using hash func
9. **Hashing** - 1. static(only maps search leys to fixed set of buckets, if DB size grows, still this hashing maps to same set of buckets) 2. dynamic(hash func modifies dynamically (hash finc to check only i bits(LSB), so buckets = 2 raise to i, buckets full, i++) 3. consistent, (for range Queries ordered indeices are preferred)
10. **Stored procedures** - grp of SQL statements, same as funcs in programming, syntax (create Procedure ProcNM @Gender nvarchar(10) @empCnt int output as Begin <<SQL query>>) call (Declare @cnt int Execute ProcNM 'Male' @cnt out if(@cnt is null) print 'null' else print @cnt), inbuilt procs - sp_help procedure_name, sp_depends proc_nm

## SQL

![alt text](PNG/db1.PNG "Title")  
DBMS (Database management systems) like SqlServer, MySQL, Oracle, PostgreSQL they read the SQL queries and then actually do the CRUD operations in physical DB.
Users cannot directly work with DB, they use any one of the DBMS

### Datatypes

1. MySQL
| Data Type     | Description                                 |
|---------------|---------------------------------------------|
| INT(n)        | Integer                                     |
| VARCHAR(n)    | Variable-length character string in case of CHAR(50), if ashish is stored. memory used is 50 bytes, in varchar(50), if ashish is stored memory used is 6 bytes           |
| CHAR(n)       | Fixed-length character string               |
| TEXT          | Variable-length text                       |
| DATE          | Date                                        |
| TIME          | Time                                        |
| DATETIME      | Date and time                               |
| FLOAT(p, d)   | Floating-point number                      |
| DOUBLE(p, d)  | Double-precision floating-point number     |
| DECIMAL(p, d) | Fixed-point number                         |
| BOOLEAN       | Boolean value                               |
| ENUM('val1', 'val2', ...) | Enumeration                  |
| SET('val1', 'val2', ...)  | Set of values                  |
| BLOB          | Binary large object                        |
| JSON          | JavaScript Object Notation                 |

2. SQL
| Data Type          | Description                                   |
|--------------------|-----------------------------------------------|
| int                | Integer                                       |
| bigint             | Big integer                                   |
| smallint           | Small integer                                 |
| tinyint            | Tiny integer                                  |
| decimal(p, s)      | Fixed precision and scale numeric            |
| numeric(p, s)      | Fixed precision and scale numeric            |
| float(n)           | Floating point number                        |
| real               | Real number                                   |
| money              | Monetary values                               |
| smallmoney         | Monetary values, small range                  |
| char(n)            | Fixed-length character string                |
| varchar(n)         | Variable-length character string             |
| text               | Variable-length text                         |
| nchar(n)           | Fixed-length Unicode character string        |
| nvarchar(n)        | Variable-length Unicode character string     |
| ntext              | Variable-length Unicode text                 |
| binary(n)          | Fixed-length binary data                     |
| varbinary(n)       | Variable-length binary data                  |
| image              | Variable-length binary data (deprecated)     |
| datetime           | Date and time                                 |
| smalldatetime      | Date and time with smaller range             |
| datetime2(p)       | Date and time with fractional seconds        |
| datetimeoffset(p)  | Date and time with time zone                 |
| date               | Date                                          |
| time(p)            | Time without time zone                       |
| timestamp          | Row version                                  |
| uniqueidentifier   | Unique identifier (GUID)                     |
| xml                | XML data type                                 |
| sql_variant        | Stores values of various SQL Server-supported data types |
| geography          | Spatial data representing points, lines, and polygons |
| geometry           | Spatial data representing points, lines, and polygons |
| hierarchyid        | Represents a position in a hierarchy         |

![alt text](PNG/db2.PNG "Title")

### DB related queries

| Query Syntax                                       |
|----------------------------------------------------|
| CREATE DATABASE IF NOT EXISTS database_name;                     |
| DROP DATABASE IF NOT EXISTS database_name;                       |
| USE database_name;                                 |

### Table related queries

| Query Syntax                                           |
|--------------------------------------------------------|
| CREATE TABLE table_name (column1 datatype, column2 datatype, ...);                                      |
| ALTER TABLE table_name ADD column_name datatype;                                       |
| ALTER TABLE table_name DROP COLUMN column_name;                                        |
| ALTER TABLE table_name MODIFY COLUMN column_name datatype;                              |
| ALTER TABLE table_name RENAME TO new_table_name;                                        |
| ALTER TABLE table_name ADD CONSTRAINT constraint_name PRIMARY KEY (column_name);          |
| ALTER TABLE table_name DROP PRIMARY KEY;                                                 |
| ALTER TABLE table_name ADD INDEX index_name (column_name);                                |
| ALTER TABLE table_name DROP INDEX index_name;                                             |
| ALTER TABLE table_name ADD FOREIGN KEY (column_name) REFERENCES other_table(other_column); |
| ALTER TABLE table_name DROP FOREIGN KEY fk_name;                                          |
| SHOW TABLES;                                                                             |
| SHOW COLUMNS FROM table_name;                                                            |
| SHOW CREATE TABLE table_name;                                                            |
| DROP TABLE table_name;                                                                   |

### Constraints

![alt text](PNG/db4.PNG "Title") 
Foreign key refers to primary key of another table

![alt text](PNG/db5.PNG "Title")

![alt text](PNG/db6.PNG "Title")

###### Primary key syntax

```SQL
CREATE TABLE table_name (
    column1 datatype PRIMARY KEY,
    column2 datatype,   
);
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    PRIMARY KEY (column1, column2)
);
ALTER TABLE table_name
ADD PRIMARY KEY (column1);
ALTER TABLE table_name
DROP PRIMARY KEY;
```

![alt text](PNG/db7.PNG "Title")

###### Cascading foreign keys

![alt text](PNG/db12.PNG "Title")


![alt text](PNG/db8.PNG "Title")

### Select clause
| Keyword/Function    | Description                                                      | Example                                                              |
|---------------------|------------------------------------------------------------------|----------------------------------------------------------------------|
| Column Names        | Select specific columns from a table.                            | `SELECT column1, column2 FROM table_name;`                           |
| \* (Asterisk)      | Select all columns from a table.                                 | `SELECT * FROM table_name;`                                          |
| DISTINCT            | Return unique values in the result set.                           | `SELECT DISTINCT column_name FROM table_name;`                       |
| AS                  | Alias column names or expressions.                               | `SELECT column_name AS alias_name FROM table_name;`                  |
| CONCAT              | Concatenate strings.                                             | `SELECT CONCAT(column1, column2) AS concatenated_column FROM table_name;` |
| Mathematical Operators | Perform arithmetic operations.                                 | `SELECT column1 + column2 AS sum FROM table_name;`                   |
| Aggregate Functions | Perform calculations on a set of values.                         | `SELECT COUNT(column1) AS count FROM table_name;`                    |

If multiple columns are used in DISTINCT like `select distinct rollno, name`, then the combination of rollno and name would be unique

### Where Clause

![alt text](PNG/db9.PNG "Title")

All and ANY Compares a value to each value returned by a subquery.  
Example: `column_name = ANY (subquery), column_name > ALL (subquery)`

## Aggregate funcs

1. MIN
2. MAX
3. COUNT
4. AVG
5. SUM

```SQL
select MAX(marks) from students;
```

#### Question - Get nth highest / lowest salary

Logic - get top n employees salary in a subquery  
use this query as a table (which is called subquery) and on that data to Min / Max

```SQL
-- get 3rd highest salary
-- in MySql
select MIN(emp.salary) from (
select salary
from employee
order by salary desc
limit 3) as emp;

-- in Sql server
SELECT MIN(emp.salary)
FROM (
    SELECT TOP 3 salary
    FROM employee
    ORDER BY salary DESC
) AS emp;
```

### Group by clause

It groups the result of the query based on the the columns listed in group by clause then on thet grouped columns aggregate functions are run

```SQL
select city, count(name)
from students
group by city
``` 

In above query, all the tuples having same city name are grouped and on that group count func is run  

**Multiple columns group by Note - all the columns listed in select clause apart from aggregate functions need to be listed in the group by clause (see below query)**  -

```SQL
select city, name, count(name)
from students
group by city, name
```

In above query, the tuples returned from the students table are grouped based on city and name column as a new group,  
**Understand this** - (So if there are 2 unique cities and 2 unique names, then the group by wil return 2 raise to 2 = 4 rows, if 3 unique names for 2 cities then 2 raise to 3 = 8 rows)  
![alt text](PNG/db10.PNG "Title")  
So if there are 2 Anils in Pune city, the count of frst row would be 2

### Having clause
We frst need to understamd order of ececution of SQL query  

1. **from clause** is run to get the initial data from the table
2. **join** is run if data is to be retireved from multiple tables
3. **where clause** is run to filter the data
4. **group by clause** is run to further reduce the tuples by grouping them
5. **having clause** is run to further filter the grouped data
6. **select clause** is run to determine which columns to include in the result
7. **distinct** to further filter the data by removing duplicate rows
8. **order by**
9. **limit**

so basically having cluase is similar to where clause but where clause applies condition on rows, and having applies condition on grouped results  
**(Note - don't assume that having condition needs to have columns from group by clause)**
![alt text](PNG/db11.PNG "Title")

## Table realted queries

### 1. Update

```SQL
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

GROUP BY and HAVING clauses are not directly supported in the UPDATE / DELETE statement  
**workaround - use subqueries**

```SQL
UPDATE table_name
SET column1 = value1
WHERE id IN (
    SELECT id
    FROM table_name
    GROUP BY column2
    HAVING COUNT(*) > 1
);
```

### 2. Delete

```SQL
DELETE FROM table_name
WHERE condition;
```

We can use above workaround in DELETE query as well

### 3. Alter - to change table schema

![alt text](PNG/db13.PNG "Title")
![alt text](PNG/db14.PNG "Title")


### 4. Truncate

```SQL
TRUNCATE TABLE TABLE_NAME
```

**Drop table** - deletes entire table  
**truncate table** - deletes all the data of the table and not the table

**delete from table (without where clause) vs truncate table** -  

1. DELETE FROM table can be rolled back using a transaction if the database supports it, TRUNCATE TABLE cannot be rolled back.
2. Truncate removes all rows from a table but does not log individual row deletions, making it faster than DELETE FROM table  
3. Truncate is DDL and delete is DML

### SQL Joins

![alt text](PNG/db15.PNG "Title")
![alt text](PNG/db16.PNG "Title")

**LEFT JOIN** - Remember the table used in from is the left table, and table used in left join is the right table, so all values from table A and common values from table A and B would be returned.  

![alt text](PNG/db17.PNG "Title")

**In MySQL we don't have FULL OUTER JOIN functionality by default**  -
(Workaround)  - First do left join then right join in 2 tables then do union (see below image)
![alt text](PNG/db18.PNG "Title")

in SqlServer we have full outer join  -  

```SQL
select t1.col1, t2.col2
from table1 t1
full outer join table t2
on t1.col1 = t2.col2
```

**Self join** - if we want to get data in different form from a single table e.g (emp table has emp badgeId, emp name and mgr badgeId), but again mgr is also an employee,  
sp to get employee name and manager name from the same table  
![alt text](PNG/db19.PNG "Title")

**instead of b.name as managerName, it would be a.name as managerName in above screenshot**


### Union

![alt text](PNG/db20.PNG "Title")

Union removes duplicate records from tableA and tableB, if we want duplicate records use **UNION ALL**

![alt text](PNG/db21.PNG "Title")

