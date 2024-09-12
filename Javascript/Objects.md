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
| **Object.assign() (Shallow Copy)**       | Creates a new object and copies enumerable own properties (shallow copy) from one or more source objects. Nested objects remain referenced. | `const obj1 = { prop: 'value' }; const obj2 = Object.assign({}, obj1); obj2.prop = 'new value';` | Reference          |
| **Spread Operator (Shallow Copy)**       | Creates a new object and copies enumerable own properties (shallow copy) from an existing object. Nested objects remain referenced.     | `const obj1 = { prop: 'value' }; const obj2 = { ...obj1 }; obj2.prop = 'new value';`         | New Object (Shallow Copy)           |
| **JSON.parse() and JSON.stringify() (Deep Copy)** | Creates a deep copy of an object by converting it to JSON and then parsing the JSON string back into an object. | `const obj1 = { prop: 'value' }; const obj2 = JSON.parse(JSON.stringify(obj1)); obj2.prop = 'new value';` | New Object (Deep Copy)           |
| **Object.create() (Copied Properties)**   | Creates a new object with the specified prototype object and copies properties from another object. | `const obj1 = { prop: 'value' }; const obj2 = Object.create(obj1, Object.getOwnPropertyDescriptors(obj1)); obj2.prop = 'new value';` | New Object, for new properties, for parent properites it is copy by reference                         |

In the table:

- Methods like assignment (`=`), `Object.assign()`, result in references, meaning changes in one variable affect the other.
- `JSON.parse()` and `JSON.stringify()` create a deep copy by converting the object to a JSON string and then parsing it back, resulting in two separate objects.
- `Object.create()` can be used to create new objects with specified prototypes. The first variant creates an empty object, while the second variant copies properties from another object, effectively creating a new object with the same properties but not sharing references.

**Object.create() vs Object.assign()**
| Feature               | `Object.create()`                                            | `Object.assign()`                                          |
|-----------------------|--------------------------------------------------------------|------------------------------------------------------------|
| **Prototype Chain**    | The new object inherits properties from the prototype.       | Properties are copied, but no prototype inheritance is established. |
| **Shallow vs Deep Copy** | Doesn't copy properties, it just sets the prototype. Changes to the prototype object reflect in the created object. | Performs a shallow copy of properties. Changes in the source objects after the assignment do not affect the target object. |
| **Use Case**           | Useful for creating objects with a specific prototype (e.g., for inheritance). | Useful for merging objects or cloning objects without prototype inheritance. |

```javascript
let obj = {
    name: 'test',
    age: 20
}
obj.name = 'new Test'
let newObj = Object.create(obj, {
    address: {
        value: 'abcd',
        writable: false
    }
})
console.log(newObj.name) // new test, because prototype property (name is changed)
```


### Prototypal inheritance

Prototype Chain:

In JavaScript, every object has a hidden property called [[Prototype]] (often referred to as __proto__) that points to another object. This other object is the object's prototype.
When you try to access a property or method on an object, JavaScript first checks if that property or method exists on the object itself. If it doesn't, it looks in the object's prototype (and further up the chain) until it finds the property or method or reaches the end of the chain.

**Adding method to a prototype**
```javascript
// Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Adding a method to the prototype
Person.prototype.sayHello = function() {
  console.log(`Hello, my name is ${this.name}.`);
};

const person1 = new Person('Alice', 30);
const person2 = new Person('Bob', 25);

person1.sayHello(); // 'Hello, my name is Alice.'
person2.sayHello(); // 'Hello, my name is Bob.'
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
