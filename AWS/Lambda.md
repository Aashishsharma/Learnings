# Lambda
- virtual functions
- run and pay on-demand
- - Scaling is automatic: if the number of incoming requests increases, AWS Lambda automatically creates additional concurrent Lambda executions to handle the load.
- lambda pricing is very cheap, hence popular
- popular usecase - serverless cron jobs (schedule AWS Eventbridge every 24 hr, which will trigger lambda), why lambda? you pay only for 10 mins (assuming job duration is 10 mins only), if we use EC2 and schedule corn job manually, we have to pay for full 24hrs, even if the job is not running, but EC2 is still up (lambda is only not recommended when batch job duration is > 15 mins or so)

### Lambda Synchronous Invocation

- Caller waits for Lambda to finish execution and receive the response.
- Used when an immediate result is required.

Examples:
- API Gateway → Lambda
- Application → Lambda (Invoke API with RequestResponse)

**Other services which invoke lambda synchronously** - 
| Service | Notes |
|----------|----------|
| Amazon API Gateway | Waits for Lambda response and returns it to the client |
| Application Load Balancer (ALB) | Forwards request to Lambda and waits for response |
| Amazon Cognito (User Pool Triggers) | Authentication flows wait for Lambda result |
| AWS AppSync | GraphQL resolver waits for Lambda response |
| CLI / SDK | invokes lambda synchronously |
| Custom Application / SDK | Using Lambda Invoke API with `InvocationType=RequestResponse` |

### Lambda Asynchronous Invocation
- Caller does NOT wait for Lambda execution to complete.
![alt text](PNG/l5.PNG "Title")  
- for async invocation where lambda fails for X amount of time, we can have DLQ which will send msgs to SNS / SQS

### 1. ALB with Lambda

Instead of forwarding requests to EC2 instances or containers, an Application Load Balancer (ALB) can forward requests directly to a Lambda function.

Flow:

Client → ALB → Lambda → ALB → Client

How it works:
1. Client sends an HTTP/HTTPS request to ALB.
2. ALB listener rule matches the request (path, host, etc.).
3. ALB invokes the Lambda function synchronously.
4. Lambda processes the request and returns a response.
5. ALB converts the Lambda response into an HTTP response and sends it back to the client

**ALB acts as an adapter, automatically transforming HTTP requests into Lambda event JSON and transforming Lambda responses back into HTTP responses.**

```text
HTTP Request
    ↓
ALB
    ↓ (converts request to JSON event)
Lambda
    ↓ (returns JSON response)
ALB
    ↓ (converts response to HTTP)
Client
```

**Example**
```text
GET /users/123 HTTP/1.1
Host: myapp.com
User-Agent: Chrome
```
**ALB converts HTTP request to Lambda events automatically**
```text
{
  "httpMethod": "GET",
  "path": "/users/123",
  "headers": {
    "host": "myapp.com"
  },
  "queryStringParameters": {},
  "body": "",
  "isBase64Encoded": false
}
```
**Accessing event in code** - 
```javascript
exports.handler = async (event) => {
  console.log(event.path); // /users/123
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      userId: 123
    })
  };
};
```
**ALB then sends function's return value as HTTP response**  

![alt text](PNG/l1.PNG "Title")  
**when we create ALB, we need to specify target group (like EC2 lambda, etc, in this case we have to chhose lambda)**
![alt text](PNG/l2.PNG "Title")  
- then choose the lambda function which will be invoked by ALB
![alt text](PNG/l3.PNG "Title") 
- by doing this ALB trigger is automatically added for the lambda function we added above in the target group
![alt text](PNG/l4.PNG "Title")

### 2. Lambda with Eventbridge
- we cannot schedule lambda invocations (like run every 1 hr), but we have schedular in Eventbridge
- so goto event bridge, click on EB schedule, select target as lambda, then name of our lambda function
- schedule frequency based on cron job, or hourly, daily and so on

### 3. Lambda with S3
![alt text](PNG/l6.PNG "Title")  
- goto bucket, click on create event notification, select event types
![alt text](PNG/l7.PNG "Title")  
- select destination as lambda, and from the dropdown select your lambda function which needs to be trigerred
![alt text](PNG/l8.PNG "Title")  


![alt text](PNG/l9.PNG "Title")
![alt text](PNG/l10.PNG "Title")
