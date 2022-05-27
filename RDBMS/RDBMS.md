## Index
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

## 1. CREATE
```SQL
/* this is for sql server*/
CREATE DATABASE record_company;
DROP DATABASE record_company;

/* to use a particular db*/
USE record_company;

CREATE TABLE bands (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE albums (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(255) NOT NULL,
	release_year INT,
	band_id INT NOT NULL,
	PRIMARY KEY (id),
	/*define relationship between band_id and band table*/
	FOREIGN KEY (band_id) REFERENCES bands(id)/*create foreign key with band table(id col)*/
	/*SQL will not allow to insert any album whose band_id doesn't exists in band table (id col)*/
);

ALTER TABLE test

DROP TABLE 
```

## 2. Insert
```SQL
INSERT into bands (name) 
VALUES ('Iron Maiden')

/*multiple insert*/
INSERT into bands (name) 
VALUES ('Deuce'), ('Avenged'), ('Ankor')
```

## 3. Select
```SQL

```