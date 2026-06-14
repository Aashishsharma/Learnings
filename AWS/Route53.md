- all the servies listed below are to make our application globally accessible, and improve performance
# Route53
- it is a managed DNS - i.e, DNS service is managed by AWS
- it is Authorative DNS - that means we can update the DNS records, it is not just a normal DNS lookup server
- it is also a DNS registrar - it is like Godady, we can purchase domain names here
- so in Route53, we map the IP of a server (where our app is deployed, maybe EC2). with a domain url
![alt text](PNG/R531.PNG "Title") 

### Route 53 record types
| Record Type | Purpose | Example | Resolves To |
|------------|---------|---------|-------------|
| **A** | Maps a domain name to an **IPv4** address. | `api.example.com → 54.12.34.56` | IPv4 address |
| **AAAA** | Maps a domain name to an **IPv6** address. | `api.example.com → 2406:da1c::1234` | IPv6 address |
| **CNAME** | Makes one domain an alias of another domain, if you don't want users to see .elb.amazonaws.com, then CNAME is to be updated | `my-alb-123.ap-south-1.elb.amazonaws.com → api.example.com`, or `fb.com` -> `facebook.com` | Another domain name |
| **NS** | These tell the internet: "If you want DNS records for example.com, ask these name servers." | `example.com → ns-123.awsdns-45.com` | Name servers |

- Seems like AWS has 4 authorative name servers (NS), which will include all the above 4 records
```
- ns-123.awsdns-45.com
- ns-678.awsdns-12.net
- ns-910.awsdns-56.org
- ns-111.awsdns-78.co.uk
```

The public DNS system knows to query AWS Route 53 because your **registrar** publishes **NS records** that say:
> "For `example.com`, ask these Route 53 name servers."
After that, all DNS queries for `example.com` are forwarded to Route 53's authoritative name servers (the 4 NS servers we listed above).
- then these NS servers already know the IP for a domain name by looking at A and AAAA records

**A Hosted Zone is a collection of DNS records for a domain in Route 53.**
- These hosted zones holds the actual records, name servers just look into these records
- one organization can have 20-30 sub domains, and AWS manages 1000 such orgs, so even if record data is small the list of records is still large, so hosted zones are used to store this info

- **Public Hosted Zone** stores DNS records that are resolvable from the internet.
- **Private Hosted Zone** stores DNS records that are resolvable only from associated VPCs.
- hence in a company, internal websites are not accessible over normal internet, e.g. dev.principal.com cannot be access from a device which is not connect to the company's internal network
- becasue, the DNS record (dev.principal.com) is resolvable only from the company's VPC/network.
- so we need to connect to VPN
- but internal websites are not just protected via Private hosted zones, they are also protected by
1. **Private IPs** - private IPs are routable only inside the VPC/corporate network. 
2. **Security groups** - if private IPs are not used then protected via security groups
3. **Firewalls**

**CNAME vs Alias** - 
| Feature | CNAME | Alias (Route 53) |
|--------|--------|------------------|
| Standard DNS record | ✅ Yes | ❌ No (AWS-specific) |
| Points to | Another domain name | AWS resource or another record |
| Can be used at root domain (`example.com`) | ❌ No | ✅ Yes |
| Extra DNS lookup required | ✅ Yes | ❌ No (Route 53 resolves it internally) |
| Common Targets | `www.example.com -> example.com` | `example.com -> ALB / CloudFront / S3 website` |

- ![alt text](PNG/Alias.PNG "Title")
- notice - that if we had used CNAME, we can provide the target as another domain name only, but this is alias record (alias toggle is on), so target can be any AWS resource
- why to use Alias? - if I purchased ashish.com domain, I can apply CNAME only on it's subdomain, but if I want a app running on ashish.com and not on any subdomain, then it can be done using alias only, (you can see in above screenshot the record name blog is empty, but it is required if record type is CNAME)

If your application is behind an **ALB**, you typically **do not create a normal A record**.
Instead, you create:
```text
www.example.com
      |
      | Alias A record
      v
my-alb-123.ap-south-1.elb.amazonaws.com
      |
      v
ALB
      |
      v
EC2 / ECS / Lambda
```

#### Registering a domain
- ![alt text](PNG/DNS.PNG "Title")
- then provide your contact info
- then do the payment, and you have your domain name  
- AWS will create NS record by default for your domain, since AWS knows it's NS servers

#### Creating records
- so now test.stephantheteacher.com will point to IP 11.22.33.44
- ![alt text](PNG/DNS1.PNG "Title")
- the TTL field tells the client browser to cache the DNS record (domain to IP mapping) for these many seconds
- if TTL is 24hrs, and if we update the record type, lets say we update the A record with different IP, the clients will have stale DNS records for upto 24hrs, based on when they last queried the DNS server

## R53 Routing Policies
- This defines how R53 will respond to DNS queries
- this routing is not same as ALB routing policies
- ALB routing - routes traffic, basically client's requests
- R53 routing policies - which IP to send to the user when looking for IP from Domain name

User -> DNS query: www.example.com
      -> Route 53 returns Mumbai ALB IP

User -> HTTP request to Mumbai ALB
      -> ALB routes /api/* to API target group

### 1. Simple routing policy
- Route 53 returns the **single configured record** for a domain.
- If multiple records are configured, Route 53 returns them in a random order (round-robin style). 
- e.g. - Every DNS query for www.example.com will always return IP - 54.12.34.56, again if multipe A records are added, then any random IP will be shared

![alt text](PNG/R532.PNG "Title") 

### 2. weighted 
- R53 will ensure, 70& traffic goes to sever 1, 20 to server 2, and 10 to server 3
- now this is actual loadbalancing
![alt text](PNG/R533.PNG "Title") 

### 3. latency based 
- R53 will ensure, users are given IP of server which are closed to them
###4. Faliover routing policy 
- R53 will give IP of other server, if it sees one of the server is down

### Configuring Route53
1. Register Domain (ashish.com) - need to pay around $12/yr
2. Create A record in R53, map your server IP with subdomain - app1.ashish.com - EC2 instance IP

# Cloudefront
- managed CDS - i.e, CDN service is managed by AWS
- cache static content on CDN, which are close to user's location

## Cloudefront origins
- these are backend services which can be connected to cloudfront
- so cloudfront will first make request to backend origin which will then cache data to it's edge location
- backed services could be S3, any static HTTP website, or any API gateway REST endpoint, so cloudfront can call these resources and cache them

### Configuring cloudfront
- Open cloudfront, select plan
- select origin (in our case, lets use s3)
- select bucket, configure bucket patterns
- then cloudfront will give url - random-string.cloudefront.net, we can access this 
- note, we can keep s3 object private and make them accessible via cloudfront

### AWS Global accelerator
- we know internet across countries is connected via cables under the ocean
- AWS global accelerator, provides dedicated AWS cables inside ocean, making it a provate network, and fast, because it is a dedicated network
- hence it is fast and secured

### AWS outpost
- All AWS infra on prem
- infra will have prebuilt AWS services

### AWS wavelength
- AWS will install the infra inside telecome provider's data centers
- hence reduces latency, so req does not need to go to AWS data centers
- useful when users have 5G connection

## Memory Trick
**Region** → A city-sized AWS area (e.g., Mumbai)
**Availability Zone** → A data center (or group of data centers) inside that city (1 region as min 3 availability zones)
**Local Zone** → A small AWS extension closer to users outside the main city, connected via ultra-low latency
**Edge Location** → A cache point that brings content very close to users

Region > Availability Zone > Local Zone > Edge Location

### How to Choose a Region when building apps?
- **Latency:** Choose a region close to your users.
  - Example: Indian users → Mumbai region.
- **Compliance/Data Residency:** Some regulations require data to stay in a specific country or region.
- **Service Availability:** Not all AWS services are available in every region.
- **Cost:** Pricing varies between regions.
- **Disaster Recovery:** Choose additional regions if you need cross-region failover.
