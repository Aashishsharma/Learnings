# Distributed Messaging queue

1. A messaging queue is an intermediate component between the interacting entities known as producers and consumers. The producer produces messages and places them in the queue, while the consumer retrieves the messages from the queue and processes them.
2. Messages are sent from one component of a system (node) to another (node).
3. Used in distributed systems, microservices architectures, and various other scenarios where different parts of a system need to communicate with each other in a loosely coupled manner

## Distributed MQ functionality

1. Create Queue
2. Send message
3. Recieve message
4. Delete message
5. Queue deletion

## Rabbit MQ on local

1. Install Rabbit MQ server on local (in distribted systems, it would be installed on on of the nodes).
2. sender.js
```javascript
const amqp = require('amqplib');
async function send() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queueName = 'hello';
  const message = 'Hello, RabbitMQ!';

  await channel.assertQueue(queueName); // ensures that the queue named queueName exists on the RabbitMQ server. If the queue does not exist, RabbitMQ will create it. 
  channel.sendToQueue(queueName, Buffer.from(message));
  console.log(`[x] Sent '${message}'`);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
}
send().catch(console.error);
```
3. reciever.js
```javascript
const amqp = require('amqplib');
async function receive() {
  const connection = await amqp.connect('amqp://localhost');
  const channel = await connection.createChannel();
  const queueName = 'hello';
  await channel.assertQueue(queueName);
  console.log(`[*] Waiting for messages in ${queueName}. To exit press CTRL+C`);
  channel.consume(queueName, (msg) => {
    if (msg !== null) {
      console.log(`[x] Received '${msg.content.toString()}'`);
      channel.ack(msg);
    }
  });
}
receive().catch(console.error);
```