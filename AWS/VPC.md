# VPC
- Virtual Private Cloud
- divided into public and private subnets
- EC2 instances inside public subnets are accessible over the internet
- Under private subnets, EC2's are not reachable from internet, however EC2's can access internet using NAT
- Internet gateways allows EC2 instances from VPC to be publicly available
- even if we don't create any VPC, all our resources are added into default VPC by AWS

![alt text](PNG/VPC1.PNG "Title") 

![alt text](PNG/VPC2.PNG "Title") 

![alt text](PNG/VPC3.PNG "Title") 

**AWS Private link** - allows us to connect a service running in our VCP to a service running in another VPC

- **Note - if EC2, connects with S3, the connetion and all the HTTP calls are made via Public internet**  
- this is true for all the resoruces in AWS that talk to each other
- if we wan't AWS services to connect over private connection, then we use VPC endpoints

![alt text](PNG/VPC6.PNG "Title") 
- note in e.g. above EC2 is inside provate subnet, howevrer we could have used NAT, to give EC2 access to the internet and then eventally talk to s3 / dynamo db, but using IGW, but then this gives our EC2 access to all of the internet, so to enhance security, we can use VPC endpoints 

#### Connecting on-prem datacenter with cloud - 
1. using site-to-site VPN
![alt text](PNG/VPC4.PNG "Title") 
2. Direct connect (DX) - a private phical network needs to be build, which takes upto months, adv - private so secure, and fast

managing and communicating between VPC can become complicated, solution - **Transit Gateway** 
![alt text](PNG/VPC5.PNG "Title")  
