## Custom hooks
In React, we’ve had two popular ways to share stateful logic between components: render props and higher-order components.  
**Stateful logic** -  
The actual state data will not be shared between the components, but the code that uses state is shared

Custom hooks allow you to create functionality that can be reused across different components. 
In case of Hooks, you can create a custom hook 
A custom Hook is a JavaScript function whose name starts with ”use”.

#### Creating a custom hook
functions vs custom hooks  
custom hooks allow us to use stateful logic, in case of functions, only logic can be reused, but not stateful logic  


#####  useLocalStorageHook
```javascript
//component using custom hook.js
  const [val, setVal] = useLocalStorage('key', 'dumyvalue')
  
///localStorage.js
import React, {useState, useEffect} from 'react';
const setInitialVal = (key, initVal) => {
  let val = localStorage.getItem(key)
  if(val) return val;
  return initVal
}
export const useReducer = (key, val) => {
  const [val, setVal] = useState((key) => {
    return setInitialVal(key, val)
  });

  useEffect(() => {
    localStorage.setItem(key, val);
  }, [value])

  return [val, setVal]
}
```

#### useCounterHook
```javascript
import { useState } from 'react'

function useCounter(initialCount = 0, value) {
	const [count, setCount] = useState(initialCount)
	const increment = () => {
		setCount(prevCount => prevCount + value)
	}
	const decrement = () => {
		setCount(prevCount => prevCount - value)
	}
	const reset = () => {
		setCount(initialCount)
	}
	return [count, increment, decrement, reset]
}
export default useCounter

// using this hook in the component
import React from 'react'
import useCounter from '../hooks/useCounter'

function CounterTwo() {
	const [count, increment, decrement, reset] = useCounter(10, 10)
	return (
		<div>
			<h2>Count = {count}</h2>
			<button onClick={increment}>Increment</button>
			<button onClick={decrement}>Decrement</button>
			<button onClick={reset}>Reset</button>
		</div>
	)
}
export default CounterTwo
```