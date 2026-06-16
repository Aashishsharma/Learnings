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