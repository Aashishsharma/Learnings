# API Gateway
- allows us to create serverless APIs
| # | Core Purpose | Why it Exists (1-liner) | Example |
|---|--------------|-------------------------|---------|
| 1 | **Single entry point for APIs** | Exposes one endpoint instead of clients calling multiple backend services directly. | Mobile app → API Gateway → Lambda, ECS, EC2 |
| 2 | **Centralized security** | Handles authentication, authorization, API keys, throttling, WAF, CORS, etc., in one place. | Validate JWT before forwarding request |
| 3 | **Request/Response transformation** | Modifies requests or responses without changing backend code. | Convert XML → JSON, add/remove headers |
| 4 | **API management & monitoring** | Provides logging, metrics, caching, rate limiting, usage plans, and versioning. | CloudWatch logs, API quotas, response caching |

**API gateway can be integrated with**  
1. lambda
2. EC2, ECS, EKS, also on-prem APIs
3. SNS, SQS, Step functions, Event Bridge

**BOTTOM-LINE** - **API Gateway allows external clients (browsers, mobile apps, third-party applications, etc.) to securely invoke all the above AWS servies via REST API**  

| Endpoint Type | Accessible From | Best Use Case | Supports VPC? |
|---------------|-----------------|---------------|---------------|
| **Regional** | Internet within a specific AWS Region | Most APIs, low latency for regional users | ❌ |
| **Edge-Optimized** | Internet (via CloudFront edge locations) | Global clients needing lower latency | ❌ |
| **Private** | Only from within a VPC (via Interface VPC Endpoint/PrivateLink) | Internal microservices, enterprise/private APIs | ✅ |

### API Gateway security
| Security Feature | Purpose | Example |
|------------------|---------|---------|
| **IAM Authentication** | Allow only authenticated IAM users/roles to invoke APIs | Internal AWS applications |
| **Lambda Authorizer** | Run custom authentication/authorization logic | Validate custom JWT or OAuth token |
| **JWT Authorizer** (HTTP APIs) | Validate JWT tokens from an Identity Provider | Cognito, Auth0, Okta |
| **Amazon Cognito Authorizer** | Authenticate users using Cognito User Pools | Mobile/Web app login |
| **API Keys** | Identify API consumers and enforce usage plans (not authentication) | Partner or developer APIs |
| **Usage Plans & Quotas** | Limit requests per client/API key | 1,000 requests/day |
| **Throttling** | Protect backend from excessive traffic | 100 requests/sec |
| **AWS WAF** | Block malicious traffic (SQLi, XSS, bots, IP blocking) | Protect public APIs |
| **Resource Policies** | Control which AWS accounts, VPCs, or IPs can access the API | Allow only corporate IP range |
| **HTTPS (TLS)** | Encrypt data in transit | Secure client-to-API communication |
| **CORS** | Control which browser origins can call the API | Allow only `https://app.example.com` |

### ConfiguringAPI Gateway
1. Create Rest API
- ![alt text](PNG/API1.PNG "Title")  
2. Create Method (GET/PUT/POST/ basically any HTTP method), and select the Lambda function which needs to be invoked
- ![alt text](PNG/API2.PNG "Title")  
3. Root / GET method is created
- ![alt text](PNG/API3.PNG "Title")  
4. We can create reources as many as we want under the API Gateway (created /houses resource and has a GET method on that resource)
- ![alt text](PNG/API4.PNG "Title")  
5. Now we need to deploy the API, after deploying the API, we will get INVOKE_URL, which external clients use
- ![alt text](PNG/API5.PNG "Title")  

- ![alt text](PNG/API3.PNG "Title")  