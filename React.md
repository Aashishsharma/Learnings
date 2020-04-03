------------------------------------------------------------------------------
## REACT?
=> A javascript library.
=> Js's most popular library on github, by facebook

------------------------------------------------------------------------------
## WHY REACT?
1.flexibility
2.popular
3.performace - find out how?
4.html in js and not vice versa
5.for other frameworks need to learn their syntaxes React uses js syntax

------------------------------------------------------------------------------
## ADVANTAGES?
=?

------------------------------------------------------------------------------
## CREATING A REACT APP

npx create-react-app **app-name** || npm init react-app **app-name**
Note- you must uninstall create-react-app if it was previously installed globally, and then install it and
then run above command.
Because create-react-app needs a template to be passed

create-react-app needs Node >=8.10

------------------------------------------------------------------------------
## NPX?
=> A tool for executing Node packages. (npX - Execute)

------------------------------------------------------------------------------
## ReactDOM
=> It is a library which keeps the ideal/virtual DOM in memory and then syncs it with Real DOM
Reconcialition
=> The process that ReactDOM does is called as Reconcialition
[How Reconcialition works internally?](https://reactjs.org/docs/reconciliation.html)

Is the Shadow DOM the same as the Virtual DOM?
No, they are different. The Shadow DOM is a browser technology designed primarily for scoping variables and CSS in web components.
The virtual DOM is a concept implemented by libraries in JavaScript on top of browser APIs

------------------------------------------------------------------------------
## JSX (it is not mandatory)
=> it is a syntax extension to JavaScript 
```javascript
const element = <h1>Hello, world!</h1>; 
```
neither html nor js
Why? Adv?
=> Instead of artificially separating technologies by putting markup and logic in separate files, 
React separates concerns with loosely coupled units called “components” that contain both
=> JSX Prevents Injection Attacks
By default, React DOM escapes any values embedded in JSX before rendering them
Everything is converted to a string before being rendered. This helps prevent XSS (cross-site-scripting) attacks.

e.g. JSX =>
 ```javascript
 const element = <div tabIndex="0"></div>;
 const element = <img src={user.avatarUrl}></img>;
 ```
------------------------------------------------------------------------------
## REACT ELEMENTS
=>  smallest building blocks of React apps, they are plain objects
e.g. => 
```javascript
const element = <h1>Hello, world</h1>;
```
rendering an element => 
```javascript
const element = <h1>Hello, world</h1>;
    ReactDOM.render(element, document.getElementById('root'));
```
React elements are immutable. Once you create an element, you can’t change its children or attributes

------------------------------------------------------------------------------
## COMPONENTS AND PROPS
=> components are like JavaScript functions. They accept arbitrary inputs (called “props”) and return React elements 
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

Components can be stored in js variables => button = <LogoutButton onClick={this.handleLogoutClick} />;
and can be used in render as {button}
------------------------------------------------------------------------------
## CLASS COMPONENTS
=> setting state
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
=> very similar to handling events on DOM elements
```javascript
HTML ->
 <button onclick="handleClick()">
          Activate Lasers
        </button>
```
In DOM you need to call addEventListener to add listeners to a DOM element after it is created
```javascript
REACT => 
<button onClick={handleClick}>
          Activate Lasers
         </button>
Arrow syntax =>  <button onClick={() => this.handleClick()}>
                  Click me
                 </button>
```
In React to add event listeners =>  this.handleClick = this.handleClick.bind(this);
Passing argument to event handler 
=> ```javascript
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
=> Arrow syntax => <button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
```
------------------------------------------------------------------------------
## FORMS IN REACT
=> default HTML form behaviour is available, but generally not used
=> techniques for implementing input forms
  ###### 1. Controlled components -> form element whose value is controlled by React

  Full example =>
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

###### => How to lift state up?
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
###### => COMPOSITION recommended over INHERITANCE
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
------------------------------------------------------------------------------
------------------------------------------------------------------------------
------------------------------------------------------------------------------