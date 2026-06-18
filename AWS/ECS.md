# Elastic Container Service (ECS)
- allows us to launch docker container on AWS
- for this we first need to provision EC2 instance
- AWS will handle container lifecycle part

**There are 2 launch types of ECS containers**

## 1. EC2 launch type
- see below (EC2 launch type working)
## 2. Farget launch type

- allows us to launch docker container on AWS
- same as ECS, but it is serverless
- so no need to provision EC2 instance

### EC2 lanunch type working - 
- In ECS EC2 launch type, you provision and manage EC2 instances, and ECS schedules containers as tasks on those instances using the ECS Agent running on each EC2. 
**How it works**
```text
ECS Cluster
    |
    +-- EC2 Instance 1
    |      |
    |      +-- ECS Agent
    |      +-- Container A
    |      +-- Container B
    |
    +-- EC2 Instance 2
           |
           +-- ECS Agent
           +-- Container C
```
Flow  
#### Step 1. Create ECS cluster - 
- **ECS Cluster** is a logical grouping of compute resources (EC2 instances or Fargate) where ECS schedules and runs containers.
- select launch type - farget, farget and self managed instances (this is nothing but EC2 instance launch type)
![alt text](PNG/ECS1.PNG "Title")  
- then choose EC2 details, EC2 instance role (this is same as IAM role,if EC2 is going to call any other AWS service)
![alt text](PNG/ECS2.PNG "Title")  
- select desired capacity
![alt text](PNG/ECS3.PNG "Title")  
- the click on create cluster
- FYI - when cluser is created it will also auto create ASG group which will have EC2 instances based on capacity selected

- when cluser is created, we then need to create tasks, services to launch containers on those EC2s
![alt text](PNG/ECS4.PNG "Title")  

#### Step 2. Create Tasks
- **ECS Task** is a running instance of a Task Definition, i.e., one or more containers running together on ECS., **ECS task is similar to pod in K8**
![alt text](PNG/ECS5.PNG "Title")  
![alt text](PNG/ECS6.PNG "Title")  
- then provide container details, (image url below is image name from dockerhub)  
![alt text](PNG/ECS7.PNG "Title")  

#### Step 3. Create Services
- **ECS Service** ensures that a specified number of ECS Tasks are continuously running and automatically replaces failed tasks.
- **ECS service is similar to deployment in K8**
- while creating service, provide the link to the task we created earlier
![alt text](PNG/ECS8.PNG "Title")  
- provide deployment config, e.g. if we provide desired capaciry as 4, then 4 container will be running (4 containers of the same task we created above)
![alt text](PNG/ECS9.PNG "Title")  
- provide sec grp details, which makes containers accessible over http
![alt text](PNG/ECS10.PNG "Title")  
- create and attach a new ALB, so that those 4 containers are load balanced
![alt text](PNG/ECS11.PNG "Title")  
- then we go to the ALB created above, open DNS of ALB, and then it will call those 4 containers round-robin
- so basically, our docker image (referenced in Task (image url)) - will have our app running and exposing port 80

**Responsibilities** - 

| ECS Manages | You Manage |
|------------|------------|
| Container scheduling | EC2 instances |
| Service discovery | AMI updates |
| Health checks | OS patches |
| Task placement | Scaling EC2 fleet |

### ECS autoscaling
- auto increase number of tasks
- this is different from EC2 ASG
- EC2 ASG scales EC2 instances, ECS autoscaling scales number of tasks (pods)

| Method | How it works | Example |
|-------|-------------|---------|
| **Target Tracking** | Maintain a target metric value | Keep CPU around 60% |
| **Step Scaling** | Scale by different amounts based on alarm thresholds | CPU > 70% → +2 tasks, CPU > 90% → +5 tasks |
| **Scheduled Scaling** | Scale at predefined times | Scale to 10 tasks every day at 9 AM |

![alt text](PNG/ECS12.PNG "Title") 
- when CPU utilization goes up, it triggers Cloudwatch Alarm
- the alarm will trigger scaling activity to ECS service, which will eventually add new task 3

### IAM roles for ECS
### ECS Data volumes

## ECR - Elastic container registry
- AWS's private docker registry
- this is where docker images are stored
- AWS ECR Public gallery - this is public docker registry by AWS, similar to dockerhub

## EKS - Elastic Kubernetes service
- containers can be hosted on EC2 or farget
