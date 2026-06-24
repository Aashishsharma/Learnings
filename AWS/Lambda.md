# Lambda
- virtual functions
- run and pay on-demand
- - Scaling is automatic: if the number of incoming requests increases, AWS Lambda automatically creates additional concurrent Lambda executions to handle the load.
- lambda pricing is very cheap, hence popular
- popular usecase - serverless cron jobs (schedule AWS Eventbridge every 24 hr, which will trigger lambda), why lambda? you pay only for 10 mins (assuming job duration is 10 mins only), if we use EC2 and schedule corn job manually, we have to pay for full 24hrs, even if the job is not running, but EC2 is still up (lambda is only not recommended when batch job duration is > 15 mins or so)

## 3 ways to invoke lambda
### 1. Lambda Synchronous Invocation

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

### 2. Lambda Asynchronous Invocation
- Caller does NOT wait for Lambda execution to complete.
![alt text](PNG/l5.PNG "Title")  
- for async invocation where lambda fails for X amount of time, we can have DLQ which will send msgs to SNS
- note that this DLQ is set on Lambda and not on SNS
- note we cannot connect lambda directly to SQS, because unlike SNS, SQS doesnot push messages to consumers (consumers need to poll), and lambda cannot be run on its own, some service needs to trigger it, and SQS does not trigger. Solution - Eventsource mapping (see below)

### 3. Lambda Event source mapping invocation
- Some services (KDS, SQS, Dynamo DB streams) don't push events directly to Lambda.
- Instead, Lambda must continuously poll them for new messages/records.
- A Lambda Event Source Mapping is a configuration that tells Lambda to poll an event source and invoke the function when new records arrive.
- here also we can have failed messages and set a DLQ, but this time DLQ needs to be set in SQS, because with eventsource mapping, lambda is invoked synchronously, and DQL on lambda can be set only when lambda is invoked async

**How it works** -  
![alt text](PNG/l9.PNG "Title")  
1. You create an Event Source Mapping between a source (SQS/Kinesis/DynamoDB Stream) and a Lambda function.
2. AWS creates and manages pollers internally.
3. These pollers continuously poll the source:
   - SQS → ReceiveMessage API
   - Kinesis → GetRecords API
   - DynamoDB Streams → GetRecords API
4. Pollers collect records into batches based on:
   - Batch size
   - Batch window
   - Available records
5. Poller invokes Lambda synchronously with the batch.
6. Lambda processes the records and returns success/failure.
7. Based on the result:
   - Success → records are checkpointed/removed
   - Failure → records are retried according to source-specific rules

- so goto lambda function, add trigger, select SQS  
![alt text](PNG/l10.PNG "Title")  
- **Note** - even though we have selected SQS as trigger, behind the scenes AWS will create event source mapper for this to work

### Lambda Destinations
Lambda Destinations allow you to send the result of an **asynchronous Lambda invocation** to another AWS service after execution completes.

**Why?** - 
Instead of writing custom code to handle success/failure outcomes, Lambda can automatically route them.

**Why not use DQL then?**  
| Lambda Destinations | Dead Letter Queue (DLQ) |
|----------|----------|
| Can send both success and failure outcomes | we can send only failed events |
| Can send execution result metadata (request ID, response, error details) | Stores only the original event |
| Supports SNS, SQS, EventBridge, Lambda as targets | Supports only SQS or SNS |
| Useful for chaining workflows | Useful for retaining failed events |
| Can trigger downstream processing on success | Cannot handle successful executions |

### When to Use

| Scenario | Use |
|----------|----------|
| Capture failed events for later reprocessing | DLQ |
| Trigger another workflow after successful execution | Destination |
| Need detailed execution result/error information | Destination |
| Event-driven orchestration | Destination |

![alt text](PNG/l12.PNG "Title")  
- after this if lambda errors out, a new message will be pushed to the SQS queue mentioned above
- similarly on success, we can push message to another SQS / SNS, and from there we can have as many subscribers as we want to continue or workflow

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

![alt text](PNG/l11.PNG "Title")  

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

### Lambda Execution role vs Resource policy
- **Execution Role  = What Lambda CAN DO**
- **Resource Policy = Who CAN CALL Lambda** 
| Aspect | Lambda Execution Role | Lambda Resource Policy |
|----------|----------|----------|
| Purpose | Defines what the Lambda function can access | Defines who can invoke or access the Lambda function |
| Attached To | Lambda function (IAM Role) | Lambda function (Resource-based Policy) |
| Direction | Lambda → Other AWS Services | Other AWS Services/Accounts → Lambda |
| Controls | Outbound permissions | Inbound permissions |
| Example | Lambda reads from S3 and writes to DynamoDB | Allow S3 bucket to invoke Lambda |
| Similar To | IAM role assumed by Lambda | S3 bucket policy |

### Example

| Scenario | Execution Role | Resource Policy |
|----------|----------|----------|
| Lambda reads files from S3 | `s3:GetObject` permission on role | Not required |
| Lambda writes to DynamoDB | `dynamodb:PutItem` permission on role | Not required |
| S3 invokes Lambda on object upload | Not required | Allow `s3.amazonaws.com` to invoke Lambda |
| EventBridge invokes Lambda | Not required | Allow `events.amazonaws.com` to invoke Lambda |
| Another AWS account invokes Lambda | Not required | Allow that account in Lambda resource policy |

- Execution role - allow lambda to poll messags from SQS via event source mapping
![alt text](PNG/l3.PNG "Title")  
- Lambda resource policy - allow a particualt bucket to invoke this lambda
![alt text](PNG/l4.PNG "Title")  

**Adding env vars to lambda** - Goto lambda --> configurations --> env variables --> add --> then use in your code ```process.env.YOUR_ENV_VAR_NAME```

![alt text](PNG/l5.PNG "Title")  

### Cloudfront Functions vs Lambda@edge
| Feature | CloudFront Functions | Lambda@Edge |
|----------|----------|----------|
| Purpose | Lightweight request/response manipulation | Advanced request/response processing |
| Execution Location | CloudFront Edge Locations | CloudFront Edge Locations |
| Runtime | JavaScript only | Node.js / Python |
| Max Execution Time | < 1 ms (sub-millisecond) | Up to several seconds |
| Memory | Very small (~2 MB) | Up to 10 GB |
| Network Access | No | Yes |
| AWS Service Access | No | Yes |
| External API Calls | No | Yes |
| Request Body Access | No | Yes |
| Response Body Modification | No | Yes |
| Cost | Lower | Higher |
| Performance | Fastest | Slower than CloudFront Functions |
| Best For | Simple header, URL, cookie manipulation | Authentication, API calls, dynamic content generation |

**Common Use Cases**

| Use Case | CloudFront Functions | Lambda@Edge |
|----------|----------|----------|
| URL rewrites | ✅ | ✅ |
| Redirects | ✅ | ✅ |
| Header manipulation | ✅ | ✅ |
| Cookie-based routing | ✅ | ✅ |
| JWT validation | ❌ | ✅ |
| Call external API | ❌ | ✅ |
| Generate dynamic response | ❌ | ✅ |
| Access DynamoDB/S3 | ❌ | ✅ |
| Modify request body | ❌ | ✅ |
| Modify response body | ❌ | ✅ |
**Rule**
| If You Need... | Use |
|----------|----------|
| Simple, ultra-fast edge logic | CloudFront Functions |
| AWS access, network calls, complex processing | Lambda@Edge |