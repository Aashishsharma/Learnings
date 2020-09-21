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