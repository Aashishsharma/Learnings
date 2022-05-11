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

// handling no-match (page not found) route
<Route path='*' component={PageNotFound}></Route>
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

## Nested routes
Do nesting in routes
```javascript
    <Route path='products' component={Product}>
    	// when parent is renderd, which component to be shown by default? for that we use index 
    	<Route index component={NewProduct}>
		<Route path='new' component={NewProduct}>
		<Route path='featured' component={FeaturedProduct}>
    </Route> 
    /// so to render new product the url would be /products/new
    /// make sure to not include a forward slash in the path, not including forward-slash would mean the the path is relative, if you add path='/new or /featured' the link would become localhost:300/new instead of localhost:3000/products/new

    // But the parent component product component has it's own jsx and then where to render the child (new/featuredproducts) componente?
    // for this in the product component use Outlet

    import {Outlet} from 'react-router-dom'
    const Product = () {
    	return (
    	// here where to render the child components?
    	// before div or after div?
    	<div>Product Page</div>
    	<Outlet />
    	/// we renderd after div
    	)
    }
```
Common use-case for nested routes  - to have a common layout to a particular feature in the app

## Dynamic routes
When we need to load user profile component based on /users/<user-id>
```javascript
	<Route path='users' component={Users}>	
		/// anything after users/ will be a userId
		<Route path='users/:userId' component={UserProfile}>
		// dynamic routes are evaluated at the end, first react-router would try and find the exact match
		// so on /users/admin admin component is rendered and not userProfile comp 
		<Route path='users/admin' component={Admin}>
    </Route>

    ///extracting userId in the userProfile component
    import {useParams} from 'react-router-dom'
    export const UserProfile = () => {
    	const params = useParams()
    	const userId = params.userId;
    	return (
    		<div>User {userId} details<div>
    		)
    }

    /// using search params
    import {useSearchParams} from 'react-router-dom'
    export const UserProfile = () => {
    	// similar to useState
    	const [searchParams, setSearchParams] = useSearchParams();
    	const showActiveUsers = searchParams.get('filter') === 'active'
    	const userId = params.userId;
    	return (
    		<>
    		<button onCLick={() => setSearchParams({filter: 'active'})}>Show only active</button>
    		<button onCLick={() => setSearchParams()}>Show all users</button>
    		{showActiveUsers ? 
    			<div>Active users</div>
    			<div>All users</div>
    		}
    		<>
    		)
    }
```

## Lazy loading using React-router
Load only the components based on the url path, like on home page load only those components that are shown on home page. Using code splitting, we load only those js chunks based on the url path.  
It helps initial load time of the app  

Lazy loading is done using dynamix import
```javascript
// Step 1 - dynamically import the component
import React from 'react'
const LazyAbout = React.lazy(() => import('./components/About'))

// About us component needs to have default export
export default About
// instaed of 
export const About = () => {}

// Step 2 - include that lazy component in react-router using React.Suspense
<Route path='/about-us' element={
	<React.Suspense fallback = 'Loading...'
	  <LazyAbout />
	</React.Suspense>
	}
/>

//This remove the about us component from main.chunk.js which will imporve performance
```
