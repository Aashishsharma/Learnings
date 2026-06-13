# RDS - Relation DB Service
- we can create our own DB, or use 3rd part DB, and connect to those DBs from EC2
- but then we need to manage DB server patching (if not 3rd party), monitoring etc
- AWS provides managed DB services, for relation DB it is called RDS
- so DB server patching, montioring is done by AWS
- but we cannot SSH into AWS RDS
- AWS RDS supports MySQL, SQL Server, Postgres and others  

**RDS Storage auto-scaling** - 
![alt text](PNG/RDSStorageScaling.PNG "Title") 

### RDSReadReplica - Main purpose - perf optimization for read operations
![alt text](PNG/RDSReadReplica.PNG "Title") 
- Note - since this is async replication, we will have eventual consistency
- One usecase is obvious - perf optimization
- other usecase - our main app read / write to DB, there is another App which just shows reporting dashboards by reading DB, then that reporting dashboard can just connect to that read replica

### RDS Read Replica Costing
![alt text](PNG/RDSReadReplica.PNG "Title") 

### RDS Multi-AZ - for disaster recovery purpose
![alt text](PNG/RDSAZ.PNG "Title") 
- it does sync replication, so DB is always consistent
- also, in our app, we don;t need to configure multiple DB URLs, only one, and standby DB will takeover if main DB fails

### Creating RDS
- Open RDS service, click on create RDS
- select 1 option - Full configuration or Easy create (below is e.g. of full config)
- select DB engine (MySQL, Postgress, SQL server, Aurora), then select DB engine version
- select availability type - 1. Single AZ deploy (1 instance), 2. Multi AZ (2 DB instance), 2nd DB instance will be standby, it is not a read replica, it cannot be accessed unless main BD fails, this is only for disaster recovery, 3. Multi-AZ DB CLuster deploy (3 instance)
- select db name, password config - create your own, or use secrets manager
- select DB size, select autoscaling or not, and select max size for autoscaling
- click create
- after creation, it wil gve you DB endpoint, default port is 3306, so you can use endpoint as url, and connect to this DB via app code, or connect via different DB tools like (SQL Server Management Studio (SSMS) for SQL server, MySQL Workbench for MySQL and so on). provide your DB connetion url port and DB creds and you are good to go
- or we can use a tool called SQLElectron, which can connect to any SQL DB engine, just in the config we have to first specify Database type, then the DB connection utl and creds 
- you can restrict access to DB by adding security group, by default it is attched to defualt VPC, so only resources from the same VPC, can connect to this DB, 
- to connect to thsi DB from local machine, or from app code, we need to change security group to allow connection from any IP address, So we have seen secutiry groups being created fro EC2, ALB and now RDS
- after DB is created, we go to that DB and from the option, select read replica, this way we can create read-replicas

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