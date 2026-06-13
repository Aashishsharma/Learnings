# Elastic Load Balancer (ELB)
- **managed** - Load balancer
- IMP - it is managed, so AWS will gurantee that ELB will be working for you, and AWS will be responsible for everthing for that ELB, we just need to configure it

### 4 types of ELB
1. Application layer (HTTP / HTTPs) - layer 7 (ALB - Application load balancer)
2. Network load balancer (ultra high performance) - layer 4
3. Gateway load balancer - layer 3 () at IP level
4. Classic load balancer (retired) - layer 4 and 7

## How to stop access of target Ec2 instances which are hidden behind ELB
![alt text](PNG/ELB.PNG "Title") 
- ony security grp of load balancer, will have allow inbound rules of 80 and 443, with source IP range (0.0.0.0/0) - making the loadbalancer publicly accessible
- but the underneath EC2 instance will only HTTP port open and this time source won't be range of IPs, but soruce will be the security grp of the load balancer, so only loadbalancer can access EC2 on port 80

## How to configure routing algo for load balancer

### Steps to create ELB
1. Create multiple EC2 instances
2. Got to Loadbalancers
3. Click on create
4. Select Application load balancer
5. Create target groups - so basically we group and select all EC2 instances which will be handeled by this load balancer into a group called target group
6. Select / Create security group, similar to while creating EC2s, we configured security groups to allow HTTP trafic and SSH rule, we need to create for load balancer, but mostly SSH rule is not required for load balancers
7. Click on create, now open the IP of load balancer, and it will work

## Auto scaling group (ASG)
- In ELB, if instances goes down due to some reason (app crashed), then new instances are not created, and if all instances go down, then APP is down.
- in ASG, we define min, max EC2 instances, and AWS takes care that minimum EC2 instances are up, all the time, if instances goes down, ASG will spin up new instances for us, enabling auto scaling

#### Steps to create ASG
1. click on ASG, under EC2, give name, click on launch template
2. similar to process of creating EC2, we need to specify all the details similar to launching Ec2 instance (provide user data to start EC2 with some webpage)
3. select existing LB, provide target groups similar to ELB
4. Configure sizing - min, max and desired EC2 instances (keep max instance to 4 for testing)
5. once finished, the loadbalancer that we selected in step 3, while creating ASG, then go to that ELB, open the DNS name, and it will redirect the request to any of the (4EC2) created in ASG template, becuase we kept desired / max EC2 instances to 4
6. under EC2, we will see new 4 instances created, and while cleaning up, we first need to delete ASG, otherwise if we terminate the instances from EC2 tab without deleteing ASG, then ASG will keep on creating new instances do meet the desired number if EC2 instances in ASG config

#### ASG scaling strategies
1. Manual - the one we did where me manually added min, max EC2 instances
2. Dynamic - 
2.1 - Simple / Step scaling - When cloudwatch alarm trigerred (CPU utilization > 70%) then add 2 EC2 instance, when CPU < 30% remove 2 EC2s
2.2 - Target tracking - I want avg ASG CPU utilization to be 50%, ASG, will decide then when to add / remove, based on this tracking
2.3 - Scheduled - Every Mon, Tue, Wed - 10 AM, increase min capacity to 10 EC2 instances
3. Predictive - AWS analysis trafic load, and scales EC2 instance based on future load prediction