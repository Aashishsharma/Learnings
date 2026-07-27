# Certified architect - Associate

## Private / Public / Elastic Ips

#### 1. Public IPs
- accessible over the internet
- must be unique across the whole works
- you can ssh into your EC2 using public IPv4 and not via private IPv4

#### 2. Private IPs
- not accessible over internet
- must be unique only within the private newtork
- need to use NAT + internet gateway (which will act as proxy) to connect to the internet

#### 3. Elastic IPs (chargeable)
- when you start / stop EC2, the next time you start, the public IP of that EC2 will be different
- use Elastic IP to get **fixed public IP** for your EC2
- you can only have 4 elastic IPs per account
- try avoid using elastic IPs, instead use public IP and register a DNS name to it or use ALB domain name
- ALB also does not have fixed IP, but ALB DNS name will be same - ```my-alb-123456.us-east-1.elb.amazonaws.com```, and in R53 point the Alias record to this DNS name

**When new EC2 is launched, it will have both public and provate IPv4**  

## Placement groups
- we define a logical grouping of EC2 instances that controls how instances are physically placed within AWS infrastructure to optimize performance, fault tolerance, or both.  

### Placement group strategies

An EC2 instance is a virtual machine (VM), not a physical machine.

A single physical server (of AWS - aka -host) can run many EC2 instances using a hypervisor

#### 1. Cluster
- all EC2 placed in same AZ
- mainly try and place in the same AWS server rack  
![alt text](PNG/EC22.PNG "Title")  

#### 2. Spread
- spread EC2 instances across multiple server racks, of even spread across multi AZ
- latency will increase so not so good for performance  

![alt text](PNG/EC23.PNG "Title")  

#### 3. Partiton
- Divides EC2 instances into **partitions**, where each partition is placed on **separate racks (physical hardware)**.
- **Instances within the same partition may share racks**, but **different partitions never share racks**.
- Provides a balance between **high performance** and **fault tolerance**.  

![alt text](PNG/EC24.PNG "Title")  
![alt text](PNG/EC25.PNG "Title")  

Once the stratgey is created, then while launching an EC2 instance, under advance settings, select the placement group name (the one we created above)

## ENI - Elastic Network Interface

> - Key point - Every EC2 instance has a **primary ENI** that contains its network configuration (private IP, public/Elastic IP association, Security Groups, MAC address, etc.).
> - AWS exposes ENI as a separate resource so the **network identity can be managed independently of the EC2 compute**, enabling failover, multiple network interfaces, and advanced networking.

- An **Elastic Network Interface (ENI)** is a **virtual network card (NIC)** that can be attached to an EC2 instance.
- It enables network connectivity and can be **detached from one EC2 instance and attached to another** within the **same Availability Zone**.
- Useful for **high availability** and **failover** because the network identity moves with the ENI.

**So EC2 without ENI** - 
EC2
├── CPU
├── Memory
├── Disk
├── Private IP
├── Public IP
└── Security Groups 

**With ENI** - 
             ENI
      ┌─────────────────────┐
      │ Private IP          │
      │ Elastic IP          │
      │ MAC Address         │
      │ Security Groups     │
      └─────────┬───────────┘
                │
                ▼
            EC2 Instance

> [!NOTE]
> ENI is bound to a specific AZ
> **Most applications do not require manually managing ENIs.** AWS automatically creates and attaches a primary ENI to every EC2 instance. ENIs become useful when the **network identity** (private IPs, MAC address, Security Groups, secondary IPs, etc.) must be managed independently of the EC2 instance, such as in **advanced networking**, **multiple network interfaces**, or **specialized failover scenarios**.

> [!NOTE]
> ### We can attach multiple ENIs to a single EC2 instance, but why do we need Multiple ENIs?
>
> A single EC2 instance may need to communicate with **multiple networks** that require different IPs, Security Groups, or routing rules. Multiple ENIs allow each network connection to have its own independent network identity.
>
> ---
>
> #### 1. Connect to Multiple Subnets (Most Common)
>
> ```text
>                 EC2
>                  │
>      ┌───────────┴───────────┐
>      ▼                       ▼
>   ENI-1                   ENI-2
> Public Subnet          Private Subnet
> Web Traffic            Database Traffic
> ```
>
> - ENI-1 handles Internet traffic.
> - ENI-2 communicates with databases or internal services.
>
> ---
>
> #### 2. Different Security Groups
>
> Each ENI can have different Security Groups.
>
> ```text
> ENI-1 → Allow HTTP/HTTPS
> ENI-2 → Allow MySQL only
> ```
>
> This isolates traffic without needing another EC2 instance.
>
> ---
>
> #### 3. Network Appliances
>
> Firewalls, routers, VPNs, and NAT instances often need multiple interfaces.
>
> ```text
> Internet
>     │
>   ENI-1
>     │
> Firewall EC2
>     │
>   ENI-2
>     │
> Private VPC
> ```
>
> One ENI receives traffic, while another forwards it.
>
> ---
>
> #### 4. Independent Network Identity
>
> Each ENI has its own:
> - Private IP(s)
> - Elastic IP association
> - MAC Address
> - Security Groups
>
> These can be managed independently.
>
> ---
>
> #### Exam Tip
>
> Multiple ENIs are mainly used for **advanced networking**. Typical web applications behind an ALB usually need only the **default primary ENI** created automatically by AWS.