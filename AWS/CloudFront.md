# CloudFront
- CDN
![alt text](PNG/Cloudfront1.PNG "Title") 

### CloudFront Origin Access Control (OAC)

**OAC allows CloudFront to securely access a private S3 bucket on behalf of users.**
### Scenario
You want:
- Users → Access files only through CloudFront
- Users → Cannot access S3 bucket directly
```text
User
   |
CloudFront
   |
OAC (signed request)
   |
Private S3 Bucket
```
**How it works**
User requests:
https://cdn.example.com/logo.png
CloudFront sends a signed request to S3 using OAC.
S3 bucket policy allows access only from that CloudFront distribution.
Direct access is denied:
https://my-bucket.s3.amazonaws.com/logo.png ❌ Access Denied

**Summary of OAC** - make files from s3 accessible without making them public

### Configuring cloudfront
- goto cloudfront
- click create distribution
- select on origin from (s3, ALB, API gateway)
- select s3 bucket
- behind the scenes cloudfront will update s3 bucket policy and add cloudfront's arn to the list of allowed resources which can access s3 bucket
- once distribution is created you will get distributed domain name
- then open that domain name and goto https://domain-name/coffee.jpg
- so even if the bucket was private, all the objects can be accessed via the distributed domain name

### CF Caching policies
- Cache lives in edge locations
- cloudfront identifies each cache object based on cache key (cahce key is combination of hostname+resource_file url) 

### CloudFront Cache Key

**By default, the cache key is just the object path (URL path).**
Example:
```text
https://cdn.example.com/logo.png
Cache Key:
/logo.png
```
A Cache Policy can additionally include:
- Query Strings
- Headers
- Cookies
which become part of the cache key.
---
#### 1. Query Strings

Request:

```text
GET /products?category=books
GET /products?category=electronics
```

| Cache Policy | Cache Key Used by CloudFront | Result | Why? |
|-------------|------------------------------|--------|------|
| Query Strings ❌ Ignore | `/products` | Both requests use the same cache entry | Since `category` is ignored, both requests map to `/products`. If the first request cached the Books page, the second request also gets the Books page. |
| Query Strings ✅ Include | `/products?category=books`<br>`/products?category=electronics` | Separate cache entries for `books` and `electronics` | `category` becomes part of the cache key, so CloudFront stores and returns separate pages. |

---

#### 2. Headers

Request:

```text
GET /home
Accept-Language: en-US

GET /home
Accept-Language: fr-FR
```

| Cache Policy | Cache Key Used by CloudFront | Result | Why? |
|-------------|------------------------------|--------|------|
| Headers ❌ Ignore | `/home` | Same cached page returned to both users | `Accept-Language` is ignored, so both requests map to `/home`. If English was cached first, French users also get the English page. |
| Headers ✅ Include `Accept-Language` | `/home + en-US`<br>`/home + fr-FR` | Separate cache for English and French pages | The header becomes part of the cache key, so CloudFront stores separate pages for each language. |

---

#### 3. Cookies

Request:

```text
GET /profile
Cookie: userId=123

GET /profile
Cookie: userId=456
```

| Cache Policy | Cache Key Used by CloudFront | Result | Why? |
|-------------|------------------------------|--------|------|
| Cookies ❌ Ignore | `/profile` | Both users get the same cached response (usually wrong) | `userId` is ignored, so both requests map to `/profile`. If User 123's page is cached first, User 456 may get User 123's page. |
| Cookies ✅ Include `userId` | `/profile + userId=123`<br>`/profile + userId=456` | Each user gets their own cached response | `userId` becomes part of the cache key, so CloudFront creates separate cache entries for each user. |

---

### TTL (Time To Live)
Suppose:
```text
Default TTL = 1 hour
```
Flow:
```text
10:00  User requests /logo.png
       -> CloudFront fetches from origin
10:30  Another request
       -> Served from cache
11:01  Another request
       -> TTL expired
       -> CloudFront fetches from origin again
```
| TTL | Meaning |
|-----|---------|
| Min TTL | Minimum time CloudFront keeps an object |
| Default TTL | Used when origin doesn't specify cache headers |
| Max TTL | Maximum time CloudFront can cache an object |

#### Cache invalidation
- we ourself invalidate the cache if the data in the origin has been updated
- cache canbe invalidated in cloudfront based on the filepath - /logo.png or based on path /images/*

#### Cache behaviour
A **Cache Behavior** defines **how CloudFront handles requests for a particular URL pattern**.
It specifies:
- Which **origin** to use
- Which **cache policy** to apply
- Allowed HTTP methods
- Viewer protocol policy (HTTP/HTTPS)
- Lambda@Edge / CloudFront Functions
- Compression, etc.
---
### Example
Suppose your application has:
```text
/images/*  -> S3 bucket
/api/*     -> ALB
/*         -> S3 static website
```
You create 3 cache behaviors:
| Path Pattern | Origin | Cache Policy | Use Case |
|-------------|--------|-------------|---------|
| `/images/*` | S3 | Cache for 24 hrs | Static images |
| `/api/*` | ALB | Disable caching | Dynamic APIs |
| `/*` | S3 | Cache for 1 hr | Website assets |
---
**Flow**
```text
User requests:
/images/logo.png
        |
Matches: /images/*
        |
Origin: S3
        |
Cache: 24 hrs

/api/users
        |
Matches: /api/*
        |
Origin: ALB
        |
Cache: Disabled
```
---

> A Cache Behavior is a set of rules in CloudFront that determines how requests matching a URL pattern are routed, cached, and processed.

### Configuring cache policy
![alt text](PNG/Cloudfront2.PNG "Title")   
![alt text](PNG/Cloudfront3.PNG "Title") 
![alt text](PNG/Cloudfront4.PNG "Title") 
![alt text](PNG/Cloudfront5.PNG "Title")  
- Note - when you click on create invalidation, the rule is run immediately and cache is invalidated

### Cloudfront VPC origin
- allows CloudFront to serve content from a private ALB or EC2 inside a VPC, so the origin is not directly accessible from the internet.

##### Without CloudFront VPC Origin
Normally, for CloudFront to fetch content from an origin, the origin must be **publicly reachable**.
```text
User
  |
CloudFront
  |
Public ALB / Public EC2
```
- The ALB/EC2 has a **public IP**.
- Anyone on the internet can potentially reach it (subject to security groups).
---
##### With CloudFront VPC Origin
```text
User
  |
CloudFront
  |
Private ALB (inside VPC)
```
- The ALB has **no public IP**.
- Users **cannot** access it directly.
- Only CloudFront can connect to it through AWS-managed private networking.
---
**What does "without public internet" mean?**
> The origin (ALB/EC2) is **not exposed to the internet at all**; only CloudFront is allowed to reach it.
![alt text](PNG/Cloudfront6.PNG "Title")  


### CF Geographic-restrictions
- allow you to allow or block users from specific countries from accessing your content.
- usecase - copyright laws  
![alt text](PNG/Cloudfront7.PNG "Title")  

### CF signed URL
- **CloudFront Signed URL** provides time-limited access to private content, e.g. a company like Udemy can store course videos privately and generate a short-lived CloudFront Signed URL only after verifying that:  
**working** - 
![alt text](PNG/Cloudfront8.PNG "Title")   
1. S3 object contains course video, only accessible via cloudfront (via OAC)
2. User logs in to Udemy webapp, which calls CloudFront via SDK and generate signed URL
3. Signed URL share back to user, which then reaches to CF, which redners the video in the browser

**Technical implementation** - 
1. in Cloudfornt, generate public/private key
2. Private key is used by our app (EC2) to generate signed URLs
3. Public key is used by CF to verify signed URLs

- create a public key (goto rsa website and create public / private key)  
- add publick key below
![alt text](PNG/Cloudfront10.PNG "Title") 
- refer the above created public key here in the CLoudFront 
![alt text](PNG/Cloudfront9.PNG "Title") 
