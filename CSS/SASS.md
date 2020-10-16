## SASS (Syntactically Awesome Style Sheets)
 CSS extension language/ It is a CSS preprocrssor  
 Sass is a stylesheet language that’s compiled to CSS. It allows you to use variables, nested rules, mixins, functions, and more  

 **Preprocessing**  
 It will take your preprocessed Sass file and save it as a normal CSS file that you can use in your website.  
running sass input.scss output.css from your terminal would take a single Sass file, input.scss, and compile that file to output.css.  
Auto preprocessing  
sass --watch input.scss output.css  
You can watch and output to directories by using folder paths as your input and output, and separating them with a colon. In this example:  
sass --watch app/sass:public/stylesheets  

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

##### 4. Mixins
 A mixin lets you make groups of CSS declarations that you want to reuse throughout your site. You can even pass in values to make your mixin more flexible.   
```scss
@mixin transform($property) {
  -webkit-transform: $property;
  -ms-transform: $property;
  transform: $property;
}
.box { @include transform(rotate(30deg)); }
``` 

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