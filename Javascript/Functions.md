## Functions

A function in JavaScript is a value.  
Functions, in JavaScript, are essentially objects. Like objects they can be assigned to variables, passed to other functions and returned from functions.  
As functions are objs, thay have properties
| Property | Description | Example Use |
|-----------------------|---------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| `name` | Returns the name of the function. | `console.log(myFunction.name);` |
| `length` | Returns the number of parameters expected by the function. | `console.log(myFunction.length);` |
| `prototype` | Allows adding properties and methods to all instances of a function when used as a constructor. | `MyConstructor.prototype.newMethod = function() {...};` |
| `toString()` | Returns a string representation of the function. (gives the entire func code base in string).This can be used in debugging, or while creating documentation | `const functionString = myFunction.toString();` |
| `arguments` | An array-like object containing the arguments passed to the function. | `console.log(arguments[0]);` |

In addtion we also have call, apply and this, which is discussed below

4. **this** property -
   The this keyword in JavaScript refers to the object to which the current function belongs or is invoked

Before understanding this, we should know execution scope in JS

1. Global scope
2. Function scope
3. Block scope

--

1. In global scope this referes to window in browser and global in Node.js
2. In normal function in strict mode, this is undefined, in non-strict mode this refers to window
3. In method invocation, this refers to the obj, on which method is invoked
4. Arrow functions have no this, so this in arrow function's this refers to the lexical scopt of it's, for e.g. if arrow function is written inside global context - this refers to window, if arrow func is within a func, then this would be undefined in strict mode
5. We can explicitly set this using call, apply and bind
6. this inside event handlers in DOM refer to the HTML element

**this keyword example and explaination** -
Remember all the above rules

```javascript
console.log(this); // window (in browser)
function abc() {
  console.log(this); // undefined in strict mode, window otherwise
}
let obj = {
  a: 10,
  arrowFunc: () => {
    console.log(this); // window - because objects don't have lexical scoping like global or functional scope, hence this arrow function's lexical scope is global and as per pt. 4 arrow function's this refers to enclosing lexical scope
  },
  normalMethod: function () {
    console.log(this.a); // 10, if invoked as obj.normalMethod, if invoked with bind, apply, call is used then this refers different
  },
  normalMethod2: function () {
    let y = () => {
      console.log(this.a); // 10, lexical scope of this arrow func is outer func, so this refers to whatever value of this is there for myFunction2, and in this case myFInction2 is a method invocation, so this refers to the enclosing obj
    };
    y();
  },
};
abc(); // window or undefined depending on strict mode
obj.arrowFunc(); // // will print window obj
obj.normalMethod(); //// will print 10
obj.normalMethod2(); // will print 10
```

**TEST on this**

```javascript
"use strict";
const name = "Global";
function sayHello() {
  console.log("sayHello:", this.name);
}
const obj = {
  name: "Object",
  sayHello: sayHello,
  arrowHello: () => {
    console.log("arrowHello:", this.name);
  },
  nested: {
    name: "Nested",
    sayHello: function () {
      const inner = {
        name: "Inner",
        regularFunc: function () {
          console.log("regularFunc:", this.name);
        },
        arrowFunc: () => {
          console.log("arrowFunc:", this.name);
        },
      };

      inner.regularFunc();
      inner.arrowFunc();
    },
  },
  delayedHello: function () {
    setTimeout(function () {
      console.log("delayedHello (regular):", this.name);
    }, 0);

    setTimeout(() => {
      console.log("delayedHello (arrow):", this.name);
    }, 0);
  },
};

obj.sayHello();
obj.arrowHello();
obj.nested.sayHello();
obj.delayedHello();
// object - sayHello called as methiod invocation
// undefined // why not global - just because we do name="global" in global scope does not make it a property of window/global obj, we need to do window.name
// inner // regularFunc is called as methid invocation so this = inner obj
// nested // arrow func will use this of sayHello func, and sayHello func's this.name value is nested
// undefined // inside set timeout there is normal function and we are using strict mode, and normal function have this = undefined in strict mode
// object // settimeout uses arrow func, and arrow func is inside delayedHello function's lexical scope, so this = delayedHello.s this, and it is invoked as method invocation
```

##### losing this

```javascript
const obj = {
  data: "some data",
  method: function () {
    setTimeout(function () {
      // here we loose this since not this refers to global object
      console.log(this.data); // 'this' refers to the global object (or undefined in strict mode)
      // to avoid this scenario use array func ot store this in outer func like context = this or use bind, call, apply methods
    }, 1000);
  },
};

obj.method();
```

#### Call, Apply and Bind methods

```javascript
// 1. Call -
// The call() method is used to invoke a function with a specified this value and individual arguments.
// syntax
function.call(thisArg, arg1, arg2, ...);
// thisArg: The value to use as this when calling the function.`
function greet(message) {
    console.log(`${message}, ${this.name}!`);
}
const person = { name: 'John' };
greet.call(person, 'Hello');
// Output: Hello, John!

// 2. apply
//The apply() method is similar to call(), but it takes an array-like object as the second argument instead of individual arguments.
//syntax
function.apply(thisArg, [arg1, arg2, ...]);

function greet(message, punctuation) {
    console.log(`${message}, ${this.name}${punctuation}`);
}
const person = { name: 'Alice' };
greet.apply(person, ['Hi', '!']);
// Output: Hi, Alice!

// 3. bind
// The bind() method creates a new function that, when called, has its this value set to a specific value,
// and returns a new function with the same body as the original function.
// syntax
function.bind(thisArg, arg1, arg2, ...);

function greet(message) {
    console.log(`${message}, ${this.name}!`);
}
const person = { name: 'Bob' };
const greetBob = greet.bind(person);
greetBob('Hola');
// Output: Hola, Bob!

// call and apply vs bind
// call() and apply() are used to invoke the function immediately.
// bind() is used to create a new function with a specified this value, but it doesn't invoke the function immediately. The bound function needs to be called separately.
```

**The arrow => doesn’t create any binding as bind requires this, and arrow funcs have no this**  
**Can’t be called with new**  
**They also don’t have super**
**Arrow functions also don't have arguments property**

**Implement custom bind function** -

```javascript
let obj = {
  name: "ashish",
};
function a() {
  console.log(this.name);
}
let p = a.bind1(obj, 123);
// crux is we are doing a.bind(obj)
// but in js if we do obj.a() - then this will point to obj, which is what the bind function does
Function.prototype.bind1 = function (context, ...boundArgs) {
  // store this of a current func in variable
  let obj = this;
  return function () {
    // add temp property to the passed obj
    context.some_temp_prop = obj;
    // now call func in reverse format
    // instead of a.bind(obj), we do obj.a()
    return context.some_temp_prop(...boundArgs);
  };
};
a(); // undefined
p(); // ashish
```

### The "new Function" syntax

There’s one more way to create a function. It’s rarely used, but sometimes there’s no alternative.

```javascript
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

### Decorators

Decorator a special function that takes another function and alters its behavior.

```javascript
// slow is a function and cachingdecorator adds caching ability to slow function
let abc = (a) => {
  console.log("sloq compute ", a);
};

let decorator = (func) => {
  let map = new Map();
  return function () {
    // here we can;t return arrow function
    // because they do not have this and arguments object, need to return a normal function only
    let me = this;
    let args = arguments[0];
    console.log(args);
    if (map.has(args)) {
      console.log(" not calling slow compute");
      return map.get(args);
    }
    let res = func.call(me, args);
    map.set(args, res);
    return res;
  };
};

let pqr = decorator(abc);
pqr(1);
pqr(1);
pqr(2);

//The idea is that we can call cachingDecorator for any function, and it will return the caching wrapper
//all we need to do is to apply cachingDecorator to them.
// like slow2 = cachingDecorator(slow2)
```

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

---

## Currying

Currying is an advanced technique of working with functions.  
Currying is a transformation of functions that translates a function from callable as f(a, b, c) into callable as f(a)(b)(c).
Currying doesn’t call a function. It just transforms it.

```javascript
function curry(f) {
  // curry(f) does the currying transform
  return function (a) {
    return function (b) {
      return f(a, b);
    };
  };
}
// usage
function sum(a, b) {
  return a + b;
}
let curriedSum = curry(sum);
alert(curriedSum(1)(2)); // 3
// The result of curry(func) is a wrapper function(a).
// When it is called like curriedSum(1), the argument is saved in the Lexical Environment, and a new wrapper is returned function(b).
// Then this wrapper is called with 2 as an argument, and it passes the call to the original sum.

// _.curry from lodash library, return a wrapper that allows a function to be called both normally and partially:
function sum(a, b) {
  return a + b;
}
let curriedSum = _.curry(sum); // using _.curry from lodash library
alert(curriedSum(1, 2)); // 3, still callable normally
alert(curriedSum(1)(2)); // 3, called partially
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

**curry vs partial functions**
| Use Case | **Curry** | **Partial Function** |
|----------|-----------|----------------------|
| **Use Case** | Best when arguments are supplied one by one or reused in different contexts. | Best for fixing several arguments in advance for a more convenient function call later. |

Implement currying function for n arguments

```javascript
// currying for n args
let fun = (x) => {
  return (y) => {
    if (!y) {
      return x;
    }
    return fun(x + y);
  };
};
console.log(fun(1)(2)(3)(4)(5)(6)()); // 21
```
