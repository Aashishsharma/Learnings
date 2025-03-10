### HTML vs HTML5

| Feature         | HTML5                                                                            | New Features in HTML5                                                                                                                                                        |
| --------------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Version         | Latest version of the HTML standard.                                             | `<header>`, `<nav>`, `<footer>`, `<video>`, `<audio>`, `<canvas>`, new form input types, semantic elements, APIs, improved offline support, enhanced accessibility features. |
| Doctype         | `<!DOCTYPE html>`                                                                | N/A                                                                                                                                                                          |
| Elements        | Expanded set of semantic and structural elements.                                | Semantic elements, new structural elements like `<article>`, `<section>`, etc. They help search engines to understand page structure                                         |
| Attributes      | Additional attributes and global attributes.                                     | New input attributes, attributes for multimedia elements. (see below for new attributes)                                                                                     |
| Multimedia      | Enhanced multimedia support with `<audio>`, `<video>`, and `<canvas>`.           | `<audio>`, `<video>`, `<canvas>`, better multimedia support.                                                                                                                 |
| Forms           | New input types, attributes, and validation features.                            | New input types, form attributes, validation attributes.                                                                                                                     |
| Semantic Tags   | Rich set of semantic elements like `<header>`, `<nav>`, `<footer>`, etc.         | `<header>`, `<nav>`, `<footer>`, `<article>`, `<section>`, etc.                                                                                                              |
| APIs            | Rich set of APIs including Geolocation, Web Storage, and more.                   | Geolocation API, Web Storage, Web Workers, etc.                                                                                                                              |
| Offline Support | Offline storage using Web Storage and Service Workers.                           | Web Storage, Service Workers, offline caching.                                                                                                                               |
| Accessibility   | Enhanced accessibility features and ARIA roles.                                  | Improved accessibility, ARIA roles, `<figure>`, `<figcaption>`, etc.                                                                                                         |
| Browser Support | Better support in modern browsers, some features may not work in older browsers. | Better compatibility with modern browsers.                                                                                                                                   |

**New attributes**

Common input types  
Most input types like (url, email) will allow you to enter random value, and the actual valiadtion is done, when the form is getting submitted

| **Type**                    | **Sample HTML Code**              | **Common Attributes**                |
| --------------------------- | --------------------------------- | ------------------------------------ |
| text                        | `<input type="text" />`           | name, value, placeholder, maxlength  |
| password                    | `<input type="password" />`       | name, value, maxlength, autocomplete |
| email                       | `<input type="email" />`          | name, value, placeholder, required   |
| number                      | `<input type="number" />`         | name, value, min, max, step          |
| checkbox                    | `<input type="checkbox" />`       | name, value, checked, disabled       |
| radio                       | `<input type="radio" />`          | name, value, checked, disabled       |
| date                        | `<input type="date" />`           | name, value, min, max, required      |
| file                        | `<input type="file" />`           | name, accept, multiple, required     |
| range                       | `<input type="range" />`          | name, min, max, step, value          |
| submit                      | `<input type="submit" />`         | value, form, disabled                |
| button                      | `<input type="button" />`         | value, onclick, disabled, form       |
| reset                       | `<input type="reset" />`          | value, form, disabled                |
| color (shows color palette) | `<input type="color" />`          | name, value, disabled, required      |
| search                      | `<input type="search" />`         | name, value, placeholder, maxlength  |
| url                         | `<input type="url" />`            | name, value, placeholder, maxlength  |
| hidden                      | `<input type="hidden" />`         | name, value, form                    |
| datetime-local              | `<input type="datetime-local" />` | name, value, min, max, required      |
| time                        | `<input type="time" />`           | name, value, min, max, required      |
| image                       | `<input type="image" />`          | src, alt, width, height, form        |

### First 10 lines in HTML

| Line | Example                                                                  | Explanation                                                                                                                                                                                                                            |
| ---- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1.   | `<!DOCTYPE html>`                                                        | This declaration defines the document type and version of HTML being used, which is HTML5 in this case. It ensures proper rendering and parsing of the document by web browsers.                                                       |
| 2.   | `html dir="ltr" lang="en"`                                               | This opening tag signifies the start of the HTML document. The `lang` attribute specifies the language code for the document's content. dir = direction - left-to-right                                                                |
| 3.   | `<meta charset="UTF-8">`                                                 | This meta tag sets the character encoding of the document to UTF-8. UTF-8 supports a wide range of characters from various languages and ensures proper text rendering.                                                                |
| 4.   | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | This meta tag is crucial for responsive web design. It configures the viewport settings to match the device's width and sets the initial zoom level to 1.0.                                                                            |
| 5.   | `<title>Page Title</title>`                                              | The title tag defines the title of the web page. The text within this tag is displayed in the browser's title bar or tab, helping users identify the page.                                                                             |
| 6.   | `<meta name="description" content="Brief description of the page.">`     | This meta tag provides a concise description of the web page's content. Search engines often use this description in search results to give users an idea of the page's content.                                                       |
| 7.   | `<link rel="stylesheet" href="styles.css">`                              | This link tag establishes a connection to an external CSS stylesheet named "styles.css." The stylesheet is used to apply visual styles to the HTML content.                                                                            |
| 8.   | `<script src="script.js"></script>`                                      | This script tag links an external JavaScript file named "script.js" to the HTML document. The JavaScript file can contain interactive behavior and functionality.                                                                      |
| 9.   | `<link rel="icon" href="favicon.ico" type="image/x-icon">`               | This link tag specifies a favicon, a small icon displayed in the browser tab or bookmark bar. The `href` attribute points to the favicon image file.                                                                                   |
| 10.  | `<meta name="author" content="John Doe">`                                | This meta tag attributes the authorship of the web page. The `content` attribute holds the author's name, which can be useful for search engine indexing and attribution.                                                              |
| 11.  | `<meta http-equiv="Content-Language" content="en">`                      | This meta tag specifies the natural language of the content on the page. The `content` attribute holds the language code.                                                                                                              |
| 12.  | `<meta http-equiv="Expires" content="Tue, 01 Jan 2024 12:00:00 GMT">`    | This meta tag sets the expiration date and time for the page's content. Browsers and caching mechanisms use this information to determine whether to fetch a fresh version of the page.                                                |
| 13.  | `<meta http-equiv="Refresh" content="5;url=https://example.com/">`       | This meta tag instructs the browser to refresh or reload the page after a specified time interval (in seconds) and provides a URL to redirect to. For example, after 5 seconds, the page will be redirected to "https://example.com/". |

## HTML Semantic tags

**Why?** -

1. Easier to read HTML
2. SEO
3. Better for screen readers / accessibility

```HTML
Before these semantic tags, we were using divs everywhere
But dive doesnot give enough context about the HTML strucutre
<body>
    <header>
      <h1>There should onyl be 1 H1 tag per page
        - and after H1 you should not skip the hierarchy, you should not directly use H4
        - H1-6 tags are not meant for sizing text, we can always use font-size for that
        - H1-6 tags are mainly used to outline the page assisting screen readers
      </h1>
        <nav> it describes that this would be a navigation
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main> - Each html page should have only one main section
        <article> - Use article tag when the content within an article tag
                    can be placed to any other part of the page, without loosing it's purpose
                    E.g. - MDN site has an article tag - "Was this content helpful? provide feedback"
                    - this article tag in MDN is placed above footer
                    - now even if we move this article to a right aside section,
                    - the purpose of the content still remain the same, so this content should be article
                    - as opposed to sections (see below)
            <header>
                <h2>About Semantic HTML</h2>
            </header>
            <section>
                <p>sections, as per their name, are used to divide the content of main page, by logically grouping the content
                  E.g. - most sites have 50% of the above the fold of viewport with Hero content
                  - this content would include hero image, call to action button, and some imp tag lines
                  - so all of these html tags can be grouped in one section which will have a logical grouping
                  - these cant be articles, because placing them elsewhere won't make any sense
                  - then there can be other sections below the hero section
                </p>
            </section>
            <figure> figure and caption groups the media content and the caption into a meaningful whole
                <img src="semantic-html.png" alt="Semantic HTML Diagram">
                <figcaption>A diagram showing the structure of semantic HTML elements.</figcaption>
            </figure>
            <p>TO show time or dates we use time semantic tag <time datetime="2024-09-30">September 30, 2024</time>.</p>

        </article>

        <details> when we want to create collapsible, use details
          <summary>Summary would be shown when the accordian is closed</summary>
          <p>Rest section will be shown when accordian is expanded</p>
        </details>
        NOTE - USING DETAILS AND SUMMARY ACCATUALLY CREATES THE ACCORDIAN, IT IS NOT JUST A SEMANTIC TAG
        OTHER SEMANTIC TAGS ARE DONT FUNCTION BU JUST ADD MEANING TO THE HTML
        <aside> aside basically is used for sidebars, left or right
            <h3>Related Articles</h3>
            <ul>
                <li><a href="#">Benefits of Semantic HTML</a></li>
                <li><a href="#">Accessibility in Web Design</a></li>
            </ul>
        </aside>
    </main>
    <footer>
        <p>&copy; 2024 Semantic Web Page. All rights reserved.</p>
    </footer>
</body>
```

## HTML 5 APIS

#### 1. Geolocation

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

#### 2. Web Storage

**Web Storage** enables storing data in a user's web browser.

|                       | **localStorage**                                                                                            | **sessionStorage**                                                                                          |
| --------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Persistence**       | Data persists across sessions and is available to JavaScript code on the same domain.                       | Data is limited to a browsing session and remains accessible within the current tab or window.              |
| **Usage**             | Both `localStorage` and `sessionStorage` use the same API for storage.                                      | Both `localStorage` and `sessionStorage` use the same API for storage.                                      |
| **Storing Data**      | Use `setItem()` method: `localStorage.setItem('key', 'value')`                                              | Use `setItem()` method: `sessionStorage.setItem('key', 'value')`                                            |
| **Retrieving Data**   | Use `getItem()` method: `localStorage.getItem('key')`                                                       | Use `getItem()` method: `sessionStorage.getItem('key')`                                                     |
| **Removing Data**     | Use `removeItem()` method: `localStorage.removeItem('key')`                                                 | Use `removeItem()` method: `sessionStorage.removeItem('key')`                                               |
| **Clearing All Data** | Use `clear()` method: `localStorage.clear()`                                                                | Use `clear()` method: `sessionStorage.clear()`                                                              |
| **Caution**           | Not suitable for sensitive or large data storage. Meant for small data like preferences and temporary data. | Not suitable for sensitive or large data storage. Meant for small data like preferences and temporary data. |

#### 3. Web workers

Certainly, here's the Markdown code for the provided content:

| **Web Workers**        | **Explanation**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purpose**            | **Web Workers** are a part of HTML5 and are designed to run scripts in the background so that the main UI thread remains responsive to user interactions. They allow code execution in a separate thread, enhancing the utilization of multi-core processors and improving web app responsiveness.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Types**              | - **Dedicated Web Workers:** These workers are linked to a single creating script, operating in their own thread. They interact with the main thread through message passing. <br> - **Shared Web Workers:** Shared among various scripts from different origins. They enable cross-origin communication, useful for collaborative applications.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **Communication**      | Web Workers communicate with the main thread through the message-passing mechanism. They can't directly access the DOM or UI thread. Inter-thread communication involves using the `postMessage()` method to send messages between the main thread and the worker.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| **Real-Life Examples** | 1. **Image Manipulation:** A photo editing app can utilize Web Workers to apply filters, crop images, and adjust colors without freezing the UI. <br> 2. **Background Data Fetching:** Web Workers can fetch data from APIs in the background, ensuring the main thread remains responsive for user interactions. <br> 3. **Complex Calculations:** Applications dealing with simulations, scientific computations, or financial calculations can benefit from offloading resource-intensive tasks to Web Workers. <br> 4. **Multithreaded Video Encoding:** Video streaming platforms can use Web Workers to encode videos in multiple formats concurrently, improving performance and user experience. <br> 5. **Real-Time Collaboration:** Shared Web Workers can facilitate real-time collaboration on documents or projects, enabling users to work together without delays in responsiveness. |

**Example: Using a Web Worker to Calculate Prime Numbers:**
**index.html:**

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Prime Number Calculator</title>
  </head>
  <body>
    <h1>Prime Number Calculator</h1>
    <input type="number" id="rangeStart" placeholder="Start" />
    <input type="number" id="rangeEnd" placeholder="End" />
    <button id="calculate">Calculate Primes</button>
    <div id="result"></div>

    <script>
      const calculateButton = document.getElementById("calculate");
      const resultDiv = document.getElementById("result");

      calculateButton.addEventListener("click", () => {
        const rangeStart = parseInt(
          document.getElementById("rangeStart").value
        );
        const rangeEnd = parseInt(document.getElementById("rangeEnd").value);

        //Note that the worker.js file needs to be served from a web server, doesn't wotk locally
        const worker = new Worker("worker.js");

        worker.postMessage({ rangeStart, rangeEnd });

        worker.onmessage = function (event) {
          resultDiv.textContent = "Prime numbers: " + event.data.join(", ");
        };
      });
    </script>
  </body>
</html>
```

**worker.js:**

```javascript
self.onmessage = function (event) {
  const rangeStart = event.data.rangeStart;
  const rangeEnd = event.data.rangeEnd;
  const primeNumbers = calculatePrimesInRange(rangeStart, rangeEnd);

  self.postMessage(primeNumbers);
};

function calculatePrimesInRange(start, end) {
  const primes = [];
  for (let num = start; num <= end; num++) {
    if (isPrime(num)) {
      primes.push(num);
    }
  }
  return primes;
}

function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;

  let i = 5;
  while (i * i <= num) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
    i += 6;
  }

  return true;
}
```

Note - worker loaded from a different domain won't be able to access resources from the main page.

#### 4. Service workers

| **Feature**         | **Web Workers**                                                                                                         | **Service Workers**                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| **Purpose**         | Run scripts in the background to keep the UI responsive.                                                                | Act as a proxy between the web application and the network, allowing control over network requests and caching. |
| **Execution**       | Executes code in a separate thread, offloading UI thread.                                                               | Executes in the background and runs even when the web app is closed.                                            |
| **Access to DOM**   | Cannot access the DOM or UI thread directly, but can communicate with the UI thread using the `postMessage()` method. . | Cannot access the DOM                                                                                           |
| **Network**         | Cannot intercept or modify network requests.                                                                            | Can intercept and control network requests, enabling caching, offline access, and more.                         |
| **Caching**         | Not designed for caching or offline capabilities.                                                                       | Designed for caching assets and providing offline access. Can store resources and serve them when offline.      |
| **Browser Scope**   | Can be used for tasks such as background computation.                                                                   | Primarily used for tasks like caching, push notifications, and managing offline experiences.                    |
| **Examples**        | Calculations, data processing, image manipulation.                                                                      | Offline web apps, push notifications, background synchronization, caching static assets.                        |
| **Communication**   | Communicates with the main thread using `postMessage()`.                                                                | Can communicate with the main thread using `postMessage()`.                                                     |
| **Browser Support** | Supported in modern browsers.                                                                                           | Supported in modern browsers, but compatibility may vary for some features like background sync and push.       |
| **Use Cases**       | Background computation, performance optimization.                                                                       | Offline access, push notifications, caching, enhancing user experience in web apps.                             |

**Service worker example see webpush notification**

**Example implementation of WCAG guidelines**

```html
<head>
  <style>
    /* Perceivable: Provide appropriate alt text for images */
    img {
      width: 200px;
      height: 150px;
    }
    /* Operable: Ensure keyboard navigation and focus styles */
    button:focus,
    a:focus {
      outline: 2px solid blue;
    }
    /* Understandable: Use clear and concise link text */
    a {
      text-decoration: underline;
    }
    /* Robust: Use semantic HTML elements */
    article,
    section,
    nav {
      margin: 10px;
      padding: 10px;
      border: 1px solid #ccc;
    }
  </style>
</head>
<body>
  <h1>Accessibility Example</h1>
  <!-- Perceivable: Provide appropriate alt text for images -->
  <img src="example.jpg" alt="A beautiful landscape" />
  <!-- Operable: Ensure keyboard navigation and focus styles -->
  <button>Click me</button>
  <!-- A div element made focusable with tabindex -->
  <div tabindex="0">Focusable Div</div>
  <!-- Understandable: Use clear and concise link text -->
  <nav>
    <ul>
      <li><a href="#">Home</a></li>
      <li><a href="#">About Us</a></li>
    </ul>
  </nav>
  <!-- Robust: Use semantic HTML elements -->
  <article>
    <h2>Introduction</h2>
    <p>
      This is an example article for demonstrating accessibility guidelines.
    </p>
  </article>
</body>
```
