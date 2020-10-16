## SASS (Syntactically Awesome Style Sheets)
 CSS extension language/ It is a CSS preprocrssor  
 Sass is a stylesheet language that’s compiled to CSS. It allows you to use variables, nested rules, mixins, functions, and more  

#### Syntax
1. SCSS syntax  
The SCSS syntax uses the file extension .scss  
Syntax is similar to css  
```scss
@mixin button-base() {
  @include typography(button);
  @include ripple-surface;
  @include ripple-radius-bounded;
  display: inline-flex;
  position: relative;
  height: $button-height;
  border: none;
  vertical-align: middle;
  &:hover { cursor: pointer; }
  &:disabled {
    color: $mdc-button-disabled-ink-color;
    cursor: default;
    pointer-events: none;
  }
}
```
2. Indented syntax
extension - .sass  
it was original syntax, ninw use above one

#### SASS Features
##### 1. Variables
Prefixed with $    
Regular css now also have variablesknown as custom properties  
```scss
$font-stack:    Helvetica, sans-serif;
$primary-color: #333;
body {
  font: 100% $font-stack;
  color: $primary-color;
}
```

##### 2. Nesting
```scss
nav {
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  li { display: inline-block; }
  a {
    display: block;
    padding: 6px 12px;
    text-decoration: none;
  }
}
```
In normal css we would have to write nav ul {} nav li{} and nav a {}

##### 3. Partials and modules
**Partials**  
contain snippetsof CSS code  
should start with underscore. It lets Sass know that the file is only a partial file and that it should not be generated into a CSS file.  
Sass partials are used with the @use rule.  
```scss
// partial
// _base.scss
$font-stack:    Helvetica, sans-serif;
$primary-color: #333;
body {
  font: 100% $font-stack;
  color: $primary-color;
}

// styles.scss
@use 'base';
.inverse {
  background-color: base.$primary-color;
  color: white;
}
```
**Sass @use vs css @import**  
css @import will have multiple network requests as those are separate files, in Sass @use, after compilation partilas files are merged in the used file. so one network call is saved.  

##### 4. Mixins and Functions
**Mixins**
 A mixin lets you make groups of CSS declarations that you want to reuse throughout your site. You can even pass in values to make your mixin more flexible.   
```scss
@mixin transform($property) {
  -webkit-transform: $property;
  -ms-transform: $property;
  transform: $property;
}
.box { @include transform(rotate(30deg)); }
``` 
**Functions**  
```scss
@function pow($base, $exponent) {
  $result: 1;
  @for $_ from 1 through $exponent {
    $result: $result * $base;
  }
  @return $result;
}
.sidebar {
  float: left;
  margin-left: pow(4, 3) * 1px;
}
```
**Functions vs Mixins**  
Functions return value, mixins replace entire body where the mixin is called  

##### 5. Extend/Inhertiance
Using @extend lets you share a set of CSS properties from one selector to another.  
```scss
/* This CSS will print because %message-shared is extended. */
%message-shared {
  border: 1px solid #ccc;
  padding: 10px;
  color: #333;
}
// This CSS won't print because %equal-heights is never extended.
%equal-heights {
  display: flex;
  flex-wrap: wrap;
}
.success {
  @extend %message-shared;
  border-color: green;
}
.error {
  @extend %message-shared;
  border-color: red;
}
```
As CSS in %equal-heights isn't used it is not generated

##### 6. Operators
```scss
.container {
  width: 100%;
}
article[role="main"] {
  float: left;
  width: 600px / 960px * 100%;
}
aside[role="complementary"] {
  float: right;
  width: 300px / 960px * 100%;
}
```

##### 7. Conditionals
```scss
@mixin triangle($size, $color, $direction) {
  height: 0;
  width: 0;
  border-color: transparent;
  border-style: solid;
  border-width: $size / 2;
  @if $direction == up {
    border-bottom-color: $color;
  } @else if $direction == right {
    border-left-color: $color;
  } @else if $direction == down {
    border-top-color: $color;
  } @else if $direction == left {
    border-right-color: $color;
  } @else {
    @error "Unknown direction #{$direction}.";
  }
}
.next {
  @include triangle(5px, black, right);
}
```

##### 8. Loops
```scss
1. @each

$sizes: 40px, 50px, 80px;
@each $size in $sizes {
  .icon-#{$size} {
    font-size: $size;
    height: $size;
    width: $size;
  }
}

2. @for

$base-color: #036;
@for $i from 1 through 3 {
  ul:nth-child(3n + #{$i}) {
    background-color: lighten($base-color, $i * 5%);
  }
}

3. @while

@function scale-below($value, $base, $ratio: 1.618) {
  @while $value > $base {
    $value: $value / $ratio;
  }
  @return $value;
}
```

## Using SASS
npm i --save-dev sass || Live Sass compiler VS code plugin can be used (this takes care of minification as well)  
As best practice, create a css and scss folder  
Once done with scss code run sass command to convert scss to css  
**Preprocessing**  
It will take your preprocessed Sass file and save it as a normal CSS file that you can use in your website.  
running sass input.scss output.css from your terminal would take a single Sass file, input.scss, and compile that file to output.css.  
Auto preprocessing  
sass --watch input.scss output.css  
You can watch and output to directories by using folder paths as your input and output, and separating them with a colon. In this example:  
sass --watch app/sass:public/stylesheets  
