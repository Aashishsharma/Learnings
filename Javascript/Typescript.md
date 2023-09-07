# Table of Contents

1. [Introduction](#introduction)
2. [Section 1](#section-1)
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

## Section 1

 ([Index](#table-of-contents))

This is the first section of the document.

## Section 2

 ([Index](#table-of-contents))
This is the second section of the document.

## Conclusion

 ([Index](#table-of-contents))
In conclusion, this is the end of the document.
