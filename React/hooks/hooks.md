## # TODO - using useEffect the wrong way, mistakes while using hooks

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
You can’t use Hooks inside a class component

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
 9:        <button onClick={() => setCount((count) => count + 1)}>
10:         Click me
11:        </button>
12:      </div>
13:    );
14:  }
```

Normally, variables “disappear” when the function exits but state variables are preserved by React.  
Group logically making sense of all states into one state object

### Key points

1. use functional form of setstate -- setCnt(cnt => cnt+1)  
2. setState here is different from the class componente's setState method, classe setState method merges the state, where is in useState, stats aren't merged.  
e.g. ```setState({...state, state.firstName: 'abc2'})```
3. Using single state variable vs multiple state variables - if multiple state variables are closely related, then group them in one obj, else create multiple state variables

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

## Using useLayoutEffect hook

1. Syntax and strucuture exactly same as useEffect hook
2. **Difference in timing - useEffect runs after the component is renderd, useLayoutEffect is run before the component is renders**
3. Hence useEffect is async and useLayoutEffect is synchronous, and hence useLayoutEffect can hamper performance, because it needs to be executed before the component is renderd / painted
4. usecase - **Measuring layout before the browser repaints the screen**

```javascript
function Tooltip() {
  const ref = useRef(null);
  const [tooltipHeight, setTooltipHeight] = useState(0); // You don't know real height yet
  useLayoutEffect(() => {
    const { height } = ref.current.getBoundingClientRect();
    setTooltipHeight(height); // Re-render now that you know the real height
  }, []);
  // ...use tooltipHeight in the rendering logic below...
}
```
In aboove code if we use useEffect instead of useLayoutEffect, the tooltip is first renderd, then the height is calculated and then again, the tooltip is renderd at correct position


### Key points

1. useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined.  
2. useEffect second arg - 
  a. if not passed - use effect will run on every component re-render (component did mount + component did update)
  b. If empty array is passed - [] - will only run once (component did mount)
  c. If some value is passed - [count] - will get called when count value is changed (shouldComponentUpdate)
3. If your effect returns a function, React will run it when it is time to clean up:
4. Use Multiple Effects to Separate Concerns
5. **usecase** - making api call, (maybe use usequery), listening to events
6. **when not to use** - if the second arg is a state variable and you update same state variable inside useeffect (instead use useMemo)
5. **order of execution**  -
1. State initializations - component body is executed
2. Render method
3. UseEffect func  

------------------------------------------------------------------------------

## Rules of Hooks

#### 1. Only Call Hooks at the Top Level

Don't use inside a condition or a loop
But why?

So how does React know which state corresponds to which useState call?
The answer is that React relies on the order in which Hooks are called.  

#### 2. Only Call Hooks from React Functions

Don’t call Hooks from regular JavaScript functions. Instead, you can:

✅ Call Hooks from React function components.
✅ Call Hooks from custom Hooks

ESLint plugin called eslint-plugin-react-hooks enforces these two rules.
This plugin is included by default in Create React App.

------------------------------------------------------------------------------

## Other Commonly used hooks  

### 1. useContext - same as context API in React  

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

```javascript
import React, { createContext, useState, useContext } from 'react';

// Step 1: Create a Context
const ThemeContext = createContext();
// Step 2: Create a Provider
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export { ThemeContext, ThemeProvider };

// Step 3: Create a Component that Consumes the Context
import { ThemeContext } from './ThemeContextProvider';
const ThemedComponent = () => {
  // Consume the context using useContext hook
  const { theme, toggleTheme } = useContext(ThemeContext); // import the ThemeContext

  //When the toggleTheme function is called in the below code, it will cause a re-render of the components that are consuming the theme from the ThemeContext
  // also note, re-rendering means all the function body, and render method and useEffects would be executed
  return (
    <div style={{ background: theme === 'light' ? '#f0f0f0' : '#333', color: theme === 'light' ? '#333' : '#f0f0f0', padding: '20px' }}>
      <h2>Themed Component</h2>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      
    </div>
  );
};
// Step 4: Use the Provider to Wrap Your App
const App = () => {
  return (
    // Wrap your components with the Provider
    <ThemeProvider>
      <div>
        <h1>Theme Switcher App</h1>
        <ThemedComponent />
      </div>
    </ThemeProvider>
  );
};
export default App;

```

**Usecase for context api** =

- **Theme:** Setting a theme for an entire application.
- **User Authentication:** Sharing authentication status across components.
- **Localization:** Managing the preferred language for an app.

Apply it sparingly because it makes component reuse more difficult.

### 2. useReducer

An alternative to useState. Accepts a reducer of type (state, action) => newState, and returns the current state paired with a dispatch method.  
useReducer is usually preferable to useState when

1. you have complex state logic that
2. State is a complex obj, and not a plain string or a nummber
3. your logic have related state tranistions (setLoading(false), setError(false), setData(data))

```javascript
const initialState = {count: 0};
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    default:
      throw new Error();
  }
}
function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
}
```

Usecase - in case of comples state object  
How not to do  

```javascript
// local variables
  const MODAL_TYPES = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large'
  }
  const WrongModalStateComponent = () => {
    const [isModalOpen, changeModalOpenState] = React.useState(false)
    const [modalType, changeModalType] = React.useState(MODAL_TYPES.LARGE)
    const [userPhone, setUserPhone] = React.useState('')
    const [userJob, setUserJob] = React.useState('')
    const [userEmail, setUserEmail] = React.useState('')
    return (
      ...
    )
  }
```

The problem
Reducers allow pieces of state that depend on each other to be updated predictably (whereas multiple useState’s might not)  

How to do  

```javascript
// local variables
  const MODAL_TYPES = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large'
  }
  const ACTION_TYPES = {
    SET_USER_FIELD: 'setUserField',
    TOGGLE_MODAL: 'toggleModal',
    CHANGE_MODAL_TYPE: 'changeModalType'
  }
  // initial state for useReducer
  const initialState = {
    isModalOpen: false,
    modalType: MODAL_TYPES.LARGE,
    modalData: {
      userPhone: '',
      userJob: '',
      userEmail: ''
    }
  }
  // reducer is just methods which invokes depends of action type
  const reducer = (store, action) => {
    switch (action.type) {
      case ACTION_TYPES.SET_USER_FIELD:
        return {
          ...store,
          modalData: { ...store.modalData, [action.fieldName]: action.value }
        }
      case ACTION_TYPES.TOGGLE_MODAL:
        return { ...store, isModalOpen: !store.isModalOpen }
      case ACTION_TYPES.CHANGE_MODAL_TYPE:
        return { ...store, modalType: action.modalType }
      default:
        return store
    }
  }
  const ReducerStateComponent = () => {
    // use hook to extract dispatch and state value
    const [userData, dispatch] = React.useReducer(
      reducer,
      initialState
    )
    const handleSetUserName = fieldName => value => {
      // example of how to set user field
      dispatch({ type: ACTION_TYPES.SET_USER_FIELD, value, fieldName })
    }
    const handleChangeModalType = () => {
      // example of how to change modal type
      dispatch({
        type: ACTION_TYPES.CHANGE_MODAL_TYPE,
        modalType: MODAL_TYPES.SMALL
      })
    }
    const handleToggleModal = () => {
      // example of how toggle modal
      dispatch({ type: ACTION_TYPES.TOGGLE_MODAL })
    }
    return <div>...</div>
  }

```

### 3. useMemo

Returns a memoized callback.  

```javascript
import React, { useState, useMemo } from 'react'
function Counter() {
  const [counterOne, setCounterOne] = useState(0)
  const [counterTwo, setCounterTwo] = useState(0)
  const incrementOne = () => {
    setCounterOne(counterOne + 1)
  }
  const incrementTwo = () => {
    setCounterTwo(counterTwo + 1)
  }
  const isEven = useMemo(() => {
    let i = 0
    while (i < 2000000000) i++
    return counterOne % 2 === 0
  }, [counterOne])
  return (
    <div>
      <div>
        <button onClick={incrementOne}>Count One - {counterOne}</button>
        <span>{isEven ? 'Even' : 'Odd'}</span>
      </div>
      <div>
        <button onClick={incrementTwo}>Count Two - {counterTwo}</button>
      </div>
    </div>
  )
}
export default Counter
```  

If we don't use useMemo -
If we click on counter One - UI update slowly  
If we click on counter Two - UI still updates slowly (which we don't want)

If we use useMemo -
If we click on counter One - UI update slowly  
If we click on counter Two - UI updates fast as expected  

**Explaination if we don't use useMemo**

1. If you click on Counter Two - state is updated
2. State update will cause - component re-render
3. Componet re-render - new isEven function created which is called in the render method in the span tag, hence it cause slowness
4. If we use useMemo, the return value of the isEven function is cached and the function will only run if the counter one state is changed

#### Usecases - 

1. when you want to call slow function synchronously
2. Referential integrity check
```javascript
// without useMemo
const [count, setCount] = useState(0)
const [dark, setDark] = useState(false);

const theme = {
  color: dark? 'black': 'white'
}
useEffect(() => {
  console.log('current theme color : ', theme.color)
}, [theme])
// useEffect is run everytime event id count state variable is changed
// because of referential integrity, if count state variable is changed, component rerenders, new theme obj is created
// so theme used as second arg in useEffect got changed because new theme variable is created

// fix this with useMemo
const theme = useMemo(() => {
  return {
    color: dark? 'black': 'white'
  }
}, [dark])
useEffect(() => {
  // only called when dark variable is updated and not when count variable is changed
  console.log('current theme color : ', theme.color)
}, [dark])
```

### 4. useCallback() - use when making a component controlled (passing the handleCLick functions to parent component)

Returns a memoized callback.
This is useful when passing callbacks functions to optimized child components that rely on reference equality to prevent unnecessary renders.  

```javascript
function ParentComponent() {
  const [age, setAge] = useState(25)
  const [salary, setSalary] = useState(50000)

  const incrementAge = useCallback(() => {
    setAge(age + 1)
  }, [age])

  const incrementSalary = useCallback(() => {
    setSalary(salary + 1000)
  }, [salary])

  return (
    <div>
      <Title />
      <Count text="Age" count={age} />
      <Button handleClick={incrementAge}>Increment Age</Button>
      <Count text="Salary" count={salary} />
      <Button handleClick={incrementSalary}>Increment Salary</Button>
    </div>
  )
}
export default ParentComponent
```

In above code if we don't use useCallback and click on any button below is what would hapen

1. Button click will update the state
2. State update would trigger a component re-render
3. Component re-render would mean all the methods inside the component would be re-created (incrementAge/Salary)
4. Now these methods are passed as props to child components
5. New method means new prop and new prop to child will cause child component to re-redner, which is what we don't want, since increment age button also re-renders increment salary button component
6. Even if we add React.memo in child components - techinciall the props have changed even if the function is same it is recreated and the older reference is lost
7. To avoid this us useCallback

**useMemo vs useCallback vs React.memo**  
useMemo will remember the returned value from your function.  
useCallback will remember your actual function.  

By default in react, when parent component is re-rendered, child component is also re-rendered, even if we don't want it to, React.memo (is a HOC) when applied to a react component will cause component re-render only when it's props are changed. So in child component

```javascript
import React from 'react'

const Child = () => {
  return <div>Child</div>
}

export const memoizedChild = React.memo(Child)
/// by default memo does a shallow comparison of props
// it also accepts second arg which is a function for custom comparison
```

Then why not use React.memo() for all components - Shallow comparions aren't free, they also have time complexity which might slow down the app instead of optimising it  
So in cases when props change almost all the time, we will anyhow need to re-render, but react will do the shallow comparison every time and do a re-render which is detrimental

### 5. useRef

```javascript
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

#### Key points
1. useRef is exactly same as useState, that is the value of variables used in useRef persists across re-renders, same as useState
2. But useRef does not trigeer a component re-render

**useCases** - 
1. to reference HTML elements (see above code)
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
2. to store previous value of your state

**They are used to handle uncontrolled components**


### 6. forwardRef
forwardRef lets your component expose a DOM node to parent component with a ref.  
**Real life usecase - to pause/play a video of a child component**

```javascript
//child component exposing it's input element's ref to parent
import { forwardRef } from 'react';
// notice we pass ref as second arg, besides props
const VideoPlayer = forwardRef(function VideoPlayer({ src, type, width }, ref) {
  return (
    <video width={width} ref={ref}>
      <source
        src={src}
        type={type}
      />
    </video>
  );
});
export default VideoPlayer;
//parent component accessing child's ref element
import { useRef } from 'react';
import MyVideoPlayer from './MyVideoPlayer.js';
export default function App() {
  const ref = useRef(null);
  return (
    <>
      <button onClick={() => ref.current.play()}>Play</button>
      <button onClick={() => ref.current.pause()}>Pause</button>
      <MyVideoPlayer ref={ref} src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        type="video/mp4"width="250" />
    </>
  );
}
```

### 7. useTransition 

#### Key points
1. Imporve performance based on priority based state updates
2. How? - We know that react does batch updates of multiple state changes
3. see below code - in useEffect, we are doing setName as well as setList, but setList is slow because of filtering largeList(> 1000 list)
4. Now react will do batch update, that is, setName and setList will be batched and updates at once in the actual DOM
5. Due to this the input filed becomes slow, becasue setList is not run yet, because of setList
6. using transtiion we specufy that setName should be rendered immediately and setList can be run later (or even get cancelled if name input filed is again changed)
7. Disadvantages - multiple rerenders because setName is renderd and then setList, (earlier react would have updated both at once, once the setList was finished)
8. usecase - see below code - input + list filtering

```javascript
function App() {
  const [name, setName] = useState("")
  const [list, setList] = useState(largeList)
  const [isPending, startTransition] = useTransition()
  function handleChange(e) {
    setName(e.target.value)
    startTransition(() => {
      setList(largeList.filter(item => item.name.includes(e.target.value)))
    })
  }
  return (
    <>
      <input type="text" value={name} onChange={handleChange} />
      {isPending ? (
        <div>Loading...</div>
      ) : (
        list.map(item => <ListComponent key={item.id} item={item} />)
      )}
    </>
  )
}
```

### 8. useDeferredValue

```javascript
export default function App() {
  const [query, setQuery] = useState('');
  const deferredQuery = useDeferredValue(query);
  return (
    <>
      <label>
        Search albums:
        <input value={query} onChange={e => setQuery(e.target.value)} />
      </label>
      <Suspense fallback={<h2>Loading...</h2>}>
        <SearchResults query={deferredQuery} />
      </Suspense>
    </>
  );
}
```

##### Key points
1. The query will update immediately, so the input will display the new value. However, the deferredQuery will keep its previous value until the data has loaded, so SearchResults will show the stale results for a bit.
2. indicate that data shown is stale ```<div style={{opacity: query !== deferredQuery ? 0.5 : 1}}>```
3. **useTransition vs useDeferredValue** - 
useTransition - to make a particular state update a lower priority  
useDeferredValue - any piece of code that need to have a lower priority, not just state


### 7. useReducer + useContext

In smaller apps we don't need Redux we can achieve same Redux functionality using useReducer and useContext hooks  
**Steps**

1. Created Reducer function and the initial state, in the most parent component
2. Create context variable in the most parent component
3. Pass the state and dispatch values in the context provider so that any child can use the state variable and can dispact the actions

```javascript
// Step 1
const initialState = 0
const reducer = (state, action) => {
  switch (action) {
    case 'increment':
      return state + 1
    case 'decrement':
      return state - 1
    case 'reset':
      return initialState
    default:
      return state
  }
}

// step 2
export const CountContext = React.createContext()

function App() {
  const [count, dispatch] = useReducer(reducer, initialState)
  return (
    // step 2
    <CountContext.Provider
      value={{ countState: count, countDispatch: dispatch }}
    >
      <div className="App">
        <ComponentA /> // includes component B which includes componentF
        <DataFetchingTwo />
      </div>
    </CountContext.Provider>
  )
}
export default App

// component F
// step 3 use dispatch and state in any child component
import React, {useContext} from 'react'
import { CountContext } from '../App';
function ComponentF() {
  const countContext = useContext(CountContext)
  return (
    <div>
      Component F {countContext.countState}
      <button onClick={() => countContext.countDispatch('increment')}>Increment</button>
      <button onClick={() => countContext.countDispatch('decrement')}>Decrement</button>
      <button onClick={() => countContext.countDispatch('reset')}>Reset</button>
    </div>
  )
}
export default ComponentF
```

------------------------------------------------------------------------------

## Building Your Own Hooks

Custom hooks are used to reuse Stateful logic -
**What is stateful logic?**  - stateful logic includes the use of state management hooks like useState, useEffect, useReducer, or a combination of them. The goal is to abstract away the complexity of managing state within a component and provide a clean interface for components to use that logic.

**HOC vs Custom hooks** -

1. custom hooks are more readable
2. When you want to reuse JSX code use HOC - in example of withLoader

1. useApiData

```javascript
// custom hook - useApiData.js
import { useState, useEffect } from 'react';
function useApiData(apiEndpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint);
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiEndpoint]);
  return { data, loading, error };
}
export default useApiData;

// using the custom hook
import useApiData from './useApiData';
function MyComponent() {
  const apiEndpoint = 'https://api.example.com/data';
  const { data, loading, error } = useApiData(apiEndpoint);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }
  return (
    <div>
      <h1>Data from API - {data}</h1>
    </div>
  );
}

```

2. useLocalStorage

```javascript
import { useEffect, useState } from 'react';
const setInitialVal = (key, initialVal) => {
  if(localStorage.getItem(key)) {
    return (localStorage.getItem(key))
  } 
  return initialVal
}
const useLocalStorage = (key, initialVal ) => {
  const [value, setValue] = useState(() => setInitialVal(key, initialVal))
  useEffect(() => {
    localStorage.setItem(key, initialVal);
  }, [value]); 
  return [value, setValue];
};
export default useLocalStorage;

import React, {useState} from 'react';
import useLocalStorage from './useLocalStorage'; 
export function App(props) {
  let [state, setState] = useLocalStorage('abc', 123);
  let [state2, setState2] = useLocalStorage('abc2', 1232);
  console.log({state}); console.log({state2})
  return (<>
    <button onClick={() => setState((state) => state+1)}>Abc</button> 
    <button onClick={() => setState2((state) => state+1)}>Pqr</button>
  </>);
}
```

------------------------------------------------------------------------------


## FAQs

1. Do Hooks cover all use cases for classes?
 There are no Hook equivalents to the uncommon getSnapshotBeforeUpdate, getDerivedStateFromError and componentDidCatch lifecycles yet, but would be added soon.

2. State vs Props

- Similarities
    1. Both props and state are plain JS objects
    2. Both state and props changes trigger a render update - (only is the prop is changed in the parent component, then only child-rerenders, if prop is changed in child component, child component doesn't re-render)
- Differences
    1. State is mutable, props are not - 
    2. Component cannot change it's props, state can be changed - (both can be changed, but updaing props in child component doesn't cause re-render)
- Which to use when
    If a Component needs to alter one of its attributes at some point in time, that attribute should be part of its state, otherwise it should  just be a prop for that Component.
