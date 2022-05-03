## Redux
Redux is a pattern and library for managing and updating application state, using events called "actions"

## Concepts
### 1. Actions
An action is a plain JavaScript object that has a type field. Analogy -  an event that describes something that happened in the application.
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