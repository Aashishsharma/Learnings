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
- the default VPC attaches Internet gateway to routing rules so all EC2 instances within that VPC / subnet will have access to the internet  
 ![alt text](PNG/DVPC2.PNG "Title")  
- Note - EC2 can access intennet means, from EC2 instnance we can access internet, and it is not the other way around, for EC2 to be accessed over the internet, EC2 must be (in public subnet, have public IPv4, appropriate sec grp and NACL rules configured)

## VPC
![alt text](PNG/VPC9.PNG "Title")  

#### Creating VPC
![alt text](PNG/VPC10.PNG "Title")  
- Note the CIDR block cannot go beyond 10.0.0.0/15 - because max limit is /16 in AWS

> [!NOTE]
> ## Subnets
>
> - A **Subnet** is a **portion of a VPC's IP address range (CIDR block)** where AWS resources (EC2, RDS, Lambda ENIs, etc.) are deployed.
> - Every resource launched in a subnet receives a **private IP address** from that subnet's CIDR range.
>
> ---
>
> ### How it Works
>
> ```text
> VPC
> CIDR: 10.0.0.0/16
>         │
>         ├──────────────┐
>         ▼              ▼
> Public Subnet     Private Subnet
> 10.0.1.0/24       10.0.2.0/24
>      │                 │
>      ▼                 ▼
> EC2: 10.0.1.10    EC2: 10.0.2.15
> ```
>
> ---
>
> ### Why are Subnets Needed?
>
> - Divide a VPC into **smaller networks**.
> - Organize resources (e.g., Public and Private).
> - Control network routing and security.
> - Each subnet exists in **one Availability Zone (AZ)**.
>
> - ![alt text](PNG/VPC11.PNG "Title")   

### Creating subnet
![alt text](PNG/Sub1.PNG "Title")  
- after selecting VPC, we need to select - CIDR range and to which AZ, then subnet will cater to
- generally for public subnets - the IP ranges are kept smaller (since public IPs are need for only few services like ALB), and for private subnets, the range should be more
![alt text](PNG/Sub2.PNG "Title")    
- create multiple subnets inside the same VPC, catering to different AZs  
![alt text](PNG/Sub3.PNG "Title")   
- above we have created 4 subnets inside 1 VPC, only the names are public and private subnets, they are not yet configured to be public / private subnets
- **We need to create Internet Gateway to**  
- 1. allow resources (like EC2, Lambda) to access internet
- **Internet gateway needs to be** - 
- 1. Created separately from VPC
- 2. Then must be attached to VPC - only one IGW can be attached to 1 VPC
- 3. Attaching IGW to VPC alone will not give intert access, we must edit route tables to allow internet access  

![alt text](PNG/VPC12.PNG "Title")  
- 1. Edit route table to connect to EC2 instance inside public subnet
- 2. Route table connects to IGW which then connectes to internet   

![alt text](PNG/Sub1.PNG "Title")  
![alt text](PNG/Sub1.PNG "Title")  
![alt text](PNG/Sub1.PNG "Title")  


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
