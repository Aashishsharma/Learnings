## Next.js

React framework that gives you building blocks to create fast web applications.  


| Feature/Concept                          | Description                                                                                   |
|-----------------------------------------|-----------------------------------------------------------------------------------------------|
| Server-Side Rendering (SSR)             | Renders React components on the server for improved initial page load and SEO.              |
| Static Site Generation (SSG)            | Generates HTML at build time for non-dynamic pages, enhancing performance and SEO.           |
| Automatic Code Splitting                 | Splits JavaScript bundles into smaller chunks for faster loading and better UX.              |
| Routing                                 | File-based routing system for predictable, SEO-friendly URL structure.                        |
| API Routes                              | Create server-side API endpoints within `/pages/api` for backend functionality.              |
| Customizable Head and Meta Tags         | Easy customization of `<head>` section for page-specific metadata and SEO.                    |
| Serverless Deployment                   | Deploy Next.js apps on serverless platforms for simplified scaling and deployment.            |

#### SSR vs CSR
| Aspect                                     | Server-Side Rendering (SSR)                           | Client-Side Rendering (CSR)                       |
|--------------------------------------------|-------------------------------------------------------|---------------------------------------------------|
| **Initial Page Load**                      | Faster due to pre-rendering on the server.            | Slower as it requires loading JavaScript and rendering on the client. |
| **SEO**                                    | SEO-friendly since search engines can index the fully rendered page. | SEO may be compromised because search engines may not index dynamically generated content easily. |
| **Performance**                            | Improved perceived performance with faster initial rendering. | May result in slower initial load times, especially for large applications. |
| **Network Load**                           | More initial data sent from the server, which can lead to larger HTML files. | Smaller initial HTML, but additional network requests for JavaScript and data. |
| **User Experience**                        | Faster content display for users, leading to better UX. | Users may experience a flash of empty content or loading spinners. |
| **Development Complexity**                 | May require additional server-side setup and routing.  | Simplified server setup but can lead to complex client-side logic. |
| **Caching**                                | Easier caching of fully rendered HTML pages.          | Caching may be less effective due to dynamic client-side rendering. |
| **Real-Time Updates**                      | Suitable for content that doesn't change frequently.  | Ideal for real-time applications with dynamic updates. |
| **Initial Development Speed**              | Potentially slower due to server rendering setup.     | Faster initial development as you build components without server considerations. |
| **Use Cases**                              | Content-heavy websites, blogs, e-commerce sites, and SEO-critical applications. | Interactive web applications, dashboards, and single-page applications (SPAs). |

| **Use Case Considerations**                | **Server-Side Components (SS)**                     | **Client-Side Components (CS)**                  |
|--------------------------------------------|----------------------------------------------------|---------------------------------------------------|
| **Authentication and Authorization**       | Suitable for handling authentication and authorization checks on the server-side. | May be used for client-side authentication, but server-side checks are more secure. |
| **Data Personalization**                   | Useful for personalizing content based on user sessions or request data on the server. | Limited server-side control for data personalization; better suited for client-side updates. |
| **Content That Changes Infrequently**      | Efficient for content that changes infrequently because fully rendered HTML pages can be cached. | Less efficient if content changes frequently as it requires re-rendering on the client. |
| **Interactivity**                          | Less suited for highly interactive components and real-time updates, which are better achieved with client-side rendering (CSR). | Ideal for building highly interactive components and real-time features. |
| **Performance Optimization (Post-Load)**   | Less suitable for post-load performance optimization as it involves server rendering. | Ideal for optimizing performance after the initial page load, especially for client-side interactivity. |
| **Reduced Server Load**                   | Helps distribute the server load by rendering content on the server. | Offloads processing to the client and reduces the server load. |
| **Single-Page Applications (SPAs)**        | Less common in SPAs where most rendering and routing occur on the client side. | Common in SPAs where client-side rendering is the default. |

## Routing
Folders are used to define routes. and within each folder there must be a page.tsx as a leaf file  
Files are used to create UI that is shown for a route segment  

Default root folder is app  
**(every component inside app folder is by default server side component and cannot be publicly accessed)**

![alt text](PNG/routing.png "Class overview")  

#### File conventions

| Type           | Explanation                                      |
|----------------|--------------------------------------------------|
| layout         | Layout components that provide a shared user interface for a specific segment of your application and its child components. |
| page           | Page components represent the unique user interface of a specific route and make those routes publicly accessible. |
| loading        | Loading components used to display loading indicators or UI while content is being fetched or rendered. |
| not-found      | Not found components that display user interface elements for when a specific segment or route is not found. |
| error          | Error components for rendering UI when errors occur within a specific segment or route. |
| global-error   | Global error components for handling application-wide errors and providing a consistent error UI. |
| route          | Route components that define server-side API endpoints accessible within your application. |
| template       | Template components that provide specialized and re-rendered layout user interfaces for specific segments of your application. |
| default        | Default components used as fallback UI for parallel routes in your application when no other route matches. |

#### Files inside a component
![alt text](PNG/comp-hierarchy.png "Class overview") 

![alt text](PNG/public-access.png "Class overview") 

##### Layout
A layout is UI that is shared between multiple pages. On navigation, layouts preserve state, remain interactive, and do not re-render.  
2 requirements  

1. Define a layout by default exporting a React component from a layout.js file. 
2. The component should accept a children prop that will be populated with a child page during rendering.

```typescript
export default function DashboardLayout({children}:  React.ReactNode) {
  return (
    <section>
      {/* Include shared UI here e.g. a header or sidebar */}
      <nav></nav>
 
      {children}
    </section>
  )
}
```

##### Templates
Similar to layouts but unlike layouts,  
state is not preserved, and re-renders for each of thier children navigation  
Use templates when you need features like useEffect (e.g logging page views) and useState (e.g a per-page feedback form).  
```typescript
export default function Template({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>
}
```