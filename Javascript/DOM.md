## DOM (Document object model)

Interface between JS and HTML, another API provided by the run-time (i.e, browser). Just like web-apis, setTimeouts

## Dom Manipulation

| Method                                     | Description                                                  | Example                                           |
|--------------------------------------------|--------------------------------------------------------------|---------------------------------------------------|
| `getElementById`                           | Selects a single element by its `id` attribute.               | `const element = document.getElementById('myElementId');` |
| `getElementsByClassName`                   | Selects elements by their `class` attribute. Returns a live `HTMLCollection`. | `const elements = document.getElementsByClassName('myClassName');` |
| `getElementsByTagName`                     | Selects elements by their tag name. Returns a live `HTMLCollection`. | `const elements = document.getElementsByTagName('div');` |
| `getElementsByName`                        | Selects elements by their `name` attribute. Returns a live `NodeList`. | `const elements = document.getElementsByName('myName');` |
| `querySelector`                            | Selects the first element that matches a CSS selector.         | `const element = document.querySelector('.myClass');` |
| `querySelectorAll`                         | Selects all elements that match a CSS selector. Returns a static `NodeList`. | `const elements = document.querySelectorAll('p.myClass');` |
| `querySelector` on a specific element      | Use `querySelector` on a specific element to find a descendant. | `const descendant = parentElement.querySelector('.descendantClass');` |
| `querySelector` on the Document            | Use `querySelector` on the document to select an element anywhere in the document. | `const element = document.querySelector('#uniqueElementId');` |
| Using Data Attributes                      | Select elements using data attributes.                         | `const elements = document.querySelectorAll('[data-custom="value"]');` |

**HTMLCollection is live meaning if the element is changed / new elements are added they are reflected in the result of getElementsByClassName() methods which return HTMLCollection**  
**querySelector and querySelectorAll return static NodeList but these methods can be called in other HTML elements as well, where as other methods can be called only in the document (global) object**

2. Creating and inserting elements

```javascript
//creating
const message = document.creatElement('div');
message.textContent = 'ABC'
message.innerHTML = '<button>Test</button>'

//inserting
// prepend, append, before, after (before/after - add elem as a sibling, append/prepend - add the elem as child)
document.getElementById('Abc').prepend(message)
```

3. Deleting elements

```javascript
document.querySelector('.removeButton').addEventListener('click', () => {
  document.querySelector('div').remove()
})
```

4. Manipulating Style, attributs and Classes

```javascript
const message = document.getElementsByClassName('message');

// 1. Styles (this adds inline style)
message.style.width = '1.2em'
message.style.backgroundColor = 'red'

const img = document.getElementsByClassName('img');

// 2. Attributes
img.src='/abc.png'
img.alt = 'img not loaded'

// 3. Data attributes - these attributes start with data
img.dataset.<Data-attribute>

// 4. Classes
// adding new classes to elems
img.classList.add('<new-class-name>')
.remove()
.toggle() // if added then remove and vice versa
.containes()

```

5. Traversing Dom (useful when you don't know the DOM tree beforehand)
Traversing - selecting and element based on another element

```javascript
const h1 = document.querySelector('h1')

// 1. going downwards
// (notice that querySelector is working on html elem and not just on document obj)
h1.querySelectorAll('.highlight') // select all html elems (including indirect childs) inside h1 having class 'highlight'
// for direct childrens
h1.childNodes // returns nodes which is not live
h1.children // returns collection which is live
h1.first/lastElementChild

// 2. going upwards (parent)
h1.parentNode // direct parent
h1.closest('.header').style.backgroundColor = 'red' // indirect parent closest having class header

// 3. Siblings (only 2 methods available, then how to get all siblings? see below)
h1.previousElementSibling
h1.nextElementSibling

// using only these 3 direction we can traverse enitre DOM tree 
// get all siblings
h1.parentNode.children
[...h1.parentNode.children].forEach((el) => {
  el.style.transform = 'scale(0.5)'
})
//reduce size of all siblings (to h1 elem with class highlight) to half 
```

## DOM lifecycle

```javascript
// runs when enitre Dom content is loaded, doen't wait for external links/imgs to be loaded
document.addEventListener('DOMContentLoaded', (e) => {
  console.log('abc ', e)
})

// runs when entire Dom is loaded alog with external links/imgs
window.addEventListener('load')

//runs before window is closed
window.addEventListener('beforeunload')
```

## Browser events

An event is a signal that something has happened. **All DOM nodes generate such signals**  
**Mouse events:**

1. click – when the mouse clicks on an element (touchscreen devices generate it on a tap).
2. contextmenu – when the mouse right-clicks on an element.
3. mouseover / mouseout – when the mouse cursor comes over / leaves an element.
4. mousedown / mouseup – when the mouse button is pressed / released over an element.
5. mousemove – when the mouse is moved.  
**keyboard events**  
1. keydown and keyup – when a keyboard key is pressed and released
**Form element events:**  
1. submit – when the visitor submits a <form>.
2. focus – when the visitor focuses on an element, e.g. on an <input>.
**Document events:**  
1. DOMContentLoaded – when the HTML is loaded and processed, DOM is fully built.
**CSS events:**
1. transitionend – when a CSS-animation finishes.

#### Event handlers

To react on events we can assign a handler – a function that runs in case of an event.  
Handlers are a way to run JavaScript code in case of user actions.  
Only one event handler can be added  

```javascript
<input type="button" id="elem" onclick="alert('Before')" value="Click me">
<script>
  elem.onclick = function() { // overwrites the existing handler
    alert('After'); // only this will be shown
  };
</script>

/// right
button.onclick = sayThanks;
// wrong
button.onclick = sayThanks();
```

#### Event listerners

The fundamental problem of the ways to assign handlers – we can’t assign multiple handlers to one event.  
To solve this, there is an alternative way of managing handlers using special methods addEventListener and removeEventListener

```javascript
element.addEventListener(event, handler, [options]);
element.removeEventListener(event, handler, [options]);

//options
//1. once: if true, then the listener is automatically removed after it triggers.
//2. capture (false/true): the phase where to handle the event, to be covered later 
//in the chapter Bubbling and capturing. For historical reasons.
//3. passive: if true, then the handler will not call preventDefault()

//Multiple calls to addEventListener allow to add multiple handlers, like this:
<input id="elem" type="button" value="Click me"/>
<script>
  function handler1() {
    alert('Thanks!');
  };
  function handler2() {
    alert('Thanks again!');
  }
  elem.onclick = () => alert("Hello");
  elem.addEventListener("click", handler1); // Thanks!
  elem.addEventListener("click", handler2); // Thanks again!
</script>

///Removal requires the same function
//this doesn't work
elem.addEventListener( "click" , () => alert('Thanks!'));
elem.removeEventListener( "click", () => alert('Thanks!'));
//if we don’t store the function in a variable, then we can’t remove it. 
//There’s no way to “read back” handlers assigned by addEventListener
```

So, There are 3 ways to assign event handlers:

1. HTML attribute: onclick="...".
2. DOM property: elem.onclick = function.
3. Methods: elem.addEventListener(event, handler[, phase]) to add, removeEventListener to remove.  
**Which to use**  
When we assign an event handler to the document object, we should always use addEventListener, not document.on<event>, because the latter will cause conflicts: new handlers overwrite old ones.  
For real projects it’s normal that there are many handlers on document set by different parts of the code.  
So always 3 is better, 1 is only restricted to htmls  

## Event Bubbling and capturing  

When an event happens on an element, it first runs the handlers on it, then on its parent, then all the way up on other ancestors.
![alt text](PNG/bubbling.PNG "Title")  
Almost all events bubble. (a focus event does not bubble)  

**Stopping event bubbling**  
The method for it is event.stopPropagation()

```javascript
<body onclick="alert(`the bubbling doesn't reach here`)">
  <button onclick="event.stopPropagation()">Click me</button>
</body>

// if you click on the button, alert won't be called
// if you click anywhere else on the body, alert is called
```

Don’t stop bubbling without a need! Why? Why do bubbling exist?  
If you click on an image inside a button, you also click on the button.  
This means you just need to add the event to the button element, rather than also adding it to every (img in this case) element inside it.  

When to stop bubbling?  
When you don't want parent's event handler to execute  
When you have an img, where onclick enlarges the image, and inside that image you have a button which shoes modal, when button is clicked modal is shown (which is ok) and img also enlarges (not ok)  

## Event capturing

DOM Events have 3 phases of event propagation:  

1. Capturing phase – the event goes down to the element.
2. Target phase – the event reached the target element.
3. Bubbling phase – the event bubbles up from the element.  

Capturing is opposite of bubbling and when event happens first capture phase starts  
To catch an event on the capturing phase, we need to set the handler capture option to true:

```javascript
elem.addEventListener(event, handler, {capture: true})
```

![alt text](PNG/capturing.PNG "Title")  
When capture is set to true, all event-handlers having capturing set to true are executed starting from the outermost parent to the target element where the event happened in above case on a <td>, and then bubbling happens in reverse order  
**Summary**  

1. When an event happens – the most nested element where it happens gets labeled as the “target element” (event.target).
2. Then the event moves down from the document root to event.target, calling handlers assigned with addEventListener(..., true) on the way (true is a shorthand for {capture: true}).
3. Then handlers are called on the target element itself.
4. Then the event bubbles up from event.target to the root, calling handlers assigned using on<event>, HTML attributes and addEventListener without the 3rd argument or with the 3rd argument false/{capture:false}.  

## Event delegation

Bubbling and capturing lay the foundation for “event delegation” – an extremely powerful event handling pattern  
The idea is that if we have a lot of elements handled in a similar way, then instead of assigning a handler to each of them – we put a single handler on their common ancestor.  
E.g. - highlight/change color of a cell <td> on click.  
The table could have many cells 99 or 9999, doesn’t matter.  
Adding onClick on each td is not feasible/recommended  
Instead of assigning an onclick handler to each <td> (can be many) – we’ll setup the “catch-all” handler on <table> element.  
It will use event.target to get the clicked element and highlight it.  

```javascript
let selectedTd;
table.onclick = function(event) {
  let target = event.target; // where was the click?
  if (target.tagName != 'TD') return; // not on TD? Then we're not interested
  highlight(target); // highlight it
};
function highlight(td) {
  if (selectedTd) { // remove the existing highlight if any
    selectedTd.classList.remove('highlight');
  }
  selectedTd = td;
  selectedTd.classList.add('highlight'); // highlight the new td
}
```

Becuse of bubbling, click on <td> will also trigger click on <table>  
Still, there’s a drawback.  
The click may occur not on the <td>, but inside it.  

```javascript
<td>
  <strong>Northwest</strong>
  ...
</td>
```

if a click happens on that <strong> then it becomes the value of event.target and our code will fail  

```javascript
//improved code
table.onclick = function(event) {
  let td = event.target.closest('td'); // (1)
  if (!td) return; // (2)
  if (!table.contains(td)) return; // (3)
  highlight(td); // (4)
};
```

It’s often used to add the same handling for many similar elements, but not only for that.  
**Event delegation algorithm**  

1. Put a single handler on the container.
2. In the handler – check the source element event.target.
3. If the event happened inside an element that interests us, then handle the event.  

**The “behavior” pattern**  
We can also use event delegation to add “behaviors” to elements declaratively, with special attributes and classes.  
The pattern has two parts:  
We add a custom attribute to an element that describes its behavior.  
A document-wide handler tracks events, and if an event happens on an attributed element – performs the action.  
For instance, here the attribute data-counter adds a behavior: “increase value on click” to buttons:

```javascript
Counter: <input type="button" value="1" data-counter>
One more counter: <input type="button" value="2" data-counter>
<script>
  document.addEventListener('click', function(event) {
    if (event.target.dataset.counter != undefined) { // if the attribute exists...
      event.target.value++;
    }
  });
</script>
```

**Benifits of event delegation**  

1. Simplifies initialization and saves memory: no need to add many handlers.
2. Less code: when adding or removing elements, no need to add/remove handlers.
3. DOM modifications: we can mass add/remove elements with innerHTML and the like.  
**Disadvantages**  
1. The event must be bubbling. Some events do not bubble. Also, low-level handlers should not use event.stopPropagation().
2. The delegation may add CPU load, because the container-level handler reacts on events in any place of the container, no matter whether they interest us or not. But usually the load is negligible, so we don’t take it into account.
