# Other DBs

## 1. Athena
- ![alt text](PNG/Athena.PNG "Title")  
- ![alt text](PNG/Athena1.PNG "Title")  
- ![alt text](PNG/Athena2.PNG "Title")  
- **first we create a DB**  
- ![alt text](PNG/Athena3.PNG "Title")  
- **then run queries on a specific bucket**
- ![alt text](PNG/Athena4.PNG "Title")  

## 2. Redshift
- Redshift is a **data warehouse**, not a transactional database.
- Uses **columnar storage**.
- Uses **Massively Parallel Processing (MPP)**.
- Leader node coordinates queries; compute nodes execute them.
- Supports **automatic and manual snapshots**.
- Supports **cross-region snapshot copy** for disaster recovery.
- Supports **KMS encryption** and **SSL/TLS**.
- Runs inside a **VPC** and uses **Security Groups**.
- **Concurrency Scaling** adds temporary clusters during heavy query loads.
- Best suited for **BI, reporting, dashboards, and analytics**, not OLTP.  

#### Amazon Redshift Integrations  

- **Amazon Data Firehose → Redshift** – Continuously streams real-time data into Redshift (typically via an intermediate S3 bucket using the `COPY` command).
- **Amazon S3 ↔ Redshift** – Imports data into Redshift using `COPY`, exports data using `UNLOAD`, and enables querying S3 data directly with **Redshift Spectrum**.
- **Amazon EC2 → Redshift** – Applications or analytics tools running on EC2 connect to Redshift over JDBC/ODBC or PostgreSQL-compatible drivers to execute SQL queries.  

#### Amazon Redshift Spectrum

- **Amazon Redshift Spectrum** lets you **query data stored directly in Amazon S3 using standard SQL without loading it into Redshift tables**.

#### How it works

```text
Application
      │
SQL Query
      ▼
Redshift Cluster
      │
Redshift Spectrum
      │
      ▼
Amazon S3 (CSV, JSON, Parquet, ORC, Avro, etc.)
```
