## Functions

A function in JavaScript is a value.  
Functions, in JavaScript, are essentially objects. Like objects they can be assigned to variables, passed to other functions and returned from functions.  
As functions are objs, thay have properties
| Property              | Description                                                                           | Example Use                                                                                           |
|-----------------------|---------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| `name`                | Returns the name of the function.                                                    | `console.log(myFunction.name);`                                                                     |
| `length`              | Returns the number of parameters expected by the function.                            | `console.log(myFunction.length);`                                                                   |
| `prototype`           | Allows adding properties and methods to all instances of a function when used as a constructor. | `MyConstructor.prototype.newMethod = function() {...};`                                             |
| `toString()`          | Returns a string representation of the function. (gives the entire func code base in string).This can be used in debugging, or while creating documentation                                      | `const functionString = myFunction.toString();`                                                    |
| `arguments`           | An array-like object containing the arguments passed to the function.                   | `console.log(arguments[0]);`                                                                        |

In addtion we also have call, apply and this, which is discussed below

4. **this** property  -
The this keyword in JavaScript refers to the object to which the current function belongs or is invoked  

when used inside a function this‘s value will change depending on
| Invocation Type        | Description                                                                           | Example                                           |
|------------------------|---------------------------------------------------------------------------------------|---------------------------------------------------|
| **Global Context**     | Outside of any function or object, `this` is empty.                | `console.log(this); // output {}`|
| **Function Context**   | In a regular function, `this` refers to the global object unless it's a method of an object. | `obj.method(); // this refers to the obj object`   |
| **Method Invocation**  | When a function is a method of an object and is invoked using dot notation, `this` refers to the object on which the method was called. | `obj.method(); // this refers to the obj object`   |
| **Constructor Invocation** | When a function is used as a constructor (invoked with `new`), `this` refers to the newly created instance of the object. | `const instance = new ConstructorFunction();`       |
| **Event Handler**      | In an event handler, such as a click event, `this` often refers to the element that triggered the event. | ```javascript document.getElementById('myButton').addEventListener('click', function() { console.log(this); // this refers to the button element }); ``` |
| **Arrow Functions**    | Arrow functions inherit `this` from the surrounding lexical scope. If there is no surrounding function for arrow func this is empty {}                     | ```javascript const obj = { arrowFunction: () => { console.log(this); // this refers to the outer context (lexical scope) } }; obj.arrowFunction(); ``` |
| **Explicit Binding**   | `this` can be explicitly set using methods like `call()`, `apply()`, or `bind()`.     | ```javascript const explicitObj = { name: 'Explicit Object' }; explicitFunction.call(explicitObj); // this refers to explicitObj ``` |

**this keyword example and explaination** - 
Remember all the above rules

```javascript

function video() {
  console.log(this) // here since this function is called as function invocation
  // this refers to the global object
    var title='abc' // any variables defined in this function using let, var, const, are not part 
    // any this
    // don;t define varibales like below (should always have let, car, const assigned)
     tags=[1,2,3]; // here there is not let, var, const hence
     // tags varibale is assgined to global this
    function showTag() {
      // here this again refers to global object
    this.tags.forEach(function (tag) { // in this anonymous function as well
    // this refers to global object because it is normal func invocation
     console.log(this.title,tag) // this.tile would be undefined, becuase title is not part of global this
     // tag would be printed    
    })

    let abc = () => {
      console.log(this.title) // undefined since this refers to global object, 
      // because arrow functions this refers to outer functions this, and in this case
      // outer functions (video) this refers to global object
    }
    abc()
    
}
showTag()
}

// below function is function invocation
// hence this will refer to global object
video()

let abc = () => {
      console.log('this = ', this.title) // output - this = {}
      // since array functions have no this and abc is a seprate function and not a nested function
      // if it was a nested function, this = surrounding function
      // if it was not a arrow function, this = global in node and this = window in browser
    }
```

##### losing this

```javascript
const obj = {
    data: 'some data',
    method: function() {
        setTimeout(function() {
          // here we loose this since not this refers to global object
            console.log(this.data); // 'this' refers to the global object (or undefined in strict mode)
            // to avoid this scenario use array func ot store this in outer func like context = this or use bind, call, apply methods
        }, 1000);
    }
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
    console.log('sloq compute ', a)
}

let decorator = (func) => {

    let map = new Map();
    return function() { // here we can;t return arrow function
    // because they do not have this and arguments object, need to return a normal function only
        let me = this;
        let args = arguments[0];
        console.log(args)
        if (map.has(args)) {
            console.log(' not calling slow compute')
            return map.get(args)
        }
        let res = func.call(me, args);
        map.set(args, res)
        return res
    }
}

let pqr = decorator(abc);
pqr(1)
pqr(1)
pqr(2)

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

Implement currying function for n arguments

```javascript
// currying for n args
let fun = (x) => {
    return (y) => {
        if(!y) {
            return x;
        }
        return fun(x+y)
    }
}
console.log(fun(1)(2)(3)(4)(5)(6)()) // 21
```
