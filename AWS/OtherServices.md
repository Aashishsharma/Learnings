# Other Services

## Workspaces
- AWS managed Desktop as a service
- VDI as a service, no need for on-prem VDIs
- pay monthly, or hourly

## AppStream - 2.0
- Desktop application as a service e.g. photoshop
- instead of we downloading photoshop on our desktop, use this service, so we can access photoshop directly inside browser
- **Workspaces** - VDI as a service, **Appstream** - any app as a service within VDI

## IOT
![alt text](PNG/IOT.PNG "Title") 

## AppSync
- fully managed service that makes it easy to build GraphQL APIs
- connects to data sources such as Amazon DynamoDB, AWS Lambda, and databases, while handling API scaling, caching, offline synchronization, and real-time updates.

## AWS Amplify
![alt text](PNG/Amplify.PNG "Title") 
- Amplify vs Beanstalk
- Amplify - easiest way to build and host modern frontend/serverless applications
- Beanstalk - platform-as-a-service for deploying and managing web applications with more infrastructure control.

## AWS Infrastructure composer
- drag and drop service to build AWS infra for your app
- behind the scenes it will generate Infrastrucutre as code using cloudfomration

## AWS Device farm
- lets us run web application on different browsers / mobiles/ tabs, to test how app is rendered on different devices
- similar to browserstack

## AWS backup
![alt text](PNG/backup.PNG "Title") 
![alt text](PNG/backup2.PNG "Title") 

## AWS Disaster recovery strategies
| DR Strategy                    | How It Works                                                                                              | Recovery Time                                 | Cost        |
| ------------------------------ | --------------------------------------------------------------------------------------------------------- | --------------------------------------------- | ----------- |
| **Backup & Restore**           | Data is backed up and infrastructure is recreated during a disaster.                                      | Slowest (hours–days)                          | Lowest      |
| **Pilot Light**                | Critical components (e.g., database) run continuously; remaining resources are started during a disaster. | Faster (hours)                                | Low–Medium  |
| **Warm Standby**               | A scaled-down version of the full application runs in the DR region and is scaled up when needed.         | Fast (minutes–hours)                          | Medium–High |
| **Multi-Site (Active-Active)** | Full production environments run simultaneously in multiple regions and serve traffic.                    | Fastest (seconds–minutes, near-zero downtime) | Highest     |

## AWS Elastic Disaster recovery
- bring your on-prem data to AWS cloud for disaster recovery
![alt text](PNG/DR.PNG "Title") 

## AWS Data sync
- bring large data on-prem data to AWS

## Cloud migration strategy
### AWS Cloud Migration – 7 Rs (with Examples)

1. **Relocate**
   - Move servers to the cloud without changing the application or underlying virtualization platform.
   - **Example:** Moving on-premises VMware VMs to VMware Cloud on AWS.

2. **Rehost (Lift & Shift)**
   - Move the application as-is to the cloud with minimal changes.
   - **Example:** Moving a Java application from an on-premises server to an Amazon EC2 instance.

3. **Replatform (Lift, Tinker & Shift)**
   - Make small optimizations while migrating.
   - **Example:** Moving a database from a self-managed MySQL server to Amazon RDS MySQL.

4. **Refactor / Re-architect**
   - Redesign the application to take advantage of cloud-native services.
   - **Example:** Breaking a monolithic application into microservices using Amazon EKS and serverless functions.

5. **Repurchase**
   - Replace the existing application with a SaaS product.
   - **Example:** Replacing an on-premises CRM with Salesforce.

6. **Retire**
   - Remove applications that are no longer needed.
   - **Example:** Decommissioning an old reporting application that nobody uses.

7. **Retain (Revisit)**
   - Keep the application where it is for now and migrate later if needed.
   - **Example:** Keeping a legacy mainframe application on-premises because it has strict compliance requirements.


## Migrating projects to cloud
1. AWS Application Discovery service - understand what all needs to be migrated, and there counterpart AWS service
![alt text](PNG/DS.PNG "Title") 
2. AWS Application Migration Service - Do the actual migration 
![alt text](PNG/DS2.PNG "Title") 