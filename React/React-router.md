## React router
React Router is a standard library for routing in React. It enables the navigation among views of various components in a React Application, allows changing the browser URL, and keeps the UI in sync with the URL.  
*npm install react-router-dom –save*  
Main components of React router
1. BrowserRouter: BrowserRouter is a router implementation that uses the HTML5 history APIto keep your UI in sync with the URL. Wrap the root component of you app (App.js) with BrowserRouter
2. Route: Route is the conditionally shown component that renders some UI when its path matches the current URL.
3. Link: Link component is used to create links to different routes and implement navigation around the application. It works like HTML anchor tag.
4. Switch: Switch component is used to render only the first route that matches the location rather than rendering all matching routes. Let’s say we have a route (Note that there is no EXACT in here), then all the Route tags are going to be processed which start with ‘/’ (all Routes start with /). This is where we need SWITCH statement to process only one of the statements.
```javascript
import { 
    BrowserRouter as Router, 
    Route, 
    Link, 
    Switch 
} from 'react-router-dom'; 

// then add Link
<Link to="/contact">Contact Us</Link>  
/// notice the url changing according the value in to props of the Link component.

//  Route component will now help us to establish the link between component’s UI and the URL.
<Route exact path='/' component={Home}></Route> 
<Route exact path='/about' component={About}></Route> 
<Route exact path='/contact' component={Contact}></Route> 
///  exact: It is used to match the exact value with the URL. 
//For Eg., exact path=’/about’ will only render the component 
//if it exactly matches the path but if we remove exact from the syntax, 
//then UI will still be rendered even if the strucute is like /about/10.  
// more than one Route component can match the URL path and render 
//at the same time. If we want to render a single component, we need to use switch.  


// To render a single component, wrap all the routes inside the Switch Component.
<Switch> 
    <Route exact path='/' component={Home}></Route> 
    <Route exact path='/about' component={About}></Route> 
    <Route exact path='/contact' component={Contact}></Route> 
</Switch> 
```

## Navigating programmatically
Using useNavigate hook from react-router-dom
```javascript
import {useNavigate} from 'react-router-dom'

const abc = () {
	const navigate = useNavigate()
	return (
		<button onClick={() => navigate('order-summary')}>Place order</button>
		/// to go back programmatically 
		<button onClick={() => navigate(-1)}>Place order</button>
	)
}
``` 

