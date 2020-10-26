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
6. Builder  

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
5. Strategy
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

##### 3. Factory Pattern
Factory is an obj that creates another object  
**We can create obj. on the fly, so why this is needed?**  
So that we can handle all the obj. creations at a centralized location  
The factory pattern is a creational design pattern that uses factory methods to create objects — rather than by calling a constructor.  
This is particularly useful if the object creation process is relatively complex, e.g. if it strongly depends on dynamic factors or application configuration  
```javascript
function Developer(name) {
  this.name = name
  this.type = "Developer"
}
function Tester(name) {
  this.name = name
  this.type = "Tester"
}
//all obj creation logic resides in this function, centralized location
// here 1 means dev and 2 means tester
//in future we can add many other types (BA,PO) and this method can control
//those obj creation
function EmployeeFactory() {
  this.create = (name, type) => {
    switch(type) {
      case 1:
        return new Developer(name)
      case 2:
        return new Tester(name)
    }
  }
}
function say() {
  console.log("Hi, I am " + this.name + " and I am a " + this.type)
}
const employeeFactory = new EmployeeFactory()
const employees = []
employees.push(employeeFactory.create("Patrick", 1))
employees.push(employeeFactory.create("John", 2))
employees.push(employeeFactory.create("Jamie", 1))
employees.push(employeeFactory.create("Taylor", 1))
employees.push(employeeFactory.create("Tim", 2))
employees.forEach( emp => {
  say.call(emp)
})
```
**When to use?**  
1. When our object or component setup involves a high level of complexity
2. When we need to easily generate different instances of objects depending on the environment we are in
3. When we're working with many small objects or components that share the same properties

##### 3. Singleton Pattern
If we need to have only one instance of a class.  
E.g. a country would have only 1 PM , so only 1 object needs to be created for PM class  
To implement use IIFE and in that IIFE call the constructor of the class whose instance you want to limit  
```javascript
//usecase - many processes but just one process manager
const Singleton = (function() {
  let pManager
  function ProcessManager() { this.state = 'starting'}
  function createProcessManager() {
    pManager = new ProcessManager()
    return pManager
  }
  return {
      getProcessManager: () => {
        if(!pManager)
          pManager = createProcessManager()
        return pManager
      }
  }
})()
const singleton = Singleton.getProcessManager()
const singleton2 = Singleton.getProcessManager()
console.log(singleton === singleton2) // true
```

##### 4. Strategy Design Pattern
The Strategy pattern is a behavioral design pattern that enables you to define a group (or family) of closely-related algorithms (known as strategies). The strategy pattern allows you to swap strategies in and out for each other as needed at runtime.  
```javascript
//use case - companies fedex, ups & usps have different shipping calculations
// to calculate shiiping cost of the package
function Fedex(pkg) {
  this.calculate = () => {
    // Fedex calculations ...
    return 2.45
  }
}
function UPS(pkg) {
  this.calculate = () => {
    // UPS calculations ...
    return 1.56
  }
}
function USPS(pkg) {
  this.calculate = () => {
    // USPS calculations ...
    return 4.5
  }
}
const fedex = new Fedex()
const ups = new UPS()
const usps = new USPS()
const pkg = { from: "Alabama", to: "Georgia", weight: 1.56 } // Dummy package
//in normal scenario we would have done this
fedex.calculate();
usps.calculate(); ups.calculate(); // all wrong

// instead do this
// this is a strategry pattern
// pass objs at runtime and call that obj's calculate method
function Shipping() {
  this.company = null
  this.setStrategy = company => {
    this.company = company
  }
  this.calculate = pkg => {
    return this.company.calculate(pkg)
  }
}
const shipping = new Shipping()
shipping.setStrategy(fedex)
console.log("Fedex: " + shipping.calculate(pkg))
shipping.setStrategy(ups)
console.log("UPS: " + shipping.calculate(pkg))
shipping.setStrategy(usps)
console.log("USPS: " + shipping.calculate(pkg))
//one owuld say we can pass company name as args to a generic calculate function
//and in that we could have added if else and called that particular company's calculate method
// it is not a good design patter
// if we have 100 companys if will use that many if lese or switch case
// but here shipping function would still be of same size
```

##### 5. Iterator Design Pattern
The Iterator pattern is a pattern that allows you to effectively loop over a collection of objects. A common programming task is to traverse and manipulate a collection of objects. These collections may be stored as an array or perhaps something more complex, such as a tree or graph structure. In addition, you may need to access the items in the collection in a certain order, such as, front to back, back to front, depth first (as in tree searches), skip evenly numbered objects, etc.  
The Iterator design pattern solves this problem by separating the collection of objects from the traversal of these objects by implementing a specialized 'iterator'!  
