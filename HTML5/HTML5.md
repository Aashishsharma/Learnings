### HTML vs HTML5
| Feature        | HTML5                                          | New Features in HTML5                                 |
|----------------|-----------------------------------------------|-----------------------------------------------------|
| Version        | Latest version of the HTML standard.        | `<header>`, `<nav>`, `<footer>`, `<video>`, `<audio>`, `<canvas>`, new form input types, semantic elements, APIs, improved offline support, enhanced accessibility features. |
| Doctype        | `<!DOCTYPE html>`                            | N/A                                                 |
| Elements       | Expanded set of semantic and structural elements. | Semantic elements, new structural elements like `<article>`, `<section>`, etc. |
| Attributes     | Additional attributes and global attributes.     | New input attributes, attributes for multimedia elements. (see below for new attributes)|
| Multimedia     | Enhanced multimedia support with `<audio>`, `<video>`, and `<canvas>`. | `<audio>`, `<video>`, `<canvas>`, better multimedia support. |
| Forms          | New input types, attributes, and validation features. | New input types, form attributes, validation attributes. |
| Semantic Tags | Rich set of semantic elements like `<header>`, `<nav>`, `<footer>`, etc. | `<header>`, `<nav>`, `<footer>`, `<article>`, `<section>`, etc. |
| APIs           | Rich set of APIs including Geolocation, Web Storage, and more. | Geolocation API, Web Storage, Web Workers, etc. |
| Offline Support | Offline storage using Web Storage and Service Workers. | Web Storage, Service Workers, offline caching. |
| Accessibility  | Enhanced accessibility features and ARIA roles. | Improved accessibility, ARIA roles, `<figure>`, `<figcaption>`, etc. |
| Browser Support | Better support in modern browsers, some features may not work in older browsers. | Better compatibility with modern browsers. |

**New attributes**  
New input types  
```HTML
<input type="datetime"></input>    // will take date only in a specified format 
<input type="number"></input>      // will take only number
<input type="email"></input>       // will take only valid email
<input type="url"></input>         // will take only valid url
```
| Attribute         | Example                                       | Description                                     |
|-------------------|-----------------------------------------------|-------------------------------------------------|
| `placeholder`     | `<input type="text" placeholder="Enter your name">` | Provides a hint or example text within the input field. |
| `required`        | `<input type="email" required>`              | Specifies that the input must be filled out before submission. |
| `autofocus`       | `<input type="text" autofocus>`              | Automatically focuses on the input element when the page loads. |
| `min` and `max`   | `<input type="number" min="0" max="100">`    | Sets the minimum and maximum allowed values for numeric inputs. |
| `pattern`         | `<input type="text" pattern="[A-Za-z]{3}">` | Specifies a regular expression pattern that the input value must match. |
| `readonly`        | `<input type="text" value="Readonly" readonly>` | Makes the input field read-only, preventing user input. |
| `disabled`        | `<input type="text" value="Disabled" disabled>` | Disables the input field, preventing user interaction. |
| `size`            | `<input type="text" size="20">`             | Sets the visible width of the input field in characters. |
| `maxlength`       | `<input type="text" maxlength="50">`        | Specifies the maximum number of characters allowed in the input. |
| `step`            | `<input type="number" step="0.5">`          | Specifies the increment or decrement step for number inputs. |


### First 10 lines in HTML 
| Line | Example | Explanation |
|------|---------|-------------|
| 1.   | `<!DOCTYPE html>` | This declaration defines the document type and version of HTML being used, which is HTML5 in this case. It ensures proper rendering and parsing of the document by web browsers. |
| 2.   | `html dir="ltr" lang="en"` | This opening tag signifies the start of the HTML document. The `lang` attribute specifies the language code for the document's content. dir = direction - left-to-right |
| 3.   | `<meta charset="UTF-8">` | This meta tag sets the character encoding of the document to UTF-8. UTF-8 supports a wide range of characters from various languages and ensures proper text rendering. |
| 4.   | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | This meta tag is crucial for responsive web design. It configures the viewport settings to match the device's width and sets the initial zoom level to 1.0. |
| 5.   | `<title>Page Title</title>` | The title tag defines the title of the web page. The text within this tag is displayed in the browser's title bar or tab, helping users identify the page. |
| 6.   | `<meta name="description" content="Brief description of the page.">` | This meta tag provides a concise description of the web page's content. Search engines often use this description in search results to give users an idea of the page's content. |
| 7.   | `<link rel="stylesheet" href="styles.css">` | This link tag establishes a connection to an external CSS stylesheet named "styles.css." The stylesheet is used to apply visual styles to the HTML content. |
| 8.   | `<script src="script.js"></script>` | This script tag links an external JavaScript file named "script.js" to the HTML document. The JavaScript file can contain interactive behavior and functionality. |
| 9.   | `<link rel="icon" href="favicon.ico" type="image/x-icon">` | This link tag specifies a favicon, a small icon displayed in the browser tab or bookmark bar. The `href` attribute points to the favicon image file. |
| 10.  | `<meta name="author" content="John Doe">` | This meta tag attributes the authorship of the web page. The `content` attribute holds the author's name, which can be useful for search engine indexing and attribution. |
| 11.  | `<meta http-equiv="Content-Language" content="en">` | This meta tag specifies the natural language of the content on the page. The `content` attribute holds the language code. |
| 12.  | `<meta http-equiv="Expires" content="Tue, 01 Jan 2024 12:00:00 GMT">` | This meta tag sets the expiration date and time for the page's content. Browsers and caching mechanisms use this information to determine whether to fetch a fresh version of the page. |
| 13.  | `<meta http-equiv="Refresh" content="5;url=https://example.com/">` | This meta tag instructs the browser to refresh or reload the page after a specified time interval (in seconds) and provides a URL to redirect to. For example, after 5 seconds, the page will be redirected to "https://example.com/". |

####  Geolocation
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