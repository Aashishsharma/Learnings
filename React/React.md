## Index
1. **React** - JS lib by FB, why - (flexi, popular, performance(reconciliation), one-way-databinding, separation odf concerns(JSX), inversion of control) creating app- npx(tool to exec node packages) create-react-app **app-name**
2. **ReactDOM** - lib that does reconcialitation - (map virtual dom to real), diffing algo (compare root elem, if DOM elem of diff. type, rebuild entire tree, else - only update attributes, components of same type - instance remain same)
3. **JSX** - syntax extension to JS, separation of concerns (ui+business logic in same code), prevents cross site scripting (XSS)
4. **React elements, components and props** - accept props & return react elem, FUNCTIONAL(normal fun, return R.elem)/CLASS(extend R.comp, render(return), this.setState((state, prop) => ({cnt: state.cnt+prop.cnt})) - lifecycle
5. **Handling events** - similar to DOM, (value={}, onClick={}), to add evnt listener - this.handleClick = this.handleClick.bind(this);
6. **Forms in React** - controlled(where value attribute can be added)/uncontrolled(can't be added, use refs)
7. **Lifting state up** - by making a component controlled (in child, value, onChange(parent-funcall), in parent - funcall as props)
8. **Composition over inheritance** - pass other components as props, Strategy design pattern
9. **Thinking in React** - (1. draw component hierarchy 2. build static version 3. identify min. state required 4. identify where state should live 5. add inverse data flow)

## REACT?
 A javascript library.
 Js's most popular library on github, by facebook

------------------------------------------------------------------------------
## WHY REACT? / Advantages
1. flexibility
2. popular
3. html in js and not vice versa
4. for other frameworks need to learn their syntaxes React uses js syntax
5. performace - using React will lead to a fast user interface without doing much work to specifically optimize for performance and ther is a virtual DOM. Generally in js DOM operations are the costliest and React handles DOM operations (in batch at appropriate time )and not users
6. It has one-way binding, so debugging is easy
7. separation of concerns
8. inversion of control

------------------------------------------------------------------------------
## CREATING A REACT APP

npx create-react-app **app-name** || npm init react-app **app-name**
Note- you must uninstall create-react-app if it was previously installed globally, and then install it and
then run above command.
Because create-react-app needs a template to be passed

create-react-app needs Node >=8.10

------------------------------------------------------------------------------
## NPX?
 A tool for executing Node packages. (npX - Execute)

------------------------------------------------------------------------------
## ReactDOM
 It is a library which keeps the ideal/virtual DOM in memory and then syncs it with Real DOM
Reconcialition
The process that ReactDOM does is called as Reconcialition
#### How Reconcialition works internally?
###### Using the Diffing Algorithm
When diffing two trees, React first compares the two root elements. The behavior is different depending on the types of the root elements.

1. Elements Of Different Types
Whenever the root elements have different types, React will tear down the old tree and build the new tree from scratch.

When tearing down a tree, old DOM nodes are destroyed. Component instances receive componentWillUnmount(). When building up a new tree, new DOM nodes are inserted into the DOM. Component instances receive componentWillMount() and then componentDidMount(). Any state associated with the old tree is lost.

2. DOM Elements Of The Same Type
React looks at the attributes of both, keeps the same underlying DOM node, and only updates the changed attributes.

3. Component Elements Of The Same Type
When a component updates, the instance stays the same, so that state is maintained across renders. React updates the props of the underlying component instance to match the new element, and calls componentWillReceiveProps() and componentWillUpdate() on the underlying instance.

Is the Shadow DOM the same as the Virtual DOM?
No, they are different. The Shadow DOM is a browser technology designed primarily for scoping variables and CSS in web components.
The virtual DOM is a concept implemented by libraries in JavaScript on top of browser APIs

------------------------------------------------------------------------------
## JSX (it is not mandatory)
 it is a syntax extension to JavaScript 
```javascript
const element = <h1>Hello, world!</h1>; 
```
neither html nor js
Why? Adv?
 Instead of artificially separating technologies by putting markup and logic in separate files, 
React separates concerns with loosely coupled units called “components” that contain both
 JSX Prevents Injection Attacks
By default, React DOM escapes any values embedded in JSX before rendering them
Everything is converted to a string before being rendered. This helps prevent XSS (cross-site-scripting) attacks.

e.g. JSX 
 ```javascript
 const element = <div tabIndex="0"></div>;
 const element = <img src={user.avatarUrl} />;

 ```

While using jsx, React must be in scope (i.e, import React from 'react'), why, because jsx transpiles down to React.createElement(<elem_nm>, <elem_props>, <html_child>)
 
------------------------------------------------------------------------------
## REACT ELEMENTS
  smallest building blocks of React apps, they are plain objects
e.g.  
```javascript
const element = <h1>Hello, world</h1>;
```
rendering an element  
```javascript
const element = <h1>Hello, world</h1>;
    ReactDOM.render(element, document.getElementById('root'));
```
React elements are immutable. Once you create an element, you can’t change its children or attributes

------------------------------------------------------------------------------
## COMPONENTS AND PROPS
 components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements 
describing what should appear on the screen.

1. Function components
  ```javascript
  Function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
  }
```
2. Class components

```javascript
 class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
Note: Always start component names with a capital letter.
      All React components must act like pure functions with respect to their props.

  Components can be stored in js variables  
  ```javascript
  button = <LogoutButton onClick={this.handleLogoutClick} />;
  ```
    and can be used in render as {button}
------------------------------------------------------------------------------
## CLASS COMPONENTS
 setting state
   ```javascript
   this.setState({comment: 'Hello'});
   ```
The only place where you can assign this.state is the constructor.

React may batch multiple setState() calls into a single update for performance.

Because this.props and this.state may be updated asynchronously,
you should not rely on their values for calculating the next state
```javascript
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});

// Correct
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```
[Lifecycle](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)

------------------------------------------------------------------------------
## HANDLING EVENTS
 very similar to handling events on DOM elements
```javascript
HTML ->
 <button onclick="handleClick()">
          Activate Lasers
        </button>
```
In DOM you need to call addEventListener to add listeners to a DOM element after it is created
```javascript
REACT  
<button onClick={handleClick}>
          Activate Lasers
         </button>
Arrow syntax   <button onClick={() => this.handleClick()}>
                  Click me
                 </button>
```
In React to add event listeners   
```javascript
this.handleClick = this.handleClick.bind(this);
```
Passing argument to event handler 
```javascript
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
 Arrow syntax  <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
```
------------------------------------------------------------------------------
## FORMS IN REACT
 default HTML form behaviour is available, but generally not used
 techniques for implementing input forms
  #### 1. Controlled components -> form element whose value is controlled by React

Full example
```javascript
  class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
      this.setState({value: event.target.value});
    }

    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }

    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }
```
  ###### 2. Uncontrolled components -> not contolled by react

------------------------------------------------------------------------------
## LIFTING STATE UP (RULES)
1. use state in whichever components required
2. if multiple components required same state, lift the state to closest parent
3. if a value can be derieved from both state and props, it should always be props

######  How to lift state up?
    by making a component “controlled”. Just like the DOM <input> accepts both a value and an onChange prop
   ```javascript
    In child component - 
      <input value={temperature} onChange={this.handleChange} />
      handleChange(e) {
      this.props.onTemperatureChange(e.target.value);
      }
    In Parent component - 
      <TemperatureInput
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
```
------------------------------------------------------------------------------
## COMPOSITION VS INHERITANCE
######  COMPOSITION recommended over INHERITANCE
```javascript
  function SplitPane(props) {
    return (
      <div className="SplitPane">
        <div className="SplitPane-left">
          {props.left}
        </div>
        <div className="SplitPane-right">
          {props.right}
        </div>
        <div className = "anything rendered as JSX in parent component is referred as props.children">
          props.children
        </div>
      </div>
    );
  }

  function App() {
    return (
      <SplitPane
        left={
          <Contacts />
        }
        right={
          <Chat />
        } />
        <h1> ASHISH </h1>
    );
  }
  ```
React elements like <Contacts /> and <Chat /> are just objects, so you can pass them as props like any other data.

------------------------------------------------------------------------------
## THINKING IN REACT

#### 1. Break The UI Into A Component Hierarchy
#### 2. Build A Static Version in React
build a static version of your app that renders your data model **don’t use state at all**
#### 3. Identify The Minimal (but complete) Representation Of UI State
Figure out the absolute minimal representation of the state your application needs and compute everything else you need on-demand. For example, if you’re building a TODO list, keep an array of the TODO items around; don’t keep a separate state variable for the count. Instead, when you want to render the TODO count, take the length of the TODO items array.

Ask three questions about each piece of data:

1. Is it passed in from a parent via props? If so, it probably isn’t state.
2. Does it remain unchanged over time? If so, it probably isn’t state.
3. Can you compute it based on any other state or props in your component? If so, it isn’t state.

#### 4. Identify Where Your State Should Live
For each piece of state in your application:

1. Identify every component that renders something based on that state.
2. Find a common owner component (a single component above all the components that need the state in the hierarchy).
3. Either the common owner or another component higher up in the hierarchy should own the state.
4. If you can’t find a component where it makes sense to own the state, create a new component solely for holding the state and add it somewhere in the hierarchy above the common owner component.

#### 5. Add Inverse Data Flow
Now we need to pass data from bottom to top component.
We can use the onChange event on the inputs to be notified of it.