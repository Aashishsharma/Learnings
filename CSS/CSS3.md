## Index
1. **CSS3** - new (media queries, @import)
2. **Styling** - (8) 2 tags(h1, h2), all tags(star), all inside div(div star), class(.nm), id(#nm), all class in p(p.nm), only id and ol (#id ol), all p with specific class (p[.nm]) 
3. **Combinators + pseudo** - (4) - descendent(div p - all p in div), child(div > p - only direct child), adjacent(div + p - all p immediately after p), sibling(div ~ p - all p with same parent as div), pseudo element - (to style a part of the elem - p::first-line/frst-letter), pseudo classes (to style specific state of the elem - a:link/hover.visited, for input - checked/focused/enabled)
4. **Positioning** -  (5) - block vs inline - (line break), 1. static (default), 2. relative (relative to static), 3. fixed (not moved even if scrolled), 4. absoulte (relative to parent but removes elem from normal doc flow (bad thing)), 5. sticky - (b/w first relative, when offset met, becomes fixed - (pos:sticky; top:0), top:0 is offeset), for all 5 types syntax - (position: (1 of 5), top/right/bottom/left:0px)
5. **Specificity** - tells which style would apply (when 2 styles target same elem, style with highest specificity no. is applied), 4 digit no. (in order) [1 1 3 1], [inline(T/F), no. of Ids, no of classes/pseduo-classes, no. of tags/pseudo-elem]
6. **BEM naming convention** - block-name__elem-name_mod-name_mod-val
7. **Flex-box** - 1D layout model, css-grid - 2D, main-axis(row, row-reverse, column, clmn-rev), syntax - display:flex; flex-direction:(main-axis), id row is selected, elems are put left-right in a row,  **flex-size properties** (1. flex-grow (if all items do not fill entire flex (row/column) space), then free space id distributed based on flex-grow, it is a ratio (free space is given based on this ratio), 2. flex-shrink - opp. of flex-grow, 3. flex-basis - initial size of the flex item before any space distribution happens) e.g. - .item { flex: 2 1 auto; } - flex-frow:2, shrink:1, basis:auto, flex: 1 1 0, all items with eq. size even if inital size of diff.
8. **Media queries** - @media rule - CSS2(device type had to be specified, now we have 100 of devices), Media querie - CSS3(based on screen-size), syntax - @media (orientation: portrait) and (max-width: 500px) {css code}
9. **Animations** - **ani** - gradually changing from one set of CSS styles to another using keyframes, syntax - .class-name{animation-name:name;ani-duration:4s;ani-delay:2s;}, @keyframe name {0% {color: white;} 25%, 50/75/100%}, **Trans** - user action required, .class-name{tran-property: width/height(any prop that needs to be trans), when to trans(onhover)- class-name:hover{wd/ht: Xpx;}  

## CSS
**Diff between CSS2 and CSS3**
1. CSS3 introduces media queries 

## CSS2 and CSS3
Importing css in a css, possible only in css3  
@import "heading.css"  

| Selector Type            | Example              | Description                                                                                                        |
|--------------------------|--------------------- |--------------------------------------------------------------------------------------------------------------------|
| ID Selector   | `#myElement`      | Targets an element with a specific unique ID attribute, such as `<div id="myElement">`.                |
| Tag Selector  | `div`             | Targets all elements of a specific HTML tag, such as `<div>`, `<p>`, or `<h1>`.                        |
| Class Selector| `.myClass`        | Targets elements with a specific class attribute, like `<div class="myClass">`.                        |
| Multiple Selector      | `div, p`              | Selects all `<div>` and `<p>` elements                                           |
| Multiple Selector      | `div#intro.test`              | Selects all `<div>` elements who have id=intro and class=test (see specificity)                                           |
| Descendant Selector      | `div p`              | Selects all `<p>` elements inside of a `<div>` element. (direct / indirect, all p elems are selected)                                           |
| Child Selector           | `div > p`            | Selects all `<p>` elements that are direct children of a `<div>` element. (indirect p elems are not selected)                                        |
| Adjacent Sibling Selector | `h2 + p`            | Selects only the first `<p>` element that immediately follows an `<h2>` element and have same parent                                           |
| General Sibling Selector | `h2 ~ p`             | Selects all `<p>` elements that come after (not before) `<h2>` element and share the same parent.                   |
| Attribute Selector    | `[type="text"]`           | Targets elements with a specific attribute and value, such as `<input type="text">`.                      |
| Pseudo-Class Selector | `a:hover`                 | Targets elements in a specific state, like when hovered over, using the `:pseudo-class` notation.          |
| Pseudo-Element Selector | `p::first-line`         | Targets a specific part of an element's content, like the first line of a paragraph, using the `::pseudo-element` notation. |
| :matches() Selector    | `p:matches(.special, .important)` | Targets elements that match any of the provided selectors inside the `:matches()` pseudo-class.              |
| :not() Selector        | `input:not([type="submit"])`  | Targets elements that do not match the provided selector inside the `:not()` pseudo-class.                    |
| :nth-child() Selector  | `li:nth-child(odd)`           | Targets elements that are specified numeric positions within their parent, using the `:nth-child()` pseudo-class. |
| :nth-of-type() Selector| `div:nth-of-type(3)`          | Targets elements of a specific type that are specified numeric positions within their parent.               |

**Types of units in css**  
| Unit Type | Example              | Description                                                                                          |
|-----------|----------------------|------------------------------------------------------------------------------------------------------|
| Absolute  | `px`                 | Represents a fixed length unit. Commonly used for precise control over element dimensions.          |
|           | `pt`                 | Represents points, a unit of length used primarily in typography.                                   |
|           | `cm`, `mm`, `in`     | Represents physical units like centimeters, millimeters, and inches.                                |
|           |                       | These are mostly used for print styles rather than web design.                                      |
| Relative  | `em`  `p { font-size: 16px; } .child { font-size: 1.5em; }`               | font size of child elem  = 16*1.5 = 24px. Represents a unit relative to the font size of its parent element.                                  |
|           | `rem`                |Similar to em, but instead of relative to parent, it is relative to finc-size of html elem. Represents a unit relative to the root (html - level) font size.                                 |
|           | `vw`, `vh`, `vmin`, `vmax` | Represents a percentage of the viewport width/height, or the smaller/larger of the two.      |
|           | `%`                  | Represents a percentage of a parent element's property (like width or height).                     |
| Flexible  | `fr`                 | Represents a fraction of available space in a **CSS Grid layout**.                                      |
|           | `auto`               | Represents a value that is automatically calculated based on context (e.g., element text content).      |


### CSS Text Properties

| Property                 | Example Value                          | Description                                           |
|--------------------------|----------------------------------------|-------------------------------------------------------|
| `font-size`              | `font-size: 16px;`                    | Sets the size of the font.                          |
| `font-weight`            | `font-weight: bold; (100 - 800)`                 | Specifies the thickness of the font.                |
| `font-style`             | `font-style: italic;`                 | Defines the style of the font (italic, oblique).    |
| `text-align`             | `text-align: center;`                 | Aligns the text horizontally within its container.  |
| `text-decoration`        | `text-decoration: underline;`         | Adds decoration to the text (underline, line-through). |
| `text-transform`         | `text-transform: uppercase;`          | Changes the capitalization of the text to uppercase. |
|                          | `text-transform: lowercase;`          | Changes the capitalization of the text to lowercase. |
|                          | `text-transform: capitalize;`         | Capitalizes the first letter of each word.          |
| `line-height`            | `line-height: 1.5;`                   | the space between lines will be 1.5 times the font size of the text               |
| `letter-spacing`         | `letter-spacing: 2px;`                | Adjusts the space between characters.               |
| `word-spacing`           | `word-spacing: 3px;`                  | Controls the space between words.                  |
| `text-shadow`            | `text-shadow: 1px 1px 1px black;`     | Adds a shadow to the text.                         |
| `white-space`            | `white-space: nowrap;`               | Controls how whitespace within an element is handled. |
| `overflow`               | `overflow: hidden;`                   | Specifies how overflowed content is displayed.       |
| `font-family`            | `font-family: Arial, sans-serif;`      | Defines the font family for the text.  3 default available, serif(edgey characters) sans-serif (opp. of serif - good readibility), monospace (each character has same width)
Other common available - times new roman, aerial on users computer font-family: "Times New Roman", serif - it basically says - use font family as TNR, if not available on users computer, use default as serif               |

External fonts -
Fonts.google.com
1. Add link tag to <head> before your custom css file links, or else you can use external font if they are loaded after your styles are set
2. Add styling
font-family: "lato", "sarabun", sans-serif
- use font family as lato, if not available (no internet, external site down) use sarabun, if not available use sans-serif

**Block vs Inline elements**
Block elements have line break, so every block element comes to new line.  
BLock elements have display: block/none, and inline have display: inline/none  

**postioning**  
| Positioning Type | Description                                   | Impact on Viewport                       | Differences from Normal Flow        | When to Use                                             |
|------------------|-----------------------------------------------|-----------------------------------------|------------------------------------|--------------------------------------------------------|
| `static`         | Default positioning. Follows normal flow.    | No impact.                             | No difference, remains in flow.    | Default. Elements are placed based on document flow.   |
| `relative`       | Positioned relative to its normal position. | May affect other content, but respects document flow. | Slight shift, respects flow.      | Minor adjustments while keeping document flow.        |
| `absolute`       | Positioned relative to nearest positioned ancestor. | Can overlap content.                     | Removed from flow, overlaps others. | To create overlays, tooltips, popups within a container. |
| `fixed`          | Positioned relative to the viewport.         | Stays fixed while scrolling.             | Removed from flow, fixed on screen. | Sticky headers, navigation bars, fixed elements.      |
| `sticky ` `top: 0`         | Toggles between relative and fixed      | Temporarily sticks, then becomes relative. | Switches between `relative` and `fixed`. | Sticky headers, navigation, sidebars, table headers.   |

All postion type should have top, right, bottom, left parameters, or at lest one of them  

#### Specificty
CSS specificity is a set of rules that determine which styles are applied to elements when there are conflicting style declarations.  
specificty value is a b c d 
where  

| Part | Description                                                         | Example                      |
|------|---------------------------------------------------------------------|------------------------------|
| `a`  | The number of inline styles applied directly to elements using the `style` attribute. If none, it's 0. | `style="color: red;"`        |
| `b`  | The number of ID selectors in the selector. If none, it's 0.        | `#intro`                     |
| `c`  | The number of class selectors, pseudo-classes, and attribute selectors in the selector. If none, it's 0. | `.text:hover`                |
| `d`  | The number of element selectors and pseudo-elements in the selector. If none, it's 0. | `p::before`                  |


```html
<!DOCTYPE html>
<html>
<head>
<style>
  /* Specificity: 0,0,1,0 */
  p {
    color: red;
  }
  /* Specificity: 0,1,0,0 */
  #intro {
    color: blue;
  }
  /* Specificity: 0,0,1,0 */
  .text {
    color: green;
  }
  /* Specificity: 0,1,1,0 */
  p#intro {
    color: purple;
  }
</style>
</head>
<body>

<p>This is a normal paragraph.</p>
<p id="intro">This is a paragraph with an id.</p>
<p class="text">This is a paragraph with a class.</p>
<p id="intro" class="text">This is a paragraph with both id and class.</p>

</body>
</html>

```
Output 
| Selector          | Style Rule          | Specificity  | Applied Color |
|-------------------|---------------------|--------------|---------------|
| `p`               | `color: red;`       | 0,0,1,0      | Red           |
| `#intro`          | `color: blue;`      | 0,1,0,0      | Blue          |
| `.text`           | `color: green;`     | 0,0,2,0      | Green         |
| `p#intro`         | `color: purple;`    | 0,1,1,0      | Purple        |
| `p.text#intro`    | `color: orange;`    | 0,1,2,1      | N/A           |

**Note** - p#intro means target p elems where id = intro, similaly p.text#intro = p elem with id = intro and class = text, hence no color is applied


#### CSS naming conventions
**Use BEM (Block-Element-Modifier) standard**  
| Type      | Description                                                             | Example                     |
|-----------|-------------------------------------------------------------------------|-----------------------------|
| Block     | Standalone entity that is meaningful on its own.                       | Header, Container, Checkbox |
| Element   | A part of a block that has no standalone meaning and is semantically tied to its block. | Menu item, List item, Checkbox caption |
| Modifier  | A flag on a block or element. Things that change appearance or behavior. | Disabled, Highlighted, Checked, Size big |

**naming syntax**  
**block-name__elem-name_mod-name_mod-val**  
notice when to use - and _ and how many times  

#### CSS layouts  

#### 1. CSS Box Model  
describes how elements in a web page are structured and how their dimensions are calculated  

![alt text](PNG/css-box-model.png "Title")  

Padding - space between border and content
Margin - soace between border and other elems
padding/margin : 10px
(If one arg, then top, right, bottom and left, same padding/margin applied, if 2 args- 1st arg for top-bottom, if 4 args, from top to left) 

### 2. Flex-box (for navbars, card grids ets)
Is a one-dimensional layout model where as css-grid layout is 2 dimensional  
(Flexible box) used to layout a page
 

Set dispaly:flex - to parent div/any other elem to start with flexbox 

#### 1. Containers properties
(add wd/ht to entire container by default all items are stretched to container ht) 

| Property         | Values and Description                                     | Possible Values                                   |
|------------------|------------------------------------------------------------|---------------------------------------------------|
| `display`        | `flex` (block-level flex container) or `inline-flex` (inline-level flex container). | `flex`, `inline-flex`                           |
| `flex-direction` | `row` (default), `row-reverse`, `column`, `column-reverse`. | `row`, `row-reverse`, `column`, `column-reverse` |
| `flex-wrap`      | `nowrap` (default), `wrap`, `wrap-reverse`.                 | `nowrap`, `wrap`, `wrap-reverse`                |
| `flex-flow`      | Shorthand for `flex-direction` and `flex-wrap`.             | Combinations of `flex-direction` and `flex-wrap` |
| `justify-content`| Aligns flex items along the main axis.                     | `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly` |
| `align-items`    | Aligns flex items along the cross axis.                     | `flex-start`, `flex-end`, `center`, `baseline`, `stretch` |
| `align-content`  | Aligns flex lines when there's extra space along the cross axis (applies when `flex-wrap: wrap`). | `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `stretch` |
| `gap`            | Defines the gap between flex items.                         | Any length value or `normal`                  |

Tip - to align flex items exactly at the center of div
justify-content: center - horizontal center align-items:  center - vertical center  

So basically
.abc {
display: flex, justify-content and align-items to center
} 

#### 2. Items properties
| Property         | Description                                            | Possible Values                        |
|------------------|--------------------------------------------------------|----------------------------------------|
| `order`          | Specifies the order of the flex item.                 | Integer (default: 0)                   |
| `flex-grow`      | Determines how much the item grows relative to others. | Number (default: 0)                    |
| `flex-shrink`    | Determines how much the item shrinks relative to others. | Number (default: 1)                  |
| `flex-basis`     | Specifies the initial size of the item.                | Length value, auto (default: auto)     |
| `flex`           | Shorthand for `flex-grow`, `flex-shrink`, and `flex-basis`. | Combination of values (default: 0 1 auto) |
| `align-self`     | Overrides the alignment set by the container.         | `auto`, `flex-start`, `flex-end`, `center`, `baseline`, `stretch` |


#### 3. CSS GRID
Grid vs flexbox
| Use Case                | Flexbox | CSS Grid |
|-------------------------|---------|----------|
| Flexibility            | Yes     | Yes      |
| Alignment and Ordering | Yes     | Yes      |
| Simple UI Components   | Yes     | No       |
| Fixed-Sized Layouts    | Yes     | Yes      |
| Complex Alignment      | Yes     | Yes      |
| Uneven Space            | Yes     | No       |
| One-Dimensional Layouts | Yes     | No       |
| Two-Dimensional Layouts | No      | Yes      |
| Regular Grids           | No      | Yes      |
| Grid Tracks Control    | No      | Yes      |

### Grid -

### 1. Container properties 
Container (add wd/ht to entire container, by default all items are stretched to container ht)
| Property             | Values and Description                                        | Possible Values and Examples          |
|----------------------|---------------------------------------------------------------|--------------------------------------|
| `display`            | `grid` (creates a block-level grid container) or `inline-grid` (creates an inline-level grid container). | `grid`, `inline-grid`                |
| `grid-template-columns` | Defines the columns of the grid. Can use fixed lengths, flexible units, or the `fr` unit for fractions of available space. | `100px 1fr 2fr`, `repeat(3, 1fr)`   |
| `grid-template-rows` | Defines the rows of the grid. Similar to `grid-template-columns`, but for rows. | `200px auto`, `repeat(2, 1fr)`       |
| `grid-template-areas` | The `grid-template-area` property in CSS Grid Layout is used to visually define a grid template by assigning names to grid cells or areas within a grid container. It allows you to create a layout using named areas, simplifying complex grid structures. By specifying the arrangement of areas in the `grid-template-areas` property and assigning those area names to grid items using `grid-area`, you can manage layouts more intuitively and efficiently. This is especially helpful for responsive designs where grid areas might need to adapt based on screen sizes. See example below | `"header header header" "main . sidebar" "footer footer footer"` |
| `grid-template`      | Shorthand for defining columns, rows, and areas in a single property. | See `grid-template-columns`, `grid-template-rows`, and `grid-template-areas` values. |
| `grid-column-gap`    | Defines the size of gaps between columns.                     | Length values (`10px`, `1rem`)      |
| `grid-row-gap`       | Defines the size of gaps between rows.                        | Length values (`10px`, `1rem`)      |
| `grid-gap`           | Shorthand for `grid-row-gap` and `grid-column-gap`.           | Length values (`10px 20px`)         |
| `grid-auto-columns`  | Defines the size of columns that aren't explicitly defined. Explitily meaning when there are more grid items than explicitly defined columns in gird-template-columns property.    | Length values, `minmax()`, `auto`   |
| `grid-auto-rows`     | Defines the size of rows that aren't explicitly defined.       | Length values, `minmax()`, `auto`   |
| `grid-auto-flow`     | Controls how auto-placed items are positioned.                | `row`, `column`, `dense`, `row dense`, `column dense` |
| `justify-items`      | Aligns grid items along the inline (horizontal) axis. Aligns grid items at the center of their grid cells if justify-items: center         | `start`, `end`, `center`, `stretch` |
| `align-items`        | Aligns grid items along the block (vertical) axis.            | `start`, `end`, `center`, `stretch` |
| `place-items`        | Shorthand for `align-items` and `justify-items`.             | `start end`, `center stretch`       |

grid-template-area example
```html
-- Note we need to use grid-template-columns and gird-template-rows property as well
-- below creates a 2 cols 3 rows 2 X 3 layout with named areas
<style>
 .grid-container {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "footer footer";
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 500px 1fr 1fr;
}
.header {
  grid-area: header;
}
.sidebar {
  grid-area: sidebar;
}
.main {
  grid-area: main;
}
.footer {
  grid-area: footer;
}
</style>
<body>
  <div class="grid-container">
    <header class="header">Header</header>
    <div class="sidebar">Sidebar</div>
    <main class="main">Main Content</main>
    <footer class="footer">Footer</footer>
  </div>
  
</body>

```

### 2. Item properties 

| Property Name     | Description                                          | CSS Syntax and Possible Values             |
|-------------------|------------------------------------------------------|--------------------------------------------|
| `grid-column`     | Placement along columns, from start to end lines.   | `grid-column: <start> / <end>;`<br>e.g., `grid-column: 2 / 4;` |
| `grid-row`        | Placement along rows, from start to end lines.      | `grid-row: <start> / <end>;`<br>e.g., `grid-row: 1 / 3;`    |
| `grid-area`       | Assign to named area or use row/column lines. (see grid-templat-area above)      | `grid-area: <row-start> / <column-start> / <row-end> / <column-end>;`<br>e.g., `grid-area: 2 / 1 / 4 / 3;` |
| `grid-column-start` | Starting column line for item's placement.       | `grid-column-start: <line>;`<br>e.g., `grid-column-start: 2;` |
| `grid-column-end`   | Ending column line for item's placement.         | `grid-column-end: <line>;`<br>e.g., `grid-column-end: 4;`   |
| `grid-row-start`    | Starting row line for item's placement.          | `grid-row-start: <line>;`<br>e.g., `grid-row-start: 1;`      |
| `grid-row-end`      | Ending row line for item's placement.            | `grid-row-end: <line>;`<br>e.g., `grid-row-end: 3;`        |
| `justify-self`      | Alignment within grid cell along inline axis.   | `justify-self: start | end | center | stretch;`<br>e.g., `justify-self: center;` |
| `align-self`        | Alignment within grid cell along block axis.    | `align-self: start | end | center | stretch;`<br>e.g., `align-self: stretch;` |

#### Media queries
The @media rule, introduced in CSS2, made it possible to define different style rules for different media types (like for computer screen, tv, mobile).  
CSS 3 introduces Media Queries  

Media queries in CSS3 extended the CSS2 media types idea: Instead of looking for a type of device, they look at the capability of the device such as width  and height, orientation and resolution  

```css
//syntax
@media not|only mediatype and (expressions) {
  CSS-Code;
}

mediatype can be screen, print (while printing this style would be applied), speech, all (default)

e.g. 1 - it will execute when screen size is less than 500px
@media screen and (max-width: 500px) {
	body {
		color: red;
	}
} 
screen & and words can be omitted fomr above as all is default

e.g. 2
@media (orientation: landscape) {
	body {
		color: blue;
	}
}
use landscape/portrait

e.g. combinations
@media (orientation: portrait) and (max-width: 500px) {
	body {
		color: red
	}
}
// to use or -  replace and with ,

// tu use between
@media screen and (max-width: 500px) and (min-width: 400px){
	body {
		color: red;
	}
} 
```

#### CSS Transitions and animations
1. Transition
Transition is applied on the base selector, and which property to transition is applied on the pseudo selector 

.submit-button { 
background: blue;
transtion: (property duration(s/ms) transition-style delay) background, padding 2s ease-in-out 100ms
//other values
Property(any css property, for multiple separarte using comma, for all use all)
transition-style (ease, linear)
} 

then use pseudo-selector
.submit-button:hover {
  background: red; padding:10px
} 

//older browser require transtition properties to be prefixed
For chrome/safari
-webkit-transition
For firefox
-moz-transtion 

2. Transform function
Unlike transition ,this is applied only on base selectors, can also be allpied on pseudo selectors but is not meant for that.
So no animation effect, transfrom functions are run on page load and not on user action 

.submit-button {
  transform: translate(50px, 100px) 50 px to right and 100 px to top, same as graph, for left and bottom us-ve vals 

transfrom: rotate(+-deg)
transfrom: scale(2.5) maked it 2.5 times bigger - makes sense to use on pseudo selectors 

3. Animations
Transition requires some event to happen like click/hover, animation - no event required, 
For transition - it is not a function, so if same transition needs to br applied we have to catch all selectors and pseudo selectors and copy transition properties
For animation - create one animation and same can br applied on all other selector by calling that animation 

Each animation has 2 key frames (start n end) can have more stages in between 

Animation is a 2 step process 

Step 1. Define an animation using keyframes
@keyframes <animation-name> {
   from { background: red;} // starting pt
   to {bacground : black;}
}  
Another way - adding steps 

@keyframe red-to-black {
  0% { color:red; transfrom: translate(0px, 0px)}
50% {color:yellow; transfrom (10px, 10px)}
100% {color:black;transfrom(20px, 20px)}
} 

Step 2. Use an animation
.abc {
//add animation name
animation-name: red-to-black;
// add animation properties
1. animation-duration: 0s - default, 5s
2. animation-timing-function: ease/linear/ease-in-out
3. animation-delay: 2s /-2s, when -ve means 2 secs already covered in animation
4. animation-iteration-count: 2/infinite
5. animation-direction: normal(default - from 0% to 100%), reverse (100 to 0), alternate (forward then backword), alternate-reverse 

//shorthand
animation: (name duration timing-function delay iteration-count direction) 
E.g.
animation: red-to-black 5s ease 2s infinite alternate; 

// for old browsers 
-webkit-animation: red-to-black 5s ease 2s infinite alternate;
}