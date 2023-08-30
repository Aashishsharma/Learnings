### First 5 lines in HTML
1. <!DOCTYPE html -  
let the browser know that this is an HTML5 page and should be rendered accordingly  
2. <html dir="ltr" lang="en">  
The content is written in left to right direction. e.g. urdu had rtl  
language = 'english'  
3. Possible tags included in head tag in html  
| Line | Example | Explanation |
|------|---------|-------------|
| 1.   | `<!DOCTYPE html>` | This declaration defines the document type and version of HTML being used, which is HTML5 in this case. It ensures proper rendering and parsing of the document by web browsers. |
| 2.   | `<html lang="en">` | This opening tag signifies the start of the HTML document. The `lang` attribute specifies the language code for the document's content. |
| 3.   | `<meta charset="UTF-8">` | This meta tag sets the character encoding of the document to UTF-8. UTF-8 supports a wide range of characters from various languages and ensures proper text rendering. |
| 4.   | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | This meta tag is crucial for responsive web design. It configures the viewport settings to match the device's width and sets the initial zoom level to 1.0. |
| 5.   | `<title>Page Title</title>` | The title tag defines the title of the web page. The text within this tag is displayed in the browser's title bar or tab, helping users identify the page. |
| 6.   | `<meta name="description" content="Brief description of the page.">` | This meta tag provides a concise description of the web page's content. Search engines often use this description in search results to give users an idea of the page's content. |
| 7.   | `<link rel="stylesheet" href="styles.css">` | This link tag establishes a connection to an external CSS stylesheet named "styles.css." The stylesheet is used to apply visual styles to the HTML content. |
| 8.   | `<script src="script.js"></script>` | This script tag links an external JavaScript file named "script.js" to the HTML document. The JavaScript file can contain interactive behavior and functionality. |
| 9.   | `<link rel="icon" href="favicon.ico" type="image/x-icon">` | This link tag specifies a favicon, a small icon displayed in the browser tab or bookmark bar. The `href` attribute points to the favicon image file. |
| 10.  | `<meta name="author" content="John Doe">` | This meta tag attributes the authorship of the web page. The `content` attribute holds the author's name, which can be useful for search engine indexing and attribution. |



## HTML5
### New things
#### 1. OLD vs new Doc Type
Older HTML language was SGML based and therefore required a reference to a DTD.
```HTML
OLD
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
NEW
<!DOCTYPE html>
```
#### 2. No type required in script tag
```HTML
Old
<script type = "text/javascript" src = "scriptfile.js"></script> 
New
<script src = "scriptfile.js"></script>
Old
<link rel = "stylesheet" type = "text/css" href = "stylefile.css">
New
<link rel = "stylesheet" href = "stylefile.css">
```

#### 3. New Tags
```HTML
//New Markup
<!DOCTYPE html> 

<html>  
   <head> 
      <meta charset = "utf-8"> 
      <title>...</title> 
   </head> 
   <body> 
      <header>...</header>           // header of a section
      <nav>...</nav>                 // navigation
      <article>                      // independent piece of content of a document, such as a blog entry or newspaper article.
         <section>                   // application section 
            ... 
         </section> 
      </article>                      
      <aside>...</aside>             // only slightly related to the rest of the page.
      <footer>...</footer>           // footer of a section
   </body> 
</html> 
```

#### 4. New input type attributes
```HTML
<input type="datetime"></input>    // will take date only in a specified format 
<input type="number"></input>      // will take only number
<input type="email"></input>       // will take only valid email
<input type="url"></input>         // will take only valid url
// there are many more
autofocus, required, placeholder and so on
```

#### 5. Canvas
HTML5 element <canvas> gives you an easy and powerful way to draw graphics using JavaScript
#### 6. Audio/Video
HTML5 features, include native audio and video support without the need for Flash  
```HTML
Video
<video src = "foo.mp4"  width = "300" height = "200" controls>
   Your browser does not support the <video> element.   
</video>
Audio
<audio src = "foo.wav" controls autoplay>
   Your browser does not support the <audio> element.   
</audio>
```
#### 7. Geolocation
It is an HTML 5 Api
```javascript
function getLocation() {
   var geolocation = navigator.geolocation;
   geolocation.getCurrentPosition(showLocation, errorHandler);
}
// Here showLocation and errorHandler are callback methods 
// which we need to implement
function showLocation( position ) {
   var latitude = position.coords.latitude;
   var longitude = position.coords.longitude;
   ...
}
```
HTML 5 also have drag n drop APIs