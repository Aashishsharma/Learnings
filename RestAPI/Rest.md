## REST
1. REST stands for Representational State Transfer.
2. It is an architecture style for designing loosely coupled applications over HTTP
3. It is rescouce based

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

------------------------------------------------------------------------------
## Designing APIs
#### 1. URIs
1. They are the path to your resource (https://example.com/books)
2. Nouns are preferred and mostly plurals (use /books instead of /getBook)
3. Not necessary that URI resource should be an Entity in the system. Like book is an entity, so all the details of book shouldn't come in single URS like - https://example.com/books, it can be broken down as https://example.com/books which provides meta-data of all books and then https://example.com/books/book-nameorid
4. Not necessary that individual resoruce URI should have a primary key like book-id in above case, every resource should be unique, so oprimary keys can be used, but in case applicable use name for readibility.
5. Query strings - used for non-resource properties - (https://example.com/books?sort=name, https://example.com/books?page=1, https://example.com/books?format=json (Note: content type should be sent on headers and not in query params)) use for searching, sorting, response format.
6. URIs should include api keyword (https://example.com/api/books or https://api.example.com/books), use former one when you website and API are hosted on same server, or else use later one, but use it.

#### 2. Verbs
1. GET - retrieve a resource
2. POST - Add a new resource
3. PUT - Update an existing resource, requires whole resource to be sent in the body
4. PATCH - same as PUT, i.e, update existing resource by sending part of resource
5. DELETE - remove existing resource 

###### Method not allowed
e.g. https://example.com/books - (all above verbs can be used except DELETE, it should throw an error, individual resource item should be deleted instead of the colection, for PUT - it is called as batch update, as PUT also generally needs ID)  
https://example.com/books/123 - (all above verbs can be used except POST, it should throw an error, POST is applied to collection URI, as item 123 is already created, you cannot use POST for this API)

**Idempotecy**
Apart from POST, all other verbs mentioned above must be idempotent. i.e, every time exact same request is made, you should get exact same response. Like GET, PUT once, updated, even if there are no updated, same response should be sent, instead os sending a response no update found and gicing status code of 400 (Bad request), status code should be 200.  
In case of POST, it is not idempotent, like once POST is done, response - new resource created with resource details, again if same request is passed, response - resource already exists. so it is not idempotent

#### 3. Association
e.g. use URL like https://api.example.com/books/123/content.  
for nested associations use search qyery param

#### 4. Paging
1. Lists should support paging
2. Query string are generally used for paging - https://api.example.com/books?page=1&page_size=25
3. response body should include - (total results, link to next and previous pages, and then actual result)

#### 5. Error handling
Proper error message for public APIs, for secure APIs no description is necessary. Also for most common error like 404, only status code is enough, description not necessary

#### 6. Caching
Usually, it is done at both server and client side. Rest guidelins suggests to implement caching at client side by sedning cachine details in resposne header
1. Use Entity Tags (Etags) in response header.  
It is a vesrion number which identifies version of the resource.  
While making a get client can use **If-None-Match: "Etag value"** (sent by server in response headers), so if not matched then make a GET request or use cache.  
For Put and DELETE, use **If-Match: "Etag value"**, so if client has same cached data, then only update, if it has stale data then fail this request (the failure response would be 412 - precondition failed), so that client can get the latest resource, and then do PUT/DELETE

#### 7. Functional APIs
If need to so operation at server side  
1. /api/calculateTax
2. /api/rebootServer  
Should rarely be used. OPTION/GET verb can be used in this case

------------------------------------------------------------------------------
## API versioning (support old and new version)
Versioning Strategy
1. URI versioning  
e.g. https://example.com/api/v2/books, right after api keyword or https://api.example.com/v2/books  
Clients need to change URI
2. Query String versioning
e.g. https://example.com/api//books?v=2.0  
we can set default version value
3. Versioning with Headers
e.g. add header in the request - **X-Version: 2.0**  
e.g. use accept header - **Accept: application/json; version=2.0**
4. Versioning with content type
e.g. - **Content-Type: application/vnd.yourapp.camp.v1+json**
**Accept: application/vnd.yourapp.camp.v1+json**  
Powerful way as it can version payload as well as API call itself.  

Which versioning strategy to be used?  
1. Query string/URI versioning - for simple APIs
2. More publicly used API - versioning with content type
3. Depends on the requirement 

------------------------------------------------------------------------------
## Locking down the API

------------------------------------------------------------------------------
###### FYI status codes
1. 100-199 - informational
2. 200-299 - success
3. 300-399 - redirection
4. 400-499 - client errors
5. 500-599 - server errors 