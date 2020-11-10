## Index
1. Functions (their properties)
2. This in functions (loosing this anf func.bind())
3. Function as a value (callback)
4. Named function expression
5. New function syntax
6. Constructor functions
7. Decorators
8. func.call, func.apply and partial func
9. Arrow functions
10. Currying
11. Generators

## Functions
A function in JavaScript is a value.  
Every value in JavaScript has a type. What type is a function?
In JavaScript, functions are objects.  
Functions, in JavaScript, are essentially objects. Like objects they can be assigned to variables, passed to other functions and returned from functions.  
As functions are objs, thay have properties
1. **name** property
```javascript
function sayHi() {
  alert("Hi");
}
alert(sayHi.name); // sayHi
```
2. **lenght** property
```javascript
function f1(a) {}
function f2(a, b) {}
function many(a, b, ...more) {}
alert(f1.length); // 1
alert(f2.length); // 2
alert(many.length); // 2
// Here we can see that rest parameters are not counted.

//polymorphism achieved via length property
function ask(question, ...handlers) {
  let isYes = confirm(question);
  for(let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }
}
// for positive answer, both handlers are called
// for negative answer, only the second one
ask("Question?", () => alert('You said yes'), result => alert(result));
```
3. custom properties
```javascript
//similar to static class members in java
function sayHi() {
  alert("Hi");
  // let's count how many times we run
  sayHi.counter++;
}
sayHi.counter = 0; // initial value
sayHi(); // Hi
sayHi(); // Hi
alert( `Called ${sayHi.counter} times` ); // Called 2 times

//Function properties can replace closures sometimes
```
4. **this** property
when used inside a function this‘s value will change depending on 
1. how that function is defined (arrow, no arrow or constructor function)  
arrow has no this, constructor functions this works as normal java this, for no arrow, depends on how ot is invoked
2. how it is invoked and
    1. Function invocation
    ```javascript
     function doSomething(a, b) { 
       // adds a propone property to the Window object 
        this.propone = "test value";  
    }  
    // function invocation 
    doSomething();  
    document.write(window.propone); // test value
    // this will refer to global obj, in strict mode o/p would be undefined
    ```
    2. Method invocation
    In this case this refers to the obj. using which it is called like obj.func(), this will refer to obj.
3. the default execution context.
first will search in function context, then in global context

##### losing this
```javascript
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};
setTimeout(user.sayHi, 1000); // Hello, undefined!

//above code becomes
let f = user.sayHi;
setTimeout(f, 1000); // lost user context becuase func f is called as func invocation instead of method invocation and saHI() does not have firstName property, so will check for global obj, here also not found, then undefined
```
to not loose context of this, we use bind
```javascript
//syntax
let boundFunc = func.bind(context);

//Here func.bind(user) as a “bound variant” of func, with fixed this=use
let user = {
  firstName: "John"
};
function func(phrase) {
  alert(phrase + ', ' + this.firstName);
}
// bind this to user
let funcUser = func.bind(user);
funcUser("Hello"); // Hello, John (argument "Hello" is passed, and this=user)

//with method invocation
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};
let sayHi = user.sayHi.bind(user); // (*)
// can run it without an object
sayHi(); // Hello, John!
setTimeout(sayHi, 1000); // Hello, John!

//bindAll
 bindAll(object, methodNames)
 // binds all methodnames to same object
```
#### Function as a value
Function in js is also treated as an object, thus you see below in js
```javascript
function ask(question, yes, no) {
  if (confirm(question)) yes()
  else no();
}

function showOk() {
  alert( "You agreed." );
}

function showCancel() {
  alert( "You canceled the execution." );
}

// Call 1 -> usage: functions showOk, showCancel are passed as arguments to ask
ask("Do you agree?", showOk, showCancel);

// Call 2 -> anonymous functions
ask(
  "Do you agree?",
  function() { alert("You agreed."); },
  function() { alert("You canceled the execution."); }
);
```
### Function declaration is hoised and not function expression
```javascript
// function declaration
abc(); // ouptput abc
function abc() {
  console.log('abc');
}

// function expression
abc(); // error
var abc = function(defaultValue = 0) { //FYI -> adding default parameter in a function
  console.log('abc');
}
```
use function declarations when you want to create a function on the global scope and make it available throughout your code. Use function expressions to limit where the function is available, keep your global scope light, and maintain clean syntax.

### Named function expression
```javascript
let sayHi = function(who) {
  alert(`Hello, ${who}`);
};

let sayHi = function func(who) {
  alert(`Hello, ${who}`);
};
// What’s the purpose of that additional "func" name?
```
1. It allows the function to reference itself internally.
2. It is not visible outside of the function.
```javascript
let sayHi = function func(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    func("Guest"); // use func to re-call itself
  }
};
sayHi(); // Hello, Guest
// But this won't work:
func(); // Error, func is not defined (not visible outside of the function)

//Why do we use func? Maybe just use sayHi for the nested call?
// in this case it won't work
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    sayHi("Guest"); // Error: sayHi is not a function
  }
};
let welcome = sayHi;
sayHi = null;
welcome(); // Error, the nested sayHi call doesn't work any more!
```

### The "new Function" syntax
There’s one more way to create a function. It’s rarely used, but sometimes there’s no alternative.
```javascript
// syntax
let func = new Function ([arg1, arg2, ...argN], functionBody);

//e.g.
let sum = new Function('a', 'b', 'return a + b');
alert( sum(1, 2) ); // 3

//e.g. 2 with no args
let sayHi = new Function('alert("Hello")');
sayHi(); // Hello
//The major difference from other ways we’ve seen is that the function is created literally from a string, that is passed at run time.
//new Function allows to turn any string into a function.

//use case
//It is used in very specific cases, like when we receive code from a server, or to dynamically compile a function from a template
let str = ... receive the code from a server dynamically ...
let func = new Function(str);
func();

//limitations
// lexical scoping not applicable
// can only access global variables
function getFunc() {
  let value = "test";
  let func = new Function('alert(value)');
  return func;
}
getFunc()(); // error: value is not defined
```
#### constructor functions
1. Constructor functions or, briefly, constructors, are regular functions, but there’s a common agreement to name them with capital letter first.
2. Constructor functions should only be called using new. Such a call implies a creation of empty this at the start and returning the populated one at the end.
```javascript
function User(name) {
  // this = {};  (implicitly)

  // add properties to this
  this.name = name;
  this.isAdmin = false;

  // return this;  (implicitly)
}
let user = new User("Jack")

// Inside a function, we can check whether it was called with new or without it, using a special new.target property.
function User() {
  alert(new.target);
}
// without "new":
User(); // undefined
// with "new":
new User(); // function User { ... }

// we can omit parentheses after new, if it has no arguments:
let user = new User; // <-- no parentheses
// same as
let user = new User();
```

### Decorators
Decorator a special function that takes another function and alters its behavior.
```javascript
// slow is a function and cachingdecorator adds caching ability to slow function
function slow(x) {
  // there can be a heavy CPU-intensive job here
  alert(`Called with ${x}`);
  return x;
}
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {    // if there's such key in cache
      return cache.get(x); // read the result from it
    }
    let result = func(x);  // otherwise call func
    cache.set(x, result);  // and cache (remember) the result
    return result;
  };
}
slow = cachingDecorator(slow);
alert( slow(1) ); // slow(1) is cached
alert( "Again: " + slow(1) ); // the same
alert( slow(2) ); // slow(2) is cached
alert( "Again: " + slow(2) ); // the same as the previous line

//The idea is that we can call cachingDecorator for any function, and it will return the caching wrapper
//all we need to do is to apply cachingDecorator to them.
// like slow2 = cachingDecorator(slow2)
```

#### func.call
Decorators don't work well with obj methods  
we use func.call(context, …args) that allows to call a function explicitly setting this.
```javascript
//syntax
func.call(context, arg1, arg2, ...)
// these two calls do almost the same:
func(1, 2, 3);
func.call(obj, 1, 2, 3)

//e.g.
function sayHi() {
  alert(this.name);
}
let user = { name: "John" };
let admin = { name: "Admin" };
// use call to pass different objects as "this"
sayHi.call( user ); // John
sayHi.call( admin ); // Admin
```

#### func.apply
same as func.call, The only syntax difference between call and apply is that call expects a list of arguments, while apply takes an array-like object with them.
```javascript
func.call(context, ...args); // pass an array as list with spread syntax
func.apply(context, args);   // is same as using call
```

**bind vs call/apply**  
Use .bind() when you want that function to later be called with a certain context, useful in events. Use .call() or .apply() when you want to invoke the function immediately, and modify the context.

#### partial function
partial function – we create a new function by fixing some parameters of the existing one  
extension of bind  
We can bind not only this, but also arguments
```javascript
let bound = func.bind(context, [arg1], [arg2], ...);

//e.g.
function mul(a, b) {
  return a * b;
}
let double = mul.bind(null, 2);
alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
// The call to mul.bind(null, 2) creates a new function double that passes calls to mul, fixing null as the context and 2 as the first argument. Further arguments are passed “as is”
```
When to use?  
partial application is useful when we have a very generic function and want a less universal variant of it for convenience.
For instance, we have a function send(from, to, text). Then, inside a user object we may want to use a partial variant of it: sendTo(to, text) that sends from the current user

### Arrow functions
```javascript
// variation 1
let sum = (a, b) => a + b;
alert(sum(1, 2)); // 3

// variation2 -> only 1 arg do not require curly braces, when 0 args it is required
let double = n => n * 2;
alert(double(3)); // 6

// variation 3 -> above 2 had 1 liner function body so no curly braces and also do not required return statement, the expression is returned
let sum = (a, b) => {  // the curly brace opens a multiline function
  let result = a + b;
  return result; // if we use curly braces, then we need an explicit "return"
};

alert( sum(1, 2) ); // 3
```
**Arrow functions have no “this”**
```javascript
let group = {
  title: "Our Group",
  students: ["John", "Pete", "Alice"],
  showList() {
    this.students.forEach(
      student => alert(this.title + ': ' + student)
    );
  }
};
group.showList();
//if we used normal func we would get Error: Cannot read property 'title' of undefined
// because forEach is taking anonymous func, and it is invoked as func invocation instead of method invocation, so this points to global context, for more info see "this" section above
```
**The arrow => doesn’t create any binding as bind requires this, and arrow funcs have no this**  
**Can’t be called with new**  
**They also don’t have super**

------------------------------------------------------------------------------
## Currying
Currying is an advanced technique of working with functions.  
Currying is a transformation of functions that translates a function from callable as f(a, b, c) into callable as f(a)(b)(c).
Currying doesn’t call a function. It just transforms it.
```javascript
function curry(f) { // curry(f) does the currying transform
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}
// usage
function sum(a, b) {
  return a + b;
}
let curriedSum = curry(sum);
alert( curriedSum(1)(2) ); // 3
// The result of curry(func) is a wrapper function(a).
// When it is called like curriedSum(1), the argument is saved in the Lexical Environment, and a new wrapper is returned function(b).
// Then this wrapper is called with 2 as an argument, and it passes the call to the original sum.

// _.curry from lodash library, return a wrapper that allows a function to be called both normally and partially:
function sum(a, b) {
  return a + b;
}
let curriedSum = _.curry(sum); // using _.curry from lodash library
alert( curriedSum(1, 2) ); // 3, still callable normally
alert( curriedSum(1)(2) ); // 3, called partially
```

When can it be used?
```javascript
// For instance, we have the logging function log(date, importance, message) that formats and outputs the information.
function log(date, importance, message) {
  alert(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
// Let’s curry it!
log = _.curry(log);
// After that log works normally:
log(new Date(), "DEBUG", "some debug"); // log(a, b, c)
// But also works in the curried form:
log(new Date())("DEBUG")("some debug"); // log(a)(b)(c)
// Now we can easily make a convenience function for current logs:
// logNow will be the partial of log with fixed first argument
let logNow = log(new Date());
// use it
logNow("INFO", "message"); // [HH:mm] INFO message
/// can be used in another way
let debugNow = logNow("DEBUG");
debugNow("message"); // [HH:mm] DEBUG message
```
curry is not same as default parameters in a function, as default value can have only one value.  
close to partial functions but not exactly same

------------------------------------------------------------------------------
## Generators
Regular functions return only one, single value (or nothing).
Generators can return (“yield”) multiple values, one after another, on-demand. 

They can be used with iterables, allowing to create data streams with ease.
To create a generator, we need a special syntax construct: function*, so-called “generator function”.
```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
// "generator function" creates "generator object"
let generator = generateSequence();
alert(generator); // [object Generator]
```
Generator functions behave differently from regular ones. When such function is called, it doesn’t run its code. Instead it returns a special object, called "generator object"
The main method of a generator is next().
The result of next() is always an object with two properties:
1. value: the yielded value.
2. done: true if the function code has finished, otherwise false.
```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  return 3;
}
let generator = generateSequence();
let one = generator.next();
alert(JSON.stringify(one)); // {value: 1, done: false}
// when the execution reaches the return statement then done: true
```

#### Generators are iterable
```javascript
function* generateSequence() {
  yield 1;
  yield 2;
  return 3; // to alert 3 as well, we would need to ues yield instead of return, in case of for..of loop
}
let generator = generateSequence();
for(let value of generator) {
  alert(value); // 1, then 2
}
// the example above shows 1, then 2, and that’s all. It doesn’t show 3
```

#### Using generators for iterables
```javascript
let range = {
  from: 1,
  to: 5,
  *[Symbol.iterator]() { // a shorthand for [Symbol.iterator]: function*()
    for(let value = this.from; value <= this.to; value++) {
      yield value;
    }
  }
};
alert( [...range] ); // 1,2,3,4,5
```
yield is a two-way street: it not only returns the result to the outside, but also can pass the value inside the generator.
```javascript
function* gen() {
  let ask1 = yield "2 + 2 = ?";
  alert(ask1); // 4
  let ask2 = yield "3 * 3 = ?"
  alert(ask2); // 9
}
let generator = gen();
alert( generator.next().value ); // "2 + 2 = ?"
alert( generator.next(4).value ); // "3 * 3 = ?"
alert( generator.next(9).done ); // true
```
explaination
1. The first .next() starts the execution… It reaches the first yield.
2. The result is returned to the outer code.
3. The second .next(4) passes 4 back to the generator as the result of the first yield, and resumes the execution.
4. It reaches the second yield, that becomes the result of the generator call.
5. The third next(9) passes 9 into the generator as the result of the second yield and resumes the execution that reaches the end of the function, so done: true.

generator.throw
```javascript
function* gen() {
  try {
    let result = yield "2 + 2 = ?"; // (1)
    alert("The execution does not reach here, because the exception is thrown above");
  } catch(e) {
    alert(e); // shows the error
  }
}
let generator = gen();
let question = generator.next().value;
generator.throw(new Error("The answer is not found in my database")); // (2)
```

### Real-life example: paginated data for async generators
There are many online services that deliver paginated data. For instance, when we need a list of users, a request returns a pre-defined count (e.g. 100 users) – “one page”, and provides a URL to the next page. This pattern is very common.
```javascript
// implement async generator
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;
  while (url) {
    const response = await fetch(url, { // (1)
      headers: {'User-Agent': 'Our script'}, // github needs any user-agent header
    });
    const body = await response.json(); // (2) response is JSON (array of commits)
    // (3) the URL of the next page is in the headers, extract it
    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];
    url = nextPage;
    for(let commit of body) { // (4) yield commits one by one, until the page ends
      yield commit;
    }
  }
}
//call the generator
for await (let commit of fetchCommits("username/repository")) {
  // process commit
}
//while url is not null, generator will keep on generating commits
// do next for of iteration will get next paginated commits
```
In web-development we often meet streams of data, when it flows chunk-by-chunk. For instance, downloading or uploading a big file.
We can use async generators to process such data


To-do
ploymorphism