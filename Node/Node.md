## Index

1. **Node, why node** - open-source, cross-platform, JS runtime environment, runs on chrome's V8 engine
2. **Read/write from stdio** - readline =require('readline').createInterface({input: process.stdin,op:p.stdout}), readline.on('line',line =>{});
3. **module require import/export**-module wrapped in func(exports,require,module,__filename,__dirname){return module.exports}, hence global!=global, use global.varnm (avoid it), require -commonJS, import-ES6 (similar to JS import), export-(in JS export const ab, in node exports.ab), module.exports = obj/fun, import vs Require(import - selectively load data & loading is async),
4. **Eventloop** -each phase has queue n heap,(1.Timers-(cb of setTimeout/interval) 2.Pending cb-system related cbs (port busy), 3.Idle, 4.Poll - nearly all cbs, except timers are stores here, 2 things happen-(cbs in this phase are executed, and evnt loop will wait for some time  here, if any cbs are ready for exec in next/timer phase, evnt loop moves to nest phase), 5.setimmediate - cbs of setimmediate, 6.closing cbs - (process.exit/socket.on('close')), 7.microtask-cbs of nextTick(), highest priotrity, when evnt loop complets crr. op., cbs of these phase are executed, and then evnt loop goes back to phase where it left off)
5. **process.nextTick()**-tick-when event loop iterates over all of phases for one time, use - assign event handlers after an obj. has been constructed but before any I/O has occurred, setImmediate vs settimeout-which runs frst? depends on curr. pos. of evnt loop
5. **Event emitters** - built-in module, establishes communication between objects in node, Emitter objects emit named events that cause listeners to be called, 5 steps (1. ee =  require('events'), 2. abc extends ee, 3. abc = new abc(), 4. abc.emit('hello', data), 5. abc.on('hello', (data => {}))), use - allow multiple external plugins to build functionality on top of the application's core
6. **Streams** - data not fitting in mem, fs.createReadStream instead of fs.readFile, req('stream'), 4-(new Readable({read(size)}), new Writable({write(chunk,cb)}), new Duplex(rd,write), new Transform({chunk,cb})), streams can be used with 1. EvntEmitter - (ondata/end/err/close), 2. pipe- a.pipe(b).pipe(c), a-instream, b-duplex, c- outstream, duplex e.g. -socket
7. **Scaling node js app** -multiple process only way, child process, req('child-process') (inbuilt, create-new chld-process(4)-(spawn(cmd)-run shell cmd, exec(cmd, (res)=>{})-new shell n stores o/p in buffer, execfile(filenm)- run shell file, fork(child.js), then .on/.send()/ in parent process.on/.send- communicate b/w process), **cluster module**- load balancer, req('cluster'/'os'), if cluster.ismaster - for cpu.length - cluster.fork(), else req(server.js)

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

## Nodejs import export

| Type of Export             | Export Example                           | Import Example                                | Export Description                                   | When to Use this Kind of Export               |
|----------------------------|------------------------------------------|-----------------------------------------------|------------------------------------------------------|-----------------------------------------------|
| Named Export (Function)    | `export function myFunction() { ... }`   | `import { myFunction } from './module';`     | Exports a named function.                            | When exporting specific functions.             |
| Named Export (Object)      | `export { variable1, variable2 };`      | `import { variable1, variable2 } from './module';` | Exports multiple variables, functions, or classes. | When exporting multiple entities.              |
| Default Export             | `export default variableName;`          | `import variableName from './module';`       | Exports a default variable, function, or class.      | When a module has a primary entity to export. |
| Default Export (Function)  | `export default function() { ... }`     | `import myFunction from './module';`         | Exports a default function.                          | When a module is primarily a function.         |

------------------------------------------------------------------------------

## Node.js event loop

There is a misconception in Node.js that there is only a single global queue where the callbacks are queued for execution which is not true.  
In JS there is only one queue (i.e, task/callback queue)  
Node.js event loop iterates through various phases (and each phase has a queue/heap)  

#### Phases (Event loop calls them in the following sequence)

##### 1. Timers

The callbacks of timers in JavaScript(setTimeout, setInterval) are kept in the heap memory until they are expired. If there are any expired timers in the heap, the event loop takes the callbacks associated with them and starts executing them in the ascending order of their delay until the timers queue is empty.  

##### 2. Pending callbacks

In this phase, the event loop executes system-related callbacks if any.  
E.g. The port on which you want to run the process is being used by some other process, some systems may want the callback to wait for execution due to some other tasks that the operating system is processing. Such process are put to pendening callback queue.

##### 3. Idle

In this phase, the event loop does nothing

##### 4. Poll

In this phase, the event loop watches out for new async I/O callbacks. Nearly all the callbacks except the setTimeout, setInterval, setImmediate and closing callbacks are executed.  
The event loop does two things in this phase:-  
1-> If there are callbacks in poll phase queue, those would be executed untill the queue is empty  
2-> If no callbacks, event loop will wait for some time to go to the next phase
How much time would event loop wait?  
Depends  
If there are any callbacks present in the setImmediate (next phase) queue to be executed, or there are any expired timers in the Timers queue (phase 1), event loop will not wait in this phase  

##### 5. Check/setImmediate

Generally, the callbacks of setImmediate are executed in this phase.

##### 6. Closing callbacks

In this phase, the event loop executes the callbacks associated with the closing events like **socket.on('close', fn) or process.exit()**.

##### 7. Microtask

The process.nextTick comes under microtasks which are prioritised above all other phases and thus the callback associated with it is executed just after the event loop finishes the current operation. Which means that, whatever callback we pass to process.nextTick, the event loop will complete its current operation and then execute callbacks from the microtasks queue until it is drained up. Once the queue is drained up, it returns back to the phase where it left its work from.

##### **If you were the Node interpreter and want to execute code do the following**

1. Scan the code and put each async/callback code in their respective phase's queue
2. Act like event loop and follow each phase in sequence and execute the callbacks (only the callbacks of async code whose callback are in ready state (for e.g. setTimeout(abc,0) if the timer is expired then execute, if not expired don't execute)) present in each phases's queue, untill the queue is empty or the callback is not yet ready.
3. You will get the output :). Cheers!!

#### What is process.nextTick()?

We say that a 'tick' has happened when the event loop iterates over all of its phases for one time (one iteration of the event loop).  

When we pass a function to process.nextTick(), we instruct the engine to invoke this function at the end of the current **PHASE and NOT at the end of all phases**.  

```javascript
// syntax
process.nextTick(() => {
  //do something
})

```

When to use process.nextTick()?  
This is important when developing APIs in order to give users the opportunity to assign event handlers after an object has been constructed but before any I/O has occurred  
**Need to unserstand**

#### What is process.setImmediate()?

Runs as soon as the Event loop completes one iteration (i.e, completes all the phases once)

```javascript
setImmediate(() => {
  //run something
})
```

##### setImmediate vs setTimeout(fn, 0)?

setImmediate has a higher priority than setTimeout, meaning its callback will be executed before the one scheduled by setTimeout **in the same cycle**.

------------------------------------------------------------------------------

## Working with Event Emitters

It is an in-built module that implements **observer pattern** in Nodejs.

**Why to use event-emitters**

1. Decoupling components - components can communicate without needing direct references to each other
2. Async communication
3. useful in scenarios where you want to notify multiple components about a specific state change or action

```javascript
// 5 steps
const EventEmitter = require('events'); // 1. import
const logger = new EventEmitter() // 2. init
logger.on('event', (data) => console.log({data})); // 4. register listeners
logger.emit('event', {data: 123}); // 3. emit events

//Note - you first need to register the listeners before emiting the event, otherwise the listeners won't be called


// handling event once - 
myEmitter.once('onceEvent', () => {
  console.log('This will only happen once!');
});
myEmitter.emit('onceEvent');
myEmitter.emit('onceEvent'); // This won't trigger the event again

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

types of streams 

| Stream Type     | Example Code                                | Description                                                      | Key Methods                             |
|------------------|---------------------------------------------|------------------------------------------------------------------|-----------------------------------------|
| Readable Streams | `fs.createReadStream('file.txt').pipe(writableStream);` | Represents a source of data that can be read.                   | `read()`, `on('data')`, `on('end')`, `on('error')` |
| Writable Streams | `readableStream.pipe(fs.createWriteStream('output.txt'));` | Represents a destination for data to be written.                | `write()`, `end()`, `on('finish')`, `on('error')` |
| Duplex Streams   | `const duplexStream = net.connect(3000, 'localhost');`   | Represents a stream that is both readable and writable.         | Combination of readable and writable stream methods |
| Transform Streams| `readableStream.pipe(transformStream).pipe(writableStream);` | A type of duplex stream for data modification as it is written and read. | `transform(chunk, encoding, callback)`, `flush(callback)` |

```javascript
//e.g. serving file from a server
const fs = require('fs')
const http = require('http').createServer();
server.on('request', (req, res) => {
  // fs.readFile('./big.file', (err, data) => {
  //   if (err) throw err;
  //     res.end(data);
  // })
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

Commented code is normal code, i.e, read file and send response, uncommented code is using streams.  

1. If the file is in GB and node does not have that much memory, commented code will throw memory error
2. Both fs and res can be converted into streams and thus, no matter how big the file is, data is sent in streams so chunk of data is stored in memory, so it never goes out of memory.

#### Types of Streams

1. Readable  
e.g. fs.createReadStream()
2. Writable  
e.g. fx.createWriteStream();
3. Duplex  
e.g. Socket(), both read and write can be done on these streams
4. Transform  
Duplex stream that can be used to transfrom/modify the data  
  
Streams can be used with 1. event emmitters, 2. methods like pipe.
All streams are instances of Event Emmitters, events are used to read/wrire data to a stream.  
mostly used -> src.pipe(dist), dist is the writable stream, src is a readable stream, or they can be duplex streams  
If we are using pipe method, ther is no need of event emmitters

Pipe multiple streams -> a.pipe(b).pipe(c).pipe(d), where b and c are duplex streams  
  
If using event emmitters, events are as follows  

1. for readable -> data, end, error, close
2. for writable -> drain  finish, error, close
  
if using pipe functions

1. for readable -> pipe(), unpipe(), read(), resume()
2. for writable -> write(), end()

```javascript
// using stream (built-in node module) to create streams
// create writable stream
const {Writable} = require('stream');
// create writable obj, usin new
const outStream = new Writable({
  // default method available
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
});
process.stdin.pipe(outStream);

// create readable stream
const {Readable} = require('stream');
const readStream = new Readable({
  // default method available
  read(size) {
    this.push(String.fromCharCode(this.currentCHarCode++));
    if(this.currentCHarCode > 90)
      this.push(null) //indicate the end of stream
    }
});
readStream.currentCHarCode = 65;
readStream.pipe(process.stdout);

//create Duplex stream
// it need to implemet both read and write functions
const {Duplex} = require('stream');
// create writable obj, usin new
const inoutStream = new Duplex({
  // default method available
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  }
  read(size) {
    this.push(String.fromCharCode(this.currentCHarCode++));
    if(this.currentCHarCode > 90)
      this.push(null) //indicate the end of stream
    }
});
inoutStream.currentCHarCode = 65;
process.stdin.pipe(inoutStream).pipe(process.stdout);


//create transform stream
// just transform method needs to be implemented
const {Transform} = require('stream');
// create writable obj, usin new
const transStream = new Transform({
  // default method available
  transform(chunk, encoding, callback) {
    this.push(chunk.toString().toUpperCase())
    callback();
  }
});
process.stdin.pipe(transStream).pipe(process.stdout);
```

------------------------------------------------------------------------------

## Scaling node.js apps

### Child process

to scale node app, using multiple processes is the only option
use the cores that are provided by operating system
os modules - os.cpu().lrnght gives is no. of cores in the operating system

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

e.g. let's say we have an endpoint and that endpoint does a complex computation whivh takes lot of time, in this case if another endpoint req, is made beofre the task is complete, it will go in queue, instead use fork, spawn new process and let that process execute long task, and in main will not be blocked and next request can be consumed
Note - you can only fork the no. of processes as much as cpu cores are present in the operating system

## cluster module - buil-in module - enable load balancing where os has more than cpu cores

#### using cluster module to load balance server

**standard code everytime**
CLuster module behind the scenes uses child_process module's fork api

```javascript
const cluster = require('cluster');
const os = require('os');
  if(cluster.isMaster) {
    // master cluster - when frst time this file is run it is master
  const cpus = os.cpus().length;
  for(let i=0; i<cpusl i++) {
    cluster.fork();
  } else {
    // worker cluster
    require('./server.js') 
    // server.js is the file where http/express server is started and endpoints are defined
    // no. of request this server can handle per second increases based on no. of cores
  }
}
// to handle restart and process crash
if(cluster.isMaster) {
    // master cluster - when frst time this file is run it is master
  const cpus = os.cpus().length;
  for(let i=0; i<cpusl i++) {
    cluster.fork();
  } 
  cluster.on('exit') // create another fork
  else {
```

**problem with cluster**

1. caching becomes difficult as each worker process has different memory
2. managing user authentication sessions - // use sticky load balancers to solve this
what it does if a uer is authenicated in a wroker process and that workers memory has session, then sticky load balancer will send the request to same worker is request comes from the same user

**module.exports vs exports**
