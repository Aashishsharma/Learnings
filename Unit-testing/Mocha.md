## Mocha
Mocha is a JavaScript unit test framework running on Node.js and in the browser.  
**install**  
npm i mocha chai --save-dev  

**run**  
mocha  
By default mocha looks for test	folder, so you should have a test folder, and in pkg.json "test": "mocha"  
Sample test, assuming app.js has a function add  
```javascript
// appTest.js
// Arrange-Act-Assert (AAA testing)
// some funky terminology
// it says frst arrange the data
// then act - call the actual test
// then assert the result
const assert = require('chai').assert;
const app = require('../app');

describe('App', function() {
	it('app should return 2 for 1+1', function() {
		// Arrange
		const firstParam = 1, secondParam = 2;
		const expected = 2;
		// Act
		const result = app.add(firstParam + secondParam);
		// Assert
		assert.equal(result, expected);
	});

	it('app should returna number', function() {
		const result = app.add(1+1);
		assert.typeOf(result, 'number');
	});
});
// we can have nested describe for better modularity
// don't use arroow functions here as they don't have this
// so this will not work
describe('my suite', () => {
  it('my test', () => {
    // should set the timeout of this test to 1000 ms; instead will fail
    this.timeout(1000);
    assert.ok(true);
  });
});
```

#### Hooks
used to set up preconditions and clean up after your tests.  
```javascript
describe('hooks', function () {
  before('some description', function () {
    // runs once before the first test in this block
  });
  after('some description', function () {
    // runs once after the last test in this block
  });
  beforeEach('some description', function () {
    // runs before each test in this block
  });
  afterEach('some description', function () {
    // runs after each test in this block
  });
  // test cases
});
```

#### .only() .skip()
To run only the specified suite or test-case by appending .only() to the function  
By appending .skip(), you may tell Mocha to ignore test case(s). Anything skipped will be marked as pending, and reported as such.
```javascript
describe('Array', function () {
  describe.only('#indexOf()', function () {
    // ...
  });
});

describe('Array', function () {
  describe.skip('#indexOf()', function () {
    // ...
  });
});
// both skip and only can be added to it as well, it.only()
```
you may find a significant performance benefit when running tests in parallel (using the --parallel flag).  
Parallel tests should work out-of-the box for many use cases.  
**limitations of oarallel tests**  
1. EXCLUSIVE TESTS ARE DISALLOWED (i.e, cannot use only and skip)
2. FILE ORDER IS NON-DETERMINISTIC - Mocha does not guarantee the order in which test files will run, nor which worker process runs them
3. Parallel mode is only available in Node.js, for now.

## Chai
It is an assertion library. Node has inbuilt assertion, but chai is more powerful.

#### expect and should
The BDD styles are expect and should  
Few chainable getters to improve the readability of your assertions.  
```javascript
expect({a: 1}).to.not.have.property('b');
expect([1, 2]).to.be.an('array').that.does.not.include(3);

expect(2).to.equal(2); // Recommended
expect(2).to.not.equal(1); // Not recommended

//own
expect({a: 1}).to.have.own.property('a');
expect({a: 1}).to.have.property('b');

//any 
expect({a: 1, b: 2}).to.not.have.any.keys('c', 'd');

//all
expect({a: 1, b: 2}).to.have.all.keys('a', 'b');

//type
expect('foo').to.be.a('string');
expect({a: 1}).to.be.an('object');

//When the target is a string, .include asserts 
// that the given string val is a substring of the target.
expect('foobar').to.include('foo');
expect([1, 2, 3]).to.include(2);

//exists
expect(1).to.equal(1); // Recommended
expect(1).to.exist; // Not recommended

//there are many many more chainables
```

#### assert
```javascript
// .equal(actual, expected, [message])
assert.equal(3, '3', '== coerces values to strings'); // type ignored
assert.strictEqual(true, true, 'these booleans are strictly equal') // type also verified

//not equal
assert.notEqual(3, 4, 'these numbers are not equal');
assert.notStrictEqual(3, '3', 'no coercion for strict equality');

//fail
assert.fail();
assert.fail("custom error message");
assert.fail(1, 2);
assert.fail(1, 2, "custom error message");

//above,least,atmost
assert.isAbove(5, 2, '5 is strictly greater than 2');
assert.isAtLeast(5, 2, '5 is greater or equal to 2');
assert.isAtLeast(3, 3, '3 is greater or equal to 3');
assert.isBelow(3, 6, '3 is strictly less than 6');

//isarray
var menu = [ 'green', 'chai', 'oolong' ];
assert.isArray(menu, 'what kind of tea do we want?')
//similarly is object is null, is undefined, isNumber and so on
// there are many many more methods available for assert
```

## sinon
Standalone test spies, stubs and mocks for JavaScript.  
Works with any unit testing framework (like Mocha).
```javascript
npm install sinon

var sinon = require('sinon');
```
#### Test doubles
Test doubles are used to replace anything that is external (like network reqeust, db call, settimeouts), and makes tests easier to wirte.  
3 Test doubles  
###### **1. Spies**
Record info of func calls like
1. number of times it is called
2. arguments
3. return, this value
4. expections thrown  

**Case 1: anonymous functions**
```javascript
function callbackMe(callback) {
	callback();
}
describe('Test me', function() {
	it('test callback', function() {
		let cbspy = sinon.spy();
		callbackMe(cbspy);
		expect(cbspy).to.have.been.called.once;
	})
})
```
**Case 2: Wrap an existing method**
```javascript
const user = {
	setName: function(name) {
		this.name = name;
	}
}
describe('setname function', function() {
	it('should be called with name', function() {
		let setNameSpy = sinon.spy(user, 'setName');
		user.setName('Harry Potter');
		expect(setNameSpy).to.have.been.called.once;
		expect(setNameSpy).to.have.been.calledWith('Harry Potter');
		//IMP! remove spy at end to avoid errors
		setNameSpy.restore()
	})
})
```
use spy to test the flow of some bigger functions just to make sure that the ineer functions are called with expected values and called expected times with expected return

###### **2. Stubs**
Have all functionlaities of spies, but in addition they can replace the target function  
In spy function behaviour is not changed, but stubs can change those  
function behaviour chaanges include  
1. changing returning value
2. throwing specific exception
3. invokes callback with provided arguments

**When to use stubs**
1. Replacing network requests/ DB calls
```javascript
function saveUser(user, callback) {
  jQuery.post('/users', {
    first: user.firstname,
    last: user.lastname
  }, callback);
}
// Let’s say we want to ensure the callback function passed to 
// saveUser is called correctly once the request finishes.
describe('saveUser', function() {
  it('should call callback after saving', function() {
    //We'll stub $.post so a request is not sent
    //syntax - sinon.stub(object, 'method')
    var post = sinon.stub(jQuery, 'post');
    post.yields(); // calling the first callback it received
    //we can pass args above if our callback had any, yield is mandaotry in stub
    //We can use a spy as the callback so it's easy to verify
    var callback = sinon.spy();
    saveUser({ firstname: 'Han', lastname: 'Solo' }, callback);
    post.restore();
    sinon.assert.calledOnce(callback);
  });
});
```

###### **3. Mocks**
Mocks (and mock expectations) are fake methods (like spies) with pre-programmed behavior (like stubs) as well as **pre-programmed expectations**.  
In Mock you set the expectations but not in stub.  
They are primarily useful if you need to stub more than one function from a single object. If you only need to replace a single function, a stub is easier to use.  
Not much unserstandable but rememebr the diff between stub and a mock  
Mock - initialize -> set expectations -> exercise -> verify pattern to testing.  
While the pre-written stub would follow an initialize -> exercise -> verify.  
no expectation in stub  
 
