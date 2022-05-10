## Index
1. **Hooks** why- (hard to use stateful logic in classes, classes don't menify very well and make hot reloding unreliable, unrelated logic in lifecycle methods)
2. **State hook** - [count, setCount] = useState(0), setCount((prev.state)-> {})
3. **Effect hook** - useEffect(()=>{},[]), ([]-didMount, [somevar]-didUpdate, return fun()-willUnMount()), multiple Effects to Separate Concerns
4. **Rules of hooks** - 1. Only Call Hooks at the Top Level, not even in if/loop(react updates depend on ordering), Only Call Hooks from React Functions 
5. **Custom hooks** - for reusing STATEFUL logic (code that uses state is shared), in case of normal functions, only logic can be reused, but not stateful logic, change in state varaible inside custom hooks, re-renders components using that hook. syntax (let useCnt = (initcnt=0,incdecby=1) => {statehook init, return statehook vars}), starts with use and uses atleast 1/more inbuilt/custom hook, usage - let [a,b,c] = useCnt(return of useCnt) 
6. **State vs props** -  both trigger render update, state changed in comp, props changed by parent, props preferred
7. **Commonly used hooks**- **1. Usecontext** -same as context, only usage part is diff (theme = useContext('light')) **2. useReducer** - alternative to useState, syntax fun red(state, action) => {switch/case(action.type) return newState}, preferred over useState when you have complex state logic that involves multiple sub-values (instead of using useState 10 times, add all usestae vars in a single Obj), usage - let [state, dispatch] = useReducer(red, intiVal), onClick={()=> dispatch({type: actionType})}, useCnt e.g. **3. useMemo** - const memval = useMemo(() => slowFun(a, b), [a, b]), sometimes react may re-render even if a,b are same **4.useCallback**- let cb = useCallback(() => {doSomething(a, b);},[a, b],), useMemo remembers returned val, useCallback remembes actual func, why remember func - to avoid purecomp based child to re-render when parent re-renders (see code) 5. **useRef** - let inputEl = useRef(initVal(refers to this dom elem)), <'inp' ref={inputEl}></'inp'>, access - inputEl.current.focus(), ref vs useRef - ref can only be used for DOM elements

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

Normally, variables “disappear” when the function exits but state variables are preserved by React.  
Group logically making sense of all states into one state object   

**use previous state value** -  
use functional form of setstate -- setCnt(cnt => cnt+1)  
setState here is different from the class componente's setState method, classe setState method merges the state, where is in useState, stats aren't merged.  
e.g.
```javascript
useObj = {
  firstName: 'abc',
  lastName: 'pqr'
} 
// in class
this.setState({firstName: 'abc2'})
// this methods updates the first name and also preserved the last name

//in useState
setState({firstName: 'abc2'})
// updates firstName, but lastName is lost it will give undefined
// instaed to this
setState({...state, state.firstName: 'abc2'})
``` 


------------------------------------------------------------------------------
## Using the Effect Hook
The Effect Hook lets you perform side effects in function components.
Data fetching, setting up a subscription, and manually changing the DOM in React components are all examples of side effects.
You can think of useEffect Hook as componentDidMount, componentDidUpdate, and componentWillUnmount combined.  
Func inside useeffect will run even if dom is manipulated, if second arg in useeffect func is not passed  
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
**order of execution**  
1. State initializations
2. Render method
3. UseEffect func  

**Edge case**  
```javascript
UseEffect(()=》setinterval(setcnt(cnt+1), 1000) retutn clearinterval() , [])
```  
every time new function is passed in usestate, [], if cnt is missing in [], then closure for cnt is created in setinterval, since the effect is run only once, setcnt doesn't get new staye val, since useeffect func isn't running on new render, if cnt is added in [], then clear interval called everytime, ideally shoild ne called once, 
Solve - use functional form of setstate --
Setcnt(cnt => cnt+1)

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
Bassically, hook rely on a call index. React doesn't know what a given useState() returned
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
You can of course just have functions to reuse functionality, but hooks come with the advantage of being able to ‘hook’ into things like component lifecycle and state. This makes them much more valuable in the React world than regular functions  

**What is stateful logic?**  


------------------------------------------------------------------------------
## Other Commonly used hooks  
### 1. useContext - same as context in React  
A component calling useContext will always re-render when the context value changes. If re-rendering the component is expensive, you can optimize it by using memoization.  
```javascript
const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};
const ThemeContext = React.createContext(themes.light);
function App() {
  return (
    <ThemeContext.Provider value={themes.dark}>
      <Toolbar />
    </ThemeContext.Provider>
  );
}
function Toolbar(props) {
  return (
    <div>
      <ThemedButton />
    </div>
  );
}
function ThemedButton() {
  const theme = useContext(ThemeContext);
  return (
    <button style={{ background: theme.background, color: theme.foreground }}>
      I am styled by theme context!
    </button>
  );
}
```

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
1. If you click on Counter Two - state is updates
2. State update will cause - component re-render
3. Componet re-render - new isEven function created which is called in the render method in the span tag, hence it cause slowness
4. If we use useMemo, the return value of the isEven function is cached and the function will only run if the counter one state is changed


### 4. useCallback()
Returns a memoized callback.
This is useful when passing callbacks functions to optimized child components that rely on reference equality to prevent unnecessary renders.  

***Component re-renders steps**  
1. First all the hooks / functions are run
2. then the render method is called

See below code
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
In above code if we don't use useCallback na dclick on any button below is what would hapen
1. Button click will update the state
2. State update would trigger a component re-render
3. Component re-render would mean all the methods inside the component would be re-created (incrementAge/Salary)
4. Now these methods are passed as props to child components
5. New method means new prop and new prop to child will cause child component to re-redner, which is what we don't want, since increment age button also re-renders increment salary button component
6. Even if we add React.memo in child components - techinciall the props have changed even if the function is same it is recreated and the older reference is lost
7. To avoid this us useCallback

**useMemo vs useCallback**
useMemo and useCallback use memoization.  
I like to think of memoization as remembering something.  
While both useMemo and useCallback remember something between renders until the dependancies change, the difference is just what they remember.  
useMemo will remember the returned value from your function.  
useCallback will remember your actual function.  
Remembering returned value is understandable, but why remember actual function?  
Suppose we have a PureComponent-based child <Pure /> that would re-render only once its props are changed.  
The below code re-renders the child each time the **parent is re-rendered — because the inline function is referentially different each time:**  
```javascript
function Parent({ ... }) {
  const [a, setA] = useState(0);
  ... 
  return (
    ...
    <Pure onChange={() => { doSomething(a); }} />
  );
}
//fix
//We can handle that with the help of useCallback:
function Parent({ ... }) {
  const [a, setA] = useState(0);
  const onPureChange = useCallback(() => {doSomething(a);}, [a]);
  ... 
  return (
    ...
    <Pure onChange={onPureChange} />
  );
}
```
now function is referencially equal even if the parent is re-rendered. It will change only when value of a changes

### 5. useRef
A common use case is to access a child imperatively:  
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
Essentially, useRef is like a “box” that can hold a mutable value in its .current property.  
**Ref vs useRef**  
ref can only be used for DOM elements  
 useRef() Hook isn’t just for DOM refs. The “ref” object is a generic container whose current property is mutable and can hold any value, similar to an instance property on a class.  
 ```javascript
function HookTimer() {
  const [timer, setTimer] = useState(0)
  const interValRef = useRef()
  useEffect(() => {
    //If we don't use useRef, then setInterval would be store in the variable  
    // like let abc = setInterval(...)
    interValRef.current = setInterval(() => {
      setTimer(timer => timer + 1)
    }, 1000)
    // here in the return function we would be able to access abc
    return () => {
      clearInterval(interValRef.current)
    }
  }, [])
  return (
    <div>
      HookTimer - {timer} -
      // but here in the onclick we wouldn't have been able to access abc
      // hence useRef us used
      // This can't be done with refs where we get ref only of dom nodes
      <button onClick={() => clearInterval(interValRef.current)}>Clear Timer</button>
    </div>
  )
}
export default HookTimer
 ``` 

### 6. useReducer + useContext
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