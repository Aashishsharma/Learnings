## Index
1. **Class** - template for creating objects, typeof func, member defined don't require let/const where as in func/objs let.cont required while declaring (should use new className())
2. **Inheritance** - class Child extends Parent, method overriding - same as Java, constructors should call super
3. **Static methods** - static abc, static func, belong to the class, not to obj
4. **Private, protected properties and methods** - using get/set memberName() {}, member must use underscore
5. **Mixins** - multiple inheriatce not available, hence used, create tempMixin obj, and add all required methods, then - Object.assign(User.prototype, tempMixin)
6. **ES6 features** - (=>, let/const, template String, destructuring, rest, spread, iterators, generators, modules, map/set, weakmap, weakset)


![alt text](PNG/class.PNG "Class overview")

## OOP without classes
#### Using Constructor function with new keyword
```javascript
"use strict";
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
  // Never do this because then all the objs will have their own copy of calcAge instaed use protoypal inheritance, where only 1 copy would be created
  // this.calcAge = function () {
  
  console.log(2037 - this.birthYear);
  // };
};
const jonas = new Person ('Jonas', 1991);
console.log(jonas);
// 1. New empty obj {} is created
// 2. function is called, this = new empty obj {}
// 3. empty obj {} linked to prototype
// 4. function automatically return {}
const matilda = new Person( 'Matilda', 2017);
const jack = new Person ('Jack', 1975);
console.log(matilda, jack);
console.log(jonas instanceof Person); // true

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
jonas. calcAge();
matilda.calcAge();

console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype); // true
Person.prototype. species 'Homo Sapiens';
console.log(jonas. species, matilda. species);
console.log(jonas. hasOwn Property('firstName')); // true
console.log(jonas.hasOwn Property( 'species')); // false

```
Above exact same code using classes
```javascript
// class expression
// const PersonCl = class {}
// class declaration
class Personcl {
  constructor(firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = = birthYear;
  }
  calcAge() {
  console.log(2037 - this.birthYear);
  }
}

const jessica = new Personcl('Jessica', 1996);
console.log(jessica);
jessica.calcAge();
```
Then which to use - classes or Constructor function with new keyword - based on personal preferences, classes require less code and easy
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

## Inheritance using constructor functions
```javascript

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
// this is needed because if we directly call Person(), then its a function call and this would be // undefined in the parent constructor
  Person.call(this, firstName, birthYear);
  this.course = course;I
};

Student.prototype. introduce = function () {
  console.log('My name is ${this.firstName} and Istudy `${this.course}`');
};
const mike = new Student ('Mike', 2020, 'Computer Science');
mike.introduce();

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
Protected fields are implemented in JavaScript using # symbol

```javascript

class Account {
  // Public fields (instances)
  locale=navigator.language;
  // Private fields (instances)
  #movements = [];
  #pin;
  constructor (owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // Protected property
    this.#pin = pin;
    // this._movements = [];
    // this.locale = navigator.language;
    console.log(`Thanks for opening an account', owner);
  }
  // Public methods
  // Public interface
  getMovements () {
  return this.#movements;
  }
  // private methods
  #deposit(val) {
  this.#movements.push(val);
  }
}
// using # sybmol, we cannot access class fields/methods outside the class since they become private members of the class 
```

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

### ES6 features
1. Arrow functions
2. Classes
3. Let const
4. Tepmplate String
5. Destructuring
6. Rest, Spread and default parameters
The rest parameter syntax allows us to represent an indefinite number of arguments as an array.  
Rest parameter must be the last argument.  
The arguments object is not a real array, while rest parameters are Array instances, meaning methods like sort, map, forEach or pop can be applied on it directly;  
```javascript
function f(a, b, ...theArgs) {
  // ...
}
```  
Spread syntax (...) allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected  
A better way to concatenate arrays  
```javascript
myFunction(...iterableObj);

let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5]; 
//  Append all items from arr2 onto arr1
arr1 = arr1.concat(arr2);

let arr1 = [0, 1, 2];
let arr2 = [3, 4, 5];
arr1 = [...arr1, ...arr2]; 
//  arr1 is now [0, 1, 2, 3, 4, 5]
// if we de arr2 = [1,2, arr1] we get nested array
```
7. Iterators
8. Generators
9. Modules
10. map + set + weakmap + weakset