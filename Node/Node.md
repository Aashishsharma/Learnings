## Node.js

Node.js is an open-source and cross-platform JavaScript runtime environment.
Runs the V8 JavaScript engine, the core of Google Chrome, outside of the browser

process.env.variable_name - to read an env. variable in node.

## Why Node

1. All packages in node provide asynchronous APIs, so always asynchronous programming without threads
2. Uses npm
3. Node is fast
runs on V8 engine which has optimised compilers - (see JS notes)

------------------------------------------------------------------------------

#### Read/Write from stdin/stdout

```javascript
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})

readline.on(`line`, name => {
  console.log(`Hi ${name}!`)
  readline.close()
})

// to convert string to number - use + unary operator before the string
// e.g. if num1 and num2 are strings containing integers, to add them use 
// +num1 + num2
// use parseInt(num1, 10) base10
```

------------------------------------------------------------------------------

## Node.js modules: require, exports, imports

```javascript
(function (exports, require, module, __filename, __dirname) {
  module.exports = exports = {};
  // Your module code ...
  return module.exports;
});
//each Node.js module as a self-contained function like the following one
// this is hidden and present by default in each module
// so even if you define a global variable in a module, it is not
// accessible outside it, because it is still inside the hidden wrapper function
// then how to set a variable to global object
// use global.variableName
// global obj is similar to window obj.in browser
// this is now available in any node module (don't use global variables)

```

------------------------------------------------------------------------------

## Node.js event loop

### Libuv

Before understanding event loop, we need to understand what is libuv.  
Libuv is c code which is used to handle async non-blocking code.

#### **Libuv has 2 components** - 
#### 1. **Thread pool**
no of threads available in the host machines (based on CPU cores) are available in this thread pool.

**If you run async version of crypto, the hash time for last request would be hash time for its own + hash time of other 3 requests**   
![alt text](PNG/Capture.PNG "Title")    

**Running them in async will give hast time same for all the hashes, because each async version of hash is run on a separate thread pool**  
![alt text](PNG/Capture1.PNG "Title") 

**IMP - default thradpool size is 4, see below example**  
As soon as max call is 5 or > 5, the hash time increases, because all 4 thread in the pool are busy and the 5th async task goes into queue and executes when only one of the thread from the pool becomes free   

![alt text](PNG/Capture2.PNG "Title")   

**IMP - to increase thread pool size - process.env.UV_THREADPOOL_SIZE = 8**  
**But you can increase the thread pool size maximum upto no. of cpu cores your machine has**  

**Hence asyn operations are run on thread pool, but not all async operations are run on thread pool, see below** - 
![alt text](PNG/Capture3.PNG "Title")  
**The Network I/O async tasks are not run on thread pool, because it is not a CPU bound operation, network I/O task is delegated to kernel by nodejs**

#### 2. **Event loop**

![alt text](PNG/E1.PNG "Title")  

##### 1. Microtask queue (process.nextTick(), all usercreated promises)
##### 2. Timers queue (setTimeout, setInterval)
##### 3. I/O queue (fs, http)
##### 4. Check queue (setImmediate)
##### 5. Close queue (cbs associated with close events of asyns tasks, socket.on('close'))  

![alt text](PNG/E2.PNG "Title")  
![alt text](PNG/E3.PNG "Title")   

![alt text](PNG/E4.PNG "Title")   
![alt text](PNG/E5.PNG "Title")   
**VVIP - Callbacks in microtask queue are executed in between the execution of callbacks in the timer queue**   
**VVIP - Callbacks in microtask queue are executed in between the execution of callbacks in the check (setImmediate) queue** 


##### Unguranteed order of execution  

![alt text](PNG/E6.PNG "Title")   
**When running setTimeout with 0ms and async IO method, the order of execution can never be guranteed, because while the setTimeout is finished, the event loop might or might not have gone to IO callback queue, because main thread is empty and event queue is started**  
**In above example, we did not have any task running in main thread, if we add for loop for million times, then we know for sure, that cb of timeout is complete, and in this case, setimeout will always be ececuted before IO CB**

##### Usecases for process.nextTick and setImmediate

1. **process.nextTick**

```javascript
const EventEmitter = require('node:events');
type ClassData = {
    payload: string
}
class MyClass extends EventEmitter {
    data: ClassData
    constructor(data: ClassData) {
        super();
        this.data = data;
        // directly caaling this.emitEvent will not work, because liseners are not yet added
        // and event would be emitted before listeners are registered

        // this.emitEvent() - will not work
        // fix - first task to be executed after callstack is free
        // if can use setTimeout or setImmedaite as well, but those can get delayed since nextTick as highest priority
        process.nextTick(() => {
            this.emitEvent()
        })
    }
    emitEvent() {
        this.emit("initiate", this.data)
    }
}
const obj = new MyClass({payload: 'hello world'})
obj.on('initiate', (data) => {
    console.log('event intiated ', data)
})
```

Disadvantage of process.nextTick - everytime using process.nextTick will starve the event loop, so use wisely

### Scaling Nodejs app (Scale async tasks + sync tasks)
1. One way to scale is increase threads in the libuv pool, but this will scale only async tasks, because only async tasks can be executed in thread pool
2. What if we need to scale the tasks running on the main thread?
3. Use cluster module, **cluster module utilizes cpu cores and create multiple instances of nodeJS application based on CPU cores**
4. **Threadpool size to scale async tasks, cluster module to scale sync tasks**

![alt text](PNG/C1.PNG "Title")  -

**In above code**  
**Case 1 - call / api (retured in few ms) and then call /slow-page (returned after 5 seconds)**
**Case 2 - call call /slow-page (returned after 5 seconds) and then call / api (retured in 5 seconds + few ms) because slow-page is still executing and / endpint is queued up**

![alt text](PNG/C2.PNG "Title")  
Note - master node does not handle api calls, only worked nodes handle  


Note - you can only fork the no. of processes as much as cpu cores are present in the operating system

#### using cluster module to load balance server

**standard code everytime**
CLuster module behind the scenes uses child_process module's fork api

```javascript
const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;
if (cluster.isMaster) {
  // Fork workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  // Listen for dying workers and fork a new one
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new one...`);
    cluster.fork();
  });
} else {
  // Workers can share any TCP connection
  // In this case, it's an HTTP server
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('Hello, World!');
  }).listen(3000);

  console.log(`Worker ${process.pid} started`);
}
```

**problem with cluster**

1. caching becomes difficult as each worker process has different memory
2. managing user authentication sessions - // use sticky load balancers to solve this
what it does if a uer is authenicated in a wroker process and that workers memory has session, then sticky load balancer will send the request to same worker is request comes from the same user

### PM2
1. Process manager for Node and other envs like python  
2. Instead of using cluster module we can use pm2 to scale the nodejs app
3. ```npm i -g pm2```
4. ```pm2 start app.js -i 0``` - 0 indicates, we ask pm2 to pick up optimal worker processes

------------------------------------------------------------------------------

## Working with Event Emitters

It is an in-built module that implements **observer pattern** in Nodejs.

**Why to use event-emitters**

1. Decoupling components - components can communicate without needing direct references to each other
2. Async communication
3. useful in scenarios where you want to notify multiple components about a specific state change or action

```javascript
// 1. create event emitter class
// Import the EventEmitter class from Node.js
const EventEmitter  = require('events');
// Extend EventEmitter to create a custom event emitter class
export class OrderEventEmitter extends EventEmitter {
    // Additional custom methods or properties can be added here if needed
}

// 2. email servcice
import { OrderEventEmitter } from './OrderEventEmitter';
import { OrderPlaced } from './events';
export class EmailService {
    constructor(private eventEmitter: OrderEventEmitter) {
        // Register event handler
        this.eventEmitter.on(OrderPlaced, this.sendConfirmationEmail.bind(this));
    }
    sendConfirmationEmail(orderId: string, customerEmail: string): void {
        console.log(`Sending confirmation email to ${customerEmail} for order ${orderId}`);
    }
}
// 3. inventory service
import { OrderEventEmitter } from './OrderEventEmitter';
import { OrderPlaced } from './events';
export class InventoryService {
    constructor(private eventEmitter: OrderEventEmitter) {
        // Register event handler
        this.eventEmitter.on(OrderPlaced, this.updateInventory.bind(this));
    }
    updateInventory(orderId: string): void {
        console.log(`Updating inventory for order ${orderId}`);
    }
}
// 4. order service to emit the event
import { OrderEventEmitter } from './OrderEventEmitter';
import { OrderPlaced } from './events';
export class OrderService {
    private eventEmitter: OrderEventEmitter;
    constructor(eventEmitter: OrderEventEmitter) {
        this.eventEmitter = eventEmitter;
    }
    placeOrder(orderId: string, customerEmail: string): void {
        console.log(`Order ${orderId} placed`);
        // Emit the OrderPlaced event with relevant data
        this.eventEmitter.emit(OrderPlaced, orderId, customerEmail);
    }
}

// 5. app.js
import { OrderEventEmitter } from './OrderEventEmitter';
import { OrderService } from './OrderService';
import { EmailService } from './EmailService';
import { InventoryService } from './InventoryService';
// Instantiate the custom event emitter
const eventEmitter = new OrderEventEmitter();
// Instantiate services with the event emitter
new EmailService(eventEmitter);
new InventoryService(eventEmitter);
const orderService = new OrderService(eventEmitter);
// Place an order and trigger events
orderService.placeOrder('12345', 'customer@example.com');

```

**event emitter functions**

| Method                        | Description                                                                                     |
| ----------------------------- | ----------------------------------------------------------------------------------------------- |
| `on(eventName, listener)`     | Adds a listener function to the specified event.                                               |
| `addListener(eventName, listener)` | Alias for `on`.                                                                           |
| `once(eventName, listener)`   | Adds a one-time listener function for the specified event. The listener is removed after it's called once. |
| `emit(eventName, [arg1], [arg2], [...])` | Emits the specified event, triggering all attached listeners. Additional arguments can be passed to the listeners. |
| `removeListener(eventName, listener)` | Removes a specific listener for the specified event.                                       |
| `removeAllListeners([eventName])` | Removes all listeners for the specified event. If no event is provided, it removes all listeners for all events. |
| `setMaxListeners(n)`          | Sets the maximum number of listeners that can be added to an event. Default is unlimited.      |
| `listeners(eventName)`        | Returns an array of listeners for the specified event.                                        |
| `eventNames()`                | Returns an array of event names to which listeners are attached.                               |
| `listenerCount(eventName)`    | Returns the number of listeners for the specified event.                                       |


1. similar to callbacks, but they trigger multiple listeners at once. 

------------------------------------------------------------------------------

## Working with streams

It is a collection of data that might not br available all at once and don't have to fit in memory.  

![alt text](PNG/C2.PNG "Title")  
**IMP potins**  
1. Using above code we can copy 10s of GBs of file without node getting memory out of bound error
2. Notice the output, this is because of highWaterMark = 2, it indicates that the buffer can store only 2 bytes of data in memory and then need to flush the output to writable stream, default buffer size in nodejs is 64Kb

types of streams 

| Stream Type     | Example Code                                | Description                                                      | Key Methods                             |
|------------------|---------------------------------------------|------------------------------------------------------------------|-----------------------------------------|
| Readable Streams | `fs.createReadStream('file.txt').pipe(writableStream);` | Represents a source of data that can be read.                   | `read()`, `on('data')`, `on('end')`, `on('error')` |
| Writable Streams | `readableStream.pipe(fs.createWriteStream('output.txt'));` | Represents a destination for data to be written.                | `write()`, `end()`, `on('finish')`, `on('error')` |
| Duplex Streams (e.g. - socket)   | `const duplexStream = net.connect(3000, 'localhost');`   | Represents a stream that is both readable and writable.         | Combination of readable and writable stream methods |
| Transform Streams (e.g. - file compression)| `readableStream.pipe(transformStream).pipe(writableStream);` | A type of duplex stream for data modification as it is written and read. | `transform(chunk, encoding, callback)`, `flush(callback)` |

```javascript
//e.g. serving file from a server
const fs = require('fs')
const http = require('http').createServer();
server.on('request', (req, res) => {
  // fs.readFile('./big.file', (err, data) => {
  //   if (err) throw err;
  //     res.end(data);
  // })

  // commented code is normal code and
  // 1. If the file is in GB and node does not have that much memory, commented code will throw memory error
   // 2. Both fs and res can be converted into streams and thus, 
   // no matter how big the file is, data is sent in streams so chunk of data is stored in memory,
   // so it never goes out of memory.


  const src = fs.createReadStream('./big.file');
  
  // you can send the data to response stream as below
  src.pipe(res);

  // or read the data
  src.on('data', (chunk) => {
  console.log(`Received chunk: ${chunk}`);
})
src.on('end', () => {
  console.log('No more data to read.');
});
});
server.listen(8000);
```

**Creating your own stream**

```javascript
// in above examples, the fs.createReadStream gives us the readble stream
// to create our own streams

// 1. Readable Stream
const { Readable } = require('stream');
class MyReadableStream extends Readable {
  constructor(options) {
    super(options);
  }
  // The read method gets executed each time the consumer is ready to consume more data
  // untill this.push(null) is called
  _read(size) {
    // in the read method we need to push the data
    // which would then be available in the on('data) event 
    // Push each piece of data into the stream
    this.push(data);
    // this data can be anything, maybe a chunk from file or external datasource
    
    // at the end we need to push null, to notify that the stream has ended
    this.push(null);
    // if we don't push null, the read function would keep on running continuously since
    //read function is called by the stream implementation when the consumer is ready to receive more data
  }
}
// above data puched in this.push(data) would be available here
const myStream = new MyReadableStream();
myStream.on('data', (chunk) => {
  console.log(`Received chunk: ${chunk}`);
});


// 2. Writable stream
const { Writable } = require('stream');
class MyWritableStream extends Writable {
  constructor(options) {
    super(options);
  }
  // The write method gets executed each time data is written to the transform stream
  _write(chunk, encoding, callback) {
    // Simulate writing data to some destination
    console.log(`Writing data: ${chunk.toString()}`); 
    // Call the callback to indicate that the write operation is complete
    callback();
  }
}
const myWritableStream = new MyWritableStream();
myWritableStream.write('Hello, ');
myWritableStream.write('world!');
myWritableStream.end(); // Indicate the end of the writable stream


// 3. Transform Stream
const { Transform } = require('stream');
class MyTransformStream extends Transform {
  constructor(options) {
    super(options);
  }
  // The _transform method gets executed each time data is written to the transform stream
  _transform(chunk, encoding, callback) {
    // Transform the data (convert to uppercase in this example)
    const transformedData = chunk.toString().toUpperCase(); 
    // Push the transformed data to the writable destination
    this.push(transformedData);
    // this data is available in the on('data') cb handler
    // Call the callback to indicate that the transformation is complete
    callback();
  }
}

myTransformStream.on('data', (transformedData) => {
  console.log(`Transformed data: ${transformedData}`);
});
```

#### Stream video file from server to the client

1. Server code 

```javascript
const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.get('/video', (req, res) => {
  // Specify the path to the video file
  const videoPath = path.join(__dirname, 'path_to_your_video.mp4');
  
  // Retrieve file stats, including size
  const stat = fs.statSync(videoPath);
  const fileSize = stat.size;
  
  // Retrieve the 'Range' header from the request
  const range = req.headers.range;
  // this range header is sent automatically from the client
  // if the html tag used is <video> in the client side
  // the value of range variable looks like this
  // bytes=102400-204799
  // bytes=startposition-endposition

  if (range) {
    // Parse the 'Range' header to get the start and end byte positions
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    // Calculate the size of the data chunk to be sent
    const chunkSize = end - start + 1;
    // Create a readable stream for the specified range of the video file
    const file = fs.createReadStream(videoPath, { start, end });
    // Set response headers for a partial content response
    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };
    // Respond with a 206 (Partial Content) status code and send the data chunk
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    // If no 'Range' header is present, send the entire video file
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };
    // Respond with a 200 (OK) status code and send the entire file
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
});
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```

2. Client code

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Video Streaming Example</title>
</head>
<body>
  <video width="640" height="360" controls>
    <source src="http://localhost:3000/video" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</body>
</html>

```

------------------------------------------------------------------------------

## Scaling node.js apps

### Child process

to scale node app, using multiple processes is the only option
use the cores that are provided by operating system
os modules - os.cpu().length gives is no. of cores in the operating system

child process module - inbuild module in node - this module enables us to use os functionality by running system command inside child process  
4 ways to create a child process

1. spwan() - creates new process - can run shell commands
2. exec() - same as spawn but opens new shell and o/p is stored in buffer
3. execfile() - same as exec but runs a shell file instead of opening shell and executing command
4. fork() - similar to spawn, it creates new process, and establishes the communication (using event emitters) between

```javascript
// e.g. using spaen
const {spawn} = require('child_process');
// in spawn we pass shell.cmd commands
const child = spawn('dir');
// for windows use
const child = spawn('dir', {shell: true})
// optional array of arguments is passed as
// second parameter if the command has arguments
// here child is an instance of event emmitters
// so we can emit events on child obj above
child.on('exit', (code, signal) => {
  console.log('CHild process exited with code', code)
});
child.stdout.on('data', (data) => {
  console.log(data);
})
// other events available - disconnect, error, message, close
// stdio objects avaialble - child.stdin, child.stdout
// close event occurs when the stdio on child is closed
// exit when the child process done the execution

//e.g. 2 using exec
// frst arg in exec is the exact command we pass in shell
const {exec} = require('child_process');
exec('npm --version', (err, stdout, stderr) => {
  if(err)return error;
  console.log('output ', stdout);
  // output is stored in stdout variable
});

//use spawn when o/p of command is big, as we can use streams
//use ecec if o/p is small, as data is stored in buffer

//e.g. 3 fork
// parent.js
const {fork} = require('child_process');
const forked = fork('child.js');
forked.on('message', (msg) => {
  console.log('Message from child', msg);
});
forked.send({hello: 'world'});

// child.js
process.on('message', (msg) => {
  console.log('Message from parent', msg)l
})
let counter = 0;
setInterval(() => {
  process.send({counter: counter++});
},1000);
// on child - 
// process.send(msg)
// process.on('message', function(msg) {})
```
