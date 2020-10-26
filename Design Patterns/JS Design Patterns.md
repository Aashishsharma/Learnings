## JS Design Patterns
A pattern is a reusable solution that can be applied to commonly occurring problems in software design  
It is a blueprint/template that you can use and modify to solve your particular problem  

**Why to use?**  
1. Reusing patterns assists in preventing minor issues that can cause major problems in the application development process
2. Certain patterns can actually decrease the overall file-size footprint of our code by avoiding repetition

**Three main types of Design patterns**  
1. Creational DP
2. Structural DP
3. Behavioural DP

### 1. Creational Design Patterns
Creational design patterns focus on handling object creation mechanisms where objects are created in a manner suitable for the situation we're working in. The basic approach to object creation might otherwise lead to added complexity in a project whilst these patterns aim to solve this problem by controlling the creation process.e, especially if you need to create many different types of many different objects  
**Patterns falling in this category**  
1. Constructor
2. Factory
3. Abstract
4. Prototype
5. Singleton 
6. Builder.  

### 2. Structural Design Patterns
Structural patterns are concerned with object composition and typically identify simple ways to realize relationships between different objects. They help ensure that when one part of a system changes, the entire structure of the system doesn't need to do the same.  
Patterns that fall under this category include: Decorator, Facade, Flyweight, Adapter and Proxy.

**Patterns falling in this category**  
1. Decorator
2. Facade
3. Flyweight
4. Adapter
5. Proxy

### 3. Behavioral Design Patterns
Behavioral patterns focus on improving or streamlining the communication between disparate objects in a system.

**Patterns falling in this category**  
1. Iterator
2. Mediator
3. Observer
4. Visitor

##### 1. Constructor pattern
**Object Creation**  
The three common ways to create new objects in JavaScript are as follows:  
```javascript
// Each of the following options will create a new empty object:
var newObject = {};
var newObject = Object.create( Object.prototype );
var newObject = new Object();
//Where the "Object" constructor in the final example
// creates an object wrapper for a specific value, or
// where no value is passed, it will create an empty object and return it
```
**Accessing obj. values (4 ways)**  
```javascript
// ECMAScript 3 compatible approaches
// 1. Dot syntax
// Set properties
newObject.someKey = "Hello World"; 
// Get properties
var value = newObject.someKey;

// 2. Square bracket syntax
// Set properties
newObject["someKey"] = "Hello World"; 
// Get properties
var value = newObject["someKey"];
 
// ECMAScript 5 only compatible approaches
// 3. Object.defineProperty
// Set properties
Object.defineProperty( newObject, "someKey", {
    value: "for more control of the property's behavior",
    writable: true,
    enumerable: true,
    configurable: true
});
// If the above feels a little difficult to read, a short-hand could
// be written as follows:
var defineProp = function ( obj, key, value ){
  var config = {
    value: value,
    writable: true,
    enumerable: true,
    configurable: true
  };
  Object.defineProperty( obj, key, config );
};
// To use, we then create a new empty "person" object
var person = Object.create( Object.prototype );
// Populate the object with properties
defineProp( person, "car", "Delorean" );
defineProp( person, "dateOfBirth", "1981" );
defineProp( person, "hasBeard", false );
console.log(person);
// Outputs: Object {car: "Delorean", dateOfBirth: "1981", hasBeard: false}
 
// 4. Object.defineProperties
// Set properties
Object.defineProperties( newObject, {
  "someKey": {
    value: "Hello World",
    writable: true
  },
  "anotherKey": {
    value: "Foo bar",
    writable: false
  }
});
// Getting properties for 3. and 4. can be done using any of the
// options in 1. and 2.

// Usage:
// Create a race car driver that inherits from the person object
var driver = Object.create( person );
// Set some properties for the driver
defineProp(driver, "topSpeed", "100mph");
// Get an inherited property (1981)
console.log( driver.dateOfBirth );
```  
**Constructors with prototypes**  
```javascript
function Car( model, year, miles ) {
  this.model = model;
  this.year = year;
  this.miles = miles;
}
//a single instance of toString() will now be 
//shared between all of the Car objects.
Car.prototype.toString = function () {
  return this.model + " has done " + this.miles + " miles";
};
// Usage:
var civic = new Car( "Honda Civic", 2009, 20000 );
var mondeo = new Car( "Ford Mondeo", 2010, 5000 );
console.log( civic.toString() );
console.log( mondeo.toString() );
```
##### 2. Module Pattern
Helps in keeping the units of code for a project both cleanly separated and organized.  
In JavaScript, there are several options for implementing modules. These include:  
1. The Module pattern
2. Object literal notation
3. AMD modules
4. CommonJS modules
5. ECMAScript Harmony modules