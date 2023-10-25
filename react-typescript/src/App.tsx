//import { useState } from 'react'
import './App.css'
import ListComp from './components/ListComp'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <div>
       React + typescript demo

       <ListComp items={["item 1", "item 2", "item 3"]} 
       render={(item: string) => <li>{item}</li>}
       />
      </div>
    </>
  )
}

export default App
