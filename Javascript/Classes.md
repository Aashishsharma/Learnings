## Class
Template for creating objects, providing initial values for state (member variables) and implementations of behavior (member functions or methods)  
In JavaScript, a class is a kind of function.
```javascript
// syntax
class MyClass {
  // class methods
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}

//e.g.
class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    alert(this.name);
  }
}
// Usage:
let user = new User("John");
user.sayHi();
// proof: User is a function
alert(typeof User); // function
// no commas between class methods

//class expression
let User = class {
  sayHi() {
    alert("Hello");
  }
};

// "Named Class Expression"
// (no such term in the spec, but that's similar to Named Function Expression)
let User = class MyClass {
  sayHi() {
    alert(MyClass); // MyClass name is visible only inside the class
  }
};
new User().sayHi(); // works, shows MyClass definition
alert(MyClass); // error, MyClass name isn't visible outside of the class

//getter setter - similar to object getter setter
class User {
  constructor(name) {
    // invokes the setter
    this.name = name;
  }
  get name() {
    return this._name;
  }
  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }
}
let user = new User("John");
alert(user.name); // John
user = new User(""); // Name is too short.

//class fields
class User {
  name = "John";
  sayHi() {
    alert(`Hello, ${this.name}!`);
  }
}
new User().sayHi(); // Hello, John!
//The important difference of class fields is that they are set on individual objects, not User.prototype:
let user = new User();
alert(user.name); // John
alert(User.prototype.name); // undefined
```

## Class inheritance
Similar to prototyping in objects
```javascript
//syntax
class Child extends Parent
```
#### Overriding a method
If same method name is used in child class it is method overriding, same as java  
To call both parent and child method use super
```javascript
class Animal {
  constructor(name) {
    this.speed = 0;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    alert(`${this.name} runs with speed ${this.speed}.`);
  }
  stop() {
    this.speed = 0;
    alert(`${this.name} stands still.`);
  }
}
class Rabbit extends Animal {
  hide() {
    alert(`${this.name} hides!`);
  }
  stop() {
    super.stop(); // call parent stop //Arrow functions have no super
    this.hide(); // and then hide
  }
}
let rabbit = new Rabbit("White Rabbit");
rabbit.run(5); // White Rabbit runs with speed 5.
rabbit.stop(); // White Rabbit stands still. White rabbit hides!
```
Constructors in inheriting classes must call super(...), and (!) do it before using this

### Static methods
static methods are used to implement functions/properties that belong to the class, but not to any particular object of it. same as java
```javascript
class User {
  // static property
  static publisher = "Ilya Kantor";
  //static function
  static staticMethod() {
    alert(this === User);
  }
}
User.staticMethod(); // true
```
inheritance works both for regular and static methods/properties.
But when a buil-in class (Array, Map) is inherited, in this case, it's static methods/fields are not inherited. it is an exception

### Private and protected properties and methods
Protected fields are not implemented in JavaScript on the language level, but in practice they are very convenient, so they are emulated.  
Protected properties are usually prefixed with an underscore _   
for protected fields/methods use getters and setters (with some conditions, see below) both, for private only use getters
```javascript
// protected waterAmount
class CoffeeMachine {
  _waterAmount = 0;
  set waterAmount(value) {
    if (value < 0) throw new Error("Negative water");
    this._waterAmount = value;
  }
  get waterAmount() {
    return this._waterAmount;
  }
  constructor(power) {
    this._power = power;
  }
}
// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);
// add water
coffeeMachine.waterAmount = -10; // Error: Negative water

//private power
class CoffeeMachine {
  constructor(power) {
    this._power = power;
  }
  get power() {
    return this._power;
  }
}
// create the coffee machine
let coffeeMachine = new CoffeeMachine(100);
alert(`Power is: ${coffeeMachine.power}W`); // Power is: 100W
coffeeMachine.power = 25; // Error (no setter)

//instead of getter/setter these functions can calso be used
setWaterAmount(value)
getWaterAmount()
//both are same

//Privates should start with # This is a recent addition to the language. Not supported in JavaScript engines, or supported partially yet, requires polyfilling.// Private fields are not available as this[name] even in same class
```
So in JS, getters and setters are used for protected/private access modifiers	

### Mixins
In JavaScript we can only inherit from a single object. i.e, multiple inheritance not possible, same as java.  
To solve this, JS has a concept of Mixins.  
A mixin is a class containing methods that can be used by other classes without a need to inherit from it.  
The simplest way to implement a mixin in JavaScript is to make an object with useful methods, so that we can easily merge them into a prototype of any class.
```javascript
// mixin
let sayHiMixin = {
  sayHi() {
    alert(`Hello ${this.name}`);
  },
  sayBye() {
    alert(`Bye ${this.name}`);
  }
};
// usage:
class User {
  constructor(name) {
    this.name = name;
  }
}
// copy the methods, .assign method does the job here
Object.assign(User.prototype, sayHiMixin);
// now User can say hi
new User("Dude").sayHi(); // Hello Dude!
//There’s no inheritance, but a simple method copying. So User may inherit from another class and also include the mixin to “mix-in” the additional methods
```