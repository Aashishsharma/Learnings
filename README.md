# Learnings

[7:26 pm, 26/04/2022] Ashish: let createPromises = (displayval, timeout Insec) -> {
return new Promise((resolve) => {
setTimeout(0) -> {
console.log('setTimeout ${displayval} complete );
resolve('promise${displayval}')
}, timeout Insec1000)
})
}
(async() -> { // prom.all actual call
let result - await Promise.all([createPromises (1, 2), createPromises(2, 1)]); console.log((result})
})
const abc1 = (arrofpromises) => { // custom implementation
return new Promise((resolve, reject) -> {
let promExecutedcnt = ;
let returnval = []
arrofPromises.forEach((prom) -> {
if(typeof(prom) 'object') {
prom.then((result) -> {
promExecutedcnt++;
returnval.push(result);
if(promExecutedcnt --- arrofPromises.length) {
resolve(returnval);
}
I
})
} else
reject('invalid args)
1
»)
})
}
let abc async(arrofpromises) -> {
return await abc1(arrofpromises);
}
(async() -> { // same call to prom.all returning same result as prom. all
let result - await abc((createPromises (1, 2), createPromises (2, 1)]); console.log("custo promise all return , result)
()
[3:23 pm, 27/04/2022] Ashish: OOP starta here
[3:24 pm, 27/04/2022] Ashish: Constructor function with new keyword
[3:41 pm, 27/04/2022] Ashish: "use strict';
const Person = function (firstName, birthYear) {
// Instance properties
this.firstName = firstName;
this.birthYear = birthYear;
// Never to this because then all the objs will have their own copy of calcAge instaed use protoypal inheritance, where only 1 copy would be created
// this.calcAge = function () {
)
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
[3:50 pm, 27/04/2022] Ashish: Person.prototype.calcAge = function () {
console.log(2037 - this.birthYear);
};
jonas. calcAge();
matilda.calcAge();
.
console.log(jonas. proto);
console.log(jonas. proto ===
Person.prototype); // true
Person.prototype. species 'Homo Sapiens';
console.log(jonas. species, matilda. species);
console.log(jonas. hasOwn Property('firstName')); // true
console.log(jonas.hasOwn Property( 'species')); // false
I
[8:12 pm, 27/04/2022] Ashish: Using classes - classes are just syntactic sugar for achieving prototypal inheritance using function constructor and new keyword
[8:13 pm, 27/04/2022] Ashish: Below class code is exactly same as above
[8:13 pm, 27/04/2022] Ashish: // class expression
// const PersonCl = class {}

Il class declaration
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
console.log(jessica.proto
Personcl.prototype] =
[8:13 pm, 27/04/2022] Ashish: Then which to use
[8:13 pm, 27/04/2022] Ashish: Any based on ur preference
[8:14 pm, 27/04/2022] Ashish: 1. Classes are NOT hoisted
2. Classes are first-class citizes
3. Classes are executed in strict mode
[5:00 pm, 28/04/2022] Ashish: const Person = function (firstName, birthYear) {
this.firstName
this.birthYear
= firstName;
= birthYear;
};
Person.prototype.calcAge = function () {
console.log(2037 - this.birthYear);
};
const Student = function (firstName, birthYear,
course) {
// this is needed because if we directly call Person(), then its a function call and this woukd be undefined in the parent constructor
Person.call(this, firstName, birthYear);
this.course = course;
I
};
Student.prototype. introduce = function () {
console.log('My name is ${this.firstName} and I
study ${this.course}`);
};
const mike = new Student ('Mike', 2020, 'Computer
Science');
mike. introduce();
[5:00 pm, 28/04/2022] Ashish: Above is inheritance using function constructor
[5:01 pm, 28/04/2022] Ashish: This is exactly same as class inheritance using extend and super in classes in es6
[5:38 pm, 02/05/2022] Ashish: class Account {
// 1) Public fields (instances)
locale=navigator.language;
// 2) Private fields (instances)
#movements = [];
#pin;
constructor (owner, currency, pin) {
this.owner = owner;
this.currency = currency;
// Protected property
this. #pin = pin;
// this._movements = [];
// this.locale = navigator.language;
console.log(`Thanks for opening an account, $
{owner}');
}
// 3) Public methods
// Public interface
getMovements () {
return this. #movements;
}
deposit(val) {
this. #movements.push(val);