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


## Text and Fonts
1. Text styling
body{
text-transform - uppercase/lowercase/capatilized/none
text-decoration - underline/overline/line-through
text-align: left, right, center, justify(each line of para would use entire width, if word not fitring in the end, more space added inbetwwen words
} 

2. Fonts
body{
font-weight: 100-800 // thickness of font
font-style: italic
font-size: 1.25em // 25% larger then standard font-size
font-family - 3 default available, serif(edgey characters) sans-serif (opp. of serif - good readibility), monospace (each character has same width)
Other common available - times new roman, aerial on users computer 

font-family: "Times New Roman", serif - it basically says - use font family as TNR, if not available on users computer, use default as serif 

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
1. static  
This is the default for every single page element.  
it just means that the element will flow into the page as it normally would.  
2. relative  
What it really means is “relative to itself”. If you set position: relative; on an element but no other positioning attributes (top, left, bottom or right), it will have no effect on it’s positioning at all, it will be exactly as it would be if you left it as position: static; But if you do give it some other positioning attribute, say, top: 10px;, it will shift its position 10 pixels down from where it would normally be.  
3. fixed  
A fixed position element is positioned relative to the viewport, or the browser window itself. In this case, the element is removed from the normal document flow. The viewport doesn’t change when the window is scrolled, so a fixed positioned element will stay right where it is when the page is scrolled.  
This might be used for something like a navigation bar  

4. absolute  
Elements with position: absolute are positioned relative to their parent elements. In this case, the element is removed from the normal document flow. The other elements will behave as if that element is not in the document. No space is created for the element in the page layout. The values of left, top, bottom and right determine the final position of the element.  
If the closest parent element is not positioned, it is positioned relative to the next parent element that is positioned. If there's no positioned ancestor element, it is positioned relative to the <html> element.  
So for absolute top:0px means it would be at top but relative to the parent position  
Just avoid using it  

5. sticky  
A sticky element toggles between relative and fixed, depending on the scroll position. It is positioned relative until a given offset position is met in the viewport - then it "sticks" in place (like position:fixed).  
```css
div.sticky {
  position: sticky;
  top: 0; //offset
}
```
All postion type should have top, right, bottom, left parameters, or at lest one of them  

#### Specificty
1. Specificity is the means by which browsers decide which CSS property values are the most relevant to an element and, therefore, will be applied.  
2. It helps us understand why some styles are not being applied to an element when we think they should  
3. It's so easy to just slap an !important value on your CSS styles, but this causes your CSS to quickly spiral out of control  
4. When two or more styles target a particular element, the style with the highest specificity is the one that gets applied.  

**Calculate specificity**  
![alt text](PNG/specificity.PNG "Title")  

#### CSS naming conventions
**Use BEM (Block-Element-Modifier) standard**  
1. Block - Standalone entity that is meaningful on its own.  
e.g. - header, container, menu, checkbox, input  
2. Element - A part of a block that has no standalone meaning and is semantically tied to its block.  
e.g. - menu item, list item, checkbox caption, header title  
3. Modifier - A flag on a block or element. Things that change appearance or behavior.  
e.g. - disabled, highlighted, checked, fixed, size big, color yellow

**naming syntax**  
**block-name__elem-name_mod-name_mod-val**  
notice when to use - and _ and how many times  

#### CSS layouts  

#### 1. CSS Box Model  
![alt text](PNG/css-box-model.png "Title")  

Padding - space between border and content
Margin - soace between border and other elems
padding/margin : 10px
(If one arg, then top, right, bottom and left, same padding/margin applied, if 2 args- 1st arg for top-bottom, if 4 args, from top to left) 

### 2. Flex-box
Is a one-dimensional layout model where as css-grid layout is 2 dimensional  
(Flexible box) used to layout a page
Alternative to box model + float and display to layout elems on a web page. 

Set dispaly:flex - to parent div/any other elem to start with flexbox 

#### 1. Containers
#### 2. Items 

#### 1. Containers properties
(add wd/ht to entire container by default all items are stretched to container ht) 

##### 1. Flex, and flex-wrap 
.container {
display:flex,
flex-direction: row(default)/column, row-reverse, column-reverse;
flex-wrap: nowrap(default)/ wrap (if wrap - items moved to next line if no more space available
} 

##### 2. flex-flow (shorthand for above)
flex-flow: column wrap

##### 3. justify-content
Alligning flex items in a container
for horizontal alignment  
justify-content: flex-start, flex-end, center,
space-between(all items spread out till the end of the container with equal space in between), space-around (space between + same space left at the left of 1st item and right of last item) 

##### 4. align-items
For vertical alignment
align-items : stretch(default, height of all items same as that of container) center - (equal space left at top and bottom), flex-start (at the top of the container, at bottom empty space, items have their own height, not streched) flex-end, baseline(all items's center will have same base, no matter the height of each elem) 

Tip - to align flex items exactly at the center of div
justify-content: center - horizontal center
align-items:  center - vertical center 

So basically
.abc {
display: flex, justify-content and align-items to center
} 

##### 5. gap, row-gap, column-gap
controls the space between flex items  
gap: 10px // applies for both row and column


#### 2. Items properties
##### 1. Order
One imp property- style="order: 0 to n", 0- default, and all other items are placed based on order no. Useful when componetns order is dynamic from javascript, 
Generally used with inline style, since order no needs to be diff. for each item, can be used in render method arr.map() 

Why flexbox is popular as opposed to display:block with float and grid layout 

Due to shrink-grow and basis - they define the responsive layout 

##### 2. --- flex-grow, shrink, basis ---
(These properties are added to flex-item)
These 3 properties decide how the extra space within the flex container is utilized 

1. Flex-basis - default size of an element before the remaining space is distributed : 100px
2. Flex-grow (default -0 - no item gets extra space)  - flex-grow:2 - this item would get twice the REMAINING SPACE as compared to other items, note that all other items need to have the grow properties as well, or only this item would get the remaining space
3. Flex-shrink- (default-1 - all items are shrinked in equal proportion when screen size is being reduced) flez-shrink:3, this item would shrink thrice as compared to other items 

4. Flex - as a shorthand
flex: 1, 1, 100px (grow, shrink, basis) 

##### 3. align-self: flex-start/end/center 
this align individual items, as opposed to align-items (which is applied at container level)

#### 3. CSS GRID
Grid vs flexbox
Flexbox is 1D, grid is 2D -
Only few options on css flexbox to set height of the flex container (focuses on width),
In grid - you can specify width and height
However grid requires more manaul settinga for responsiveness 

Which to use when (grid is for layout, flexbox is for alignment)
Flexbox -
1. Small design 
2. To align items
3. Content first design - if you don't know how your content is going to look. 

### Grid -
1. Complex design
2. If you nees gap between block elems - we can define gap between rows and cols easily in grid
3. Layout first design- when layout us already defined 

#### 1. Container
#### 2. Items 

### 1. Container properties 
Container (add wd/ht to entire container, by default all items are stretched to container ht)

##### 1. display:grid | inline-grid

##### 2. grid-template-columns:  50px 10px 50px 
 (it would create 3 cols with 1st and 3rd cols with width of 50px, to create more cols add more args) set auto auto auto - (all cols evenly distributed)  
We can add %, fr(fraction), px to grid template-columns/rows  

grid-template-columns:  20% auto 1fr  

**useful css functions**  
grid-template-columns:  repeat(5, 1fr) - create 5 cols with unit as 1fr each  
grid-template-columns:  minmax(5px, 80%) - set min width of col to 5px and max to 80% of it's actual size  
grid-template-columns:  repeat(8, minmax(10px, 1fr));

**useful css units**  
1. fr - portion of the remaining space  
grid-template-columns: 1fr 3fr; - Means, 25% 75%, if we use % ot break when we add padding, so use fr  

##### 3. grid-template-rows :10px 100px
(1st row height of 10px, second od 100px) auto auto - (we afe able to set height here, hence 2D) 


##### 4. grid-template : <grid-template-rows> / <grid-template-columns>
shorthand for cols and rows to be defined on 1 prop  
.container {
	grid-template: 20% auto 30% / auto 50px auto
}

#### 5. column-gap, row-gap
column-gap: 50px
row-gap: 10px

#### 6. gap - <row-gap> <column-gap>
shorthand  
gap: 50px 10px

#### 7. justify-items (horizontal alignments) - applies for all items inside container
justify-items: start | end | center | stretch

#### 8. align-items (verticle alignment) - appies for all
align-items: start | end | center | stretch

#### 9. place-items - <align-items> / <justify-items>
shorthand for above 2  
place-item: center // centers horizontally and vertically

#### 10. justify-content
Sometimes the total size of the grid container might be less than the size of it's parent html elem, specially if the size of parent elem is set in pixels  
This behaves same as justify-items (align horizontally), but entire grid acts like an item for the parent html elem  
justify-content: start | end | center | stretch | space-around (between + space left on 1st and last item of the container) | space-between

#### 10. align-content
Sometimes the total size of the grid container might be less than the size of it's parent html elem, specially if the size of parent elem is set in pixels  
This behaves same as align-items (align vertically), but entire grid acts like an item for the parent html elem  
justify-content: start | end | center | stretch | space-around (between + space left on 1st and last item of the container) | space-between

#### 11. place-content: <align-content> / <justify-content>
Shorthand for above 2 

### 2. Item properties 

#### 1. grid-column-start/end, grid-row-start/end
Different values that can be included  
.item-a {
  grid-column-start: 2;
  grid-column-end: five;
  grid-row-start: row1-start;
  grid-row-end: 3;
}

shorthands for above (include start and end)  
.item-c {
  grid-column: 3 / span 2;
  grid-row: third-line / 4;
}

#### 2. justify-self
Aligns a grid item inside a cell (horizontally)  
justify-self: start | end | center | stretch;  
Note -justify-item - works for all the items inside the grid and justify-self (since it is applicable on a particular item, this style is applied to only this item) for all grid items we use justify-item

#### 3. align-self
Aligns a grid item inside a cell (horizontally)  
align-self: start | end | center | stretch;  
Same difference with align-items as above

#### 4. place-self <align-self> / <justify-self>
Same as place-items, but only applicable to this particular item as opposed to all items withing the gird container



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