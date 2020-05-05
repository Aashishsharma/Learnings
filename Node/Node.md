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

```
#### 1. Require
require are used to consume modules
```javascript
const fs = require('fs');
```
The require function will look for files in the following order:

1. Built-in core Node.js modules (like fs)
2. NPM Modules. It will look in the node_modules folder.
3. Local Modules. If the module name has a ./, / or ../, it will look for the directory/file in the given path. It matches the file extensions: .js, .json.

#### 2. Exports
The exports keyword gives you the chance to “export” your objects and methods
```javascript
const PI = 3.14159265359;

exports.area = radius => (radius ** 2) * PI;
exports.circumference = radius => 2 * radius * PI;
// PI is not available outside module

//using it in other module
const circle = require('./circle');

const r = 3;
console.log(`Circle with radius ${r} has
  area: ${circle.area(r)};
  circumference: ${circle.circumference(r)}`);

```
**exports vs module.exports**
module is a plain JavaScript object with an exports property. exports is a plain JavaScript variable that happens to be set to module.exports. At the end of your file, node.js will basically 'return' module.exports to the require function.

If you set a property on exports, like exports.a = 9;, that will set module.exports.a as well

If you assign anything to module.exports, exports is not no longer a reference to it, and exports loses all its power.

So module.exports always wins.

#### 3. Imports
This is yet experimental (ES6)
```javascript
import { area, circumference } from './circle.mjs';

//To use this circle.mjs should use ES6's export
// e.g. export area = function() {} //ES6 export
// and not exports.area = function() {} common js export
```

**Require vs Import**
In CommonJS - require & module.exports

In ES6 - import export

1. You can't selectively load only the pieces you need with require but with imports, you can selectively load only the pieces you need. That can save memory.

2. Loading is synchronous(step by step) for require on the other hand import can be asynchronous(without waiting for previous import) so it can perform a little better than require

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
setImmediate callbacks are called after I/O Queue callbacks are finished or timed out.  
setImmediate callbacks are placed in Check Queue, which are processed after I/O Queue.  

setTimeout(fn, 0) callbacks are placed in Timer Queue and will be called after I/O callbacks as well as Check Queue callbacks. As event loop, process the timer queue first in each iteration, so which one will be executed first depends on which phase event loop is.

------------------------------------------------------------------------------

------------------------------------------------------------------------------
