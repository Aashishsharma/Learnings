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