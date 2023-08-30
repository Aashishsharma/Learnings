### First 5 lines in HTML
1. <!DOCTYPE html -  
let the browser know that this is an HTML5 page and should be rendered accordingly  
2. <html dir="ltr" lang="en">  
The content is written in left to right direction. e.g. urdu had rtl  
language = 'english'  
3. Possible tags included in head tag in html  
| Tag         | Attribute(s)             | Description                                    | When to Use                                          | Example                                              | Example Explanation                                                                 |
|-------------|--------------------------|------------------------------------------------|------------------------------------------------------|------------------------------------------------------|-------------------------------------------------------------------------------------|
| `<meta>`    | `charset`                | Specifies the character encoding for the document. | Define the character encoding of the document.      | `<meta charset="UTF-8">`                          | Sets the character encoding of the document to UTF-8.                             |
|             | `name`                   | Provides metadata's name for the document.     | Provide a brief description for search engines.    | `<meta name="description" content="My website description">` | Sets the description metadata for search engines.                                  |
|             | `content`                | Provides the actual content for the attribute. | Specify the content for metadata attributes.       | `<meta name="description" content="My website description">` | Specifies the actual content for the "description" metadata attribute.             |
| `<title>`   | N/A                      | Sets the title of the web page.              | Set the title of the web page.                    | `<title>My Web Page</title>`                       | Sets the title of the web page as displayed in the browser's title bar or tab.     |
| `<link>`    | `rel`                    | Specifies the relationship between the current document and the linked resource. | Link an external stylesheet or resource.          | `<link rel="stylesheet" href="styles.css">`   | Specifies that the linked resource is a stylesheet.                                |
|             | `href`                   | Specifies the URL of the linked resource.    | Provide the URL of the linked resource.            | `<link rel="stylesheet" href="styles.css">`   | Provides the URL to the external stylesheet file.                                |
|             | `type`                   | Specifies the MIME type of the linked resource. | Define the MIME type for linked resources.        | `<link rel="stylesheet" type="text/css" href="styles.css">` | Defines the MIME type of the linked stylesheet as text/css.                        |
|             | `media`                  | Specifies the media type for which the linked resource is intended. | Specify the media type for which the resource is intended. | `<link rel="stylesheet" media="screen" href="styles.css">` | Indicates that the stylesheet is intended for screen media.                        |
|             | `sizes`                  | Specifies the sizes of the linked icon for different displays. | Specify icon sizes for different display contexts. | `<link rel="icon" sizes="16x16" href="favicon.ico">` | Specifies the dimensions of the favicon for different display contexts.            |
| `<style>`   | `type`                   | Specifies the MIME type of the embedded style content. | Embed CSS styles within the document.            | `<style type="text/css">...</style>`               | Defines an embedded CSS style block with the specified MIME type.                  |
| `<script>`  | `src`                    | Specifies the URL of the external script file. | Link an external JavaScript file.                 | `<script src="script.js"></script>`                | Links to an external JavaScript file.                                             |
|             | `type`                   | Specifies the MIME type of the script content. | Define the type of linked script files.           | `<script type="text/javascript" src="script.js"></script>` | Defines the type of the linked script file as JavaScript.                          |
|             | `async`                  | Specifies that the script should be executed asynchronously. | Load scripts asynchronously for improved performance. | `<script async src="script.js"></script>`     | Instructs the browser to load and execute the script asynchronously.              |
|             | `defer`                  | Specifies that the script should be deferred and executed after parsing. | Defer script execution until after parsing.       | `<script defer src="script.js"></script>`    | Delays the execution of the script until HTML parsing is complete.                |
| `<base>`    | `href`                   | Specifies the base URL for relative URLs.     | Set the base URL for resolving relative URLs.     | `<base href="https://www.example.com/">`         | Sets the base URL for resolving relative URLs.                                    |
|             | `target`                 | Specifies the default target for all hyperlinks and forms. | Set the default target for links and forms.      | `<base target="_blank">`                        | Opens all links and form submissions in a new browser tab or window.               |
| `<meta>`    | `http-equiv`             | Provides an HTTP header value for the document. | Set HTTP headers for the document.               | `<meta http-equiv="refresh" content="5">`       | Sets an HTTP header to refresh the page after 5 seconds.                          |
|             | `content`                | Provides the actual content for the attribute. | Specify content for HTTP-equivalent attributes.   | `<meta http-equiv="refresh" content="5">`       | Specifies the content for the "refresh" attribute, indicating the time interval.  |
| `<noscript>`| N/A                      | Defines content to display if scripts are disabled. | Provide an alternative for users with disabled scripts. | `<noscript>Your browser doesn't support scripts.</noscript>` | Provides an alternative content for users with disabled JavaScript.               |
| `<meta>`    | `name`                   | Provides various information to search engines. | Specify metadata information for search engines. | `<meta name="author" content="John Doe">`         | Specifies the author's name for search engines.                                   |
|             | `content`                | Provides the actual content for the attribute. | Provide the content for metadata attributes.     | `<meta name="author" content="John Doe">`         | Sets the actual content of the "author" metadata attribute.                        |
|             | `name`                   | Specifies the name of the attribute.         | Set specific attribute names.                    | `<meta name="charset" content="UTF-8">`          | Sets the name of the attribute as "charset".                                      |
|             | `content`                | Provides the actual content for the attribute. | Provide the content for metadata attributes.     | `<meta name="charset" content="UTF-8">`          | Specifies the character encoding of the document as UTF-8.                         |
|             | `name`                   | Specifies the name of the attribute.         | Set specific attribute names.                    | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | Sets the name of the attribute as "viewport".                                    |
|             | `content`                | Provides the actual content for the attribute. | Specify viewport settings for responsive design. | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | Specifies the viewport settings for responsive web design.                        |


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