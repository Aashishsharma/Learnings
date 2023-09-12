# Table of Contents

1. [Introduction](#introduction)
2. [Types in Typescript 1](#types)
3. [Narrowing](#narrowing)
4. [Functions](#functions)
4. [Objects](#objects)

## Introduction

([Index](#table-of-contents))
TypeScript is a superset of JavaScript which means it offers all of JavaScript’s features, and an additional layer on top of these: TypeScript’s type system.  
It has tsc (Typescript compiler)  
```npm install -g typescript```   
file extension would be (.ts / .tsx instead of .jsx)  
to run - ```tsc fileName.ts```  
This typescript compiler converts typescript code to javascript. Hence even though typescript has features like private amd protected members like java and in typescript env they work same as java but when the code gets compiled to normal javascript, private members can still be accessed in javascript.
But when you are working in typescript you would normally not touch the compiled .js files.  
**Hence TypeScript's private members are enforced primarily at compile time, while Java enforces privacy both at compile time and runtime**  
**Hence Type annotations never change the runtime behavior of your program.**  
**Hence typescript won't change any runtime behavior of javascript**

### Explit types in typescript

```typescript
// add type annotations on person and date
//we don’t always have to write explicit type annotations. TypeScript can even just infer the types for us even if we omit them.
// hence annotations are not always mandatory
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

//”greet takes a person of type string, and a date of type Date“
```

### Downlevelling

```typescript
// greet.ts
function greet(person: string, date: Date) {
  console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}
greet("Maddison", new Date());
```
now when we run ```run tsc greet.ts```
the compiled js file would be

```javascript
// greet.js
"use strict";
function greet(person, date) {
    console.log("Hello ".concat(person, ", today is ").concat(date.toDateString(), "!"));
}
greet("Maddison", new Date());
```  
2 Changes happen -   
1. annotations gets removed
2. template string is convertd to normal string with concat  

template string gets converted to concat because by default ts compiler convers code to ES3 (older version of js)  
to make ts compiler connvert to ES6 js code run ```tsc --target es2015 greet.ts```  
we should use ES6 since it is supported in most of the browsers  

### Strictness
We can set the config in suah a way that we can tell ts compiler how strictly to so do the type checking.  
This can be done either by setting a flag in shile running cli or in tsconfig.json file ```"strict": true```  

Mostly these 2 strictness flags should be on  
1. noImplicitAny - using type:any is basically going back to older js
2. strictNullChecks - By default, values like null and undefined are assignable to any other type., to avoid this, enable this flag
```typescript
// With strictNullChecks = true
let name: string = "Alice";
let age: number = null; // Error: Type 'null' is not assignable to type 'number'
function greet(person: string) {
  return "Hello, " + person;
}
let result = greet(null); // Error: Argument of type 'null' is not assignable to parameter of type 'string'
// With strictNullChecks = false (default behavior)
let name2: string = "Bob";
let age2: number = null; // No error
function greet2(person: string) {
  return "Hello, " + person;
}
let result2 = greet2(null); // No error
```

## Types

### 1. Premitives (string, boolean, number)

Type Annotations on Variables
```typescript
let myName: string = "Alice";
```

### 2. Arrays (number[], string[])

### 3. uncommon primitives
bigint and symbol
```typescript
// bigint
const oneHundred: bigint = BigInt(100);
// Creating a BigInt via the literal syntax
const anotherHundred: bigint = 100n;

//symbol
const uniqueSymbol: symbol = Symbol("unique");
```
### 4. any 

```typescript
let obj: any = { x: 0 };

// if type is any then anything can be assigned
obj.foo();
obj.bar = 100;
obj = "hello";
```

### 5. Functions
```typescript
// Parameter type annotation
function greet(name: string) {
  console.log("Hello, " + name.toUpperCase() + "!!");
}
// Return type annotation
function getFavoriteNumber(): number {
  return 26;
}
// When return type is promise
async function getFavoriteNumber(): Promise<number> {
  return 26;
}
// Arrow function
const numbers: number[] = [1, 2, 3, 4, 5];
const doubledNumbers: number[] = numbers.map((num: number) => {
  return num * 2;
});
```

### 6. Objects

To define an object type, we simply list its properties and their types.

```typescript
let pt: { x: number; y: number }

// not if we do pt.z = 123, typescript will break, we need to specify z property while creating an object

// optional properties
function printName(obj: { first: string; last?: string }) {
  // ...
}
// Both OK
printName({ first: "Bob" });
printName({ first: "Alice", last: "Alisson" });
```

### 7. Unions

allows you to build new types out of existing ones

```typescript
// type of id can be number or string
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
// OK
printId(101);
// OK
printId("202");
// Error
printId({ myID: 22342 }); //Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.

// we need to explicitly handle any type of in the printId funtcion
// if we do id.toUpperCase() and type of id is number, it would break, in that case
// use typeof operator and do the necessary branching
```

### 8. Type Aliases
a name for any new custom type that we create, it is a way to name an object type:
```typescript
// create a new Alias
type Point = {
  x: number;
  y: number;
};
// here not Point is a new type alias for the object which we have created

// notice we have assigned a new type annotation to pt object
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
 
printCoord({ x: 100, y: 100 });
```

### 9. Interface

An interface declaration is another way to name an object type:

```typescript
// create a new interface / similar to alias we created above
interface Point {
  x: number;
  y: number;
}
function printCoord(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}
printCoord({ x: 100, y: 100 });
```

**Interface vs type aliases**
| Aspect                   | Interfaces                      | Type Aliases (Type)                 |
|--------------------------|---------------------------------|------------------------------------|
| Inheritance              | Supports extending other interfaces | Can be used to combine types via intersections |

**function signature example**
```typescript
interface Calculator {
  add(x: number, y: number): number;
  subtract(x: number, y: number): number;
}
const calc: Calculator = {
  add(x, y) {
    return x + y;
  },
  subtract(x, y) {
    return x - y;
  },
};
const result1 = calc.add(5, 3); // 8
const result2 = calc.subtract(10, 4); // 6
```

### 10. Type assertions
Type assertion in TypeScript is a way to tell the TypeScript compiler that you, the developer, have more information about the type of a value than TypeScript can infer automatically.  
For example, if you’re using document.getElementById, TypeScript only knows that this will return some kind of HTMLElement, but you might know that your page will always have an HTMLCanvasElement with a given ID  

```typescriptj
// using as keyword (preferred way)
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

// using angled brackets (used in oler ts versions)
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

### 11 Literal types
Literal types in TypeScript allow you to specify exact values that a variable or parameter can have.
```typescript
//String literal types allow you to specify exact string values that a variable or parameter can have.
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
printText("G'day, mate", "centre");
//Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.

// numeric literal types
function checkQuantity(value: 1 | 2 | 3) {
  console.log(value);
}
checkQuantity(3); // OK
checkQuantity(4); // Error: Argument of type '4' is not assignable to parameter of type '1 | 2 | 3'.
```

 ([Index](#table-of-contents))

## Narrowing
1. user defined typeguard
```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

//The is keyword is typically used in user-defined type guard functions
//The as keyword is used for type assertions
// e.g. 
let value: any = "Hello, TypeScript!";
let length: number = (value as string).length;
//use the as keyword when you are confident about the actual type of a value and want to inform TypeScript about it.
```

 ([Index](#table-of-contents))
This is the second section of the document.

## Functions
```typescript
function greeter(fn: (a: string) => void) { // 
  fn("Hello, World");
}
function printToConsole(s: string) {
  console.log(s);
}
greeter(printToConsole);
//The syntax (a: string) => void means “a function with one parameter, named a, of type string, that doesn’t have a return value”

//OR
type GreetFunction = (a: string) => void;
function greeter(fn: GreetFunction) {
  // ...
}

// another example
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};
function doSomething(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}
function myFunc(someArg: number) {
  return someArg > 3;
}
myFunc.description = "default description";
doSomething(myFunc);
```

#### 1. Constructor function
```typescript
type SomeConstructor = {
  new (s: string): SomeObject;
};
function fn(ctor: SomeConstructor) {
  return new ctor("hello");
}
```

### 2. Generic functions
```typescript
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
// since we have specified <T>, we can pass argunemt of any type ans ensure that
// the input and output type will always remain same

// we could have done this
function firstElement(arr: number[]): number {
  return arr[0];
}
// but then we can only pass array of numbers and not array os strings
// in generic functions we can pass any datatype and ensure input and output type
// will always be same
// instead of <Type> we can use <T>
```

### 3. Adding constraints to generic type parameter
```typescript
// constraints are applied using extend keyword in the <Type>
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}
//Type extends { length: number } means - 
//that the generic type Type must be a subtype of an object type with a length property of type number.

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
const notOK = longest(10, 100);
//Argument of type 'number' is not assignable to parameter of type '{ length: number; }'.
// because the number type doesn’t have a .length property
```

common errors with generic types
```typescript
function minimumLength<Type extends { length: number }>(
  obj: Type,
  minimum: number
): Type {
  if (obj.length >= minimum) {
    return obj;
  } else {
    return { length: minimum };
  }
}
//Type '{ length: number; }' is not assignable to type 'Type'.
//'{ length: number; }' is assignable to the constraint of type 'Type', but 'Type' could be instantiated with a different subtype of constraint '{ length: number; }'.

// are returning an object literal { length: minimum }, 
// which doesn't guarantee that it has all the properties and methods expected for the type Type. 

// fix
return { length: minimum } as Type; 
// if we are certain that the returned object will behave as expected in the context where it's used
```

explicitly specifying argument types
```typescript
// in earlier example we didn't specify the arg types while calling a function
// we conly specified generric type while creating a function,

function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}
const arr = combine([1, 2, 3], ["hello"]); // din't specify arg tpyes while calling a func
//Type 'string' is not assignable to type 'number'.

// optionally we can specify the args type while calling a function
const arr = combine<string | number>([1, 2, 3], ["hello"]);
```

### 4. Optional parameters (using ?)
```typescript
function f(x?: number) {
  // ...
}
f(); // OK
f(10); // OK
```

### 5. Function overload
```typescript
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
const d3 = makeDate(1, 3);
//No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.
```

### 6. Other type annotations used in the context of function
1. void
```typescript
// The inferred return type is void
function noop() {
  return;
}
```
2. unknown
```typescript
// you need to explicitly handle and type-check the return value before using
function getUserInput(): unknown {
  // ...
}
const userInput = getUserInput();
const strLength = userInput.length; // this line will throw error - 'userInput' is of type 'unknown'. explicitly handleit
// since return type is unknow we need to explicitly use typeguard using typeof operator
if (typeof userInput === "string") {
  // Type-safe usage
  const strLength = userInput.length;
}
// if return type iof func is any
const strLength = userInput.length; // this line will not throw error
```
3. never
Use the never type when you want to convey that a function will never return normally, typically because it throws an exception, enters an infinite loop, or is used for exhaustiveness checking in type guards.
```typescript
function fail(msg: string): never {
  throw new Error(msg);
}
```

4. Function
You can use the "Function" type to define the type of functions. The syntax looks like this:
```typescript
let myFunction: Function;
// Example of a function with specific parameters and return type
let add: Function = (a: number, b: number): number => a + b;
// Using the function
let result: number = add(5, 3); // result is 8
```

### Parameter destructuring
```typescript
function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}
//OR
type ABC = { a: number; b: number; c: number };
function sum({ a, b, c }: ABC) {
  console.log(a + b + c);
}
sum({ a: 10, b: 3, c: 9 });
```


 ([Index](#table-of-contents))
In conclusion, this is the end of the document.

## Objects
