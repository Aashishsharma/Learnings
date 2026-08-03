# VPC
- Virtual Private Cloud
- divided into public and private subnets
- EC2 instances inside public subnets are accessible over the internet
- Under private subnets, EC2's are not reachable from internet, however EC2's can access internet using NAT
- Internet gateways allows EC2 instances from VPC to be publicly available
- even if we don't create any VPC, all our resources are added into default VPC by AWS

> [!NOTE]
> ## CIDR (Classless Inter-Domain Routing)
>
> - **CIDR** is a notation used to define an **IP address range** for a network.
> - It is written as **`IP Address/Prefix Length`**, where the prefix length determines how many IP addresses are available.
>
> ---
>
> ### Format
>
> ```text
> 10.0.0.0/16
> │        │
> │        └── Prefix Length
> └────────── Network Address
> ```
>
> - **Smaller prefix** → More IP addresses.
> - **Larger prefix** → Fewer IP addresses.
>
> ---
> ![alt text](PNG/VPC7.PNG "Title") 
> 
> ---
> - A **VPC** is assigned a CIDR block (e.g., `10.0.0.0/16`).
> - **Subnets** must use CIDR ranges **within the VPC's CIDR**.
> - Subnet CIDRs **cannot overlap**.

> [!NOTE]
> - ![alt text](PNG/VPC8.PNG "Title") 

## Default VPC
- All new AWS accounts have a default VPC, and this VPC has access to internet
- New EC2 instances are launched into this default VPC by default  
![alt text](PNG/DVPC.PNG "Title")  
- Default VPC has 3 subnets (each subnet for each AZ within the region), and each subnet will get CIDR assigned  
- These subnet CIDRs will determine IP address of EC2 launched inside this VPC / subnet  
![alt text](PNG/DVPC1.PNG "Title")  
- the default VPC attaches Internet gateway to routing rules so all instances within that VPC / subnet will have access to the internet  
 ![alt text](PNG/DVPC2.PNG "Title")  


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
