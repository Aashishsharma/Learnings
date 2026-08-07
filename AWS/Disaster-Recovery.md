# Disaster Recovery

## RPO and RTO

> [!NOTE]
> ## RPO (Recovery Point Objective)
>
> - **RPO** is the **maximum amount of data you can afford to lose** after a failure.
> - It determines **how frequently backups or replication are needed**.
>
> **Example:**
>
> - Backup taken every **1 hour**.
> - Server fails at **10:45 AM**.
> - Latest backup is **10:00 AM**.
> - **45 minutes of data is lost.**
>
> **RPO = 1 hour**
>
> ---
>
> ## RTO (Recovery Time Objective)
>
> - **RTO** is the **maximum acceptable time to restore the application** after a failure.
> - It determines **how quickly the system must be up and running again**.
>
> **Example:**
>
> - Server crashes at **10:00 AM**.
> - Application is restored by **10:20 AM**.
> - **Downtime = 20 minutes.**
>
> **RTO = 20 minutes**
>
> ---
>
> ### SAA Exam Tip
>
> - **RPO = Data Loss** ("How much data can I lose?")
> - **RTO = Downtime** ("How quickly must I recover?")

## AWS Elastic Disaster recovery
- bring your on-prem data to AWS cloud for disaster recovery
![alt text](PNG/DR.PNG "Title") 

## DR Strategies
> [!NOTE]
> ## 1. Backup and Restore
>
> - **Backup and Restore** is a disaster recovery strategy where data is **periodically backed up** and **restored after a failure**.
> - It is **low cost** but has **higher RPO and RTO** than replication-based solutions.
>
> ---
>
> ### How it Works
>
> 1. Periodically take **backups/snapshots** of the application or database.
> 2. Store the backups in durable storage (e.g., **Amazon S3**).
> 3. If a failure occurs, provision new infrastructure.
> 4. Restore the latest backup.
> 5. Resume the application.
>

> [!NOTE]
> ## 2. Pilot Light
>
> - **Pilot Light** is a disaster recovery strategy where **critical infrastructure (e.g., database)** is always running, while the remaining application components are started only during a disaster.
> - It provides **lower RPO and RTO** than Backup & Restore, but at a **higher cost**.
>
> ---
>
> ### How it Works
>
> 1. Keep **critical components** (typically the database) continuously running in the DR region.
> 2. Continuously replicate production data to the DR database.
> 3. Keep application servers and other components **stopped or minimally provisioned**.
> 4. If a failure occurs, launch the remaining application infrastructure.
> 5. Connect the application to the already-running database and resume service.
>