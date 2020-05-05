## Javascript event loop. 
Javascript event loop elements are  
1. Javascript Runtime (heap and stack)
2. Web Apis (DOM APIs, AJAX (n/w requests), setTimeout)
3. Task/callback queue 
4. ES6 Job Queue 

ES6 has new element **4. ES6 Job Queue** in addition to the **callback queue**    
It's a way to execute the result of an **async function** as soon as possible, rather than being put at the end of the call stack.  
Promises that resolve before the current function ends will be executed right after the current function.  
```javascript
const bar = () => console.log('bar')

const baz = () => console.log('baz')

const foo = () => {
  console.log('foo')
  setTimeout(bar, 0)
  new Promise((resolve, reject) =>
    resolve('promise')
  ).then(resolve => console.log(resolve))
  baz()
}

foo()

//output in ES6         // output before ES6
// foo                   // foo
// baz                   // baz
// promise               // bar
// bar                   // promise
// because of job queue added in ES6
```

------------------------------------------------------------------------------
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
// second arg to readFile is a callback fn, and when readfile does it's thing, ti calls our callback with the args, which contains file data
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

------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------




TODO-
callback
promises
array methods
ES6
