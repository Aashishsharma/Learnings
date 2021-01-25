## Jest
1. **Jest** - Testing JS framework and works with node, react, angular, mocha specific to node, features(0 config, snapshots, isolated n fast, code coverage inbuilt(--coverage)), start-(1. npm i jest, "test": "jest", 2. jest --inti 3. test('1+1=2',()=>{expect(sum(1,2).toBe(3))})
2. **Matchers** - expect(funcUnderTest).(toBe(), notToBe(), toEqual()/match/contain/throw, toBeNull/undefined/falsy/GreaterThan/LessThan)
3. **Testing async code** - test('',()=>{return fetchData().then(data =>{expect(data).toBe('ABC')})}), return imp, **using await** - test('',async ()=>{data = await fetchData();expect(data).toBe('ABC');})
4. **Setup and Teardown** - beforeEach(() => {}, beforeAll, after, use in/outside of describe
5. **Mocking** - 2 ways, 1. create mock func - (mockCB = jest.fn(x=>42+x), expect(mockCB.mock.calls.length).toBe(1)), 2. Mocking modules - (jest.mock('axios');val = axios.get.mockResolvedValue(resp); expect(expVal).toEq(val))
6. **Snapshot testing** - renders UI comp, takes a snapshot, compares it to a reference snapshot file, test fails if snapshots don't match(either update test/snapshot), npm i --save-dev react-test-renderer (import React, import renderer from 'react-test-renderer'; it('renders correctly', () => {const tree = renderer.create(<Link page="http://www.facebook.com">Facebook</Link>).toJSON();expect(tree).toMatchSnapshot();});), code review of snapshots, jest --updateSnapshot, jest --watch(ineractively update snapshot), **property matchers** - when comp renders dynamic val - renders Math.random() - (expect(tree).toMatchSnapshot({createdAt: expect.any(Date),id: expect.any(Number),});)
7. **Snapshot vs visual regression(backstop)** - sanpshot - only UI is verified, values are serialized, stored within text files, and compared using a diff algorithm.,  for logic do normal unit testing (above 1-5), visual regression - take screenshots of web pages and compare the resulting images pixel by pixel. Jest ADV - no flakiness n fast, visual regression requires real browser n diff browser render UI differently(use docker), in snapshot tests is run in cli
 
## Jest
Is a testing javascript framework and works with rpojects like node, react, angular (Mocha is specific to Node)  
It is simple to use  
**Features**
1. Zero config - config free for most JS projects
2. Snapshots - Make test which keep track of large objs. with ease
3. Isolated/Fast - By ensuring your tests have unique global state, Jest can reliably run tests in parallel. 
4. Code coverage out of the box - Generate code coverage by adding the flag --coverage.  

## Getting started
1. Installation
npm i --save-dev jest  
in pkg.json - "test": "jest"  
2. Simple test case
```javascript
//sum.js
function sum(a, b) {
  return a + b;
}
module.exports = sum;

// use test name as below for jest to understand
//sum.test.js
const sum = require('./sum');
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
```
3. Generate a basic configuration file (optional)  
Based on your project, Jest will ask you a few questions and will create a basic configuration file  
jest --init  
4. using bable  
npm i --save-dev babel-jest @babel/core @babel/preset-env  
then create a config file
```javascript
// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
```

## Matchers
Jest uses "matchers" to let you test values in different ways.  
Commonly used matchers  
```javascript
//exact equality - value and type of obj should be same
test('two plus two is four', () => {
  expect(2 + 2).toBe(4);
});

// not to be
test('two plus two is four', () => {
  expect(2 + 2).not.toBe(5);
});

//non stric equality - here type is ignored
// only value is verified
test('object assignment', () => {
  const data = {one: 1};
  data['two'] = 2;
  expect(data).toEqual({one: 1, two: 2});
});

//other matchers
test('null', () => {
  const n = null;
  expect(n).toBeNull();
  expect(n).toBeDefined();
  expect(n).not.toBeUndefined();
  expect(n).not.toBeTruthy();
  expect(n).toBeFalsy();
});
test('zero', () => {
  const z = 0;
  expect(z).not.toBeNull();
  expect(z).toBeDefined();
  expect(z).not.toBeUndefined();
  expect(z).not.toBeTruthy();
  expect(z).toBeFalsy();
});

//for numbers
test('two plus two', () => {
  const value = 2 + 2;
  expect(value).toBeGreaterThan(3);
  expect(value).toBeGreaterThanOrEqual(3.5);
  expect(value).toBeLessThan(5);
  expect(value).toBeLessThanOrEqual(4.5);
  // toBe and toEqual are equivalent for numbers
  expect(value).toBe(4);
  expect(value).toEqual(4);
});
test('adding floating point numbers', () => {
  const value = 0.1 + 0.2;
  //expect(value).toBe(0.3);           This won't work because of rounding error
  expect(value).toBeCloseTo(0.3); // This works.
});

//for strings
test('there is no I in team', () => {
  expect('team').not.toMatch(/I/);
});
test('but there is a "stop" in Christoph', () => {
  expect('Christoph').toMatch(/stop/);
});

//arrays and iterables
const shoppingList = [
  'diapers',
  'kleenex',
  'trash bags',
  'paper towels',
  'beer',
];
test('the shopping list has beer on it', () => {
  expect(shoppingList).toContain('beer');
  expect(new Set(shoppingList)).toContain('beer');
});

//exceptions
function compileAndroidCode() {
  throw new Error('you are using the wrong JDK');
}

test('compiling android goes as expected', () => {
  expect(compileAndroidCode).toThrow();
  expect(compileAndroidCode).toThrow(Error);
  // You can also use the exact error message or a regexp
  expect(compileAndroidCode).toThrow('you are using the wrong JDK');
  expect(compileAndroidCode).toThrow(/JDK/);
});
```

### Testing asynchronous code
```javascript
// promises
test('the data is peanut butter', () => {
  return fetchData().then(data => {
    expect(data).toBe('peanut butter');
  });
});
// Be sure to return the promise - if you omit this return statement,
// your test will complete before the promise returned from fetchData

test('the fetch fails with an error', () => {
  expect.assertions(1);
  return fetchData().catch(e => expect(e).toMatch('error'));
});

//Async Await
test('the data is peanut butter', async () => {
  const data = await fetchData();
  expect(data).toBe('peanut butter');
});

test('the fetch fails with an error', async () => {
  expect.assertions(1);
  try {
    await fetchData();
  } catch (e) {
    expect(e).toMatch('error');
  }
});
```

### Setup and Teardown
```javascript
// Repeating Setup For Many Tests
beforeEach(() => {
  initializeCityDatabase();
});
afterEach(() => {
  clearCityDatabase();
});
test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});
test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});

// One-Time Setup
beforeAll(() => {
  return initializeCityDatabase();
});
afterAll(() => {
  return clearCityDatabase();
});
test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});
test('city database has San Juan', () => {
  expect(isCity('San Juan')).toBeTruthy();
});
```
By default, the before and after blocks apply to every test in a file. You can also group tests together using a describe block. When they are inside a describe block, the before and after blocks only apply to the tests within that describe block.  
So jest also has describe  
```javascript
// Applies to all tests in this file
beforeEach(() => {
  return initializeCityDatabase();
});
test('city database has Vienna', () => {
  expect(isCity('Vienna')).toBeTruthy();
});
describe('matching cities to foods', () => {
  // Applies only to tests in this describe block
  beforeEach(() => {
    return initializeFoodDatabase();
  });
  test('Vienna <3 sausage', () => {
    expect(isValidCityFoodPair('Vienna', 'Wiener Schnitzel')).toBe(true);
  });
});
//first beforeall is run and then before each
//first aftereach is run and then afterall
```

### Mocking
2 Ways  
1. by creating a mock function to use in test code
2. writing a manual mock to override a module dependency.

**1. Creating a Mock function**  
```javascript
function forEach(items, callback) {
  for (let index = 0; index < items.length; index++) {
    callback(items[index]);
  }
}
//To test this function, we can use a mock function, and inspect
//the mock's state to ensure the callback is invoked as expected
const mockCallback = jest.fn(x => 42 + x);
forEach([0, 1], mockCallback);
// The mock function is called twice
expect(mockCallback.mock.calls.length).toBe(2);
// The first argument of the first call to the function was 0
expect(mockCallback.mock.calls[0][0]).toBe(0);

//All mock functions have this special .mock property, which is where 
//data about how the function has been called and what the function returned is kept

//These mock members are very useful in tests to assert how these functions get called
// The function was called exactly once
expect(someMockFunction.mock.calls.length).toBe(1);
// The first arg of the first call to the function was 'first arg'
expect(someMockFunction.mock.calls[0][0]).toBe('first arg');

//Mock return values
const myMock = jest.fn();
console.log(myMock());
// > undefined
myMock.mockReturnValueOnce(10).mockReturnValueOnce('x').mockReturnValue(true);
console.log(myMock(), myMock(), myMock(), myMock());
// > 10, 'x', true, true
```

**Mocking modules**
```javascript
// users.js
import axios from 'axios';
class Users {
  static all() {
    return axios.get('/users.json').then(resp => resp.data);
  }
}
export default Users;

// users.test.js
import axios from 'axios';
import Users from './users';
jest.mock('axios');
test('should fetch users', () => {
  const users = [{name: 'Bob'}];
  const resp = {data: users};
  axios.get.mockResolvedValue(resp);
  return Users.all().then(data => expect(data).toEqual(users));
});
```

**2. Writing manual mocks**  
To mock a module called user in the models directory, create a file called user.js and put it in the models/__mocks__ directory. Note that the __mocks__ folder is case-sensitive.

### Jest with Mongo
npm i @shelf/jest-mongodb --save-dev  
In jest config add  
{
  "preset": "@shelf/jest-mongodb"
}
```javascript
// your test file
const {MongoClient} = require('mongodb');
describe('insert', () => {
  let connection;
  let db;
  beforeAll(async () => {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
    });
    db = await connection.db(global.__MONGO_DB_NAME__);
  });
  afterAll(async () => {
    await connection.close();
    await db.close();
  });
  it('should insert a doc into collection', async () => {
    const users = db.collection('users');
    const mockUser = {_id: 'some-user-id', name: 'John'};
    await users.insertOne(mockUser);
    const insertedUser = await users.findOne({_id: 'some-user-id'});
    expect(insertedUser).toEqual(mockUser);
  });
});
```

## Snapshot testing
A typical snapshot test case renders a UI component, takes a snapshot, then compares it to a reference snapshot file stored alongside the test. The test will fail if the two snapshots do not match: either the change is unexpected, or the reference snapshot needs to be updated to the new version of the UI component.  
npm i --save-dev react-test-renderer
```javascript
// e.g. 
import React from 'react';
import renderer from 'react-test-renderer';
import Link from '../Link.react';
it('renders correctly', () => {
  const tree = renderer
    .create(<Link page="http://www.facebook.com">Facebook</Link>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
/// The first time this test is run, 
// Jest creates a snapshot file that looks like this:
exports[`renders correctly 1`] = `
<a
  className="normal"
  href="http://www.facebook.com"
  onMouseEnter={[Function]}
  onMouseLeave={[Function]}
>
  Facebook
</a>`;
```
The snapshot artifact should be committed alongside code changes, and reviewed as part of your code review process  
To update snapshots - jest --updateSnapshot or jest -u  
Failed snapshots can also be updated interactively in watch mode (--watch):  
From here you can choose to update that snapshot or skip to the next:  

**property matchers**  
Often there are fields in the object you want to snapshot which are generated (like IDs and Dates). If you try to snapshot these objects, they will force the snapshot to fail on every run:
```javascript
it('will fail every time', () => {
  const user = {
    createdAt: new Date(),
    id: Math.floor(Math.random() * 20),
    name: 'LeBron James',
  };
  expect(user).toMatchSnapshot();
})
//solution - use matchers
//matchers are checked before the snapshot is written or tested,
//and then saved to the snapshot file instead of the received value:
it('will check the matchers and pass', () => {
  const user = {
    createdAt: new Date(),
    id: Math.floor(Math.random() * 20),
    name: 'LeBron James',
  };
  expect(user).toMatchSnapshot({
    createdAt: expect.any(Date),
    id: expect.any(Number),
  });
});
//Any given value that is not a matcher will be
//checked exactly and saved to the snapshot:
```

#### When to use snapshot testing
1. Snapshot tests are a complement for conventional tests not a replacement  
In normal unit test, app's functionality is verified, in snapshots only UI is verified. So use both unit testing and snapshot testing. (consider snapshot as UI testing)  

#### Snapshot vs visual regression testing
Visual regression testing tools take screenshots of web pages and compare the resulting images pixel by pixel.  
With Snapshot testing values are serialized, stored within text files, and compared using a diff algorithm.  
**Jest adv. over regression**
1. No flakiness and fast  
Because tests are run in a command line runner instead of a real browser, the test runner doesn't have to wait for builds, spawn browsers, load a page and drive the UI to get a component. Also diff. browsers will render UI in different way, then we have to use docker. (in case od BakstopJS)

