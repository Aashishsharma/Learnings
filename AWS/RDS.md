# RDS - Relation DB Service
- we can create our own DB, or use 3rd part DB, and connect to those DBs from EC2
- but then we need to manage DB server patching (if not 3rd party), monitoring etc
- AWS provides managed DB services, for relation DB it is called RDS
- so DB server patching, montioring is done by AWS
- but we cannot SSH into AWS RDS
- AWS RDS supports MySQL, SQL Server, Postgres and others

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
- 