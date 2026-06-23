# Cloudwatch
- 4 things (Metrics, logs, Alarms and Events via Eventbridge)
## 1. Metrics
- CPU, memory utilization, billing usage
- we can create alarm, when values goes above / below threshold

#### CloudWatch Metrics - Important Attributes
| Attribute | Meaning | Example |
|---|---|---|
| **Namespace** | Container/category for metrics | `AWS/EC2`, `AWS/Lambda`, `MyApp` |
| **Metric Name** | Name of the metric being measured | `CPUUtilization`, `Invocations`, `RequestCount` |
| **Dimensions** | Key-value pairs that uniquely identify the metric source | `InstanceId=i-123`, `FunctionName=my-fn` |
| **Timestamp** | Time when the metric data point was recorded | `2026-06-23T11:00:00Z` |
| **Value** | Actual measured value | `72.5` (CPU %) |
| **Unit** | Unit of measurement | `Percent`, `Count`, `Bytes`, `Milliseconds` |
| **Period** | Time interval over which data points are aggregated | `1 min`, `5 min` |
| **Statistic** | Aggregation method applied to data points | `Average`, `Sum`, `Min`, `Max`, `SampleCount`, `p95` |

**(we can have upto 30 dimenstions / metric)**

### Example
Metric:
```text
Namespace   : AWS/EC2
Metric Name : CPUUtilization
Dimensions  : InstanceId=i-123456789
Timestamp   : 2026-06-23 11:00:00 UTC
Value       : 72.5
Unit        : Percent
Period      : 5 minutes
Statistic   : Average
```
This means:

> **Average CPU utilization of EC2 instance `i-123456789` was 72.5% during the 5-minute period ending at 11:00 UTC.**

#### Dimensions are especially important
Without dimensions:
```text
AWS/EC2 : CPUUtilization
```
You don't know **which EC2 instance**.

A metric is uniquely identified by:
```text
(Namespace, MetricName, Dimensions)
```

### Custom Metrics 

**Custom metrics** are metrics that **you publish yourself** to CloudWatch for monitoring application-specific or business-specific data that AWS does not collect automatically.
- Note that metrics are different from logs, metric is total / avg some number that is displayed in cloudwacth metrics dashboard, there are not logs

#### Examples

| Use case | Metric Name | Value |
|---|---|---|
| Active users | `ActiveUsers` | `1250` |
| Orders placed | `OrdersCreated` | `350` |
| Queue size in app | `PendingJobs` | `87` |
| Memory usage on-prem server | `MemoryUsage` | `78%` |

#### Metric Example
```text
Namespace   : MyECommerce
Metric Name : OrdersCreated
Dimensions  : Environment=Prod
Value       : 350
Unit        : Count
Timestamp   : 2026-06-23T11:00:00Z
```
#### How to publish
Your application or script calls the CloudWatch API:
```text
PutMetricData(
  Namespace = "MyApp",
  MetricName = "OrdersCreated",
  Value = 350,
  Unit = Count
)
```
#### Minimal Node.js Example (AWS SDK v3)
```javascript
import {
  CloudWatchClient,
  PutMetricDataCommand,
} from "@aws-sdk/client-cloudwatch";

const client = new CloudWatchClient({ region: "ap-south-1" });
await client.send(
  new PutMetricDataCommand({
    Namespace: "MyApp",
    MetricData: [
      {
        MetricName: "OrdersCreated",
        Value: 350,
        Unit: "Count",
        Dimensions: [
          {
            Name: "Environment",
            Value: "Prod",
          },
        ],
      },
    ],
  })
);
console.log("Custom metric published");
```
### Common ways to send custom metrics
1. **AWS SDK** → Call `PutMetricData`
2. **AWS CLI**
   ```bash
   aws cloudwatch put-metric-data \
     --namespace MyApp \
     --metric-name OrdersCreated \
     --value 350
   ```
3. **CloudWatch Agent** → Collect OS/application metrics from EC2 or on-prem servers.
4. **Embedded Metric Format (EMF)** → Write structured logs, and CloudWatch automatically extracts metrics from them.

- In production app, custom metrics are created from Cloudwatch logs, you goto cloudwatch logs, create metric, give regex, and generate a metric (nore on this in the cloudwatch logs section)

## 2. Cloudwatch logs
**CloudWatch Logs** is a service for **collecting, storing, searching, and analyzing logs** from AWS services, applications, and servers.
### Examples
| Source | Who writes the logs? | Example Log |
|---|---|---|
| Lambda | Your code (`console.log`) | Function execution logs |
| EC2 | Your app / OS | Application logs, Nginx logs |
| ECS | Container/app | stdout/stderr |
| API Gateway | AWS | Access logs |
| VPC | AWS | Flow logs |
| Custom App | Your code | User login, order processing logs |

### Log Hierarchy
```text
Log Group
    └── Log Stream
            └── Log Events
```
Example:
```text
Log Group   : /aws/lambda/process-order
Log Stream  : 2026/06/23/[$LATEST]abc123
Log Event   : "Order 123 created successfully"
```
### Important Concepts

| Term | Meaning |
|---|---|
| **Log Group** | Collection of log streams for an application or service |
| **Log Stream** | Sequence of log events from a specific source (e.g., Lambda instance, ECS task) |
| **Log Event** | Individual log entry containing message + timestamp |
| **Retention Period** | How long logs are kept before deletion |
| **Subscription Filter** | Continuously forwards logs to Lambda, Kinesis, Firehose, etc. |
| **Insights** | SQL-like querying capability for analyzing logs |

### Typical Logging Flow

#### Lambda
```javascript
exports.handler = async () => {
  console.log("User login successful");
  console.error("Payment failed");
};
```
Lambda automatically sends these logs to CloudWatch Logs.
#### EC2
#### 1. Install CloudWatch Agent on EC2

```bash
sudo apt install amazon-cloudwatch-agent
```
**Note - these cloudwatch agents can be added on onprem servers as well, so onprem logs can also be available on Cloudwatch**  
**Note - all the cloudwatch logs are encrypted by default**

#### 2. Configure Agent
```json
// /opt/aws/amazon-cloudwatch-agent/etc/config.json
{
  "logs": {
    "logs_collected": {
      "files": {
        "collect_list": [
          {
            "file_path": "/var/log/myapp.log",
            "log_group_name": "MyApp",
            "log_stream_name": "{instance_id}"
          }
        ]
      }
    }
  }
}
```
---
#### 3. Start Agent
```bash
sudo amazon-cloudwatch-agent-ctl \
  -a fetch-config \
  -m ec2 \
  -c file:/opt/aws/amazon-cloudwatch-agent/etc/config.json \
  -s
```

---
```text
Node.js app
    ↓
/var/log/myapp.log --> use winston to add logs to myapp.log file
    ↓
CloudWatch Agent
    ↓
CloudWatch Logs
        └── Log Group: MyApp
              └── Log Stream: i-1234567890

```
**whenever new entries are logged to the log file, cloudwatch will detect it and push to cloudwatch**

Once the logs are created, we can create metrcis for those logs, see metrics section below - 
![alt text](PNG/CW3.PNG "Title")  
- these metrics once set, then we can set alarms on these metrics, such as count of error logs > 10 inside 1 hr
![alt text](PNG/CW4.PNG "Title")  
- this will now be added as a metric in Cloudwatch's metric section, and then we can create alarm on those metrics
- once the metric is created, click on create alarm
![alt text](PNG/CW5.PNG "Title")  
- then define condition of when the alarm should be trigerred
![alt text](PNG/CW6.PNG "Title")  
- select action on what should be notified when alarm is trigerred (push mssg to SNS), and add email as SNS's subscriber, so we get email
![alt text](PNG/CW7.PNG "Title")  

### Cloudwatch subscriptions
![alt text](PNG/CW2.PNG "Title")   

### Querying Logs with CloudWatch Logs Insights
```sql
fields @timestamp, @message
| filter @message like /ERROR/
| sort @timestamp desc
| limit 20
```
This returns the latest 20 log entries containing `"ERROR"`.  

![alt text](PNG/CW1.PNG "Title") 

> **CloudWatch Logs is a centralized log management service that collects, stores, searches, and analyzes logs from AWS services, applications, and servers.**

## 3. Alarms
- Automatically monitors metrics/logs and triggers notifications or actions when thresholds are breached.
- cloudwatch alarms can trigger 2 things (EC2 stop / terminate/ reboot, EC2 autoscale, SNS)
![alt text](PNG/CW8.PNG "Title") 

### Creating an alarm on top of a metric
E.g. - create alarm on CPU utilization  
- click on create alarm
- select metric on which you want to create alarm
- configure alarm
![alt text](PNG/CW9.PNG "Title")  
- configure action
![alt text](PNG/CW10.PNG "Title")  
- for this demo we have choosen EC2 action
![alt text](PNG/CW11.PNG "Title")  

## 4. Events via Eventbridge
- when some action happens trigger action
- example and EC2 instance starts, trigger lambda  

![alt text](PNG/Eventbridge.PNG "Title") 

| Aspect | CloudWatch Alarm | EventBridge |
|---|---|---|
| Purpose | Monitor metrics/logs and act when thresholds are crossed | Route events between services and applications |
| Triggered by | Metric or log condition (e.g., CPU > 80%) | Events (e.g., S3 object uploaded, EC2 launched) |
| Nature | Threshold-based monitoring | Event-driven architecture |
| Input | CloudWatch Metrics, Logs | AWS service events, custom events, SaaS events |

# CloudTrail
- it logs every action of every user, and sends those logs to cloudwatch / s3
- inside AWS root account, there can be 100 IAM users, and they can login via various ways, console, CLI, SDK, so every action done by any user, vai any login method will get logged
- e.g. a user deleted something, so if we ant to know who deleted, what deleted and when deleted, cloudtrail will tell
- it is enabled by default

You may see use-cases asking you to select one of CloudWatch vs CloudTrail vs Config. Just remember this thumb rule -

Think resource performance monitoring, events, and alerts; think CloudWatch.

Think account-specific activity and audit; think CloudTrail.

Think resource-specific change history, audit, and compliance; think Config.

## 5. AWS X-Ray
- you can do visual analysis of your app
- kind of dashboard of cloudwatch

## 6. Codeguru - decommissioned
- does automated PR review

## 7. AWS health dashboard
1. Service health dashboard 
  - Shows global/public health status of AWS services
  - Example: “EC2 issue in ap-south-1”
2. AWS health dashboard 
  - show health of services that you are using in your account
