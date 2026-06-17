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
| Query Strings ❌ Ignore | `/products` | Both requests use the same cache entry (i.e if category=books is request first, then even when category=electornics is requested, books is returned, because query string is not part of our cache key, and the cache key is still /products) | Since `category` is ignored, both requests map to `/products`. If the first request cached the Books page, the second request also gets the Books page. |
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