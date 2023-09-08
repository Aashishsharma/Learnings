# Table of Contents

1. [Introduction](#introduction)
2. [Types in Typescript 1](#types)
3. [Section 2](#section-2)
4. [Conclusion](#conclusion)

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
### 3. any 

```typescript
let obj: any = { x: 0 };

// if type is any then anything can be assigned
obj.foo();
obj.bar = 100;
obj = "hello";
```

### 4. Functions
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

### 5. Objects

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

### 6. Unions

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

### 7. Type Aliases
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

### 8. Interface

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

### 9. Type assertions
Type assertion in TypeScript is a way to tell the TypeScript compiler that you, the developer, have more information about the type of a value than TypeScript can infer automatically.  
For example, if you’re using document.getElementById, TypeScript only knows that this will return some kind of HTMLElement, but you might know that your page will always have an HTMLCanvasElement with a given ID  

```typescript
// using as keyword (preferred way)
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;

// using angled brackets (used in oler ts versions)
const myCanvas = <HTMLCanvasElement>document.getElementById("main_canvas");
```

### 10 Literal types
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

### Literal interface


 ([Index](#table-of-contents))

This is the first section of the document.

## Section 2

 ([Index](#table-of-contents))
This is the second section of the document.

## Conclusion

 ([Index](#table-of-contents))
In conclusion, this is the end of the document.
