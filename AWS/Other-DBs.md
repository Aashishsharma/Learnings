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
- **RA3** nodes separate compute from managed storage.
- **Spectrum** queries data directly in S3 without loading it.
- Use **COPY** to load data into Redshift.
- Use **UNLOAD** to export data to S3.
- Supports **automatic and manual snapshots**.
- Supports **cross-region snapshot copy** for disaster recovery.
- Supports **KMS encryption** and **SSL/TLS**.
- Runs inside a **VPC** and uses **Security Groups**.
- **Concurrency Scaling** adds temporary clusters during heavy query loads.
- **Elastic Resize** is faster than **Classic Resize**.
- **Serverless** eliminates cluster management.
- **AUTO** distribution style is the recommended default.
- **ALL** distribution replicates small dimension tables to every compute node.
- **KEY** distribution keeps related rows together for efficient joins.
- Best suited for **BI, reporting, dashboards, and analytics**, not OLTP.
