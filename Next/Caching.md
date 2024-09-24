# Caching Summary

In all the other files, we have seen how caching is implemented at different levels  
Here we will do a cahcing sumary

## 1. Caching in Development vs. Production

| Environment | Caching Behavior                                                               |
| ----------- | ------------------------------------------------------------------------------ |
| Development | Caching is not applied.                                                        |
| Production  | Caching is applied when running the app with `npm run build && npm run start`. |

## 2. Static vs Dynamic rendering

By default, every component is statically rendered at build time, unless

1. we are using dynamic functions (cookies(), noStore(), header())
2. forcing the component to dynamically render `export const dynamic = 'force-dynamic`

**noStore vs xport const dynamic = 'force-dynamic**

- noStore - affects caching of api calls only
- force-dynamic - will cause the page to serve dynamically from server on every client request

Making a page static as well as dynamic, basically making the page **ISR** Incremental static regenration

```javascript
// so bacially statically generate the page
// and then dynamically render after 60 seconds in the background
export const revalidate = 60; // Revalidate every 60 seconds
export default async function Page() {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();
  // but fecth by default caches the data
  // so revalidate will override fetch's caching behavior
  return (
    <div>
      <h1>Data from API</h1>
    </div>
  );
}
```

## 3. Caching in route handlers

1. Route handlers that expose GET endoint are always cahced by default, ie. statically generated

```javascript
export const dynamic = "force-dynamic"; // always call GET method for each request
export const revalidate = 15; // for 15s server from cache, then call the GET method
export async function GET() {
  console.log("api call made");
  return Response.json({ message: Date.now() });
}
```

## 4. Caching in fetch API

1. fecth api are always cached
2. To opt out - `fetch(url, {cache: 'no-store'})`
3. cache: no-store is binary, either always cache or never cache, but no option to re-validate
4. To revalidate after certain interval, use next object inside fetch `fetch(url, {next: {revalidate: 100}})`

## 5. Caching in DB calls

DB calls are not cached by default  
To cache DB values, use **unstable_cache()**

```javascript
const getPosts = unstable_cache(
  async () => {
    return await db.select().from(posts);
  },
  ["posts"],
  { revalidate: 3600, tags: ["posts"] }
  // data would be revalidated after 1 hr
  // or if we call revalidateTag("post") anywhere in the app
);
```

Basically we are manually revalidating cache for DB, but what if some extrnal system changes the data in DB, like SSIS process?  
This is where the revalidate:3600 is helpful
