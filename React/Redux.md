## Redux
Redux is a pattern and library for managing and updating application state, using events called "actions"


3 principles
1. Maintain app state in a single obj which would be managed by Redux store
2. The only way to change the state is to eimit an action
3. To change the state, write pure reducer functions 

## Concepts
### 1. Actions
An action is a plain JavaScript object that has a type field. Analogy - an event that describes something that happened in the application.
```javascript
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk'
}
```
### 2. Action creators
An action creator is a function that creates and returns an action object. We typically use these so we don't have to write the action object by hand every time
```javascript
const addTodo = text => {
  return {
    type: 'todos/todoAdded',
    payload: text
  }
}
```
### 3. Reducers
A reducer is a function that receives the current state and an action object, decides how to update the state if necessary, and returns the new state: (state, action) => newState. Analogy -  event listener which handles events based on the received action (event) type
```javascript
const initialState = { value: 0 }

function counterReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  if (action.type === 'counter/increment') {
    // If so, make a copy of `state`
    return {
      ...state,
      // and update the copy with the new value
      value: state.value + 1
    }
  }
  // otherwise return the existing state unchanged
  return state
}
```
### 4. Store
The current Redux application state lives in an object called the store.  
The store is created by passing in a reducer, and has a method called getState that returns the current state value:
```javascript
import { configureStore } from '@reduxjs/toolkit'
const store = configureStore({ reducer: counterReducer })
console.log(store.getState())
// {value: 0}
```
### 5. Dispatch
The Redux store has a method called dispatch. The only way to update the state is to call store.dispatch() and pass in an action object. The store will run its reducer function and save the new state value inside, and we can call getState() to retrieve the update  
Analogy - Trigerring an event
```javascript
store.dispatch({ type: 'counter/increment' })
console.log(store.getState())
// {value: 1}
```

### 6. Selectors
Selectors are functions that know how to extract specific pieces of information from a store state value.
```javascript
const selectCounterValue = state => state.value
const currentValue = selectCounterValue(store.getState())
console.log(currentValue)
// 2
```

## Redux app data flow
![alt text](PNG/redux-flow.gif "Class overview")

## Steps to include Redux in a project
### 1. Creating a redux store

Redux store responsibilities
1. Holds application state
2. Allows access to statw via getState()
3. Allow state to be updates via dispatch(action)
4. Registers listeners via subscribe(cbFunc) 
```javascript
// app/store.js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'

export default configureStore({
  reducer: {
    counter: counterReducer
  }
})
```
Meaning of line - {counter: counterReducer} - it says that we want to have a state.counter section of our Redux state object, and that we want the counterReducer function to be in charge of deciding if and how to update the state.counter section whenever an action is dispatched.

### 2. Creating sliced reducers and actions
```javascript
import { createSlice } from '@reduxjs/toolkit'
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: state => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    }
  }
})
export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer
```

### 3. Dispatch action in UI
```javascript
<button onClick={() => dispatch(increment())}> +
</button>
```

### 4. Reading store data using useSelector
```javascript
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.counter.value

// then read the value
const count = useSelector(selectCount)
```

## Async logic with Thunk
Thunk is a middleware which allow different kinds of async logic to interact with the store.
npm install redux-thunk --save  
```javascript
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
const store = createStore(
  rootReducer,
  applyMiddleware(thunk) 
);

//Redux Toolkit's configureStore function automatically sets up the thunk middleware by default.

```
![alt text](PNG/redux-with-thunk-flow.gif "Class overview")
Bydefault action creators can only return action objects, but Thunk provides ability for action creators to return function instaed of objects, and this retunred function can perform async tasks 
