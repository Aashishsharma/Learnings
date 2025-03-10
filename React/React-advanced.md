## CODE SPLITTING

Loading all this code upfront can lead to slower initial page loads. Code splitting allows developers to split the application into smaller pieces and load them on-demand.  
Overly aggressive code splitting may lead to increased network requests, potentially negating the performance gains.

Behind the scenes React uses webpack for code splitting

---

## ERROR BOUNDARIES

Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them.

Error boundaries do not catch errors for:

1. Event handlers
2. Asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks)
   If you need to catch an error inside event handler, use the regular JavaScript try / catch statement:
   Then why not use try-catch instead of error boundaries?
   try-catch is imperative and error-boundaries are declaritive, since react is declarative we use...

**Declarative programming** -
Declarative programming is a style of programming where you describe what you want to achieve without specifying the exact steps to get there.  
React is declarative, meaning we just say the component needs to be updated, we doon't specify how react changes the DOM to achieve this  
Similarly Error boundaries are also declarative

Error boundary feature is currently available only class components
A class component becomes an error boundary if it defines either (or both) of the lifecycle methods static getDerivedStateFromError() or componentDidCatch().

1. Use static getDerivedStateFromError() to render a fallback UI after an error has been thrown.
2. Use componentDidCatch() to log error information.

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // any child componentes that throw error will be cascaded to this function
  // this function should reurn a state variable
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // this function should be used to log the data
  componentDidCatch(error, errorInfo) {
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}

// if we don't have error boundaries and
// if we don't catch them, enitre screen will go blank
// we can use try catch, but all the components need to have try catch
// they also need to have errodtate handling and what to display
// instead us error boundaries
<ErrorBoundary fallback={() => <h1>Something went wrong</h1>}>
  <MyWidget />{" "}
  <p>
    Anytime MyWidget throws error, the above fallback HTML would be displayed
  </p>
</ErrorBoundary>;
```

---

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

---

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
e.g. logging, security, loader, manipulating props

HOC names often start with "with" (e.g., withLogger, withLoader).

**Render props and hooks are possible alternatives for HOCs**

```javascript
//HOC syntax
const withEnhancement = (WrappedComponent) => {
  // ... HOC logic and enhancements ...
  return EnhancedComponent;
};
```

**Steps to create HOC** -

1. Create a normal component which would need to use the HOC logic (WrappedComponent)
2. Create HOC function - pass the wrapped component as arg in HOC
3. return a new component from HOC, make sure to pass the props as args in this newly returned component
4. Add reusable logic in HOC and render the wrapped component in HOC
5. Call HOC and get a new component, then use this new component
6. Now in the wrapped component you can use new props passed from HOC (manipulating props)

```javascript
import React, { useState, useEffect } from 'react';

// STEP - 2 - Create HOC function - pass the wrapped component as arg in HOC
const withLoader = (WrappedComponent) => {
  // STEP - 3 -return a new component from HOC, make sure to pass the props as args in this newly returned component
  return function WithLoader(props) {
    const [loading, setLoading] = useState(true);

    // STEP - 4 - Below is the reusable logic in HOC
    useEffect(() => {
      // Simulating an asynchronous operation (e.g., fetching data)
      const fetchData = async () => {
        try {
          // Simulate delay
          await fetch(props.urItoFetchData)

          // Once data is fetched, set loading to false
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setLoading(false); // Set loading to false even in case of an error
        }
      };

      fetchData();
    }, []); // Empty dependency array ensures this effect runs only once (componentDidMount)

    // STEP 4- Render wrapped component
    return loading ? <div>Loading...</div> : <WrappedComponent {...props} propsFromHOC={apiData}/>;
  };
};

// STEP 1. Create a normal component which would need to use the HOC logic (WrappedComponent)
import React, { useEffect, useContext } from 'react';
const TableComponentAPI = ({ propFromParent, propsFromHOC }) => {
  // here we load the tbale jsx - render the table
  // STEP 6 -note we can use propsFromHOC which would be the data from HOC (returned from API call in HOC)
  return (
    <div>
      <p>Prop from Parent: {propFromParent}</p>
      // inside table render
    </div>
  );
};export default TableComponentAPI;

// STEP 5 - Call HOC and get a new component, then use this new component
const MyComponentWithLoader = withLoader(MyComponent);

const App = () => {
  // Render the enhanced component
  return <MyComponentWithLoader propFromParent={table-name apiUR-to-fetch-table-data} />;
};
export default App;
```

A HOC is a pure function with zero side-effects.

---

## Render Props

It is a pattern in React where a component receives a function as a prop, often called render,
which the component then calls to render its content

```javascript
<DataProvider render={(data) => <h1>Hello {data.target}</h1>} />
```

**Usecase -** - Toggle components, adding tooltip to multiple components  
In the toolip example - all the tooltip styling will be in reusable component and the tooltip text which would be different for different component would be paased as prop and then again paased as prop in the render function

**Steps to create a render prop** -

1. Cretae a component which would render a renderprop
2. Add reusable functionality to this component
3. In the render method in step 1, call the renderd function passed as arg
4. In the component created in step 1, pass a render function which will render the desired output

#### Use Render Props for Cross-Cutting Concerns

Example - use render props to add toggle-ON-OFF functionality to multiple components

```javascript
import React, { useState } from 'react';
// STEP 1 - Cretae a component which would render a renderprop
const Toggle = ({ render }) => {
  // STEP 2. Add reusable functionality to this component
  const [on, setOn] = useState(false);
  const toggle = () => {
    setOn((prevOn) => !prevOn);
  };

  // STEP 3. In the render method in step 1, call the renderd function passed as arg
  // note how we are passing the args in the render function to use them in the called function
  return render({ on, toggle });
};

// Example Usage
const App = () => {
  return (
    <Toggle
    // STEP 4. In the component created in step 1, pass a render function which will render the desired output
      render={({ on, toggle }) => (
        <div>
          <h1>Toggle button</h1>
          <button onClick={toggle}>{on ? 'ON' : 'OFF'}</button>
        </div>
      )}
    />

    // Similarly we can add the toggle functionality to a card compoent as well
    <Toggle
    // STEP 4. In the component created in step 1, pass a render function which will render the desired output
      render={({ on, toggle }) => (
        <div>
          <h1>Toggle card</h1>
          <card onClick={toggle}>{on ? 'ON' : 'OFF'}</button>
        </div>
      )}
    />
  );
};
export default App;
```

**Render props vs HOC** -

1. In both render props and HOC, we can share the reusable logic as well as share reusable JSX
2. If you need more dynamic and conditional rendering logic, Render Props may be a better fit
3. HOCs are more readable and maintainable

---

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
      counter: 0,
    };
    // The value of Counter is updated to same value during continues interval
    setInterval(() => {
      this.setState({
        counter: 0,
      });
    }, 1000);
  }
  render() {
    // This function wont be re-rendered in case when the new state is same as previous
    return <b>Counter Value: {this.state.counter}</b>;
  }
}
```

#### 6. Use react-window library

It is used for efficiently rendering large lists and tabular data.  
useful when dealing with long lists of items where rendering all items at once could lead to performance issues.

1. React Window implements virtualization, a technique that involves rendering only the items currently in the view, rather than rendering the entire list

```javascript
import { FixedSizeList } from "react-window";

const MyList = () => (
  <FixedSizeList
    height={400} // total height of the container (FixedSizeList component) in px
    width={300} // width of the component
    itemSize={50} // height of ech item in px, this means this list will render 8 items in it's view (400/50)
    itemCount={1000} // total items in the list
  >
    {({ index, style }) => <div style={style}>Item {index}</div>}
  </FixedSizeList>
);
```

---

## Portals

Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.
But why do we need it?  
E.g. If we don't want the parent components css to mess around the child components (e.g while rendering modal, tooltips), If parent component has max-width of 100px, and inside that if we have modal component, then it is not good, hence use portal.  
Although this is renderd outside of Parent component's hierarhcy, it still act's like child, like passing props and other stuff

```javascript
ReactDOM.createPortal(child, container);

//The first argument (child) is any renderable React child, such as an element, string, or fragment.
//The second argument (container) is a DOM element.

//e.g.
import React from "react";
import ReactDOM from "react-dom";

export const PortalDemo = () => {
  return ReactDOM.createPortal(
    <h1>New portal</h1>,
    document.getElemenById("portal-demo")
  );
};
```

---

## Strict Mode

StrictMode is a tool for highlighting potential problems in an application. Like Fragment, StrictMode does not render any visible UI. It activates additional checks and warnings for its descendants.

You can enable strict mode for any part of your application. For example:

```javascript
import React from "react";

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
4. Detecting unexpected side effects \*\*
5. Detecting legacy context API

---

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

---

## React router

It enables client side routing  
Why client side routing is needed - because in server side routing when new route is navigated all the content would be fetched from the server, as opposed to client side routing, where the layout content is already available at the client side and api call is made only for the desired component hence enabling faster user experiences because the browser doesn't need to request an entirely new document or re-evaluate CSS.

`npm install react-router-dom`

**3 main components**

1. BrowserRouter - Wrapper
2. Route - Renders UI when a path matches the current location.
3. Link - Renders an anchor tag to navigate between routes

```javascript
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Route path="/" component={Home} />

    </Router>
  );
}

// Link component -
<Link to="/">Home</Link>
// Route parameters
<Route path="/user/:userId" component={UserProfile} />


```
