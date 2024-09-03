## REST
1. REST stands for Representational State Transfer.
2. It is an architecture style for designing loosely coupled applications over HTTP
3. It is rescouce based, resource same as objs in OOP

### 6 Architectural Constraints
#### 1. Uniform interface
1. A resource in the system should have only one logical URI, and that should provide a way to fetch related or additional data.
2. Any single resource should not be too large and contain each and everything in its representation. Whenever relevant, a resource should contain links (HATEOAS) pointing to relative URIs to fetch related information.
3. Once a developer becomes familiar with one of your APIs, he should be able to follow a similar approach for other APIs.

#### 2. Client server
1. This constraint essentially means that client application and server application MUST be able to evolve separately without any dependency on each other.
2.  A client should know only resource URIs, and that’s all. Today, this is standard practice in web development, so nothing fancy is required from your side. Keep it simple.

#### 3. Stateless
1. The server will not store anything about the latest HTTP request the client made. It will treat every request as new. No session, no history.
2. If the client application needs to be a stateful application for the end-user, where user logs in once and do other authorized operations after that, then each request from the client should contain all the information necessary to service the request – including authentication and authorization details.

#### 4. Cacheable
In REST, caching shall be applied to resources when applicable, and then these resources MUST declare themselves cacheable. Caching can be implemented on the server or client-side.

#### 5. Layered system
REST allows you to use a layered system architecture where you deploy the APIs on server A, and store data on server B and authenticate requests in Server C, for example. A client cannot ordinarily tell if it is connected directly to the end server.

#### 6. Code on demand (optional)
Most of the time, you will be sending the static representations of resources in the form of XML or JSON. But when you need to, you are free to return executable code to support a part of your application, e.g., clients may call your API to get a UI widget rendering code. It is permitted.

### HTTP headers

#### 1. General headers

| Header           | Example                           | Possible Values                                                    | Description                                                                 |
|------------------|-----------------------------------|--------------------------------------------------------------------|-----------------------------------------------------------------------------|
| Cache-Control    | Cache-Control: no-cache           | no-cache, no-store, max-age=3600, public, private                  | Controls the caching mechanisms for both requests and responses.            |
| Connection       | Connection: keep-alive            | keep-alive, close                                                  | Controls whether the network connection stays open after the current transaction. |
| Date             | Date: Tue, 15 Nov 1994 08:12:31 GMT | Any valid date/time string in HTTP-date format                     | Contains the date and time at which the message was sent.                   |
| Upgrade          | Upgrade: websocket                | websocket, h2c                                                     | Requests the server to switch protocols, commonly used for WebSockets.      |
| Via              | Via: 1.1 example.com (squid/3.5.27) | Any proxy or gateway details in HTTP version format                | Indicates the intermediate protocols and recipients between the user agent and the server. |

#### 2. Request headers

| Header          | Example                                  | Possible Values                                | Description                                                                 |
|-----------------|------------------------------------------|------------------------------------------------|-----------------------------------------------------------------------------|
| Accept          | Accept: text/html                        | text/html, application/json, */*               | Indicates the media types that are acceptable for the response.             |
| Authorization   | Authorization: Basic YWxhZGRpbjpvcGVuc2VzYW1l | Basic, Bearer, Digest                          | Contains the credentials to authenticate a user agent with a server.        |
| User-Agent      | User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/91.0.4472.124 Safari/537.36 | Various strings identifying the client software | Contains information about the user agent (browser) making the request.     |
| Referer         | Referer: https://previous-site.com       | URL of the referring page                      | Indicates the URL of the previous web page from which a link to the currently requested page was followed. |

#### 3. Response headers

| Header          | Example                                  | Possible Values                                | Purpose                                                                 |
|-----------------|------------------------------------------|------------------------------------------------|-------------------------------------------------------------------------|
| Content-Type    | Content-Type: text/html                  | text/html, application/json, text/css          | Specifies the media type of the resource being returned in the response.|
| Server          | Server: Apache/2.4.41 (Unix)             | Server software details                        | Provides information about the software used by the server to handle the request. (used for debugging) |
| Set-Cookie      | Set-Cookie: sessionId=abc123; HttpOnly   | Cookie data and attributes                     | Sends cookies from the server to the client to be stored and sent with subsequent requests. |
| Content-Length  | Content-Length: 3487                     | Size of the response body in bytes             | used to implement progress indicator, server can read-file and get filesize in metadata                   |
| Location        | Location: https://example.com/redirect   | URL to redirect to                             | Specifies the URL to redirect the client to, often used in 3xx responses. |

#### 4. Represenation headers

| Header              | Example                                  | Possible Values                                | Purpose                                                                 | Use Case                                                   |
|---------------------|------------------------------------------|------------------------------------------------|-------------------------------------------------------------------------|------------------------------------------------------------|
| Content-Type        | Content-Type: application/json           | application/json, text/html, text/css, image/png | Indicates the media type of the resource being returned.                | Specifying the format of the response, like JSON or HTML.  |
| Content-Encoding    | Content-Encoding: gzip                   | gzip, compress, deflate, br                    | Specifies the encoding (compression) used on the response body.         | Compressing content to reduce response size, e.g., gzip.    |
| Content-Language    | Content-Language: en-US                  | en-US, fr-CA, es-ES                             | Indicates the language of the content being returned.                   | Serving content in a specific language, like English or Spanish. |
| Content-Length      | Content-Length: 5120                     | Size of the response body in bytes             | Indicates the size of the response body in bytes.                       | Providing the exact size of the content in the response.    |
| Content-Disposition | Content-Disposition: attachment; filename="example.pdf" | inline, attachment; filename="filename.ext"   | Suggests how the content should be displayed (inline or as an attachment). | Forcing a download of a file, like a PDF, rather than displaying it in the browser. |

#### 5. Security headers

| Header                   | Example                                   | Possible Values                                | Purpose                                                                 | Use Case                                                   |
|--------------------------|-------------------------------------------|------------------------------------------------|-------------------------------------------------------------------------|------------------------------------------------------------|
| Strict-Transport-Security | Strict-Transport-Security: max-age=31536000; includeSubDomains | max-age, includeSubDomains, preload           | Enforces the use of HTTPS over HTTP for future requests to the domain.  | Ensuring that all future requests to the domain are made over HTTPS. |
| Content-Security-Policy (prevents XSS attacks) (see below) | Content-Security-Policy: default-src 'self'; script-src 'self' https://trusted-scripts.com; (indicates scripts can be loaded only from this domain)
 | scrip-src- (controls which scripts browsers can load)| Controls the resources the browser is allowed to load for a given page. | Preventing cross-site scripting (XSS) attacks by limiting resource loading. |
| X-Frame-Options           | X-Frame-Options: DENY                     | DENY, SAMEORIGIN                               | Controls whether a page can be displayed in a frame or iframe.          | Preventing clickjacking attacks by disallowing framing of the page. |
| X-XSS-Protection (see XSS attack below)         | X-XSS-Protection: 1; mode=block           | 0, 1, 1; mode=block                            | Enables the Cross-Site Scripting (XSS) filter built into browsers.      | Preventing pages from loading when XSS attacks are detected.       |
| Access-Control-Allow-Origin | Access-Control-Allow-Origin: *           | * (wildcard), specific origin (e.g., https://example.com) | Specifies which origins can access the resources on the server. | Allowing cross-origin requests from specified domains, typically used in APIs. |

**XSS attack - Cross site scripting attack** - 
You have an input and also have document.getElemntById("a").innerHTML = userInput, and you are getting input from the url = /?userInput="", if userInput is not sanitised, whatever is passed in innerHTML wil get rendered  
```<img src onerror="alert("document.cookie")```, and when we send this url to a user under target, the cookie would be read and we can write some email functionality in the onerror script to share the cookie on hacker email, then hacker can login.  

**Solution1 - use Content-security-policy header** - 
1. ```Content-Security-Policy: default-src 'self'``` - all the content to be loaded from site's own origin, all other content from extrnal urls is blocked
2. ```Content-Security-Policy: default-src 'self'; img-src *; media-src example.org example.net; script-src userscripts.example.com``` - img can come from any external url, medai can come from  example.net and likewise
3. Setting CSP policy in html file
```
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';" />
```

**Solution 2 - use textContent instaed of innerHTML, if still innerHTML is needed for dynaimically genrating HTML, then sanitize user input**  
**Solution 3 - use X-XSS-Protection:0/1/mode: block; 0-no xss protection, 1: browser to try and sanitize the script, mode:block - stop loading the page**  
Solution 3 is not needed if solution 1 is in place 


#### 6. Caching headers

| Header           | Example                                           | Possible Values                                     | Purpose                                                                     | Use Case                                           |
|------------------|---------------------------------------------------|----------------------------------------------------|-----------------------------------------------------------------------------|----------------------------------------------------|
| Cache-Control    | Cache-Control: max-age=3600, must-revalidate      | max-age, no-cache, no-store, must-revalidate        | Specifies caching policies in both requests and responses.                 | Controlling how and for how long resources should be cached by the browser or intermediate caches. |
| Expires (same as cache control, but expects a fixed date)         | Expires: Wed, 21 Oct 2024 07:28:00 GMT            | Date in HTTP-date format (e.g., Wed, 21 Oct 2024 07:28:00 GMT) | Sets a specific expiration date and time for cached content.                | Defining when a resource should be considered stale.                   |
| ETag (express automatically sets this for us for static contents)            | ETag: "33a64df551425fcc55e4d42a148795d9f25f89d4"  | String (e.g., hash or version identifier)           | server sends a hased string (ETAG) for static files, client making another request sends this with header: If-None-Match: ETAG, this indicates if ETAG desonat match make a get request otherwise use the cached resource      | Ensuring efficient caching by validating whether the cached version is still fresh. |
| Last-Modified    | Last-Modified: Tue, 15 Nov 2024 12:45:26 GMT      | Date in HTTP-date format                            | Indicates the date and time at which the resource was last modified.        | Allowing the browser to make conditional requests to check if the cached content is still valid. |
| Pragma         | Pragma: no-cache                                  | no-cache                                           | Used for backward compatibility with HTTP/1.0 caches to ensure that a request bypasses the cache. | use in legace systems supporting HTTP/1.0 clients - check http version in express```console.log(req.httpVersion); // e.g., "1.1" or "2.0"```, in browser inspect network tab |


------------------------------------------------------------------------------
## Designing APIs
#### 1. URIs
1. They are the path to your resource (https://example.com/books)
2. Nouns are preferred and mostly plurals (use /books instead of /getBook)
3. Not necessary that URI resource should be an Entity in the system. Like book is an entity, so all the details of book shouldn't come in single URS like - https://example.com/books, it can be broken down as https://example.com/books which provides meta-data of all books and then https://example.com/books/book-nameorid
4. Not necessary that individual resoruce URI should have a primary key like book-id in above case, every resource should be unique, so oprimary keys can be used, but in case applicable use name for readibility.
5. Query strings - used for non-resource properties - (https://example.com/books?sort=name, https://example.com/books?page=1, https://example.com/books?format=json (Note: content type should be sent on headers and not in query params)) use for searching, sorting, response format.
6. URIs should include api keyword (https://example.com/api/books or https://api.example.com/books), use former one when you website and API are hosted on same server, or else use later one, but use it.




------------------------------------------------------------------------------
###### FYI status codes
1. 100-199 - informational
2. 200-299 - success
3. 300-399 - redirection
4. 400-499 - client errors
5. 500-599 - server errors 