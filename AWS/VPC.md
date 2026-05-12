# VPC
- Virtual Private Cloud
- divided into public and provate subnets
- EC2 instances inside public subnets are accessible over the internet
- Under private subnets, are nit reachable from internet
- Internet gateways allows EC2 instances from VPC to be publicly available

![alt text](PNG/VPC1.PNG "Title") 

![alt text](PNG/VPC2.PNG "Title") 

![alt text](PNG/VPC3.PNG "Title") 

**AWS Private link** - allows us to connect a service running in our VCP to a service running in another VPC

#### Connecting onprem datacenter with cloud - 
1. using site-to-site VPN
![alt text](PNG/VPC4.PNG "Title") 
2. Direct connect (DX) - a private phical network needs to be build, which takes upto months, adv - private so secure, and fast