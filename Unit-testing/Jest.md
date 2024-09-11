## Jest
1. **Jest** - Testing JS framework and works with node, react, angular, mocha specific to node, features(0 config, snapshots, isolated n fast, code coverage inbuilt(--coverage)), start-(1. npm i jest, "test": "jest", 2. jest --inti 3. test('1+1=2',()=>{expect(sum(1,2).toBe(3))})
2. **Matchers** - expect(funcUnderTest).(toBe(), notToBe(), toEqual()/match/contain/throw, toBeNull/undefined/falsy/GreaterThan/LT)
3. **Testing async code** - test('',()=>{return fetchData().then(data =>{expect(data).toBe('ABC')})}), return imp, **using await** - test('',async ()=>{data = await fetchData();expect(data).toBe('ABC');})
4. **Setup and Teardown** - beforeEach(() => {}, beforeAll, after, use in/outside of describe
5. **Mocking** - 2 ways, 1. create mock func - (mockCB = jest.fn(x=>42+x), expect(mockCB.mock.calls.length).toBe(1)), 2. Mocking modules - (jest.mock('axios');val = axios.get.mockResolvedValue(resp); expect(expVal).toEq(val))
6. **Snapshot testing** - renders UI comp, takes a snapshot, compares it to a reference snapshot file, test fails if snapshots don't match(either update test/snapshot), npm i --save-dev react-test-renderer (import React, import renderer from 'react-test-renderer'; it('renders correctly', () => {const tree = renderer.create(<`Link page="http://www.facebook.com"> Facebook</Link>`).toJSON();expect(tree).toMatchSnapshot();});), code review of snapshots, jest --updateSnapshot, jest --watch(ineractively update snapshot), **property matchers** - when comp renders dynamic val - renders Math.random() - (expect(tree).toMatchSnapshot({createdAt: expect.any(Date),id: expect.any(Number),});)
7. **Snapshot vs visual regression(backstop)** - sanpshot - only UI is verified, values are serialized, stored within text files, and compared using a diff algorithm.,  for logic do normal unit testing (above 1-5), visual regression - take screenshots of web pages and compare the resulting images pixel by pixel. Jest ADV - no flakiness n fast, visual regression requires real browser n diff browser render UI differently(use docker), in snapshot tests is run in cli
 
## React Testing
Testing in react is done with 2 libraries (Jest and RTL)  

1. **Jest** - it is a test runner (testing framework) - describe, test etc. function are part of this library
2. **RTL (React testing library)** - it provides a virtual DOM, that is used to verify behaviour of a component

## 1. JEST
![alt text](PNG/J1.PNG "Title") 

```javascript
import { render, screen } from '@testing-library/react'
import { Greet } from './Greet'
//Don't need to import describe/ test
describe('Greet', () => { // describe is used to group multiple tests, for logical grouping 
  // 1 test suit = 1 test file and not 1 describe block
  test('renders correctly', () => {
    render(<Greet />) // this creates a virtual DOM for Greet component
    const textElement = screen.getByText('Hello Guest') // screen is an obj, which allows to query VDOM
    expect(textElement).toBeInTheDocument() // this matchers like toBeInTheDOM is comming from jest-dom library which is a dependent of RTL library
    // to see all custom matchers - https://github.com/testing-library/jest-dom?tab=readme-ov-file#custom-matchers
  })
  test('renders a name', () => {
    render(<Greet name="Vishwas" />)
    const textElement = screen.getByText('Hello Vishwas')
    expect(textElement).toBeInTheDocument()
  })
})

// both describe and test functions have utility (only and skip) functions
// describe.only() // test.skip()
// e.g.
describe.only("Greet", () => {})

// test function can be replaced with it functions
// no difference
it('renders correctly', () => {
})

// test.skip() would be xit() and test.only would be fit()
```

### Coverage

![alt text](PNG/J2.PNG "Title") 

**coverage command**  

```json
// package.json
"scripts": {
  "test": "react-scripts test", // react-scripts runs the test which has jest, jest-dom installed
  "coverage": "npm run test --coverage --watchAll --collectCoverageFrom='src/components/**/*.{ts,tsx}' --collectCoverageFrom='!src/components/**/*.{type}'", 
  // run code coverage for all ts/tsx files and ignore all typescripts files

  // to setup code coverage thresholds
  "jest": {
    "coverageThreshold": {
      "global": {
        "lines": 80,
        "functions": 80,
        "branches": 80,
        "statements": -10
      }
    }
  }
  // jest will fail if less than 80% coverage for lines / branches/functions or more than 10 statements not covered

}
```

### Matchers

Besides below matchers - jest dom provides custom matchers related to virtual DOM  
[Jest-dom custom matchers](https://github.com/testing-library/jest-dom?tab=readme-ov-file#custom-matchers)

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


## 2. RTL (React testing library)

### Steps to test the components
1. Render the component in virtualDOM in test env (achieved using render method from RTL)
2. Find an element renderd by the component (achieved by RTL quereis, see below)
3. Assert agains the found element (use matchers from jest + custom matchers from jest-dom library)

### 1. RTL quereis
![alt text](PNG/J4.PNG "Title") 

![alt text](PNG/J3.PNG "Title") 


#### 1. getByRole()
1. This query will get html elements from RTL VDOM based on role attribute from HTML tags
2. By default most html elements have default roles even if we don't add them in html tag
3. role attribute are added to help assistive technologies understand the meaning of that tag

**default html roles**

| HTML Element   | Default Role         | Possible Values            |
|----------------|----------------------|----------------------------|
| `<a>`          | `link`               | `button`, `link`           |
| `<button>`     | `button`             | `button`, `link`           |
| `<input>`      | `textbox`            | `checkbox`, `textbox`      |
| `<select>`     | `combobox`           | `listbox`, `combobox`      |
| `<textarea>`   | `textbox`            | `textbox`, `combobox`      |
| `<img>`        | `img`                | `img`, `button`            |
| `<table>`      | `table`              | `table`, `grid`            |
| `<th>`         | `columnheader`       | `columnheader`, `rowheader`|
| `<ul>`         | `list`               | `list`, `group`            |
| `<ol>`         | `list`               | `list`, `group`            |
| `<li>`         | `listitem`           | `listitem`, `menuitem`     |
| `<nav>`        | `navigation`         | `navigation`, `group`      |
| `<header>`     | `banner`             | `banner`, `group`          |
| `<footer>`     | `contentinfo`        | `contentinfo`, `group`     |
| `<form>`       | `form`               | `form`, `search`           |

**Usage** - 

```javascript
const elem = screen.getByRole('textbox')

// we can pass optional 3rd argument
<body>
  <main aria-hidden="true">
    <button>Open dialog</button>
  </main>
  <div role="dialog">
    <button>Close dialog</button>
  </div>
</body> 

//getByRole('button') would only return the Close dialog-button. To make assertions about the Open dialog-button you would need to use 
getAllByRole('button', { hidden: true })
// other properties in options object
// name?: TextMatch,
// description?: TextMatch,
// selected?: boolean,
// checked?: boolean,
```

#### 2. getByLabelText() - This will search for the label that matches the given TextMatch  

```javascript


import {render, screen} from '@testing-library/react'
render(<Login />)
const inputNode = screen.getByLabelText('Username')
```

#### 3. getByPlaceholderText()
#### 4. getByText()
#### 5. getByAltText()
#### 6. getByTitle()
#### 6. getByTestId() - returns elements that have matching data-testid attribute

**what is data-testid attribute?** - 
1. Provide unique identifiers for testing purposes, used in unit and intergation testing to select DOM elements. 
2. Used in complex UIs to efficiently target elements
3. These attributes should not be pushed to production code
```javascript
<div data-testid="custom-element" />

import {render, screen} from '@testing-library/react'
render(<MyComponent />)
const element = screen.getByTestId('custom-element')
```
4. Removing data-testid attributes for prod
**Using bable**

```javascript
// npm install --save-dev babel-plugin-react-remove-properties
{
  "plugins": [
    ["babel-plugin-react-remove-properties", { "properties": ["data-testid"] }]
  ]
}
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

