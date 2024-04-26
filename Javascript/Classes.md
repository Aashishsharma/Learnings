![alt text](PNG/class.png "Class overview")

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

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name}.`);
  }
}

const person1 = new Person('Alice', 30);
person1.sayHello(); // 'Hello, my name is Alice.'

console.log(typeof Person); // 'function' (not 'class' or 'Person')
console.log(typeof person1); // 'object'
```

Object-oriented programming (OOP) concepts are essential to understand when working with JavaScript classes. Here are some key OOP concepts along with code examples in JavaScript:

1. **Classes and Objects:**
   - **Class Definition:** In JavaScript, you can define a class using the `class` keyword. A class is a blueprint for creating objects.
   - **Object Creation:** You can create objects (instances) from a class using the `new` keyword.

   ```javascript
   class Person {
     constructor(name, age) {
       this.name = name;
       this.age = age;
     }
   }

   const person1 = new Person('Alice', 30);
   ```

2. **Constructor:**
   - A constructor is a special method inside a class that gets executed when you create an object from the class. It is used to initialize object properties.

   ```javascript
   class Person {
     constructor(name, age) {
       this.name = name;
       this.age = age;
     }
   }
   ```

3. **Properties:**
   - Properties are variables associated with objects created from a class.
   - They are defined inside the constructor and can have default values.

   ```javascript
   class Person {
     constructor(name, age) {
       this.name = name;
       this.age = age;
     }
   }
   ```

4. **Methods:**
   - Methods are functions defined inside a class that describe the behavior of objects created from that class.

   ```javascript
   class Person {
     constructor(name, age) {
       this.name = name;
       this.age = age;
     }

     sayHello() {
       console.log(`Hello, my name is ${this.name}.`);
     }
   }
   ```

5. **Inheritance:**
   - Inheritance allows you to create a new class (subclass) that inherits properties and methods from an existing class (parent class).

   ```javascript
   class Student extends Person {
     constructor(name, age, studentId) {
       super(name, age); // Call the parent class constructor
       this.studentId = studentId;
     }

     study() {
       console.log(`${this.name} is studying.`);
     }
   }
   ```

6. **Encapsulation:**
   - Encapsulation is the concept of bundling data (properties) and the methods that operate on that data (methods) into a single unit (class).
   - You can control access to properties by using # symbol (below code wotks in nodejs).

   ```javascript
   class Something {

  #property; // private properties need to be declared in the class and
  // they cannot be initialized directly in the constructor as opposed to other normal variables

  constructor(){
    this.#property = "test";
  }

  #privateMethod() {
    return 'hello world';
  }

  getPrivateMessage() {
      return this.#property;
  }
  }

  const instance = new Something();
  console.log(instance.property); //=> undefined
  console.log(instance.privateMethod); //=> undefined
  console.log(instance.getPrivateMessage()); //=> test
  console.log(instance.#property); //=> Syntax error

   ```
  

7. **Polymorphism:**
   - Polymorphism allows objects of different classes to be treated as objects of a common parent class.
   - It enables method overriding, where a subclass can provide a specific implementation for a method defined in the parent class.

   ```javascript
   class Shape {
     calculateArea() {
       return 0;
     }
   }

   class Circle extends Shape {
     constructor(radius) {
       super();
       this.radius = radius;
     }
     calculateArea() {
       return Math.PI * this.radius ** 2;
     }
   }
   class Rectangle extends Shape {
     constructor(width, height) {
       super();
       this.width = width;
       this.height = height;
     }
     calculateArea() {
       return this.width * this.height;
     
     }
    }

   ```

These are the fundamental OOP concepts in JavaScript. While JavaScript's OOP is prototype-based, ES6 introduced class syntax that makes it easier to work with classes and objects in a more familiar way for developers coming from traditional OOP backgrounds.

### getters and setters

They don't directly create private members, they provide a way to implement encapsulation and control how properties are accessed and modified.  
In ES6, there's also a proposal for private class fields and methods, denoted with a # prefix, which would provide true privacy in classes.

**Usecases**

1. Validation
2. Encapsulation - By controlling access to properties through methods, you can hide the implementation details and provide a clear interface for interacting with the object.
3. Backward Compatibility - If you initially expose a property directly and later need to add validation or computation

```javascript
class Circle {
  constructor(radius) {
    this._radius = radius; // Convention for a "protected" property
  }

  get radius() {
    return this._radius;
  }

  set radius(newRadius) {
    // you can add validations here - like radios can't be less than 1
    if (newRadius > 0) {
      this._radius = newRadius;
    }
  }
}

const myCircle = new Circle(5);
myCircle.radius = 10; // Setting the radius property using a setter
console.log(myCircle.radius); // Accessing the radius property after setting
```

### Static properties and methods

All the properites in the class are at instance level and can be declared in the class / construcor or any other class method using **this** keyword  
static methods are used to implement functions/properties that belong to the class, but not to any particular object of it. same as java

```javascript
class MyClass {
  static staticProperty = 'I am a static property';
  constructor(value) {
    this.instanceProperty = value;
  }
}
// Accessing a class-level property
console.log(MyClass.staticProperty); // 'I am a static property'
const obj1 = new MyClass('Instance 1');
const obj2 = new MyClass('Instance 2');
// Class-level properties are shared among instances
console.log(obj1.staticProperty); // 'I am a static property'
console.log(obj2.staticProperty); // 'I am a static property'

```

inheritance works both for regular and static methods/properties.
But when a buil-in class (Array, Map) is inherited, in this case, it's static methods/fields are not inherited. it is an exception

##### Usecases of static methods

1. Utility functions

```javascript
class MathUtils {
  static add(x, y) {
    return x + y;
  }
  static subtract(x, y) {
    return x - y;
  }
}
const sum = MathUtils.add(5, 3); // 8
const difference = MathUtils.subtract(10, 4); // 6
```

2. To create factory methods - factory methods are responsible for creating instances of classes but provide more control over the object creation process than a typical constructor

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  static createAdult(name) {
    // or do any other type of validation before creating instance of the class (see validation e.g. below)
    return new Person(name, 18);
  }
}
const adult = Person.createAdult('John');
```

3. For valiadtion while creating instance

```javascript
class Email {
  constructor(address) {
    if (Email.validate(address)) {
      this.address = address;
    } else {
      throw new Error('Invalid email address');
    }
  }
  static validate(address) {
    // Add email validation logic here
    return /\S+@\S+\.\S+/.test(address);
  }
}
const validEmail = new Email('john@example.com');
```

### Mixins

In JavaScript we can only inherit from a single object. i.e, multiple inheritance not possible, same as java.  
To solve this, JS has a concept of Mixins.  
A mixin is a class containing methods that can be used by other classes without a need to inherit from it.  
Mixins are created using Object.assign method

```javascript
// object.assign syntax
Object.assign(target, ...sources)

// example
const target = { a: 1, b: 2 };
const source1 = { b: 3, c: 4 };
const source2 = { d: 5 };
const result = Object.assign(target, source1, source2);
console.log(target);  // { a: 1, b: 3, c: 4, d: 5 }
console.log(result);  // { a: 1, b: 3, c: 4, d: 5 } (same as target)

```

```javascript
// Define a mixin as a separate class or object
const canSwimMixin = {
  swim() {
    console.log('Swimming...');
  },
};
const canFlyMixin = {
  fly() {
    console.log('Flying...');
  },
};
// Create a class and apply mixins
class Bird {
  constructor(name) {
    this.name = name;
  }
}
// Apply the mixins to the Bird class
// so based on .assign method, canSwimMixin and canFlyMisin are added to the Bird prototype
Object.assign(Bird.prototype, canSwimMixin, canFlyMixin);
// Create instances of the Bird class
const duck = new Bird('Duck');
duck.swim(); // Outputs: Swimming...
duck.fly();  // Outputs: Flying...

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

## Design patterns in JS

Design patterns in JavaScript are reusable solutions to common problems in software design.

### 1. Singleton pattern

(static instance to implement singleton)

1. Single Instance: There is only one instance of the Singleton class.
2. Global Access: The Singleton instance is globally accessible, allowing any part of the code to access it.
3. Lazy Initialization: The Singleton instance is created only when it's first requested, not necessarily at the beginning of the program.

**Simple example**

```javascript
class Singleton {
  constructor() {
    // we check if the static property instance is already available,
    // since it is called with ClassName.property, it is a static property
    if (Singleton.instance) { 
      return Singleton.instance; // return the same static instance
    }
    this.data = 'Singleton Data'; 
    Singleton.instance = this;// here we are creating a static property named instance and assigning this (current/first instance) to it
  }
}
const singleton1 = new Singleton();
const singleton2 = new Singleton();
console.log(singleton1 === singleton2); // true (Both instances are the same)
console.log(singleton1.data); // 'Singleton Data'
console.log(singleton2.data); // 'Singleton Data'
```

##### Usecases

1. Logging and monitoring

```javascript
const winston = require('winston');
class Logger {
  constructor() {
    if (!Logger.instance) {
      this.logger = winston.createLogger({
        level: 'info',
        format: winston.format.simple(),
        transports: [
          new winston.transports.Console()
        ]
      });
      Logger.instance = this;
    }
    return Logger.instance;
  }
  log(message) {
    this.logger.info(message);
  }
}
class App {
  constructor() {
    this.logger = new Logger(); // Logger instance
  }
  run() {
    this.logger.log('Application started.');
    // Simulate application activities
    this.logger.log('Application finished.');
  }
}
// Usage
const app1 = new App();
app1.run();
const app2 = new App();
app2.run();
console.log(app1.logger === app2.logger); // true (Logger instances are the same)
```

2. Creating database connection / pool manager instance which would be used in different parts of the application

```javascript
const sql = require('mssql');
class Database {
  constructor() {
    if (!Database.instance) {
      // Configuration for your MSSQL database
      const config = {
        user: 'your_username',
        password: 'your_password',
        server: 'your_server',
        database: 'your_database',
        options: {
          encrypt: true, // Use if you're connecting to Azure SQL
        },
      };

      this.pool = new sql.ConnectionPool(config);
      this.connected = this.connect();

      Database.instance = this;
    }

    return Database.instance;
  }
  async connect() {
    try {
      await this.pool.connect();
      console.log('Connected to MSSQL database.');
    } catch (error) {
      console.error('Error connecting to MSSQL database:', error);
    }
  }
  async query(queryString) {
    try {
      const result = await this.pool.request().query(queryString);
      return result.recordset;
    } catch (error) {
      console.error('Error executing SQL query:', error);
      throw error;
    }
  }
  async close() {
    try {
      await this.pool.close();
      console.log('Database connection closed.');
    } catch (error) {
      console.error('Error closing database connection:', error);
    }
  }
}
// Usage
async function main() {
  const db1 = new Database();
  const db2 = new Database();
  console.log(db1 === db2); // true (Both instances are the same)
  try {
    const results = await db1.query('SELECT * FROM your_table');
    console.log(results);
  } catch (error) {
    // Handle error
  } finally {
    db1.close(); // Close the database connection when done
  }
}
main();
```

### 2. Factory pattern

1. Provides an interface for creating objects but allows subclasses to alter the type of objects that will be created.
2. Instead of calling a constructor directly to create an object, a factory method is used for this purpose.

**SImple example**

```javascript
// Product Interface: Pizza
class Pizza {
  constructor() {
    this.name = "";
    this.ingredients = [];
  }
  prepare() {
    console.log(`Preparing ${this.name}`);
  }
  bake() {
    console.log(`Baking ${this.name}`);
  }
}
// Concrete Products: CheesePizza and PepperoniPizza
class CheesePizza extends Pizza {
  constructor() {
    super();
    this.name = "Cheese Pizza";
    this.ingredients = ["Cheese", "Tomato Sauce"];
  }
}
class PepperoniPizza extends Pizza {
  constructor() {
    super();
    this.name = "Pepperoni Pizza";
    this.ingredients = ["Pepperoni", "Cheese", "Tomato Sauce"];
  }
}
// Factory Interface: PizzaFactory
class PizzaFactory {
  createPizza(pizzaType) {
    // Factory method for creating pizzas based on pizzaType
    switch (pizzaType) {
      case "cheese":
        return new CheesePizza();
      case "pepperoni":
        return new PepperoniPizza();
      default:
        throw new Error(`Invalid pizza type: ${pizzaType}`);
    }
  }
}
// Usage
const pizzaFactory = new PizzaFactory();
const cheesePizza = pizzaFactory.createPizza("cheese");
cheesePizza.prepare();
cheesePizza.bake();
const pepperoniPizza = pizzaFactory.createPizza("pepperoni");
pepperoniPizza.prepare();
pepperoniPizza.bake();
```

##### Usecases

1. Creating Database Connections: When working with databases, you might have different types of database connections (e.g., MySQL, PostgreSQL, MongoDB). A factory can create the appropriate database connection object based on the configuration.
2. Logger creating (dev / prod - do different level of logging)
3. API Clients: When working with external APIs, you might have multiple endpoints with different configurations. A factory can create API client instances with the appropriate settings.
4. Data Import/Export: In data processing applications, you might need to import or export data in various formats (e.g., JSON, XML, CSV). A factory can create data exporter/importer objects based on the desired format.
5. UI component creation

**code for ui component creation**
create a UI component factory that generates different types of buttons.  
In AID project types of datagrids - (AID datagrid / StreamAID datagrid / AID datagrid transpose)

```javascript
// 1. Create individual button components
// PrimaryButton.js
import React from 'react';
const PrimaryButton = () => {
  return <button className="primary-button">Primary Button</button>;
};
export default PrimaryButton;

// 2. create ButtonFactory
import React from 'react';
import PrimaryButton from './PrimaryButton';
import SecondaryButton from './SecondaryButton';
import DangerButton from './DangerButton';
function ButtonFactory({ buttonType }) {
  switch (buttonType) {
    case 'primary':
      return <PrimaryButton />;
    case 'secondary':
      return <SecondaryButton />;
    case 'danger':
      return <DangerButton />;
    default:
      return null;
  }
}
export default ButtonFactory;

// 3. Use the ButtonFactory
import React, { useState } from 'react';
import ButtonFactory from './ButtonFactory';
function App() {
  const [selectedButton, setSelectedButton] = useState('primary');
  const handleButtonClick = (type) => {
    setSelectedButton(type);
  };
  return (
    <div>
      <h1>UI Component Factory Example</h1>  
      <div>
        <button onClick={() => handleButtonClick('primary')}>Primary Button</button>
        <button onClick={() => handleButtonClick('secondary')}>Secondary Button</button>
        <button onClick={() => handleButtonClick('danger')}>Danger Button</button>
      </div>
      <hr />
      <h2>Selected Button:</h2>
      <ButtonFactory buttonType={selectedButton} />
    </div>
  );
}
export default App;
```

### 3. Constructor pattern

```javascript

```

### 4. Module pattern

```javascript

```

### 5. Observer pattern

```javascript

```

### 6. Command pattern

```javascript

```
