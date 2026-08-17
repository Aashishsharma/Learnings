# AWS Storages

## 1. Snowball
- portable device to transfer large data in and out of AWS / on-prem
- e.g. if we need to transfer 1 Petabyte of data from on-prem to s3 on 1Gbps internet bandwidth, then it will take more than 100 days
- instead use Snowball, which will do the transfer in 1 week
- **Another usecase is for Edge computing** - Processing data closer to where it is generated instead of sending everything to cloud, reducing latency and bandwidth usage. E.g. process data at the mining site itself, rather then uploading it to AWS

#### Ordering a snowball device  
- select snowball device type (210TB or 28TB)  
- select if you want to tranfer data to AWS S3 or get data from AWS S3 to on-prem, or if you need this device to transfer data from on-prem to on-prem
- If we select bring data from AWS S3 to on-prem, then select buckets, whose data needs to be exported into snoball device  
![alt text](PNG/snowball.PNG "Title")   
- the select in KMS keys for data to be encrypted
- the select address, where this snoball device will be delivered

**Snowball cannot import your on-prem data directly to S3 Galcier, first it needs to be added to S3, and then set lifecycle policy to then move data t S3 Glacier**

## 2. Amazon FSx
- launch 3rd part high performance file systems on AWS
4 types  

#### 1. Amazon FSx for Windows File Server
- for **Windows**
- supports **SMB** and **NTFS** file protocols
- supports **Microsoft AD** and Microsoft's **Distributed File System (DFS)**
- can be mounted on **Linux EC2 instances** as well
- can store up to **100 PB** of data with millions of IOPS
- Storage options: **SSD** (faster) and **HDD**
- on-prem servers can access this file system via **Direct Connect / VPN**
- data can be backed up to **S3**

#### 2. Amazon FSx for Lustre
- for **Linux**
- Lustre = **Linux + Cluster**
- very high performance, used in **HPC applications**
- used for **ML processing, video processing, and scientific computing**
- Storage options: **SSD and HDD**
- on-prem servers can access this file system via **Direct Connect / VPN**
- integrates with **S3** — can directly read/write data from S3
- commonly used when **high throughput and low latency** are required

#### 3. Amazon FSx for OpenZFS
- for **Linux / Unix-based workloads**
- uses the **OpenZFS** file system
- supports **NFS** file protocol
- provides **high performance and low latency**
- commonly used for **Linux applications, databases, analytics, and file-based workloads**
- supports **snapshots, cloning, and data compression**
- Storage option: **SSD**
- on-prem servers can access this file system via **Direct Connect / VPN**
- supports **NFSv3, NFSv4, and NFSv4.1**

#### 4. Amazon FSx for NetApp ONTAP
- for **Linux and Windows** workloads
- based on **NetApp ONTAP**
- supports **NFS, SMB, and iSCSI** protocols
- supports **Microsoft Active Directory**
- supports **multi-protocol access** — Windows and Linux clients can access the same data
- supports **snapshots, cloning, replication, compression, and deduplication**
- Storage options: **SSD + capacity pool storage**
- supports **automatic data tiering** from SSD to capacity pool
- on-prem servers can access this file system via **Direct Connect / VPN**
- integrates with **AWS DataSync** for data migration
- best choice when you need **enterprise NAS features**

### Quick SAA-C03 Comparison

| FSx Type | Best For | Protocol |
|---|---|---|
| **FSx for Windows File Server** | Windows workloads | **SMB** |
| **FSx for Lustre** | HPC, ML, video processing | **Lustre** |
| **FSx for OpenZFS** | Linux/Unix, high-performance workloads | **NFS** |
| **FSx for NetApp ONTAP** | Enterprise NAS, mixed Windows/Linux | **NFS, SMB, iSCSI** |

#### Persistent vs Scratch File Deployment

| Deployment | Meaning | Actual Use Case |
|---|---|---|
| **Persistent** | File system survives when compute resources are stopped/removed | **Store application data that needs to be available after restart** |
| **Scratch** | File system is temporary and data can be lost when compute resources are stopped/removed | **Store temporary/intermediate data during HPC or ML processing** |  

**Creating FSx**  
- select type
- then select the storage type SSD, HDD, and total storage needed like 100GB or whatever  
![alt text](PNG/FSx.PNG "Title")   