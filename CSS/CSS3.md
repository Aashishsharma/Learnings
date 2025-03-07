## CSS

**Diff between CSS2 and CSS3**

1. CSS3 introduces media queries

## CSS2 and CSS3

Importing css in a css, possible only in css3  
@import "heading.css"

### ALL CSS Selectors

![alt text](PNG/selectors1.png "Title")

```html
<!-- Challenge 1 -->
<div class="table">
  <bento>
    <orange />
  </bento>
  <orange class="small" />
  <bento>
    <orange class="small" />
    <!-- ANS - `bento orange.small` -->
  </bento>
  <bento>
    <apple class="small" />
  </bento>
  <bento>
    <orange class="small" />
    <!-- ANS - `bento orange.small` -->
  </bento>
</div>

<!-- Challenge 2 -->
<div class="table">
  <bento>
    <apple class="small" />
  </bento>
  <plate />
  <apple class="small" />
  <!-- ANS - `plate + apple` -->
  <plate />
  <apple />
  <!-- and this -->
  <apple class="small" />
  <apple class="small" />
</div>

<!-- Challenge 3 -->
<div class="table">
  <plate>
    <apple />
    <!-- ANS - `plate > apple, plate > pickle` -->
  </plate>
  <plate>
    <pickle />
    <!-- and this -->
  </plate>
  <bento>
    <pickle />
  </bento>
  <plate>
    <orange class="small" />
    <orange />
  </plate>
  <pickle class="small" />
</div>

<!-- Challenge 4 -->
<div class="table">
  <plate />
  <plate />
  <plate />
  <!-- ANS - :nth-child(3) -->
  <plate id="fancy" />
</div>

<!-- Challenge 5 -->
<div class="table">
  <plate id="fancy">
    <apple class="small" />
  </plate>
  <plate>
    <apple />
    <!-- ANS - `apple:not(.small)` -->
  </plate>
  <apple />
  <!-- and this -->
  <plate>
    <orange class="small" />
  </plate>
  <pickle class="small" />
</div>
```

**Types of units in css**  
| Unit Type | Example | Description |
|-----------|----------------------|------------------------------------------------------------------------------------------------------|
| Absolute | `px` | Represents a fixed length unit. Commonly used for precise control over element dimensions. |
| | `pt` | Represents points, a unit of length used primarily in typography. |
| | `cm`, `mm`, `in` | Represents physical units like centimeters, millimeters, and inches. |
| | | These are mostly used for print styles rather than web design. |
| Relative | `em` `p { font-size: 16px; } .child { font-size: 1.5em; }` | font size of child elem = 16\*1.5 = 24px. Represents a unit relative to the font size of its parent element. |
| | `rem`, default 1rem = 16px |Similar to em, but instead of relative to parent, it is relative to finc-size of html elem. Represents a unit relative to the root (html - level) font size. |
| | `vw`, `vh`, `vmin`, `vmax` | Represents a percentage of the viewport width/height, or the smaller/larger of the two. |
| | `%` | Represents a percentage of a parent element's property (like width or height). |
| Flexible | `fr` | Represents a fraction of available space in a **CSS Grid layout**. |
| | `auto` | Represents a value that is automatically calculated based on context (e.g., element text content). |

### CSS Text Properties

| Property                                                                                                                                                                                                        | Example Value                     | Description                                                                                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `font-size`                                                                                                                                                                                                     | `font-size: 16px;`                | Sets the size of the font.                                                                                                                                                  |
| `font-weight`                                                                                                                                                                                                   | `font-weight: bold; (100 - 800)`  | Specifies the thickness of the font.                                                                                                                                        |
| `font-style`                                                                                                                                                                                                    | `font-style: italic;`             | Defines the style of the font (italic, oblique).                                                                                                                            |
| `text-align`                                                                                                                                                                                                    | `text-align: center;`             | Aligns the text horizontally within its container.                                                                                                                          |
| `text-decoration`                                                                                                                                                                                               | `text-decoration: underline;`     | Adds decoration to the text (underline, line-through).                                                                                                                      |
| `text-transform`                                                                                                                                                                                                | `text-transform: uppercase;`      | Changes the capitalization of the text to uppercase.                                                                                                                        |
|                                                                                                                                                                                                                 | `text-transform: lowercase;`      | Changes the capitalization of the text to lowercase.                                                                                                                        |
|                                                                                                                                                                                                                 | `text-transform: capitalize;`     | Capitalizes the first letter of each word.                                                                                                                                  |
| `line-height`                                                                                                                                                                                                   | `line-height: 1.5;`               | the space between lines will be 1.5 times the font size of the text                                                                                                         |
| `letter-spacing`                                                                                                                                                                                                | `letter-spacing: 2px;`            | Adjusts the space between characters.                                                                                                                                       |
| `word-spacing`                                                                                                                                                                                                  | `word-spacing: 3px;`              | Controls the space between words.                                                                                                                                           |
| `text-shadow`                                                                                                                                                                                                   | `text-shadow: 1px 1px 1px black;` | Adds a shadow to the text.                                                                                                                                                  |
| `white-space`                                                                                                                                                                                                   | `white-space: nowrap;`            | Controls how whitespace within an element is handled.                                                                                                                       |
| `overflow`                                                                                                                                                                                                      | `overflow: hidden;`               | Specifies how overflowed content is displayed.                                                                                                                              |
| `font-family`                                                                                                                                                                                                   | `font-family: Arial, sans-serif;` | Defines the font family for the text. 3 default available, serif(edgey characters) sans-serif (opp. of serif - good readibility), monospace (each character has same width) |
| Other common available - times new roman, aerial on users computer font-family: "Times New Roman", serif - it basically says - use font family as TNR, if not available on users computer, use default as serif |

External fonts -
Fonts.google.com

1. Add link tag to <head> before your custom css file links, or else you can use external font if they are loaded after your styles are set
2. Add styling
   font-family: "lato", "sarabun", sans-serif

- use font family as lato, if not available (no internet, external site down) use sarabun, if not available use sans-serif

**Block vs Inline elements**
Block elements have line break, so every block element comes to new line.  
BLock elements have display: block/none, and inline have display: inline/none  
`<span> <a> <br> <strong>` are inline elems  
`<p>, <div>, <h1-h6>` are block elems

**both inline and block elems have margin, padding and border**

**inline block elements** - display: inline-block

- elements appear alongside them on the same line (similar to inline elements)
- elements can have dimensions (width and height), margins, paddings, and borders applied to them, (similar to block elements)

**postioning**  
| Positioning Type | Description | Impact on Viewport | Differences from Normal Flow | When to Use |
|------------------|-----------------------------------------------|-----------------------------------------|------------------------------------|--------------------------------------------------------|
| `static` | Default positioning. Follows normal flow. | No impact. | No difference, remains in flow. | Default. Elements are placed based on document flow. |
| `relative` | Positioned relative to its normal position. | May affect other content, but respects document flow. | Slight shift, respects flow. | Minor adjustments while keeping document flow. |
| `absolute` | Positioned relative to nearest positioned ancestor (means the nearest ancestor element that also has a position property set to a value other than the default value, if no parent has position property set, then it is relative to the root HTML element). | Can overlap content. | Removed from flow, overlaps others. | To create SKIP-NAVIGATION-LINK **(see accessibility.md)**, overlays, tooltips, popups within a container. |
| `fixed` | Positioned relative to the viewport. | Stays fixed while scrolling. | Removed from flow, fixed on screen. | Sticky headers, navigation bars, fixed elements. |
| `sticky` `top: 0` | Toggles between relative and fixed | Temporarily sticks, then becomes relative. | Switches between `relative` and `fixed`. | Sticky headers, navigation, sidebars, table headers. |

All postion type should have top, right, bottom, left parameters, or at lest one of them
Absoulte vs fixed -
Unlike absolute positioning, a fixed-positioned element remains fixed relative to the viewport. It doesn't move when the page is scrolled.

#### Variables aka custom properties

Define custom variables in :roor (this means global space)

```css
:root {
  --main-color: #3498db;
  --background-color: #ecf0f1;
}
```

Then use the variable

```css
body {
  background-color: var(--background-color);
}

.header {
  color: var(--main-color);
}
```

Fallback values - if --main-color variable is not defined, use the fllback value

```css
.element {
  color: var(--main-color, #3498db);
}
```

variables can be changes using javascript

```javascript
document.documentElement.style.setProperty("--main-color", "#ff5733");
```

**variable scope** -

```css
:root {
  --main-color: #3498db; // this is avaialble globally
}

.container {
  --background-color: #ecf0f1; // this variable is available only for styles inside container class

  background-color: var(--background-color);
}
```

#### Specificty

CSS specificity is a set of rules that determine which styles are applied to elements when there are conflicting style declarations.  
specificty value is a b c d
where

| Part | Description                                                                                              | Example               |
| ---- | -------------------------------------------------------------------------------------------------------- | --------------------- |
| `a`  | The number of inline styles applied directly to elements using the `style` attribute. If none, it's 0.   | `style="color: red;"` |
| `b`  | The number of ID selectors in the selector. If none, it's 0.                                             | `#intro`              |
| `c`  | The number of class selectors, pseudo-classes, and attribute selectors in the selector. If none, it's 0. | `.text:hover`         |
| `d`  | The number of element selectors and pseudo-elements in the selector. If none, it's 0.                    | `p::before`           |

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
| Selector | Style Rule | Specificity | Applied Color |
|-------------------|---------------------|--------------|---------------|
| `p` | `color: red;` | 0,0,1,0 | Red |
| `#intro` | `color: blue;` | 0,1,0,0 | Blue |
| `.text` | `color: green;` | 0,0,2,0 | Green |
| `p#intro` | `color: purple;` | 0,1,1,0 | Purple |
| `p.text#intro` | `color: orange;` | 0,1,2,1 | N/A |

**Note** - p#intro means target p elems where id = intro, similaly p.text#intro = p elem with id = intro and class = text, hence no color is applied

#### CSS naming conventions

**Use BEM (Block-Element-Modifier) standard**  
| Type | Description | Example |
|-----------|-------------------------------------------------------------------------|-----------------------------|
| Block | Standalone entity that is meaningful on its own. | Header, Container, Checkbox |
| Element | A part of a block that has no standalone meaning and is semantically tied to its block. | Menu item, List item, Checkbox caption |
| Modifier | A flag on a block or element. Things that change appearance or behavior. | Disabled, Highlighted, Checked, Size big |

**naming syntax**  
**block-name\_\_elem-name_mod-name_mod-val**  
notice when to use - and \_ and how many times

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

| Property          | Values and Description                                                                            | Possible Values                                                                     |
| ----------------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `display`         | `flex` (block-level flex container) or `inline-flex` (inline-level flex container).               | `flex`, `inline-flex`                                                               |
| `flex-direction`  | `row` (default), `row-reverse`, `column`, `column-reverse`.                                       | `row`, `row-reverse`, `column`, `column-reverse`                                    |
| `flex-wrap`       | `nowrap` (default), `wrap`, `wrap-reverse`.                                                       | `nowrap`, `wrap`, `wrap-reverse`                                                    |
| `flex-flow`       | Shorthand for `flex-direction` and `flex-wrap`.                                                   | Combinations of `flex-direction` and `flex-wrap`                                    |
| `justify-content` | Aligns flex items along the main axis.                                                            | `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly` |
| `align-items`     | Aligns flex items along the cross axis.                                                           | `flex-start`, `flex-end`, `center`, `baseline`, `stretch`                           |
| `align-content`   | Aligns flex lines when there's extra space along the cross axis (applies when `flex-wrap: wrap`). | `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `stretch`      |
| `gap`             | Defines the gap between flex items.                                                               | Any length value or `normal`                                                        |

Tip - to align flex items exactly at the center of div
justify-content: center - horizontal center align-items:  center - vertical center

So basically
.abc {
display: flex, justify-content and align-items to center
}

#### 2. Items properties

| Property      | Description                                                 | Possible Values                                                   |
| ------------- | ----------------------------------------------------------- | ----------------------------------------------------------------- |
| `order`       | Specifies the order of the flex item.                       | Integer (default: 0)                                              |
| `flex-grow`   | Determines how much the item grows relative to others.      | Number (default: 0)                                               |
| `flex-shrink` | Determines how much the item shrinks relative to others.    | Number (default: 1)                                               |
| `flex-basis`  | Specifies the initial size of the item.                     | Length value, auto (default: auto)                                |
| `flex`        | Shorthand for `flex-grow`, `flex-shrink`, and `flex-basis`. | Combination of values (default: 0 1 auto)                         |
| `align-self`  | Overrides the alignment set by the container.               | `auto`, `flex-start`, `flex-end`, `center`, `baseline`, `stretch` |

#### 3. CSS GRID

Grid vs flexbox
| Use Case | Flexbox | CSS Grid |
|-------------------------|---------|----------|
| Flexibility | Yes | Yes |
| Alignment and Ordering | Yes | Yes |
| Simple UI Components | Yes | No |
| Fixed-Sized Layouts | Yes | Yes |
| Complex Alignment | Yes | Yes |
| Uneven Space | Yes | No |
| One-Dimensional Layouts | Yes | No |
| Two-Dimensional Layouts | No | Yes |
| Regular Grids | No | Yes |
| Grid Tracks Control | No | Yes |

### Grid -

### 1. Container properties

Container (add wd/ht to entire container, by default all items are stretched to container ht)
| Property | Values and Description | Possible Values and Examples |
|----------------------|---------------------------------------------------------------|--------------------------------------|
| `display` | `grid` (creates a block-level grid container) or `inline-grid` (creates an inline-level grid container). | `grid`, `inline-grid` |
| `grid-template-columns` | Defines the columns of the grid. Can use fixed lengths, flexible units, or the `fr` unit for fractions of available space. | `100px 1fr 2fr`, `repeat(3, 1fr)` |
| `grid-template-rows` | Defines the rows of the grid. Similar to `grid-template-columns`, but for rows. | `200px auto`, `repeat(2, 1fr)` |
| `grid-template-areas` | The `grid-template-area` property in CSS Grid Layout is used to visually define a grid template by assigning names to grid cells or areas within a grid container. It allows you to create a layout using named areas, simplifying complex grid structures. By specifying the arrangement of areas in the `grid-template-areas` property and assigning those area names to grid items using `grid-area`, you can manage layouts more intuitively and efficiently. This is especially helpful for responsive designs where grid areas might need to adapt based on screen sizes. See example below | `"header header header" "main . sidebar" "footer footer footer"` |
| `grid-template` | Shorthand for defining columns, rows, and areas in a single property. | See `grid-template-columns`, `grid-template-rows`, and `grid-template-areas` values. |
| `grid-column-gap` | Defines the size of gaps between columns. | Length values (`10px`, `1rem`) |
| `grid-row-gap` | Defines the size of gaps between rows. | Length values (`10px`, `1rem`) |
| `grid-gap` | Shorthand for `grid-row-gap` and `grid-column-gap`. | Length values (`10px 20px`) |
| `grid-auto-columns` | Defines the size of columns that aren't explicitly defined. Explitily meaning when there are more grid items than explicitly defined columns in gird-template-columns property. | Length values, `minmax()`, `auto` |
| `grid-auto-rows` | Defines the size of rows that aren't explicitly defined. | Length values, `minmax()`, `auto` |
| `grid-auto-flow` | Controls how auto-placed items are positioned. | `row`, `column`, `dense`, `row dense`, `column dense` |
| `justify-items` | Aligns grid items along the inline (horizontal) axis. Aligns grid items at the center of their grid cells if justify-items: center | `start`, `end`, `center`, `stretch` |
| `align-items` | Aligns grid items along the block (vertical) axis. | `start`, `end`, `center`, `stretch` |
| `place-items` | Shorthand for `align-items` and `justify-items`. | `start end`, `center stretch` |

grid-template-area example

```html
-- Note we need to use grid-template-columns and gird-template-rows property as
well -- below creates a 2 cols 3 rows 2 X 3 layout with named areas
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

| Property Name       | Description                                                                 | CSS Syntax and Possible Values                                                                             |
| ------------------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --- | ------ | ----------------------------------------- |
| `grid-column`       | Placement along columns, from start to end lines.                           | `grid-column: <start> / <end>;`<br>e.g., `grid-column: 2 / 4;`                                             |
| `grid-row`          | Placement along rows, from start to end lines.                              | `grid-row: <start> / <end>;`<br>e.g., `grid-row: 1 / 3;`                                                   |
| `grid-area`         | Assign to named area or use row/column lines. (see grid-templat-area above) | `grid-area: <row-start> / <column-start> / <row-end> / <column-end>;`<br>e.g., `grid-area: 2 / 1 / 4 / 3;` |
| `grid-column-start` | Starting column line for item's placement.                                  | `grid-column-start: <line>;`<br>e.g., `grid-column-start: 2;`                                              |
| `grid-column-end`   | Ending column line for item's placement.                                    | `grid-column-end: <line>;`<br>e.g., `grid-column-end: 4;`                                                  |
| `grid-row-start`    | Starting row line for item's placement.                                     | `grid-row-start: <line>;`<br>e.g., `grid-row-start: 1;`                                                    |
| `grid-row-end`      | Ending row line for item's placement.                                       | `grid-row-end: <line>;`<br>e.g., `grid-row-end: 3;`                                                        |
| `justify-self`      | Alignment within grid cell along inline axis.                               | `justify-self: start                                                                                       | end | center | stretch;`<br>e.g.,`justify-self: center;` |
| `align-self`        | Alignment within grid cell along block axis.                                | `align-self: start                                                                                         | end | center | stretch;`<br>e.g.,`align-self: stretch;`  |

#### Media queries

For media queries to work, we need to add this link in html  
`<meta name="viewport" content="width=device-width,initial-scale=1">`

The @media rule, introduced in CSS2, made it possible to define different style rules for different media types (like for computer screen, tv, mobile).  
CSS 3 introduces Media Queries

Media queries in CSS3 extended the CSS2 media types idea: Instead of looking for a type of device, they look at the capability of the device such as width and height, orientation and resolution

| Property Name | Description                                     | Possible Values                |
| ------------- | ----------------------------------------------- | ------------------------------ |
| `@media`      | Specifies the type of media to apply styles to. | `screen`, `print`, `all`, etc. |
| `and`         | Combines media features.                        |                                |
| `<condition>` | Defines the conditions for applying styles.     | e.g., `(max-width: 768px)`     |

```css
e.g.
  1
  -
  it
  will
  execute
  when
  screen
  size
  is
  less
  than
  500px
  @media
  screen
  and
  (max-width: 500px) {
  body {
    color: red;
  }
}
screen
  &
  and
  words
  can
  be
  omitted
  fomr
  above
  as
  all
  is
  default
  e.g.
  2
  @media
  (orientation: landscape) {
  body {
    color: blue;
  }
}
use
  landscape/portrait
  e.g.
  combinations
  @media
  (orientation: portrait)
  and
  (max-width: 500px) {
  body {
    color: red;
  }
}
// to use or -  replace and with ,

// tu use between
@media screen and (max-width: 500px) and (min-width: 400px) {
  body {
    color: red;
  }
}
```

#### CSS Transitions

1. Transition
   Transition is applied on the base selector, and which property to transition is applied on the pseudo selector

| Property Name                | Description                                          | Possible Values                  |
| ---------------------------- | ---------------------------------------------------- | -------------------------------- |
| `transition`                 | Specifies properties to transition and their timing. | `property duration timing delay` |
| `transition-property`        | Specifies the properties to transition.              | `width`, `opacity`, `color`      |
| `transition-duration`        | Specifies the duration of the transition.            | `0.3s`, `1s`, `300ms`            |
| `transition-timing-function` | Specifies the easing function for the transition.    | `ease`, `linear`, `ease-in-out`  |
| `transition-delay`           | Specifies a delay before the transition starts.      | `0.2s`, `500ms`, `1s`            |

```html
<!DOCTYPE html>
<style>
  .button {
    display: inline-block;
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    transition: background-color 0.3s ease; /* Transition for background color */
  }

  .button:hover {
    background-color: #2980b9; /* New background color on hover */
  }
</style>
</head>
</html>
```

#### Transform function

Transformations include translations, rotations, scalings, and more  
syntax

```css
selector {
  transform: <transform-function> <optional-transform-function>;
}
```

transfrom: rotate(+-deg)
transfrom: scale(2.5) maked it 2.5 times bigger - makes sense to use on pseudo selectors
transform: skew(20deg, -10deg) // skew (<x-angle>, <y-angle>) - tilts the element either horizontally or vertically or both

#### Css animation

2 step process - 1. define animation using keyframes, 2 - use it in css selectors

```html
<style>
  @keyframes moveRight {
    0% { left: 0; }
    100% { left: 300px; }
  }

  .square {
    width: 50px;
    height: 50px;
    background-color: red;
    position: relative;
    animation: moveRight 3s ease-in-out infinite; /* Apply animation */
  }
</style>
</head>
<body>
  <div class="square"></div>
</body>
</html>

```

1. animation-duration: 0s - default, 5s
2. animation-timing-function: ease/linear/ease-in-out
3. animation-delay: 2s /-2s, when -ve means 2 secs already covered in animation
4. animation-iteration-count: 2/infinite
5. animation-direction: normal(default - from 0% to 100%), reverse (100 to 0), alternate (forward then backword), alternate-reverse

#### Performance Optimization

1. Css minification
2. Inline critical styles directly into the HTML to render the essential content faster.
3. Externalize non-critical styles to load them asynchronously. using the defer attribute
4. Use <link rel="preload"> to preload critical stylesheets, fonts, or other resources.
5. Use new properties - `content-visibility and  contain-intrinsic-size`

```css
.lazy-load {
  content-visibility: auto;
  /*the element is not painted (including layout and painting) 
  until it is comes closer to the viewport on scroll*/
  contain-intrinsic-size: 1px 200px; /* Width: 1px, Height: 5000px */
  /* some randon value in width and height provided
  1px width - by default element with these content properites are block
  hence each elem is on nee line
  height 5000px - this will shift the element below the fold and hence browser won't paint this elemm
  browser will only paint when user scrolls to this position
  Note - actal height of the elem is not changed to 5000px, this is just a placholder value
  for the browser, when browser will paint this elem, it will pick up it's actual height*/
}

/*
other values - 
content-visibility: auto - expalained above
| visible (no effect of this prop) 
| hidden - elem always hidden but available when we do Cntrl + F (i.e, elem is browser accessible)


IMP NOTE - 
Although if the elemnts are not yet painted, the elements can still be searched with Ctrl + F
unlike endless scrolls JS techniques, where if elem not available then not found in Ctrl + F
*/
```
