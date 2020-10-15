## CSS
**Diff between CSS2 and CSS3**
1. CSS3 introduces media queries 

## CSS2 and CSS3
Importing css in a css, possible only in css3  
@import "heading.css"  
1. To style 2 tags at one time
```css
h1, h2 {
	color: white;
}
```
2. To style all tags
```css
* {
	color: white;
}
```
3. To style all tags inside a div
```css
div * {
	color: white;
}
```
4. To style a class
```css
.sitelink {
	color: white;
}
```
5. To style id
```css
#sitelink {
	color: white;
}
```
6. classes named sitelink only inside a paragraph
```css
p.sitelink {
	color: white;
}
```
7. span only with specific id
```css
span#sitelink {
	color: white;
}
```
8. target an id, and only ol
```css
#sitelink ol {
	color: white;
}
```
9. target first p inside h3 tag
```css
h3 + p {
	color: white;
}
```
10. target a inside first p of h3
```css
h3 + p > a {
	color: white;
}
```
11. to target all p with specific class, notice the diff. with pt. no 6.
```css
p[sitelink] {
	color: white;
}

//for ids same as class
p[sitelink] {
	color: white;
}
```
12. combinators
```css
1. Descendant combinator
// The following example selects all <p> elements inside <div> elements:  
 div p {
  background-color: yellow;
}

2. Child combinator
// The following example selects all <p> elements that are children of a <div> element:
div > p {
  background-color: yellow;
}
// here diff. between descendent selector is that it will not style a p tag if it is not a DIRECT child

3. Adjacent sibling combinator
// The following example selects all <p> elements that are placed immediately after <div> elements:
div + p {
  background-color: yellow;
}

4. General sibling combinator
// The following example selects all <p> elements that are siblings of <div> elements: 
// they have same parent
div ~ p {
  background-color: yellow;
}
```

#### pseudo classes and elements
1. Pseudo element  
A CSS pseudo-element is used to style specified parts of an element.  
```css
// syntax
selector::pseudo-element {
  property: value;
}

// The following example formats the first line of the text in all <p> elements:
p::first-line {
  color: #ff0000;
  font-variant: small-caps;
}
//similarly we have
div/p::first-letter
::before - used to insert some content before the content of an element
h1::before {
  content: url(smiley.gif);
}

::after - used to insert some content after the content of an element

//multiple combinations
p.intro::first-letter
```
2. Pseudo classes
A pseudo-class is used to define a special state of an element.
```css
//syntax
selector:pseudo-class {
  property: value;
}

a:link {
	color: red
}

//similarly
visited
hover
active
// above are for a, div tags

// for input tags we have
checked, enabled, focus, invalid
```


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
A fixed position element is positioned relative to the viewport, or the browser window itself. The viewport doesn’t change when the window is scrolled, so a fixed positioned element will stay right where it is when the page is scrolled.  
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

 


#### CSS animations