# SNS (PubSub Service)

Used to decouple distributed applications

#### Fully managed Pub/Sub service for A2A and A2P messaging
1. A2A - application to application - application publishing a message to a topic and another application subscribing to a topic to consume the message
2. A2P - application to person - application publishing a message to a topic and a person (email, phone, push notification) service consuming the message (e.g. sending promotional SMS text messages to end-users)

#### SNS vs SQS

1. SNS is to publish messages to multiple consumers, SQS where one message can be consumed by one consumer  
2. SQS can be one of the consumers of SNS
3. In SNS, the messages in topics are pushed to subscribers where as in SQS, the consumers keep polling the queue to check the messages

![alt text](PNG/SNS1.PNG "Title") 

(**SNS usecase)** - Here when a credit card transaction is done, multiple subscribers are subscribed to the topic, each one performaing a separate business usecase
![alt text](PNG/SNS2.PNG "Title") 

Notice how we are using lambda for email services, if lambda fails, then the message is lost and email is not sent, not business critical  
For fraud and analytics service, we purposefully use SQS, becasue is any of the coneumer of SQS fails, SQS gurantees that message is consumed by some other consumer  
**(remember - SQS - qurantees message delivery atleast once)**

## Core concepts

1. Producers - publish a message to a topic
2. Subscribers - can listen to one / more topics
3. Topics - is a commincation channel to deliver a message to one / multiple subscribers
4. Messages - 

![alt text](PNG/SNS3.PNG "Title") 

#### Kafka vs SNS
1. Both are pub/sub model
2. Use Kafka for real time streaming options (can handle trillions of events / day )
3. Use SNS for basic pub/sub model, like credit card transactions (see below)

### SNS AWS
#### 1. Creating a topic
1. Specify name
2. Access policy - who can publish messages / subscribe to the messages to a given topic (Acct owner, other AWS accounts, Everyone)

#### 2. Create Subscription
1. Specify topic ARN
2. Specify protocol - who the subscriber is?
![alt text](PNG/SNS4.PNG "Title")   
3. Specify subscription filter policy **(Used to reduce AWS cost)**  
![alt text](PNG/SNS5.PNG "Title")   
Suppose we have 2 subscribers to a topic and   
 - sub1 needs to consume all messages
 - sub2 cares only the messages with specific arrtibutes (type: www), (assume sub2 is lambda)
 - sub3 cares for only (type:inperson)

In trival world, to filter messages so that sb2 recieves only type:www we can have if condition in the sub2, since sub2 is lambda it is invoed and checks  for type, if it is inperson, then return, and lambda stops. This is unnecessary lambda invocation, and lambda invoations costs money, bu Instead - 
When we set this Subscription filter that if a message which as attribute type:inperson will not be sent to sub2, and if sub2 is a lambda function, we are saving the lambda invocation cost for these types of messages

#### 3. SNS DLQ (Dead letter queue)
If one of the subscribers is down, then the message is kept in the topic until specified retries, after the retries limts are reached it is put into SNS DLQ, and this DLQ is an SNS queue ARN  
![alt text](PNG/SNS5.PNG "Title")   

## Nodejs code for sending messages to topics and subscribers

#### 1. Send message to a topic
```javascript
const AWS = require('aws-sdk');
AWS.config.update({
  accessKeyId: 'your-access-key-id',
  secretAccessKey: 'your-secret-access-key',
  region: 'your-region'  // e.g., 'us-east-1'
});
const sns = new AWS.SNS();
const params = {
  Message: 'This is the message to be published',
  TopicArn: 'arn:aws:sns:your-region:your-account-id:your-topic-name',
  MessageAttributes: {
    AttributeName1: {
      DataType: 'String',  // Data type of the attribute (e.g., String, Number, Binary)
      StringValue: 'inperson'  // The value of the attribute
    }
    // note this is where you specify message attributes
    // the Subscription filter option checks this values to determine if the messages needs to 
    // be sent to the sub2 (lambda function) or not, avoiding lambda invocation

  }
};
async function publishMessage() {
  try {
    const data = await sns.publish(params).promise(); // Using .promise() to convert to a Promise
    console.log("Message published successfully, MessageID:", data.MessageId);
  } catch (err) {
    console.error("Error publishing message to SNS:", err);
  }
}
publishMessage();
```

#### 2. Consume message from a topic in nodejs

**VVIP - We cannot directly consume topic messages in SNS, since SNS is designed to push messages to subscribers as opposed to in SQS, where consumers can keep polling the queue**  

So to consume a message form a topic  

1. Subscribe an SQS Queue to the SNS Topic - we have done this while selecting a protocol when creating a subscription
2. Use AWS SDK to poll messages from SQS which is subscribed to SNS topic