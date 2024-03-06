import React from 'react'
import { Provider } from 'react-redux'
import './App.css'
import store from './redux/store'
import CakeContainer from './components/CakeContainer'
import HooksCakeContainer from './components/HooksCakeContainer'
import IceCreamContainer from './components/IceCreamContainer'
import NewCakeContainer from './components/NewCakeContainer'
import ItemContainer from './components/ItemContainer'
import UsersContainer from './components/UsersContainer'

function App () {
  return (
    /*
    Redux can be used in any app, not just react app.
    To connect redux with react apo, we use react-redux library, 
    which has Provider component which we can include in our app.js in the root elem of react app
    */
    <Provider store={store}>
      <div className='App'>
        <UsersContainer />
        <NewCakeContainer />
        <CakeContainer />
        <HooksCakeContainer />
        <IceCreamContainer /> 
      </div>
    </Provider>
  )
}

export default App
