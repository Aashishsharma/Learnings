## CSS
**Diff between CSS2 and CSS3**  

## CSS3
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
  

5. sticky  
A sticky element toggles between relative and fixed, depending on the scroll position. It is positioned relative until a given offset position is met in the viewport - then it "sticks" in place (like position:fixed).  
```css
div.sticky {
  position: sticky;
  top: 0; //offset
}
```
All postion type should have top, right, bottom, left parameters, or at lest one of them  
