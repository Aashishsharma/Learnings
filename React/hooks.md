## HOOKS
Let you use state and other React features without writing a class. They are a function.

## Problem with classes / Why Hooks?
#### 1. It’s hard to reuse stateful logic between components
Render props and higher-order components that try to solve this. But these patterns require you to restructure your components
#### 2. Complex components become hard to understand
Components might perform some data fetching in componentDidMount and componentDidUpdate. However, the same componentDidMount method might also contain some unrelated logic that sets up event listeners, with cleanup performed in componentWillUnmount. Mutually related code that changes together gets split apart, but completely unrelated code ends up combined in a single method.
#### 3. Classes confuse both people and machines
1. Class components can encourage unintentional patterns that make these optimizations fall back to a slower path
2. Classes don’t minify very well, and they make hot reloading flaky and unreliable.

There are no plans to remove classes from React.
You can’t use Hooks inside a class componen

------------------------------------------------------------------------------
## Using the State Hook
```javascript
1:  import React, { useState } from 'react';
 2:
 3:  function Example() {
      // Declare a new state variable, which we'll call "count"
 4:    const [count, setCount] = useState(0);
 5:
 6:    return (
 7:      <div>
 8:        <p>You clicked {count} times</p>
 9:        <button onClick={() => setCount(count + 1)}>
10:         Click me
11:        </button>
12:      </div>
13:    );
14:  }
```
1. Line 1: We import the useState Hook from React. It lets us keep local state in a function component.
2. Line 4: Inside the Example component, we declare a new state variable by calling the useState Hook. It returns a pair of values, to which we give names. We’re calling our variable count because it holds the number of button clicks. We initialize it to zero by passing 0 as the only useState argument. The second returned item is itself a function. It lets us update the count so we’ll name it setCount.
3. Line 9: When the user clicks, we call setCount with a new value. React will then re-render the Example component, passing the new count value to it.
Normally, variables “disappear” when the function exits but state variables are preserved by React.

------------------------------------------------------------------------------
## Using the Effect Hook
The Effect Hook lets you perform side effects in function components.
Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.
You can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined.
```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
If your effect returns a function, React will run it when it is time to clean up:
```javascript
useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    // Specify how to clean up after this effect: // similar to componentWillUnmount()
    return function cleanup() {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```
#### Tip: Use Multiple Effects to Separate Concerns
#### Tip: Optimizing Performance by Skipping Effects
```javascript
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes
// similar to componentShouldUpdate()
```

------------------------------------------------------------------------------
## Rules of Hooks
#### 1. Only Call Hooks at the Top Level
Don't use inside a condition or a loop
But why?
```javascript
function Form() {
  // 1. Use the name state variable
  const [name, setName] = useState('Mary');

  // 2. Use an effect for persisting the form
  useEffect(function persistForm() {
    localStorage.setItem('formData', name);
  });

  // 3. Use the surname state variable
  const [surname, setSurname] = useState('Poppins');

  // 4. Use an effect for updating the title
  useEffect(function updateTitle() {
    document.title = name + ' ' + surname;
  });

  // ...
}
```
So how does React know which state corresponds to which useState call? 
The answer is that React relies on the order in which Hooks are called. 
Our example works because the order of the Hook calls is the same on every render
(if rendered in condition or in a loop, order might change):

#### 2. Only Call Hooks from React Functions
Don’t call Hooks from regular JavaScript functions. Instead, you can:

✅ Call Hooks from React function components.
✅ Call Hooks from custom Hooks

ESLint plugin called eslint-plugin-react-hooks enforces these two rules. 
This plugin is included by default in Create React App.

------------------------------------------------------------------------------
## Building Your Own Hooks
In React, we’ve had two popular ways to share stateful logic between components: render props and higher-order components.
In case of Hooks, you can create a custom hook 
A custom Hook is a JavaScript function whose name starts with ”use”.
Should always start with use? Not necessary but should do.

#### Creating a custom hook
```javascript
import { useState, useEffect } from 'react';

function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(friendID, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(friendID, handleStatusChange);
    };
  });

  return isOnline;
}
```

#### Using a Custom Hook
```javascript
function FriendStatus(props) {
  const isOnline = useFriendStatus(props.friend.id);

  if (isOnline === null) {
    return 'Loading...';
  }
  return isOnline ? 'Online' : 'Offline';
}
function FriendListItem(props) {
  const isOnline = useFriendStatus(props.friend.id);

  return (
    <li style={{ color: isOnline ? 'green' : 'black' }}>
      {props.friend.name}
    </li>
  );
}
```
Notice how statuful logic is resued in FriendStatus and FriendListItem components.
This is what Render props and HOCs would do.

------------------------------------------------------------------------------
## FAQs
1. Do Hooks cover all use cases for classes?
 There are no Hook equivalents to the uncommon getSnapshotBeforeUpdate, getDerivedStateFromError and componentDidCatch lifecycles yet, but would be added soon.

2. State vs Props
  - Similarities
    1. Both props and state are plain JS objects
    2. Both props and state changes trigger a render update
  - Differences
    1. State is mutable, props are not
    2. Component cannot change it's props, state can be changed
  - Which to use when
    If a Component needs to alter one of its attributes at some point in time, that attribute should be part of its state, otherwise it should just be a prop for that Component.