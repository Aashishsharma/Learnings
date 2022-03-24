## Callbacks, promises and async-await
#### Callbacks
Functions are objects in JS  
A callback function is a function that is passed as an argument to another function, to be “called back” at a later time. A function that accepts other functions as arguments is called a higher-order function, which contains the logic for when the callback function gets executed.  
```javascript
// passing annonymous function
function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`);
  callback();
}

doHomework('math', function() {
  alert('Finished my homework');
});

// callback functions don’t always have to be defined in our function call

function doHomework(subject, callback) {
  alert(`Starting my ${subject} homework.`);
  callback();
}
function alertFinished(){
  alert('Finished my homework');
}
doHomework('math', alertFinished);
```

**Callbacks can be synchronous and asynchronous**  
Above code is synchronous callback, if we call a callback inside settimeout then it is an asynchronous callback

##### But then why callback?
In the above code, alertFinished() can be called at last line of function doHomework(), then why to pass a callback?  
1. In this case callback is not required, but framework or library doesn't know the name of the function you'll want called after code is finished executing so passing the function you want called later as an argument i.e, callback is the option  
Example of filter
```javascript
let oddNumbers = numbers.filter(number => number % 2);
```
filter is an inbuit function, and you pass an anonymous function as an argument to filter function (this is a callback). so filter does it's thing and when it is done, it will call the callback (anonymous function passed), so filter does not know the function name but can execute it.  
Also JS libraries pass arguments to the callback  
In filter case, it passes number as an argument in our anonymous callback function  
Another eample -> 
```javascript
fs.readFile('demo.txt', (err, data) => { 
    console.log(data); 
 })

// so now you know where the err and data params are coming from
// second arg to readFile is a callback fn, and when readfile does it's thing, it calls our callback with the args, which contains file data
// usually err is passed as the frst argument in the callback function
```
2. JS in asynchronous and thus, you can pass the callbacks to ensure those are executed once the async code is run

##### Problem with callbacks
Callback hell -> It consists of multiple nested callbacks which makes code hard to read and debug.  
```javascript
var form = document.querySelector('form')
form.onsubmit = function (submitEvent) {
  var name = document.querySelector('input').value
  request({
    uri: "http://example.com/upload",
    body: name,
    method: "POST"
  }, function (err, response, body) {
    var statusMessage = document.querySelector('.status')
    if (err) return statusMessage.value = err
    statusMessage.value = body
  })
}
```
Myth -> Promises are used to prevent callback hell, so use promises  
Truth -> You don't need promises or async-await to perevent callback hell  

Callback hell can be prevented as follows for above code
1. keep your code shallow  
provide names to unnecessary anonymous functions and separate them out
```javascript
document.querySelector('form').onsubmit = formSubmit

function formSubmit (submitEvent) {
  var name = document.querySelector('input').value
  request({
    uri: "http://example.com/upload",
    body: name,
    method: "POST"
  }, postResponse)
}

function postResponse (err, response, body) {
  var statusMessage = document.querySelector('.status')
  if (err) return statusMessage.value = err
  statusMessage.value = body
}
```  
2. Modularize your code
Move functions to different modules, then import and use them
```javascript
var formUploader = require('formuploader')
document.querySelector('form').onsubmit = formUploader.submit
```
Summary
1. Don't nest functions. 
2. Give them names and place them at the top level of your program
3. Use function hoisting to your advantage to move functions 'below the fold'

#### Promises
A promise is an object that may produce a single value some time in the future: either a resolved value, or a reason that it’s not resolved (e.g., a network error occurred). A promise may be in one of 3 possible states: fulfilled, rejected, or pending.

3 possible states:
1. Fulfilled: onFulfilled() will be called (e.g., resolve() was called)
2. Rejected: onRejected() will be called (e.g., reject() was called)
3. Pending: not yet fulfilled or rejected  
4. Settled: promise is either fulfilled or rejected

E.g.
```javascript
   function add_positivenos_async(n1, n2) {
      let p = new Promise(function (resolve, reject) {
         if (n1 >= 0 && n2 >= 0) {
            //do some complex time consuming work
            resolve(n1 + n2)
         }
         else
            reject('NOT_Postive_Number_Passed')
      })
      return p;
   }

   add_positivenos_async(10,20)
   .then(function(result){
      console.log("first result",result)
      return add_positivenos_async(result,result)
   }).then(function(result){
   console.log("second result",result)
      return add_positivenos_async(result,result)
   }).then(function(result){
      console.log("third result",result)
   })

   console.log('end')

//O/p
//end
//first result 30
//second result 60
//third result 120
```

###### Promise methods
1. Promise.all()
Syntax-> Promise.all(iterable);  
Wait for all promises to be resolved, or for any to be rejected.
E.g. 
```javascript
function add_positivenos_async(n1, n2) {
      let p = new Promise(function (resolve, reject) {
         if (n1 >= 0 && n2 >= 0) {
            //do some complex time consuming work
            resolve(n1 + n2)
         }
         else
            reject('NOT_Postive_Number_Passed')
      })

      return p;
   }
   //Promise.all(iterable)

Promise.all([add_positivenos_async(10,20),add_positivenos_async(30,40),add_positivenos_async(50,60)])
   .then(function(resolveValue){
      console.log(resolveValue[0])
      console.log(resolveValue[1])
      console.log(resolveValue[2])
      console.log('all add operations done')
   })
   .catch(function(err){
      console.log('Error',err)
   })
   console.log('end')
```
2. Promise.allSettled()
Syntax-> Promise.allSettled(iterable);  
Wait until all promises have settled (each may resolve or reject)  

Promise.all() vs Promise.allSettled()
1. Promise.all() rejects as soon as a promise within the iterable object rejected.
2. Promise.allSettled() resolves regardless of rejected promise(s) within the iterable object.  

3. Promise.race()
Syntax-> Promise.race(iterable);  
Wait until any of the promises is resolved or rejected.
If the returned promise resolves, it is resolved with the value of the first promise in the iterable that resolved.
If it rejects, it is rejected with the reason from the first promise that was rejected. 

4. Promise.any()
Syntax-> Promise.any(iterable);  

Promise.any() resolves with the first promise to fulfil, even if a promise rejects first. This is in contrast to Promise.race(), which resolves or rejects with the first promise to settle.  

When a .then() lacks the appropriate function, processing simply continues to the next link of the chain.  Therefore, a chain can safely omit every handleRejection until the final .catch(). Similarly, .catch() is really just a .then() without a slot for handleFulfilled.

**Promisification**  
It’s the conversion of a function that accepts a callback into a function that returns a promise.
How to - 
```javascript
const abc = (input, cb) => {
  console.log(input);
  fetch('abc.com').then((res) => {
    cb(input*2)
  })
  
}

abc(123, (double) => {
  console.log('123 outputted and doubled ', double)
})

// instead to this - convert abc to return promise

const abc = (input) => {
  return new Promise((resolve, reject) => {
    fetch('abc.com').then((res) => {
      cb(input*2)
    })
  })
}

await abc(123);

```
**How promification is useful**  
1. cb hell gone
2. above abc func can be passed as arg in Promise.all()


**Running promises concurrently**  
JS does not run promises in parallel, it runs them concurrently since it's a single threaded event loop architecture  
```javascript
// concurrently
await Promise.all(items.map(async item => { await fetchItem(item) }))
// sequentially
for (let i = 0; i < items.length; i++) {
    await fetchItem(items[i])
}
```

------------------------------------------------------------------------------
#### Async/Await
No differency if compared with promises  
##### Async
There’s a special syntax to work with promises in a more comfortable fashion, called “async/await”. It’s surprisingly easy to understand and use.  
The word “async” before a function means one simple thing: a function always returns a promise.  If returned value is not a promise object, then it is converted to promise and then returned

```javascript
async function f() {
  return 1;
}
f().then(alert); // 1
//We could explicitly return a promise, which would be the same
async function f() {
  return Promise.resolve(1);
}
f().then(alert); // 1
```

**So, async ensures that the function returns a promise, and wraps non-promises in it**  
in above e.g. we are returning 1 which is non-promise object, so async wraps promise around it.  

##### Await
The keyword await makes JavaScript wait until that promise settles and returns its result.

```javascript
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();
```

**Caution**
1. await won’t work in the top-level code
```javascript
// syntax error in top-level code
let response = await fetch('/article/promise-chaining/user.json');
let user = await response.json();

//FIX
(async () => {
  let response = await fetch('/article/promise-chaining/user.json');
  let user = await response.json();
  ...
})();
```

## Loop async calls
1. Normal async calls in a loop
```javascript
const arr = [1,2,3]

const asyncFunc = (input) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    console.log({input})
    resolve(input)
  }, 2000)
  })
  
}

// in this code the for each loop doesn't wait until the promise is resolved, next iteration starts //immediately
// arr.forEach(async(item) => {
//  console.log({item})
//  let abc = await asyncFunc(item);
// })

// o/p
{ item: 1 }
{ item: 2 }
{ item: 3 }
{ input: 1 }
{ input: 2 }
{ input: 3 }

// for loop is run one after the other, when one promise is resolved then go to the next iteration
(async () => {
for await (let item of arr) {
  console.log({item})
  let abc = await asyncFunc(item);
}
})();

// o/p
{ item: 1 }
{ input: 1 }
{ item: 2 }
{ input: 2 }
{ item: 3 }
{ input: 3 }


```
1. Parallely
```javascript
const fiveAsyncCalls = [1, 2, 3, 4, 5];

const abc = (input) => {
  return new Promise((resolve, reject) => {
    fetch('abc.com').then((res) => {
      cb(input*2)
    })
  });
}

let parallel = Promise.all(fiveAsyncCalls.map((item) => {
  abc(item)
}))
```
2. One after the other