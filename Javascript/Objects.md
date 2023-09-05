## Index

1. **Objects** - creation-({}, .create(Object.prototype), new()(diff-constructor is run)), assignValues - (., [], Object.defineProperty, delete, in operator, key order(num/asc, string/insert))
2. **Obj copy and references** -  objs. stored by reference, use.create() to avoid reference
3. **Property descriptors** - {writable, enumerable, configurable}, Object.defineProperty(obj, propertyName, descriptor), Object.getOwnPropertyDescriptor(obj, key)
4. **Property getters and setters** - get/set methods for encapsulation, get/set e.g. - remove age and add b'day field without breaking existing clients
5. **Prototypal inheritance** -  (changing natie prototypes) - hidden _proto_ property, obj.hasOwnProperty(key) in for in loop, change native prorotypes - String.prototype.show = function(){} usecase - polyfilling, instead of proto use - Object.create(proto, [descriptors])

## Objects

Here are the most common ways to create objects in JavaScript:

1. **Object Literal**:
   - This is the simplest way to create an object using curly braces `{}`.
   - It allows you to define properties and values within the braces.
   - Useful when you need a single, simple object.

   ```javascript
   const person = {
       firstName: 'John',
       lastName: 'Doe',
       age: 30,
   };
   ```

2. **Object Constructor**:
   - You can create an object using the built-in `Object` constructor.

   ```javascript
   const person = new Object();
   person.firstName = 'John';
   person.lastName = 'Doe';
   person.age = 30;
   ```

3. **Factory Functions**:
   - A factory function is a custom function that creates and returns an object.
   - Useful when you need to create multiple objects with similar properties.

   ```javascript
   function createPerson(firstName, lastName, age) {
       return {
           firstName,
           lastName,
           age,
       };
   }

   const person1 = createPerson('John', 'Doe', 30);
   const person2 = createPerson('Jane', 'Smith', 25);
   ```

4. **Constructor Functions**:
   - Constructor functions are used to create objects with shared properties and methods.
   - for creating objects with shared methods and properties

   ```javascript
   function Person(firstName, lastName, age) {
       this.firstName = firstName;
       this.lastName = lastName;
       this.age = age;
   }

   const person1 = new Person('John', 'Doe', 30);
   const person2 = new Person('Jane', 'Smith', 25);
   ```

5. **ES6 Classes**:
   - ES6 introduced class syntax, making it easier to create objects with constructors and methods.
   - It's a more modern alternative to constructor functions.

   ```javascript
   class Person {
       constructor(firstName, lastName, age) {
           this.firstName = firstName;
           this.lastName = lastName;
           this.age = age;
       }
   }

   const person1 = new Person('John', 'Doe', 30);
   const person2 = new Person('Jane', 'Smith', 25);
   ```

6. **Object.create**:
   - You can create an object with a specified prototype object using `Object.create()` method.
   - Useful when you need to inherit properties and methods from an existing object.

   ```javascript

  const animalPrototype = {
    sound: '',
    makeSound: function() {
        console.log(this.sound);
    }
  };

  const dog = Object.create(animalPrototype);
  dog.sound = 'Woof!';
  dog.makeSound(); // "Woof!"

  const cat = Object.create(animalPrototype);
  cat.sound = 'Meow!';
  cat.makeSound(); // "Meow!"
   ```

   ```javascript
   const personPrototype = {
    greet: function() {
        console.log(`Hello, my name is ${this.firstName}`);
    }
  };
  const person = Object.create(personPrototype, {
      firstName: {
          value: 'John',
          writable: true, // Property can be modified
          enumerable: true, // Property can be iterated
          configurable: true // Property can be deleted
      },
      lastName: {
          value: 'Doe',
          writable: true,
          enumerable: true,
          configurable: true
      }
  });
  person.greet(); // "Hello, my name is John"
   ```

7. **Singleton Pattern**:
   - You can create a singleton object using a combination of approaches.
   - It ensures that only one instance of the object is created.

   ```javascript
   const singleton = (() => {
       let instance;
       function createInstance() {
           return {
               // Properties and methods
           };
       }
       return {
           getInstance: function() {
               if (!instance) {
                   instance = createInstance();
               }
               return instance;
           }
       };
   })();
   ```

**Accessing obj. values**  
| Method                        | Description                                                                                                            | Example                                                | When to Use                                                                                                              |
| ------------------------------|------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------| ------------------------------------------------------------------------------------------------------------------------|
| **Dot Notation**              | Access object properties using dot notation.                                                                        | ```const person = { name: 'John' }; person.name; ``` | - Use when the property name is known and a valid identifier. - Typically used for static property access.         |
| **Bracket Notation**          | Access object properties using square brackets and a string key.                                                     | ```const person = { name: 'John' }; person['name']; ``` | - Use when the property name is dynamic, computed, or includes special characters. - Allows access to properties with non-standard names. |
| **Object Destructuring**      | Assign object properties to variables with the same name as the property.                                            | ```const person = { name: 'John', age: 30 }; const { name, age } = person; ``` | - Useful when you need to work with multiple properties from an object. - Provides clean and concise variable assignments. |
| **Object.keys()**             | Retrieve an array of object property names (keys) and then access properties by name.                                | ```const person = { name: 'John', age: 30 }; const keys = Object.keys(person); const name = person[keys[0]]; ``` | - When you want to iterate over object properties or access properties dynamically based on keys. |
| **Object.values()**           | Retrieve an array of object property values and then access properties by index.                                     | ```const person = { name: 'John', age: 30 }; const values = Object.values(person); const age = values[1]; ``` | - When you need to work with property values and their order is important. - Suitable for extracting all values from an object. |
| **Object.entries()**          | Retrieve an array of `[key, value]` pairs and then access properties by key or index.                                | ```const person = { name: 'John', age: 30 }; const entries = Object.entries(person); const age = entries[1][1]; const ageByName = entries.find(entry => entry[0] === 'age')[1]; ``` | - Useful for working with both keys and values, especially when you need to find a specific property. |
| **for...in Loop**             | Iterate over all enumerable properties (including inherited ones) and access each property's value.                   | ```const person = { name: 'John', age: 30 }; for (const key in person) { console.log(person[key]); } ``` | - When you need to iterate over all properties of an object, including inherited ones. - Use with caution as it may iterate over unwanted properties. |
| **Object.getOwnPropertyNames()** | Retrieve an array of all object property names, including non-enumerable properties, and access properties by name. | ```const person = { name: 'John' }; const keys = Object.getOwnPropertyNames(person); const name = person[keys[0]]; ``` | - When you need to work with non-enumerable properties or access all properties regardless of their enumerability. |


| Aspect                  | Description                                                                                                     |
|-------------------------|-----------------------------------------------------------------------------------------------------------------|
| **Key Ordering**        | The order of keys in JavaScript objects is not guaranteed to be the same as the order in which they were added. |
| **Example**             | ```const myObj = { b: 2, a: 1, c: 3 }; ```                                                        |
| **Key Iteration Order** | The order in which keys are iterated over in a `for...in` loop is not guaranteed and may vary between engines. |
| **ECMAScript 6+ Order** | In ECMAScript 6 and later, objects maintain their insertion order for string keys (not guaranteed for numbers). |
| **Object.keys() Order** | The `Object.keys()` method returns keys in ECMAScript 6+ order.                                                 |
| **Object.getOwnPropertyNames() Order** | The `Object.getOwnPropertyNames()` method returns keys in ECMAScript 6+ order.                         |

In the provided example, `myObj` has keys `'b'`, `'a'`, and `'c'`. While modern JavaScript engines often maintain the order of keys in the same order they were added for string keys, it's essential to note that this behavior is not guaranteed in all situations.

For consistent key ordering, especially when you rely on a specific order, consider using arrays or maps instead of regular objects.

#### Object copying, references

**Objects Copied by Reference:**
In JavaScript, objects are reference types. When you assign an object to another variable, you are copying a reference to the same object in memory. As a result, both variables point to the same object, and any changes made through one variable are reflected in the other because they share the same reference.

**Table: Ways to Copy Objects (Reference vs. New Object)**

| Method                                    | Description                                                                                                                     | Example                                                                                      | Copied by Reference or New Object? |
|-------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|------------------------------------|
| **Assignment (Reference Copy)**           | Assigning an object to another variable copies a reference to the same object. Changes in one variable affect the other.        | `const obj1 = { prop: 'value' }; const obj2 = obj1; obj2.prop = 'new value';`                | Reference                           |
| **Object.assign() (Shallow Copy)**       | Creates a new object and copies enumerable own properties (shallow copy) from one or more source objects. Nested objects remain referenced. | `const obj1 = { prop: 'value' }; const obj2 = Object.assign({}, obj1); obj2.prop = 'new value';` | New Object (Shallow Copy)           |
| **Spread Operator (Shallow Copy)**       | Creates a new object and copies enumerable own properties (shallow copy) from an existing object. Nested objects remain referenced.     | `const obj1 = { prop: 'value' }; const obj2 = { ...obj1 }; obj2.prop = 'new value';`         | New Object (Shallow Copy)           |
| **JSON.parse() and JSON.stringify() (Deep Copy)** | Creates a deep copy of an object by converting it to JSON and then parsing the JSON string back into an object. | `const obj1 = { prop: 'value' }; const obj2 = JSON.parse(JSON.stringify(obj1)); obj2.prop = 'new value';` | New Object (Deep Copy)           |
| **Object.create() (Empty Object)**       | Creates a new object with the specified prototype object. The new object initially has no properties. Changes in one object do not affect the other. | `const obj1 = { prop: 'value' }; const obj2 = Object.create(obj1); obj2.prop = 'new value';` | New Object                         |
| **Object.create() (Copied Properties)**   | Creates a new object with the specified prototype object and copies properties from another object. Changes in one object do not affect the other. | `const obj1 = { prop: 'value' }; const obj2 = Object.create(obj1, Object.getOwnPropertyDescriptors(obj1)); obj2.prop = 'new value';` | New Object                         |

In the table:

- Methods like assignment (`=`), `Object.assign()`, and the spread operator (`...`) result in references, meaning changes in one variable affect the other.
- `JSON.parse()` and `JSON.stringify()` create a deep copy by converting the object to a JSON string and then parsing it back, resulting in two separate objects.
- `Object.create()` can be used to create new objects with specified prototypes. The first variant creates an empty object, while the second variant copies properties from another object, effectively creating a new object with the same properties but not sharing references.

#### Property descriptors

Object properties, besides a value, have three special attributes (so-called “flags”):

1. writable – if true, the value can be changed, otherwise it’s read-only.
2. enumerable – if true, then listed in loops, otherwise not listed.
3. configurable – if true, the property can be deleted and these attributes can be modified, otherwise not. Making a property non-configurable is a one-way road. We cannot change it back with defineProperty.
When we create an object “the usual way”, all of them are true. But we also can change them anytime.

### Prototypal inheritance

In JavaScript, objects have a special hidden property [[Prototype]] (as named in the specification), that is either null or references another object. That object is called “a prototype”:
Arr, obj, fun have _proto_ property which provide access to inbuilt props and methods
Let arr =[],
Thus we can access arr.filter() and others
arr._proto_ is prototype for arr and arr._proto.proto_ = any obj._proto_ = base obj. of js.
and _proto_ = .prototype  
This is prototyoal inheritance.  

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

#### **proto** alternatives

The **proto** is considered outdated and somewhat deprecated (in some browsers, works in node)

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
