## Index
1. **Code splitting & lazy loading** - CS via dynamic import (import {add} from './math'), LL (loaded at last {suspens} from React, React.lazy(() => import('./comp'))), <Suspense fallback={react elem}><Comp></Sus>
2. **Context** - pass props b/w child(let c = React.createContext('light'), <c.Provider value="dark">, using theme - {this.comtext}), managing theme/locale/cache, makes component reuse more difficult
3. **Error boundaries** - getDerivedStateFromError()+componentDidCatch(), donot catch errors in(envt handlers, server side rendering)
4. **Refs and Doms** - another way to alter child component apart from props, (myRef = React.createRef(), accessing {this.myref}) (managing focus/uncontrolled elements) 
5. **Fragment** - <></>, return multiple elems from single component, less dom nodes created
6. **HOC** - reuse logic, takes and returns a component, not part of the React API,but pattern that emerges from compositional nature. (for cross cutting concerns, e.g. logging/security, commentpost/blogpost, loading UI for all components - (ListWithLoading=WithLoading(List) -takes list of repos & renders it),now withLoading returns new List which takes new param(isLoading) hence-<'ListWithLoading' isLoading={this.state.loading} repos={this.state.repos}/>) HOC syntax - (function HOC(Comp) {return fun HOCcomp({new param(isLoading), ...props}, if isLoading return <'Comp'> else return <'loading'>)
7. **Performance optimization** - keys, profilier-api, shouldcompupdate/pure-coponent(shallow state comparison), React.memo
8. **Portals** - ReactDOM.createPortal(child, container), render child outside of parent (tooltips)
9. **Render Props** - reuse code - props are functions which retrun react elem/component, <Comp render={data=>(<>Hello {data.nm}<>)}/>, in child inside render - {props.render(state)}
10. **Static type checking and Strict mode** - typescript or flow, use TS template while npx create, <React.StrictMode></>
11. **Proptypes** - basic prop types checking - (import PropTypes from 'prop-types', comp.propTypes = {name: PropTypes.string})
12. **React Router** - link(to), route(path/component), switch(route), browser-route for historys

Hooks
Higher-Order Components (HOCs)
Render Props
Portals
Server-Side Rendering (SSR) and Static Site Generation (SSG)
Optimizing Performance
Hooks Best Practices
React Router
Webpack and Babel

## CODE SPLITTING

Loading all this code upfront can lead to slower initial page loads. Code splitting allows developers to split the application into smaller pieces and load them on-demand.  
Overly aggressive code splitting may lead to increased network requests, potentially negating the performance gains.  

2 ways to introduce code splitting in react app -  

#### 1. Using Dynamic import + React suspense

With Code splitting, the bundle can be split to smaller chunks where the most important chunk can be loaded first and then every other secondary one lazily loaded.  

```javascript
import React, {lazy, Suspense, useEffect, useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

const Feed = lazy(() => import("./routes/Feed")); // dynamic import
const Profile = lazy(() => import("./routes/Profile"));
const Home = lazy(() => import("./routes/Home"));
const Settings = lazy(() => import("./routes/Settings"));

<Switch>
  <Route exact path="/"
    render={props => (
      <Suspense fallback={<div>Loading...<div>}>
        <Home {...props} />
      </Suspense>
    )}
  />
   <Route
    exact
    path="/feed"
    render={() => (
      <Suspense fallback={<div>Loading...<div>}>
        <Feed isLogged={isLogged} user={user} {...props} />
      </Suspense>
    )}
  />
</Switch>
```

So when home is opened only that js is pulled from the split bundle, same case when feed is opened

#### 2. Using Dynamic import + React router

```javascript
const HomePage = React.lazy(() => import('./HomePage'));
const AboutPage = React.lazy(() => import('./AboutPage'));

// React Router setup
<Switch>
  <Route path="/home" component={HomePage} />
  <Route path="/about" component={AboutPage} />
</Switch>

```

Behind the scenes React uses webpack for code splitting

------------------------------------------------------------------------------

## CONTEXT API

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

```javascript
import React, { createContext, useState, useContext } from 'react';

// Step 1: Create a Context
const ThemeContext = createContext();
// Step 2: Create a Provider
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
export { ThemeContext, ThemeProvider };

// Step 3: Create a Component that Consumes the Context
import { ThemeContext } from './ThemeContextProvider';
const ThemedComponent = () => {
  // Consume the context using useContext hook
  const { theme, toggleTheme } = useContext(ThemeContext); // import the ThemeContext

  //When the toggleTheme function is called in the below code, it will cause a re-render of the components that are consuming the theme from the ThemeContext
  // also note, re-rendering means all the function body, and render method and useEffects would be executed
  return (
    <div style={{ background: theme === 'light' ? '#f0f0f0' : '#333', color: theme === 'light' ? '#333' : '#f0f0f0', padding: '20px' }}>
      <h2>Themed Component</h2>
      <p>Current Theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
      
    </div>
  );
};
// Step 4: Use the Provider to Wrap Your App
const App = () => {
  return (
    // Wrap your components with the Provider
    <ThemeProvider>
      <div>
        <h1>Theme Switcher App</h1>
        <ThemedComponent />
      </div>
    </ThemeProvider>
  );
};
export default App;

```

**Usecase for context api** = 

- **Theme:** Setting a theme for an entire application.
- **User Authentication:** Sharing authentication status across components.
- **Localization:** Managing the preferred language for an app.

Apply it sparingly because it makes component reuse more difficult.

------------------------------------------------------------------------------
## ERROR BOUNDARIES

Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

Error boundaries do not catch errors for:

1. Event handlers (learn more)
2. Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
If you need to catch an error inside event handler, use the regular JavaScript try / catch statement:
Then why not use try-catch instead of error boundaries?
try-catch is imperative and error-boundaries are declaritive, since react is declarative we use...  

**Declarative programming** - 
Declarative programming is a style of programming where you describe what you want to achieve without specifying the exact steps to get there.  
React is declarative, meaning we just say the component needs to be updated, we doon't specify how react changes the DOM to achieve this  
Similarly Error boundaries are also declarative

Error boundary feature is currently available only class components as of noe
A class component becomes an error boundary if it defines either (or both) of the lifecycle methods static getDerivedStateFromError() or componentDidCatch().  

1.  Use static getDerivedStateFromError() to render a fallback UI after an error has been thrown.  
2.  Use componentDidCatch() to log error information.

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

------------------------------------------------------------------------------

## Fragments 

In react the render method can return only one element and not multiple
Fragments avoid unnecessary wrapper elements when you want to return multiple elements from a component.

```javascript
const MyComponent = () => (
  <>
    <ChildComponent1 />
    <ChildComponent2 />
  </>
  //above is a shorthand syntax,
  //we can replace <></> with <React.Fragment>...</React.Fragment>
);

```

usecase render multiple <td> but react comp can return only one elem, so wrap in div, but then td can't be in div so fragment  

------------------------------------------------------------------------------

## Higher-Order Components
A higher-order component is a function that takes a component and returns a new component.  
HOCs provide a way to reuse component logic

Hoc - normal comp - takes props and returns ui for that prop  
Hoc - takes comp and props and return new comp - almost always, hooks can replace hocs   

```javascript
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

HOCs are used for Cross-Cutting Concerns
**Concerns-** term that refers to a part of the system divided on the basis of the functionality e.g. business logic is a concern
**Cross-Cutting Concerns-** a concern which is applicable throughout the application and it affects the entire application.
e.g. logging, security, loader

HOC names often start with "with" (e.g., withLogger, withLoader).  

**Render props and hooks are possible alternatives for HOCs**

```javascript
//HOC syntax
const withEnhancement = (WrappedComponent) => {
  // ... HOC logic and enhancements ...
  return EnhancedComponent;
};
```

```javascript
import React, { useState, useEffect } from 'react';

// HOC for adding a loader
const withLoader = (WrappedComponent, urItoFetchData) => {
  return function WithLoader(props) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Simulating an asynchronous operation (e.g., fetching data)
      const fetchData = async () => {
        try {
          // Simulate delay
          await fetch(urItoFetchData)

          // Once data is fetched, set loading to false
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false); // Set loading to false even in case of an error
        }
      };

      // Trigger the data fetching function
      fetchData();
    }, []); // Empty dependency array ensures this effect runs only once (componentDidMount)

    // Render the loader while loading, or the wrapped component when loading is complete
    return loading ? <div>Loading...</div> : <WrappedComponent {...props} />;
  };
};

// Example Component
const MyComponent = ({ data }) => {
  return (
    <div>
      <h1>Data Loaded:</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

// Wrap MyComponent with the loader HOC - and also pass the fetchUrl to this component
const MyComponentWithLoader = withLoader(MyComponent, urItoFetchData);

// Usage
const App = () => {
  // Simulating data passed as a prop
  const data = { message: 'Hello, World!' };

  // Render the enhanced component
  return <MyComponentWithLoader data={data} />;
};
export default App;
```

A HOC is a pure function with zero side-effects.


------------------------------------------------------------------------------
## Optimizing performance
1. For the most efficient Brunch production build, install the terser-brunch plugin:
Then, to create a production build, add the -p flag to the build command:
brunch build -p

#### 2. Avoid Reconciliation

Process - 
When a component’s props or state change, React renders the element and then decides whether an actual DOM update is necessary by comparing the newly returned element with the previously rendered one. When they are not equal, React will update the DOM.

You can even avoid re-rendering of a acomponent.
If you know that in some situations your component doesn’t need to update, you can avoid re-rendering by overriding the lifecycle function shouldComponentUpdate, which is triggered before the re-rendering process starts.

```javascript
shouldComponentUpdate(nextProps, nextState) {
    if (this.props.color !== nextProps.color) {
      return true;
    }
    if (this.state.count !== nextState.count) {
      return true;
    }
    return false;
  }
```
In most cases, instead of writing shouldComponentUpdate() by hand, you can inherit from React.PureComponent. It is equivalent to implementing shouldComponentUpdate() with a shallow comparison of current and previous props and state.

#### 3. Use Profiler API
The Profiler measures how often a React application renders and what the “cost” of rendering is. Its purpose is to help identify parts of an application that are slow and may benefit from optimizations such as memoization.
Profiling adds some additional overhead, so it is disabled in the production build.

It requires two props: an id (string) and an onRender callback (function) which React calls any time a component within the tree “commits” an update.
```javascript
render(
  <App>
    <Profiler id="Navigation" onRender={callback}>
      <Navigation {...props} />
    </Profiler>
    <Main {...props} />
  </App>
);
```
onRender callback
```javascript
function onRenderCallback(
  id, // the "id" prop of the Profiler tree that has just committed
  phase, // either "mount" (if the tree just mounted) or "update" (if it re-rendered)
  actualDuration, // time spent rendering the committed update
  baseDuration, // estimated time to render the entire subtree without memoization
  startTime, // when React began rendering this update
  commitTime, // when React committed this update
  interactions // the Set of interactions belonging to this update
) {
  // Aggregate or log render timings...
}
```

#### 4. Use keys
Inserting an element at the beginning has worse performance. For example, converting between these two trees works poorly
```javascript
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```
React will mutate every child instead of realizing it can keep the **Duke** and **Villanova** subtrees intact. This inefficiency can be a problem.

In order to solve this issue, React supports a key attribute. When children have keys, React uses the key to match children in the original tree with children in the subsequent tree.
```javascript
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
```
Keys should be stable, predictable, and unique. Unstable keys (like those produced by Math.random()) will cause problems

#### 5. React.PureComponent
Pure Components in React are the components which do not re-renders when the value of state and props has been updated with the same values.  
Takes care of “shouldComponentUpdate” implicitly  
State and Props are Shallow Compared, so use wisely  
```javascript
class Component extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      counter: 0
    }
    // The value of Counter is updated to same value during continues interval
    setInterval(() => {
      this.setState({
        counter: 0
      });
    }, 1000);
  }
  render() { 
    // This function wont be re-rendered in case when the new state is same as previous
    return <b>Counter Value: {this.state.counter}</b>
  }
}
```

------------------------------------------------------------------------------
## Portals
Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.
But why do we need it?  
E.g. If we don't want the parent components css to mess around the child components (e.g while rendering modal, tooltips), If parent component has max-width of 100px, and inside that if we have modal component, then it is not good, hence use portal.  
Although this is renderd outside of Parent component's hierarhcy, it still act's like child, like passing props and other stuff 
```javascript
ReactDOM.createPortal(child, container)

//The first argument (child) is any renderable React child, such as an element, string, or fragment.
//The second argument (container) is a DOM element.

//e.g.
import React from 'react';
import ReactDOM from 'react-dom'

export const PortalDemo = () => {
  return ReactDOM.createPortal(
    <h1>New portal</h1>,
    document.getElemenById('portal-demo')
    )
}

```


------------------------------------------------------------------------------
## Render Props
The term “render prop” refers to a technique for sharing code between React components using a prop whose value is a function.

A component with a render prop takes a function that returns a React element and calls it instead of implementing its own render logic.
```javascript
<DataProvider render={data => (
  <h1>Hello {data.target}</h1>
)}/>
```
#### Use Render Props for Cross-Cutting Concerns
For example, the following component tracks the mouse position in a web app:
```javascript
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        <h1>Move the mouse around!</h1>
        {/* ...but how do we render something other than a <p>? */}
        <p>The current mouse position is ({this.state.x}, {this.state.y})</p>
      </div>
    );
  }
}

// it's parent component
<MouseTracker />

// if we want to use same component functionality but that component should render something else.
// for e.g. above, instead of rendering <p> other component wants to render <div>
// this is not achievable by calling <MouseTracker> component multiple times
// we can use render props instead
```

Using Render props
```javascript
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        <h1>Move the mouse around!</h1>
        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
 
      </div>
    );
  }
}

// it's parent component
<MouseTracker render={(mouse) => (
         <div>The current mouse position is ({mouse.x}, {mouse.y})</div>
         /// here we can render
        )}/>


```

#### Another example of render props where apart from sharing jsx, we also share the logic
```javascript
//click
import React from 'react'
export const Click = (props) => {
  return (
    <button onClick={props.handleChange}> Button clicked {props.count} times </button>
    )
}
//hover
export const Hover = (props) => {
  return (
    <h1 onHover={props.handleChange}> H1 hovered {props.count} times </h1>
    )
}
```
Counter
```javascript
//counter
import React, {useState} from 'react'
export const Counter = (props) => {
  const [count, setCount] = useState(0)
  const handleChange = () => {
    setCount((prevCount) => prevCount +1)
  }

  return (
    <div>
    {props.render(count, handleChange)}
    </div>
  )
}
```
App.js
```javascript
  <Counter render={(count, handleChange) => <Click count={count} handleChange={handleChange}/>}
  <Counter render={(count, handleChange) => <Hover count={count} handleChange={handleChange}/>}

```

------------------------------------------------------------------------------
## Static Type Checking
Static type checkers like Flow and TypeScript identify certain types of problems before you even run your code. They can also improve developer workflow by adding features like auto-completion. For this reason, we recommend using Flow or TypeScript instead of PropTypes for larger code bases.

Typescript/Flow can be added to react app
**npx create-react-app my-app --template typescript**

------------------------------------------------------------------------------
## Strict Mode
StrictMode is a tool for highlighting potential problems in an application. Like Fragment, StrictMode does not render any visible UI. It activates additional checks and warnings for its descendants.

You can enable strict mode for any part of your application. For example:
```javascript
import React from 'react';

function ExampleApplication() {
  return (
    <div>
      <Header />
      <React.StrictMode>
        <div>
          <ComponentOne />
          <ComponentTwo />
        </div>
      </React.StrictMode>
      <Footer />
    </div>
  );
}
```
StrictMode currently helps with:

1. Identifying components with unsafe lifecycles - certain legacy lifecycle methods are unsafe for use in async React applications
2. Warning about legacy string ref API usage
3. Warning about deprecated findDOMNode usage
4. Detecting unexpected side effects **
5. Detecting legacy context API

------------------------------------------------------------------------------
## Proptypes
React has some built-in typechecking abilities i.e, proptypes.
Use them for small projects, got big projects, use Flow or Typescript
```javascript
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};

// if type of name is not string, warning will be shown on console.

//few more validators
optionalArray: PropTypes.array,
optionalBool: PropTypes.bool,
optionalFunc: PropTypes.func,
optionalNumber: PropTypes.number,
optionalObject: PropTypes.object,
optionalString: PropTypes.string,
optionalSymbol: PropTypes.symbol,

// custom proptypes can also be created
// default values can also be passed to props
Greeting.defaultProps = {
  name: 'Stranger'
};
```

------------------------------------------------------------------------------
## Uncontrolled components
When form data is handled by the DOM itself, and not by React

instead of writing an event handler for every state update, you can use a ref to get form values from the DOM
```javascript
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

// if you forgot, below is the controlled component
<input value={someValue} onChange={handleChange} />
```
You can also make a controlled component as uncontrolled by removing event handler and adding ref. (in above code, I have made input tag both controlled and uncontrolled)
But this is not recommended.
File input tag is always uncontrolled component, as only DOM (user) can control it's value.

------------------------------------------------------------------------------
## Web Components
Nai aata kuch :stuck_out_tongue: