# RDS - Relation DB Service
- we can create our own DB, or use 3rd part DB, and connect to those DBs from EC2
- but then we need to manage DB server patching (if not 3rd party), monitoring etc
- AWS provides managed DB services, for relation DB it is called RDS
- so DB server patching, montioring is done by AWS
- but we cannot SSH into AWS RDS
- AWS RDS supports MySQL, SQL Server, Postgres and others  

**RDS Storage auto-scaling** - 
![alt text](PNG/RDSStorageScaling.PNG "Title") 

**RDSReadReplica** - Main purpose - perf optimization for read operations
![alt text](PNG/RDSReadReplica.PNG "Title") 
- Note - since this is async replication, we will have eventual consistency
- One usecase is obvious - perf optimization
- other usecase - our main app read / write to DB, there is another App which just shows reporting dashboards by reading DB, then that reporting dashboard can just connect to that read replica

## AWS Aurora vs AWS RDS
- Auror is built by AWS, built as cloud optimize DB
- 5x time faster then MySQL and 3x fater that postgres, if we used MySQL or Postgres, since they are not cloud optimized
- but 20% costlier than RDS 

## DB Replication
- Read replica - we can create upto 15 read replicas of RDS
- Multi-AZ replica - same region but in multiple AZs
- Multi-region replica - replica across multiple regions

## Elastic cache
- AWS managed Redis / memcache

## DynamoDB
- NoSQL AWS DB
- it is serverless DB, so you just directly create tables (NoSQL), no need for DB instance
- DynamoDB can have only 1 table
- similar to Elastic cache, we have DAX (DynamoDB Accelerator) - caching, but just for DynamoDB
- we can use Elastic cache for DynamoDB as well, but DAX is more performant and specially designed for DynamoDB

## Redshift
![alt text](PNG/Redshift.PNG "Title") 

## EMR
![alt text](PNG/EMR.PNG "Title") 

## Athena
![alt text](PNG/Athena.PNG "Title") 

## Quicksight
![alt text](PNG/Quicksight.PNG "Title") 

## DocumentDB
![alt text](PNG/DocumentDB.PNG "Title") 
- DynamoDB - fully serverless, DocumentDB - it will have instance of NoSQL like MondoDB

## Neptune
![alt text](PNG/Neptune.PNG "Title") 

## Timestream
![alt text](PNG/Timestream.PNG "Title") 

## ManagedBlockchain
![alt text](PNG/ManagedBlockchain.PNG "Title") 

## Glue
![alt text](PNG/Glue.PNG "Title") 

## Database migration service
![alt text](PNG/DMS.PNG "Title") 