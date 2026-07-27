# Certified architect - Associate

## Private / Public / Elastic Ips

#### 1. Public IPs
- accessible over the internet
- must be unique across the whole works

#### 2. Private IPs
- not accessible over internet
- must be unique only within the private newtork
- need to use NAT + internet gateway (which will act as proxy) to connect to the internet

#### 3. Elastic IPs
- when you start / stop EC2, the next time you start, the public IP of that EC2 will be different
- use Elastic IP to get **fixed public IP** for your EC2
- you can only have 4 elastic IPs per account
- try avoid using elastic IPs, instead use public IP and register a DNS name to it or use ALB domain name
- ALB also does not have fixed IP, but ALB DNS name will be same - ```my-alb-123456.us-east-1.elb.amazonaws.com```, and in R53 point the Alias record to this DNS name