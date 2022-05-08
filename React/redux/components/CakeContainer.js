import React from 'react'
import { connect } from 'react-redux'
import { buyCake } from '../redux'

function CakeContainer (props) {
  return (
    <div>
      <h2>Number of cakes - {props.numOfCakes} </h2>
      <button onClick={props.buyCake}>Buy Cake</button>
    </div>
  )
}

// React-redux library also has a method called connect which connects react components with the redux store
// The connect method requires two args which are functions
// connect(mapStateToProps, mayDispatchToProps)
// mapStateToProps will pass redux store as an additional field in the props that the component receives
// mapDispatchToProps also passes the redux dispatch method as additional field in the props obj that the component receives which allows react components to call dispatch method of redux 


const mapStateToProps = state => {
  return {
    numOfCakes: state.cake.numOfCakes
  }
}

const mapDispatchToProps = dispatch => {
  return {
    buyCake: () => dispatch(buyCake())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CakeContainer)
