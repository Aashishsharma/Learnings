## Index
1. Objects
2. Obj copy and references
3. Property descriptors
4. Property getters and setters
5. Prototypal inheritance (changing natie prototypes)

## Objects
Used to store keyed collections of various data and more complex entities  
```javascript
let user = new Object(); // "object constructor" syntax
let user = {};  // "object literal" syntax

let user = {     // an object
  name: "John",  // by key "name" store value "John"
  age: 30        // by key "age" store value 30
};

// get property values of the object: using dot notation
alert( user.name ); // John
alert( user.age ); // 30

// adding new property
user.isAdmin = true;

// deleting existing property
delete user.age;

// adding mulriword property
let user = {
  name: "John",
  age: 30,
  "likes birds": true  // multiword property name must be quoted
};

// an object declared as const can be modified.
const user = {
  name: "John"
};
user.name = "Pete"; // (*)
alert(user.name); // Pete
// The const would give an error only if we try to set user=... as a whole.
// There’s another way to make constant object properties

// get property values of the object: using square bracket notation
// set
user["likes birds"] = true;

// get
alert(user["likes birds"]); // true

// delete
delete user["likes birds"];

// multiword keys work only in square bracket notation and we can use variables in square bracket notation
let user = {
  name: "John",
  age: 30
};
let key = prompt("What do you want to know about the user?", "name");
// access by variable
alert( user[key] ); // John (if enter "name")

// Property value shorthand
// we often use existing variables as values for property names
function makeUser(name, age) {
  return {
    name: name,
    age: age,
  };
}
let user = makeUser("John", 30);
alert(user.name); // John

// We can use both normal properties and shorthands in the same object:
let user = {
  name,  // same as name:name
  age: 30
};

// Property existence test, “in” operator
// Reading a non-existing property just returns undefined. So we can easily test whether the property exists:
let user = {};
alert( user.noSuchProperty === undefined ); // true means "no such property"

//There’s also a special operator "in" for that.
// syntax -> note the quotes around the key
"key" in object

let user = { name: "John", age: 30 };
alert( "age" in user ); // true, user.age exists
alert( "blabla" in user ); // false, user.blabla doesn't exist

// undefined doesn't always work, but in does
let obj = {
  test: undefined
};
alert( obj.test ); // it's undefined, so - no such property?
alert( "test" in obj ); // true, the property does exist!

// for in loop for objects
for (key in object) {
  // executes the body for each key among object properties
}

// key order in object
// integer properties are sorted, others appear in creation order
let codes = {
  "49": "Germany",
  "41": "Switzerland",
  "44": "Great Britain",
  // ..,
  "1": "USA"
};
for (let code in codes) {
  alert(code); // 1, 41, 44, 49
}

// if the keys are non-integer, then they are listed in the creation order
let user = {
  name: "John",
  surname: "Smith"
};
user.age = 25; // add one more
// non-integer properties are listed in the creation order
for (let prop in user) {
  alert( prop ); // name, surname, age
}

// Array is also an obj in js
```

#### Object copying, references
One of the fundamental differences of objects vs primitives is that they are stored and copied “by reference”.

Primitive values: strings, numbers, booleans – are assigned/copied “as a whole value”.

```javascript
let message = "Hello!";
let phrase = message;
// As a result we have two independent variables, each one is storing the string "Hello!".

// Objects are not like that.
// A variable stores not the object itself, but its “address in memory”, in other words “a reference” to it. simlar to pointers in C.

let user = { name: "John" };
let admin = user; // copy the reference 
admin.name = 'Pete'; // changed by the "admin" reference
alert(user.name); // 'Pete', changes are seen from the "user" reference

//objs comparison
let a = {};
let b = a; // copy the reference
alert( a == b ); // true, both variables reference the same object
alert( a === b ); // true

let a = {};
let b = {}; // two independent objects
alert( a == b ); // false

// Cloning and merging, Object.assign
// if you need to copy obj to another variable
// can be done manually using for in loop and copying each key
// using Object.assign
Object.assign(dest, [src1, src2, src3...])  

let user = { name: "John" };
let permissions1 = { canView: true };
let permissions2 = { canEdit: true };
// copies all properties from permissions1 and permissions2 into user
Object.assign(user, permissions1, permissions2);
// now user = { name: "John", canView: true, canEdit: true }
// If the copied property name already exists, it gets overwritten:

// Object.assign does not work in nested cloning as in nested cloning obj contains another obj and the inner obj gets copied as reference
let user = {
  name: "John",
  sizes: {
    height: 182,
    width: 50
  }
};
let clone = Object.assign({}, user); // to create a new variable instead of same reference
alert( user.sizes === clone.sizes ); // true, same object
// user and clone share sizes
user.sizes.width++;       // change a property from one place
alert(clone.sizes.width); // 51, see the result from the other one

// to solve this use  _.cloneDeep(obj) from the JavaScript library lodash.
```
#### this in objects
```javascript
// these objects do the same
user = {
  sayHi: function() {
    alert("Hello");
  }
};
// method shorthand looks better, right?
user = {
  sayHi() { // same as "sayHi: function()"
    alert("Hello");
  }
};
```
#### Property descriptors
Object properties, besides a value, have three special attributes (so-called “flags”):

1. writable – if true, the value can be changed, otherwise it’s read-only.
2. enumerable – if true, then listed in loops, otherwise not listed.
3. configurable – if true, the property can be deleted and these attributes can be modified, otherwise not. Making a property non-configurable is a one-way road. We cannot change it back with defineProperty.
When we create an object “the usual way”, all of them are true. But we also can change them anytime.

##### getting/setting the flags
```javascript
/// get syntax
let descriptor = Object.getOwnPropertyDescriptor(obj, propertyName);

//e.g.
let user = {
  name: "John"
};
let descriptor = Object.getOwnPropertyDescriptor(user, 'name');
alert( JSON.stringify(descriptor, null, 2 ) );
/* property descriptor:
{
  "value": "John",
  "writable": true,
  "enumerable": true,
  "configurable": true
}
*/

//set syntax
Object.defineProperty(obj, propertyName, descriptor)

//e.g.
let user = {
  name: "John"
};
Object.defineProperty(user, "name", {
  writable: false
});
user.name = "Pete"; // Error: Cannot assign to read only property 'name'
```
Errors appear only in strict mode
In the non-strict mode, no errors occur when writing to non-writable properties and such. But the operation still won’t succeed. Flag-violating actions are just silently ignored in non-strict.

#### Property getters and setters
It’s accessor properties. They are essentially functions that execute on getting and setting a value, but look like regular properties to an external code. 
These are used in object.defineproperty as well  
```javascript
//syntax
let obj = {
  get propName() {
    // getter, the code executed on getting obj.propName
  },
  set propName(value) {
    // setter, the code executed on setting obj.propName = value
  }
};

//e.g.
let user = {
  name: "John",
  surname: "Smith",
  get fullName() {
    return `${this.name} ${this.surname}`;
  }
};
alert(user.fullName); // John Smith
//user.fullName = "Test"; // Error (property has only a getter)
//note error only in strict mode otherwise ignored
```
One of the great uses of accessors is that they allow to take control over a “regular” data property
```javascript
function User(name, age) {
  this.name = name;
  this.age = age;
}
let john = new User("John", 25);
alert( john.age ); // 25
//But sooner or later, things may change. Instead of age we may decide to store birthday
// Now what to do with the old code that still uses age property?
//We can try to find all such places and fix them, but that takes time and can be hard to do if that code is used by many other people
function User(name, birthday) {
  this.name = name;
  this.birthday = birthday;
  // age is calculated from the current date and birthday
  Object.defineProperty(this, "age", {
    get() {
      let todayYear = new Date().getFullYear();
      return todayYear - this.birthday.getFullYear();
    }
  });
}
let john = new User("John", new Date(1992, 6, 1));
alert( john.birthday ); // birthday is available
alert( john.age );      // ...as well as the age
```

### Prototypal inheritance
In JavaScript, objects have a special hidden property [[Prototype]] (as named in the specification), that is either null or references another object. That object is called “a prototype”:
```javascript
let animal = {
  eats: true
};
let rabbit = {
  jumps: true
};
rabbit.__proto__ = animal;
// we can find both properties in rabbit now:
alert( rabbit.eats ); // true
alert( rabbit.jumps ); // true
// In modern language __proto__ is replaced with functions Object.getPrototypeOf/Object.setPrototypeOf

//prototype chain
let animal = {
  eats: true,
  walk() {
    alert("Animal walk");
  }
};
let rabbit = {
  jumps: true,
  __proto__: animal
};
let longEar = {
  earLength: 10,
  __proto__: rabbit
};
// walk is taken from the prototype chain
longEar.walk(); // Animal walk
alert(longEar.jumps); // true (from rabbit)

// above is multilevel inheritance
// multiple inheritance is not possible in JS
//The references can’t go in circles. JavaScript will throw an error if we try to assign __proto__ in a circle. 
```
The for..in loop iterates over inherited properties too.  
If that’s not what we want, and we’d like to exclude inherited properties, there’s a built-in method obj.hasOwnProperty(key): it returns true if obj has its own (not inherited) property named key
```javascript
// f.prototype
let animal = {
  eats: true
};
function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype = animal;
let rabbit = new Rabbit("White Rabbit"); //  rabbit.__proto__ == animal
alert( rabbit.eats ); // true
```
#### Changing native prototypes
```javascript
String.prototype.show = function() {
  alert(this);
};
"BOOM!".show(); // BOOM!
```
If two libraries add a method String.prototype.show, then one of them will be overwriting the method of the other.
So, generally, modifying a native prototype is considered a bad idea.  
In modern programming, there is only one case where modifying native prototypes is approved. That’s polyfilling.
Polyfilling is a term for making a substitute for a method that exists in the JavaScript specification, but is not yet supported by a particular JavaScript engine.
We may then implement it manually and populate the built-in prototype with it.

#### Borrowing methods from prototypes
```javascript
let obj = {
  0: "Hello",
  1: "world!",
  length: 2,
};
obj.join = Array.prototype.join;
alert( obj.join(',') ); // Hello,world!
```
It works because the internal algorithm of the built-in join method only cares about the correct indexes and the length property. It doesn’t check if the object is indeed an array. Many built-in methods are like that.

#### __proto__ alternatives
The __proto__ is considered outdated and somewhat deprecated (in some browsers, works in node)
```javascript
// instead use
Object.create(proto, [descriptors])

//e.g.
let animal = {
  eats: true
};
let rabbit = Object.create(animal, {
  jumps: {
    value: true
  }
});
alert(rabbit.jumps); // true
alert(rabbit.eats); // true
//The descriptors are in the same format as described in above section of descriptors
```
