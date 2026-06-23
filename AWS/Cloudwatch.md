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


## 2. Cloudwatch logs
- to send logs from EC2 to cloud watch, Cloudwatch agaent needs to be installed onto EC2 instance

## 3. Alarms
- Automatically monitors metrics/logs and triggers notifications or actions when thresholds are breached.

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
