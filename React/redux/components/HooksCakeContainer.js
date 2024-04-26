import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { buyCake } from '../redux'

function HooksCakeContainer () {
// After redux 1.7 they have added hooks support, 
// so instead of using complicated connect method we can use react hooks 
// 1. useSelector hook - same as mapStateToProps method in connect
// 2. useDispatch hook - same as mapDispatchToProps
  const numOfCakes = useSelector(state => state.cake.numOfCakes)
  const dispatch = useDispatch()
  return (
    <div>
      <h2>Number of cakes - {numOfCakes} </h2>
      <button onClick={() => dispatch(buyCake())}>Buy Cake</button>
    </div>
  )
}

export default HooksCakeContainer
