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

## .tsconfig.json
```json
{
  "compilerOptions": {
  "rootDir": "./src", // compile ts file from this dir
  "outDir": "./build/js", // convert above files to js in this dir
  "target": "es2016", // compile ts to js in es2016
  "noEmitOnError": true // if true and if the file has compile error it won't be converted to js file // default = fasle
  },
  "include": [
    "src" // compile only files from src folder
  ]
}
```

## Basic types
If we don't provide any data type, ts will implicitly determine the datatype based on the value assigned

```typescript
// basic type
let myName: string = 'Dave'
let meaningOfLife: number;
let isLoading: boolean;
let album: any;

myName = 'John'
meaningOfLife = 42
isLoading = true
album = 5150

//functions
const sum = (a: number, b: string): number => {
    return a + b
}

// union type
let postId: string | number
let isActive: number | boolean

// intersection type
type CombinedType = Type1 & Type2 & Type3;
// e.g.
type Person = {
    name: string;
    age: number;
};
type Employee = {
    empId: string;
    jobTitle: string;
};
type PersonAndEmployee = Person & Employee;
//The PersonAndEmployee type now requires an object to have properties from both Person and Employee:
const john: PersonAndEmployee = {
    name: 'John',
    age: 30,
    empId: 'E123',
    jobTitle: 'Developer'
};

//regex type
let re: RegExp = /\w+/g
```

## Arrays and Objects
```typescript
// Arrays
let stringArr = ['one', 'hey', 'Dave'] // let stringArr: string[]
let guitars = ['Strat', 'Les Paul', 5150] // let guitars: (string | number)[]
let mixedData = ['EVH', 1984, true] // let mixedData: (string | number | boolean)[]

stringArr[0] = 'John'
stringArr[0] = 42 // error, since numbers can't be assigned to this arr
stringArr.push('hey')

// Tuple 
let myTuple: [string, number, boolean] = ['Dave', 42, true]

let mixed = ['John', 1, false]

myTuple[1] = 42
myTuple[1] = 'abc' // error since second elem of tuple needs to be a number
myTuple[3] = 123 // error since 4 elem is not present in the tuple

mixed = muTuple // works
myTuple - mized // error

// Objects
let myObj: object

// here ts automatically infers the type of prop1 and prop2
const exampleObj = {
    prop1: 'Dave',
    prop2: true,
}
exampleObj.prop1 = 42 // error

interface Guitarist {
    name?: string, // this prop can be optional
    active: boolean,
    albums: (string | number)[]
}

// or we can have a type alises instead of interface = 
// type Guitarist = {
//     name?: string, // this prop can be optional
//     active: boolean,
//     albums: (string | number)[]
// }

// whn to use interface vs type
// see functions section

let evh: Guitarist = {
    name: 'Eddie',
    active: false,
    albums: [1984, 5150, 'OU812']
}
let jp: Guitarist = {
    active: true,
    albums: ['I', 'II', 'IV']
}

evh.years = 1942 // error,  cannot add new properties since those are not present in the interface annotation

const greetGuitarist = (guitarist: Guitarist) => {
    if (guitarist.name) { // this is called typeguard or narrowing -- see below explaination
        return `Hello ${guitarist.name.toUpperCase()}!`
    }
    return 'Hello!'
}
console.log(greetGuitarist(jp))
// explaination - since name is an optional property that we have defined in the Guitarist interface
// ans in the function we are calling guitarist.name.toUpperCase() we might get an error
// cannot read prop toUpperCase() of undefined since name can be undefined based on the obj passed
// hence ts throws are error if we don't add this typeguuard or narrowing
// removing errors at development time

// Enums - are named constants to write more maintainable code
// by defaul in TS, enums are enumerated (numberd) starting with 0, we can also explicitly 
// give the number value
enum Grade { U, D, C, B, A, }
console.log(Grade.U) // output = 0, GRADE.D = 1

//e.g. user file permission check
enum FilePermission {NONE, READ, WRITE, EXECUTE}
// anyone who has access to write to a file, will also implicitly have access to read the file as well
// this method will let us know if user can access file, notice we are using > operator since enums are enumerated
const userCanAccessFile = (userPrem: FilePermission, filePerm: FilePermission): boolean => {
    return userPrem >= filePerm
}
console.log(userCanAccessFile(FilePermission.READ, FilePermission.EXECUTE)) // false
console.log(userCanAccessFile(FilePermission.EXECUTE, FilePermission.WRITE)) // true

// advantage of enum - everywhere in code we can use enum in if condition
// we don't have to manually checl if(abc === 'SOME_CONSTANT')
// if we have this condition everywhere in the code and if the constatn needs to be chanhed
// then everywhere we need to replace SOME_CONSTANT with SOME_CONSTANT1
// in case of enum, we just need to change it enum
```

## Functions

```typescript

// Type Aliases 
type stringOrNumber = string | number // can't do this using an interface
type stringOrNumberArray = (string | number)[]
type Guitarist = {
    name?: string,
    active: boolean,
    albums: stringOrNumberArray // here we used a type inside a type, we can do this when using an interface as well
}

type UserId = stringOrNumber
interface UserID = stringOrNumber // syntac error

// Literal types
// notice we are uing colon and not = sign
// while defining a literal type 
let myName: 'Dave' // this is equal to const
let myName = 'John' // error

let userName: 'Dave' | 'John' | 'Amy' // more than what const can do
userName = 'Amy'

// functions 
const add = (a: number, b: number): number => {
    return a + b
}
const logMsg = (message: any): void => {
    console.log(message)
}
logMsg('Hello!')
logMsg(add(2, 3))
logMsg(add('a', 3)) // error

// without arrow function syntax
let subtract = function (c: number, d: number): number {
    return c - d
}

// using type aliases to create a function signature
type mathFunction = (a: number, b: number) => number

// this can be done using interface as well
interface mathFunction {
  (a: number, b: number): number
}

// use type aliases intead of defining the function parameters and return type
let multiply: mathFunction = function (c, d) {
    return c * d
}

logMsg(multiply(2, 2)) // 4

// optional parameters 
const addAll = (a: number, b: number, c?: number): number => {
  // since c param is optional, we need to add a typeguard or ts will throw an error
    if (typeof c !== 'undefined') {
        return a + b + c
    }
    return a + b
}

// default param value
const sumAll = (a:number, b: number, c: number = 2): number => {
    return a + b + c
}

logMsg(addAll(2, 3, 2))
logMsg(addAll(2, 3))
logMsg(sumAll(2, 3))

// Rest Parameters 
const total = (a: number, ...nums: number[]): number => {
    return a + nums.reduce((prev, curr) => prev + curr)
}

logMsg(total(10, 2, 3)) // 15

// if a function has infinite loop or throws an error
// then return type is never
const createError = (errMsg: string): never => {
    throw new Error(errMsg)
}

// custom type guard 
const isNumber = (value: any): boolean => {
    return typeof value === 'number'
        ? true : false
}

// ts returns never type in case if a function throws error or has infinite loop
// use of the never type - Exhaustive check for union types (see below)
type Animal = "cat" | "dog" | "fish" ;
function getAnimalSound(animal: Animal): string {
    switch (animal) {
        case "cat":
            return "meow";
        case "dog":
            return "bark";
        case "fish":
            return "blub";
        default:
            const _exhaustiveCheck: never = animal; // Compile-time error if a case is missed
            return _exhaustiveCheck;
    }
}
// If you later add a new animal to the type, TypeScript will alert you to update this function.
console.log(getAnimalSound('cat')) // "meow"
// if we add cow in the ANimal union type in future, ts will throw error that switch case for cow is missed
```

## Type assertion

When you know what the datatype would be which ts can't determine implicitly, we use type assertion

```typescript
// e.g.
const htmlElem = document.getElementByID('myCanvas').innerHTML as HTMLCanvasElement
//using angled bracket syntax
const htmlElem = <HTMLCanvasElement>document.getElementByID('myCanvas').innerHTML
// angled bracket syntax can't be used in .jsx files, hence use as keyword
```

```typescript
type One = string
type Two = string | number // more genric, union type
type Three = 'hello' // more specific, literal type

// convert to more or less specific 
let a: Two = 'hello'
let c = a as One // more specific instead of string | number, c will now be a string

// using angled bracket
let d = <One>'world'
let e = <string | number>'world'

// usecase of type assertion
// return type of below func is number | string based on the value for c param (while is a literal type)
const addOrConcat = (a: number, b: number, c: 'add' | 'concat'): number | string => {
    if (c === 'add') return a + b
    return '' + a + b
}

// here if we don't use type asseriton using as keyword, we will get error
// type number | string cannot be assigned to type string
// since we are assigning myVal (string type) the return of addOrConcat function which is string | number
// hence we used type assertion
let myVal: string = addOrConcat(2, 2, 'concat') as string

// Be careful! TS sees no problem - but a string is returned
let nextVal: number = addOrConcat(2, 2, 'concat') as number

// The DOM 
const img = document.querySelector('img')! // adding ! at the end means it is a null type assertion
// which means that we know better than ts that this value is not null
const myImg = document.getElementById('#img') as HTMLImageElement
const nextImg = <HTMLImageElement>document.getElementById('#img')


// if we didn;t use type assertion in above code
// ts will throw error img is possiblly null and it implicitly infers the type of img as HTMLElement
// and no prop src exists on HTMLElement since p is also and html elem and it does not have src attribute
img.src

// now when we use as HTMLImageElement, ts understands that is it not null and has attribute src
myImg.src

```

## Classes
Access modifers in ts are same as that in Java, but only at compile time and not at run time

```typescript
class Coder {
    // by default, all the class members need to be initialized in constructor
    // if we don't want that
    secondLang: string

    // we need to specify access modifers for each of the members, if not provided we need to 
    // add them as class members outside of the constructor
    // default is public
    // access modifiers same as java, private, protected not accessible outside clss
    // protected avaiable to class and derived classes
    constructor(
        public readonly name: string,
        public music: string,
        private age: number,
        protected lang: string = 'Typescript' // default value for a variable
    ) {
        this.name = name
        this.music = music
        this.age = age
        this.lang = lang
    }

    public getAge() {
        return `Hello, I'm ${this.age}`
    }
}

const Dave = new Coder('Dave', 'Rock', 42)
console.log(Dave.getAge()) // 42

// ts will throw error, cannot access private / protected members outside class
// but if we have noEmmitOnError = true enabled in .tsconfig
// below code will work fin when compiled to .js
// hence set noEmitOnError to true
console.log(Dave.age) 
console.log(Dave.lang)

class WebDev extends Coder {
    constructor(
        public computer: string,
        private name: string,
        private music: string,
        private age: number,
    ) {
        super(name, music, age)
        this.computer = computer
    }

    public getLang() {
        return `I write ${this.lang}`
    }
}

const Sara = new WebDev('Mac', 'Sara', 'Lofi', 25)
console.log(Sara.getLang()) // I write typrscript
console.log(Sara.age) // error in ts, works in js
console.log(Sara.lang)
/////////////////////////////////////

interface Musician {
    name: string,
    instrument: string,
    play(action: string): string
}

class Guitarist implements Musician {
    name: string
    instrument: string

    constructor(name: string, instrument: string) {
        this.name = name
        this.instrument = instrument
    }

    play(action: string) {
        return `${this.name} ${action} the ${this.instrument}`
    }
}

const Page = new Guitarist('Jimmy', 'guitar')
console.log(Page.play('strums'))
//////////////////////////////////////

class Peeps {
    // count is a member of a class and not a member of an instance 
    static count: number = 0
    public id: number

    constructor(public name: string) {
        this.name = name
        this.id = ++Peeps.count
    }
}

const John = new Peeps('John')
const Steve = new Peeps('Steve')
const Amy = new Peeps('Amy')

console.log(Amy.id) // 3
console.log(Steve.id) // 2
console.log(John.id)// 1
console.log(Peeps.count) // 3
//////////////////////////////////
// getters and setters
// this is same as javascript, nothing new
// just a reminder that we can use all js functionalities in ts
class Bands {
    private dataState: string[]

    constructor() {
        this.dataState = []
    }

    // getter - if setter is not present then this prop is readonly
    public get data(): string[] {
        return this.dataState
    }

    public set data(value: string[]) {
        if (Array.isArray(value) && value.every(el => typeof el === 'string')) {
            this.dataState = value
            return
        } else throw new Error('Param is not an array of strings')
    }
}

const MyBands = new Bands()
// with getters and setters, we can assign and read values as normal - see below
// here getters and setter are called respectively
// we can do cutom validations using getters and setters
MyBands.data = ['Neil Young', 'Led Zep']
console.log(MyBands.data)
MyBands.data = [...MyBands.data, 'ZZ Top']
console.log(MyBands.data)
MyBands.data = ['Van Halen', 5150] // must be string data
```

## Type Guards

Type guards help ensure that your code is type-safe and make it easier to work with complex type hierarchies and union types  
1. Typeof typeguard
2. instanceof typeguard
3. custom typeguard   

if we don't add typeguards in case ts is not able to identify the type, ts will throw an error

```typescript
// 1. Typeof Typeguard
function isNumber(value: any): value is number {
    // here value is number is a type predicate in ts (see below)
    return typeof value === "number";
}
let x: number | string = 42;
if (isNumber(x)) {
    // Here, TypeScript knows that x is a number.
    x.toFixed(2);
}

// 2. instanceof typeguard
class Animal {
    speak() {
        console.log("Animal speaks");
    }
}
class Dog extends Animal {
    bark() {
        console.log("Dog barks");
    }
}
function speakOrBark(pet: Animal): void {
    if (pet instanceof Dog) {
        // TypeScript now knows that pet is a Dog.
        pet.bark();
    } else {
        pet.speak();
    }
}

// 3. custom typeguard
function isStringArray(arr: any[]): arr is string[] {
    return arr.every(item => typeof item === "string");
}
let data: (string | number)[] = ["apple", "banana", 42];
if (isStringArray(data)) {
    // TypeScript knows that data is a string array.
    data.push("cherry");
}

```

### Type predicate

A type predicate is a function that tells TypeScript to narrow the type of a value.  
It's like a filter for your variables to be more specific about their types.  

```typescript
function isNumber(value: any): value is number {
    return typeof value === "number";
}
//isNumber is a user-defined function.
//value is the variable you want to check the type of.
//value is number is the return type, indicating that if the function returns true,
//TypeScript should consider value to be of type number.
let x: number | string = 42;
if (isNumber(x)) {
    // Inside this block, TypeScript knows that x is a number.
    x.toFixed(2); // You can use number-specific methods.
} else {
    // Inside this block, TypeScript knows that x is a string.
    x.length; // You can use string-specific methods.
}
```

### Type compatibility / type inference

It is a feature that determines whether one type is assignable to another type

```typescript
// 1. Structural type compatibility typing

interface Animal {
    name: string;
}
interface Dog {
    name: string;
    breed: string;
}
let animal: Animal;
let dog: Dog;
animal = dog; // This is valid because Dog has all the properties of Animal.

let a: ("abc" | "pqr"); // literal type
a="pqr";
let abc: string;
abc = "qwe";
abc = a; // possible due to duck typing
a=abc // error since more generic type is being assigned to specific type

// 2. Duck typing
// "If it looks like a duck, swims like a duck, and quacks like a duck, then it probably is a duck." 
// object's type is determined at runtime based on its behavior
const object1 = { name: "Alice" };
const object2 = { name: "Bob" };

// Create a function that accesses the 'name' property.
function greet(obj: { name: string }) {
    console.log(`Hello, ${obj.name}!`);
}

// Call the function with both objects.
greet(object1); // Output: Hello, Alice!
greet(object2); // Output: Hello, Bob!

// We call the greet function with both object1 and object2, 
//even though there are no explicit type declarations or interfaces
// which are explicitly assinged to object1 and object2
// still ts doesnot complain due to duck typing

```

## Index Signatures

1. when we don't know what the obj properties would be  
2. if an object has dynamic property at runtime 
3. when we want to access obj properties dynamically

```typescript
// Index Signatures 

interface TransactionObj {
    Pizza: number,
    Books: number,
    Job: number
}

const todaysTransactions: TransactionObj = {
    Pizza: -10,
    Books: -5,
    Job: 50,
}

console.log(todaysTransactions.Pizza) // works
console.log(todaysTransactions['Pizza']) // works

let prop: string = 'Pizza'
console.log(todaysTransactions[prop]) // error since we are accessing obj property dynamically

// same error below when we are dynamically accessing obj property using the for in loop to get all the obj keys
const todaysNet = (transactions: TransactionObj): number => {
    let total = 0
    for (const transaction in transactions) {
        total += transactions[transaction]
    }
    return total
}

// to solve this probelm use index signatures
// syntax = use square brackets 
interface TransactionObj {
  [index: string]: number
  // all the object properties would be of string datatype 
  // and all the values of these properties would be of number datatpe
}

// we can also do
interface TransactionObj {
  [index: string | number ]: number | string
  // all the object properties would be of string / number datatype 
  // and all the values of these properties would be of number / string datatpe
}
console.log(todaysNet(todaysTransactions))

// but then we can have below problem
// property Dave doesn't exists but ts won't throw error because we use index signatures
console.log(todaysTransactions['Dave']) // undefined

// if we know that obj will definately have fixed properties and can have more
interface TransactionObj {
    [index: string]: number
    Pizza: number,
    Books: number,
    Job: number
}

///////////////////////////////////

interface Student {
    //[key: string]: string | number | number[] | undefined
    // since we have different datattypes of values below, we need to 
    // specify all the value types in the index signature
    // this is tedious, and if we dont want to use index signatres
    // we can use keyOf (see below)
    name: string,
    GPA: number,
    classes?: number[]
}

const student: Student = {
    name: "Doug",
    GPA: 3.5,
    classes: [100, 200]
}

// console.log(student.test)

for (const key in student) {
    console.log(`${key}: ${student[key as keyof Student]}`)
}

Object.keys(student).map(key => {
    console.log(student[key as keyof typeof student])
})

// as we know we need to use index signature to dynamically access
// obj keys, if we don't want to use index signatures
// we can use keyOf as below
const logStudentKey = (student: Student, key: keyof Student): void => {
    console.log(`Student ${key}: ${student[key]}`)
}

logStudentKey(student, 'name')


```

## Generics

```typescript
// syntax
// 1. syntax for function
function identity<T>(arg: T): T {
    return arg;
}
// 2. syntx for class
class GenericClass<T> {
    value: T;
    constructor(value: T) {
        this.value = value;
    }
}
// 3. syntax for generic array
function reverseArray<T>(array: T[]): T[] {
    return array.reverse();
}
// 4. syntax for generic interface
interface Pair<T, U> {
    first: T;
    second: U;
}


const echo = <T>(arg: T): T => arg

const isObj = <T>(arg: T): boolean => {
    return (typeof arg === 'object' && !Array.isArray(arg) && arg !== null)
}
console.log(isObj([1, 2, 3])) // false
console.log(isObj({ name: 'John' })) // true

///////////////////////////////////

const isTrue = <T>(arg: T): { arg: T, is: boolean } => {
    if (Array.isArray(arg) && !arg.length) {
        return { arg, is: false }
    }
    if (isObj(arg) && !Object.keys(arg as keyof T).length) {
        return { arg, is: false }
    }
    return { arg, is: !!arg }
}

console.log(isTrue(false)) // false is false
console.log(isTrue(0)) // 0 is false
console.log(isTrue(true)) // true is true
console.log(isTrue(1)) // 1 is true
console.log(isTrue('Dave')) // Dave is true
console.log(isTrue('')) // '' is false
console.log(isTrue(null)) // null is false
console.log(isTrue(undefined)) // undefined is false
console.log(isTrue({})) // false
console.log(isTrue({ name: 'Dave' })) // true
console.log(isTrue([])) // false
console.log(isTrue([1, 2, 3])) // true
console.log(isTrue(NaN)) // false
console.log(isTrue(-0)) // false

// above example using interface

interface BoolCheck<T> {
    value: T,
    is: boolean,
}

const checkBoolValue = <T>(arg: T): BoolCheck<T> => {
    if (Array.isArray(arg) && !arg.length) {
        return { value: arg, is: false }
    }
    if (isObj(arg) && !Object.keys(arg as keyof T).length) {
        return { value: arg, is: false }
    }
    return { value: arg, is: !!arg }
}

// using extends keyword we can add constraints to a generic type parameter
// this is used when a generic type needs to have required properties
// This is a way to ensure that the generic type parameter meets certain requirements 
// as shown below

interface HasID {
    id: number
}

const processUser = <T extends HasID>(user: T): T => {
    // process the user with logic here 
    return user
}
console.log(processUser({ id: 1, name: 'Dave' }))
console.log(processUser({ name: 'Dave'})) // error the object needs to have id property

//Another example of adding constraints to generic type using extends keyword
// see how we are using more than 1 generic type (T and K)
// k extends keyOf T means K must be a key of T (added constraints for K using extends keyword)

const getUsersProperty = <T extends HasID, K extends keyof T>(users: T[], key: K): T[K][] => {
    return users.map(user => user[key])
}

const usersArray = [
    {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
        "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
                "lat": "-37.3159",
                "lng": "81.1496"
            }
        },
        "phone": "1-770-736-8031 x56442",
        "website": "hildegard.org",
        "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
        }
    },
    {
        "id": 2,
        "name": "Ervin Howell",
        "username": "Antonette",
        "email": "Shanna@melissa.tv",
        "address": {
            "street": "Victor Plains",
            "suite": "Suite 879",
            "city": "Wisokyburgh",
            "zipcode": "90566-7771",
            "geo": {
                "lat": "-43.9509",
                "lng": "-34.4618"
            }
        },
        "phone": "010-692-6593 x09125",
        "website": "anastasia.net",
        "company": {
            "name": "Deckow-Crist",
            "catchPhrase": "Proactive didactic contingency",
            "bs": "synergize scalable supply-chains"
        }
    },
]

console.log(getUsersProperty(usersArray, "email")) // return emailIds for all users ["Sincere@april.biz", "Shanna@melissa.tv"]
console.log(getUsersProperty(usersArray, "username")) // return username for all users

///////////////////////////////////////

class StateObject<T> {
    private data: T

    constructor(value: T) {
        this.data = value
    }

    get state(): T {
        return this.data
    }

    set state(value: T) {
        this.data = value
    }
}

const store = new StateObject("John") // this is where now the generic type is string
console.log(store.state)
store.state = "Dave" // works
store.state = 12 // error

// notice here how we can specify the generic type while calling the constructor
const myState = new StateObject<(string | number | boolean)[]>([15])
myState.state = ['Dave', 42, true]
console.log(myState.state)

// see how we created differnt object types from a genric class
// so in same obj instance, type needs to be same
// in different obj instance, we define the type since the class is generic
```

## Utility types

It is a feature in TypeScript that allow you to create new types by transforming the properties of an existing type
Common utility types  

```typescript
// Utility Types 
// 1. Partial<T> - creates a new type by making all properties of an existing type T optional
interface Assignment {
    studentId: string,
    title: string,
    grade: number,
    verified?: boolean,
}

// see how in Partial<Assignment> - we don't have to pass entire Assignmnet type object
const updateAssignment = (assign: Assignment, propsToUpdate: Partial<Assignment>): Assignment => {
    return { ...assign, ...propsToUpdate }
}

const assign1: Assignment = {
    studentId: "compsci123",
    title: "Final Project",
    grade: 0,
}
console.log(updateAssignment(assign1, { grade: 95 }))
const assignGraded: Assignment = updateAssignment(assign1, { grade: 95 })

// 2. Required<T> - opposite of Partial. It makes all properties of an existing type T required
// here all the props of assignemnet objtect type are required
// we see in the assignment interface above, that verified prop is optional, but when we add required
// even the verified optional prop becomes required
const recordAssignment = (assign: Required<Assignment>): Assignment => {
    // send to database, etc. 
    return assign
}

// 3. Readonly<T> - creates a new type with all properties of an existing type T marked as read-only, preventing any modifications.
const assignVerified: Readonly<Assignment> = { ...assignGraded, verified: true }
assignVerified.grade = 22 // error -readonly

recordAssignment({ ...assignGraded, verified: true })

// 4 ReadonlyArray - make entire array readonly
const roArray: ReadonlyArray<string> = ["red", "green", "blue"];

// 4. Record<K, T> - creates a new type with keys of type K and values of type T. It's useful for creating dictionaries or mapping types.
// using records, we can
const hexColorMap: Record<string, string> = {
    red: "FF0000",
    green: "00FF00",
    blue: "0000FF",
}

type Students = "Sara" | "Kelly"
type LetterGrades = "A" | "B" | "C" | "D" | "U"

const finalGrades: Record<Students, LetterGrades> = {
    Sara: "B",
    Kelly: "U", // if we give any other grade, ts will throw an error
}

// record using interface
interface Grades {
    assign1: number,
    assign2: number,
}

// in the record, keys needs to be of type students
// and values needs to be of type Grades
const gradeData: Record<Students, Grades> = {
    Sara: { assign1: 85, assign2: 93 },
    Kelly: { assign1: 76, assign2: 15 },
}
// 5. Pick<T, K> - creates a new type by selecting a subset of properties from an existing type T specified by the keys K
// pick studentId and grade from Assignment interface and create this as a new type

type AssignResult = Pick<Assignment, "studentId" | "grade">

const score: AssignResult = {
    studentId: "k123",
    grade: 85,
}

// 6. Omit<T, K> - opposite of Pick
// Omit grade and verified propss
type AssignPreview = Omit<Assignment, "grade" | "verified">

const preview: AssignPreview = {
    studentId: "k123",
    title: "Final Project",
}

// 7. Exclude and Extract 

type adjustedGrade = Exclude<LetterGrades, "U">

type highGrades = Extract<LetterGrades, "A" | "B">

//Exclude and Extract are utility types in TypeScript that are designed for specific use cases involving filtering and selecting values from union types. 
//On the other hand, Pick and Omit are utility types used for selecting and excluding properties from object types. 

// 8. Nonnullable  - omit null and undefined

type AllPossibleGrades = 'Dave' | 'John' | null | undefined
type NamesOnly = NonNullable<AllPossibleGrades>

// 9. ReturnType - used to extract the return type of a function type
// useful when working with external libraries where function returns can change on library update

// earlier scenario (before returntype)
type newAssign = { title: string, points: number }

const createNewAssign = (title: string, points: number): newAssign => {
    return { title, points }
}
// we had to explicitly mention the return type, now if we change the return val of a function
// we need to modify the newassign type also
// instead of that use the return type as below

const createNewAssign = (title: string, points: number) => {
    return { title, points }
}
type NewAssign = ReturnType<typeof createNewAssign>
// here even if we change the return type of a function, everything works no changes required in the types
const tsAssign: NewAssign = createNewAssign("Utility Types", 100)
console.log(tsAssign)

// 10. Parameters - used to extract parameters type of a function type

type AssignParams = Parameters<typeof createNewAssign>
// now AssignParams have the type of createNewAssign functions parameter type
// this is equivalent to
type AssignParams = [
  title: string,
  points: number
]
// so instead of manually creating type for func parameter, we use the Parameter utility function

const assignArgs: AssignParams = ["Generics", 100]

const tsAssign2: NewAssign = createNewAssign(...assignArgs)
console.log(tsAssign2)

// 11. Awaited - used with the ReturnType of a Promise 

interface User {
    id: number,
    name: string,
    username: string,
    email: string,
}

const fetchUsers = async (): Promise<User[]> => {

    const data = await fetch(
        'https://jsonplaceholder.typicode.com/users'
    ).then(res => {
        return res.json()
    }).catch(err => {
        if (err instanceof Error) console.log(err.message)
    })
    return data
}

type FetchUsersReturnType = Awaited<ReturnType<typeof fetchUsers>>
// if we don't add awaited above, the type for FetchUsersReturnType would be Promise<Users[]>
// after adding awaited the type for FetchUsersReturnType would be Users[]
fetchUsers().then(users => console.log(users))

// 12. Conditional -  create types that depend on some condition
// TypeScript's conditional type operator syntax (T extends U ? X : Y) 
type ConditionalMappedType<T> = {
    [K in keyof T]: T[K] extends SomeCondition ? X : Y;
};

// another working example
type Product = {
    [index: string]: string | number;
    name: string;
    stockQuantity: number;
};

type StockStatus<T> = {
    [K in keyof T]: T[K] extends { stockQuantity: 0 } ? "out of stock" : "available";
};

type ProductStatus = StockStatus<Product>;

const products: Product[] = [
    { name: "Product A", stockQuantity: 5 },
    { name: "Product B", stockQuantity: 0 },
    { name: "Product C", stockQuantity: 10 },
];

const productStatus: ProductStatus = products.reduce((result, product, index) => {
    const key = `product${index + 1}` as keyof ProductStatus;
    (result as any)[key] = product.stockQuantity === 0 ? "out of stock" : "available";
    return result;
}, {} as ProductStatus);

// Log the stock status of each product.
for (const key in productStatus) {
    console.log(`Product: ${key}, Stock Status: ${productStatus[key] as any}`);
}

```

## Decorators (usecase for building libraries - NestJS / TypeORM)

Addes meta-deta, used for meta-programming  
**metaprogramming** - programming is to write code that processes user data  
**metaprogrmming - is to write code that processes code that processes user data**  

#### Behind the scenes 

1. client code using the decorator

```javascript
class C {
  @trace // trace is the decorator on function
  toString() {
    return 'C';
  }
}
```

2. behind the scenes

```javascript
C.prototype.toString = trace(C.prototype.toString);
// this indicates that for each instance of class C
// the toString method is changed to a new method
// trace(C.prototype.toString) - we call our custom decorator function
// passing in the existing mthod, then trace and add more functionlaity to the existing function
// this was the decorators work
```

### Decorator types

#### Class decorator - ClassDecorator

**Syntax for creating a decorator** -
1. It should be a function
2. will have 2 params **1. Baseclass** - on which the decorator needs to be applied **2. Context** - which has different props like - 
```javascript
context: {
    kind: string; // class, method, field
    name: string | symbol;
}
```
3. Since we are altering a behavior of a given class using class decorator, the function should return a new class which extends the given class
4. In this new class, we can add whatever new functionality, metadata that we want to add
5. **syntax**
```javascript
function withEmploymentDate<T extends { new(...args: any[]): {} }>(baseClass: T, context: ClassDecoratorContext) {
    return class extends baseClass {
        employmentDate = new Date().toISOString(); // new property added for each instance if this decorator is used
        constructor(...args: any[]) {
            super(...args);
            console.log('Adding employment date to ' + baseClass.name)
        }
    }
}
```

#### Example usecase (Add new properties, add logs, seal all objects, keep track of all instances)
```javascript
class InstanceCollector {
    instances = new Set();

    install = <T extends {new (...args: any[]) :{} }>(baseClass: T, context: ClassDecoratorContext) => {
        let me = this;
        return class extends baseClass {
            
            constructor(...args: any[]) {
                super(baseClass);
                me.instances.add(this)
            }

        }

    }
}
let instanceCollector = new InstanceCollector();

function sealed(constructor: Function, context: ClassDecoratorContext) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

function withEmploymentDate<T extends { new(...args: any[]): {} }>(baseClass: T, context: ClassDecoratorContext) {
    return class extends baseClass {
        employmentDate = new Date().toISOString();
        constructor(...args: any[]) {
            super(...args);
            console.log('Adding employment date to ' + baseClass.name)
        }
    }
}

@withEmploymentDate
@sealed
@instanceCollector.install
class Manager {

    task: string = 'Simple task'
    project: string = 'Simple project'

    constructor(){
        console.log('Initializing the Manager class')
    }
}
 
const manager1 = new Manager();
const manager2 = new Manager();
const manager3 = new Manager();
console.log(manager1) // this has a new property employmentDate

console.log('instances: ', instanceCollector.instances); // returns set we 3 class instances

```


Class decorators
Method decorators
Property decorators
Parameter decorators

## Typescript with React
see react-typescript project

## Typescript with ftech api
```typescript

// Define an interface for the expected response data structure
interface ApiResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Create a function that makes a Fetch request
async function fetchTodo(id: number): Promise<ApiResponse> {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: ApiResponse = await response.json();
  return data;
}

// Usage example
const todoId = 1;
fetchTodo(todoId)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error(error);
  });

```
