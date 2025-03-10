## REACT?

 A javascript library.
 Js's most popular library on github, by facebook

------------------------------------------------------------------------------

## WHY REACT? / Advantages

1. flexibility
2. popular
3. html in js and not vice versa
4. for other frameworks need to learn their syntaxes React uses js syntax
5. performace - using React will lead to a fast user interface without doing much work to specifically optimize for performance and ther is a virtual DOM. Generally in js DOM operations are the costliest and React handles DOM operations (in batch at appropriate time )and not users
6. It has one-way binding, so debugging is easy
7. separation of concerns
8. inversion of control

------------------------------------------------------------------------------

## CREATING A REACT APP

npx create-react-app **app-name** || npm init react-app **app-name**
Note- you must uninstall create-react-app if it was previously installed globally, and then install it and
then run above command.
Because create-react-app needs a template to be passed

create-react-app needs Node >=8.10

------------------------------------------------------------------------------

## NPX?

 A tool for executing Node packages. (npX - Execute)

------------------------------------------------------------------------------

## ReactDOM

It is a library which renders React components to the HTML DOM 
Reconcialition
The process that ReactDOM does is called as Reconcialition

#### How Reconcialition works internally?

1. React's reconciliation process is designed for efficiency, reducing the number of actual DOM manipulations to enhance performance.
2. The Virtual DOM serves as an intermediary, allowing React to make intelligent decisions about updating the actual DOM while abstracting direct DOM manipulations.
3. Strategies like element diffing, key-based optimizations, and batched updates contribute to React's ability to optimize UI updates.

###### Using the Diffing Algorithm

------------------------------------------------------------------------------

## JSX (it is not mandatory)

 it is a syntax extension to JavaScript

```javascript
const element = <h1>Hello, world!</h1>; 
```

neither html nor js
Why? Adv?
 Instead of artificially separating technologies by putting markup and logic in separate files,
React separates concerns with loosely coupled units called “components” that contain both
 JSX Prevents Injection Attacks
By default, React DOM escapes any values embedded in JSX before rendering them
Everything is converted to a string before being rendered. This helps prevent XSS (cross-site-scripting) attacks.

e.g. JSX

 ```javascript
 const element = <div tabIndex="0"></div>;
 const element = <img src={user.avatarUrl} />;

 ```

```javascript
<MyButton color="blue" shadowSize={2}>
  Click Me
</MyButton>

//compiles to 
React.createElement(
  MyButton,
  {color: 'blue', shadowSize: 2},
  'Click Me'
)
// thus react must be in scope i.e, import React from 'react'
```
User-Defined Components Must Be Capitalized.
#### Children in JSX
```javascript
<MyComponent>Hello world!</MyComponent>
```
This is valid JSX, and props.children in MyComponent will simply be the string "Hello world!". 

------------------------------------------------------------------------------

## REACT ELEMENTS

  smallest building blocks of React apps, they are plain objects
e.g.  

```javascript
const element = <h1>Hello, world</h1>;
```

rendering an element  

```javascript
const element = <h1>Hello, world</h1>;
    ReactDOM.render(element, document.getElementById('root'));
```

React elements are immutable. Once you create an element, you can’t change its children or attributes

------------------------------------------------------------------------------

## COMPONENTS

 components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements
describing what should appear on the screen.

1. Function components

  ```javascript
  Function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
```

2. Class components

```javascript
 class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

Note: Always start component names with a capital letter.
      All React components must act like pure functions with respect to their props.

  Components can be stored in js variables  

  ```javascript
  button = <LogoutButton onClick={this.handleLogoutClick} />;
  ```

    and can be used in render as {button}
------------------------------------------------------------------------------

## CLASS COMPONENTS

 setting state

   ```javascript
   this.setState({comment: 'Hello'});
   ```

The only place where you can assign this.state is the constructor.

React may batch multiple setState() calls into a single update for performance.

Because this.props and this.state may be updated asynchronously,
you should not rely on their values for calculating the next state

```javascript
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});

// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```

[Lifecycle](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

------------------------------------------------------------------------------

## Order of execution when a component redners or gets updated

1. fist functional body is executed
2. then the render method
3. anything inside useeffect

```javascript
import React, {useEffect, useState} from 'react';

export function App(props) {
  // 2
  console.log('Output No. 2')
  const [state, setState] = useState(1)

  useEffect(() => {
    // 4
    console.log('Output No. 4')
    setTimeout(() => {
      setState(state + 1)
    },1000)
    // on state update, i.e after every 1 sec in above code
    // output 2, 3, 4 would be console logged in sequence
    // that means, on state update, the function body (output 2) is also executed
  },[state])
  return (

    <div className='App'>
    {// 3
      console.log('Output No. 3')
    }
      <h1>Hello React.</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}

// 1
console.log('Output No. 1')

```

### Re-render cases

1. If we setState same value as previous val, component won't re-render

#### 1. Array and objects

React won't re-render if we mutate arrays or objects, we need to create a new reference to array / objs and then use it in setState to cause the re-render  

**Using arrays and objects as state variables**  
Usestate for array use spread operator to update array as state

1. Add at end [...oldarr, newItem]  
2. Add at start [newItem, ...oldarr]  
3. Add in between [...oldarr.slice(0,index), newItem, oldarr.slice(index)]

**if we do array.push() in the state variable, the state varibale gets updated but the compoent is not re-renderd**

Remove array elem  

1. remove first - Use slice(1)
2. remove last - slice(0, len-1)
3. remove inbetween [...oldarr.slice(0, index), ...oldarr.slice(index+1)


## Updating props

1. updating props causes the component to re-render only if the prop is updated in the parent component
2. they say the props are immutable in the child component, it means it is a convention, you can mutate the prop in the child component as well, but it will not cause the child component to re-redner and there is no use of updating the prop in the child component

```javascript
// ParentComponent.js
import React, { useState } from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => {
  const [value, setValue] = useState(0);
  const handleUpdate = () => {
    setValue(value + 1);
  };
  return (
    <div>
      <button onClick={handleUpdate}>Update Parent</button>
      <ChildComponent propFromParent={value} />
    </div>
  );
};
export default ParentComponent;

// ChildComponent.js
import React, { useEffect } from 'react';

const ChildComponent = ({ propFromParent }) => {
  useEffect(() => {
    // when update button is clicked in the parent component
    // props changes and useEffect and render method of this child component is called
    console.log('ChildComponent has re-rendered');
  }, [propFromParent]);
  // even if his propFromParent dependency is not present in the use Effect
  // the console log in the below render method gets called when the prop changes

  const handleUpdate = () => {
    // when uodate child button ic clicked, we can still update the propFromParent value as shown below
    propFromParent = 123;
    // but this will not trigger useEffect or the render mehtod of this child component
  }

  return (
    <div>
    {console.log('ChildComponent has re-rendered');}
      <p>Prop from Parent: {propFromParent}</p>
      <button onClick={handleUpdate}>Update Child</button>
    </div>
  );
};

export default ChildComponent;

//Note = when new state is same as old state
// parent and child don't re-render
// i.e, when setValue(value + 1) is changed to setValue(value);
// both parent and child are not re-rendered
```

#### State vs props

1. use state in whichever components required
2. if multiple components required same state, lift the state to closest parent
3. if a value can be derieved from both state and props, it should always be props

## HANDLING EVENTS

 very similar to handling events on DOM elements

```javascript
HTML ->
 <button onclick="handleClick()">
          Activate Lasers
        </button>
```

In DOM you need to call addEventListener to add listeners to a DOM element after it is created

```javascript
REACT  
<button onClick={handleClick}>
          Activate Lasers
         </button>
Arrow syntax   <button onClick={() => this.handleClick()}>
                  Click me
                 </button>
```

In React to add event listeners

```javascript
this.handleClick = this.handleClick.bind(this);
```

Passing argument to event handler

```javascript
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
 Arrow syntax  <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
```

#### How to lift state up?

by making a component “controlled”. Just like the DOM <input> accepts both a value and an onChange prop

```javascript
In child component - 
  <input value={temperature} onChange={handleChange} />
  handleChange(e) {
  props.onTemperatureChange(e.target.value);
  }
In Parent component - 
  <TemperatureInput
      temperature={celsius}
      onTemperatureChange={handleCelsiusChange} />
```

------------------------------------------------------------------------------

## FORMS IN REACT

default HTML form behaviour is available, but generally not used
techniques for implementing input forms

#### 1. Controlled components -> form element whose value is controlled by React

Full example

```javascript
  import React, { useEffect, useState } from 'react';

const ChildComponent = ({ propFromParent }) => {
  const [state, setState] = useState({value: ''})

    const handleChange = (event) => {
      setState({value: event.target.value});
    }

    const handleSubmit = (event) => {
      alert('A name was submitted: ' + state.value);
      event.preventDefault();
    }
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={state.value} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  
};
export default ChildComponent;
```

###### 2. Uncontrolled components -> not contolled by react or by parent component

**Key points - a component is uncontrolled component when -** 
1. The values elements in the component are controlled by DOM and not by React
2. When values of elements in the component is contolled by a parent component and not by the component itself


```javascript
// here we hide the default choose file html button
// and use our cutom icon button, and when that button is clicked
// we simulate the file clic event
const ref = useRef(null)
  return (<>
    <input type="file" ref={ref} hidden></input>
    <button onClick={() => ref.current.click()}>Custom file icon</button>
  </>
  )
```

------------------------------------------------------------------------------

## COMPOSITION VS INHERITANCE

###### COMPOSITION recommended over INHERITANCE

```javascript
  function SplitPane(props) {
    return (
      <div className="SplitPane">
        <div className="SplitPane-left">
          {props.left}
        </div>
        <div className="SplitPane-right">
          {props.right}
        </div>
        <div className = "anything rendered as JSX in parent component is referred as props.children">
          props.children
        </div>
      </div>
    );
  }

  function App() {
    return (
      <SplitPane
        left={
          <Contacts />
        }
        right={
          <Chat />
        } />
        <h1> ASHISH </h1>
    );
  }
  ```

React elements like <Contacts /> and <Chat /> are just objects, so you can pass them as props like any other data.

## React render phase

(Note - while re-rendering, all the funcs inside the components are also re-created)
React code get converted to DOM in 2 phases (Render phase and commit phase)

### 1. On inital render

1. Render Phase
  a. Start from root, goto the leaf components
  b. for each component conver jsx into react elements using React.createElement() method
  c. all react elems generated in step b are sent to the commit phase
2. Commit phase
  a. React dom package converts react elems to dom elements

### 2. On re-render

1. Render phase
  a. Start from root, goto the leaf components
  b. find all flagged components which needs to be re-render
  c. for each component conver jsx into react elements using React.createElement() method
  d. compare old react elem tree when newly generated tree and send only the elems which are different to the commit phase


------------------------------------------------------------------------------

## THINKING IN REACT

#### 1. Break The UI Into A Component Hierarchy

#### 2. Build A Static Version in React

build a static version of your app that renders your data model **don’t use state at all**

#### 3. Identify The Minimal (but complete) Representation Of UI State

Figure out the absolute minimal representation of the state your application needs and compute everything else you need on-demand. For example, if you’re building a TODO list, keep an array of the TODO items around; don’t keep a separate state variable for the count. Instead, when you want to render the TODO count, take the length of the TODO items array.

Ask three questions about each piece of data:

1. Is it passed in from a parent via props? If so, it probably isn’t state.
2. Does it remain unchanged over time? If so, it probably isn’t state.
3. Can you compute it based on any other state or props in your component? If so, it isn’t state.

#### 4. Identify Where Your State Should Live

For each piece of state in your application:

1. Identify every component that renders something based on that state.
2. Find a common owner component (a single component above all the components that need the state in the hierarchy).
3. Either the common owner or another component higher up in the hierarchy should own the state.
4. If you can’t find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common owner component.

#### 5. Add Inverse Data Flow

Now we need to pass data from bottom to top component.
We can use the onChange event on the inputs to be notified of it.
