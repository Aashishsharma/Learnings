# Data Fetching

Data fecthing would include

1. Making external API calls
2. Fetching data from DB

Datafetching in Next can be done in 2 ways

1. Data fetching in server components (External API call, or DB query)
2. Data fecthing in client components (External API call, or call to route handler to get data from DB)

## 1. Data Fetching in server components

When to use server components for data fetching

1. Direct DB calls
2. Leveraging high computational powers for rendering server components and only sending generated HTML of server component to the client

No need to use useEffect, useState in server compeonts to fecth data, just need to make the component async

```javascript
export async function ServerComponent() {
  let data = await fetch("Some summy URL");
  data = await data.json();
  return (
    <ul>
      {data.map((item) => (
        <li>{item}</li>
      ))}
    </ul>
  );
}
```

Above code is great, but how do we handle errors and loading state? In client components, we can use useState and useEffect hooks? how to handle this in server components?

**Ans - using loading.tsx and error.tsx special files in Nextjs**

**Caching in server components**

Next.js 14 by default caches the returned values of **fetch operations** in **Data Cache**  
Note that only fetch operation's data is cached by Nextjs  
We can see this in the app's .next folder

![alt text](PNG/DF1.PNG "Title")  
The file with UUID name has the cached data for a particular fetch request made on the server component.

**Note Nextjs 15 is planning to remove this default behavior of cahcing return values of fetch apis from server components**

**Opting out of caching**

```javascript
// method 1 - setting cache to no-store in fetch request
export async function ServerComponent() {
  let data = await fetch("Some summy URL", {
    cache: "no-store",
  });
  data = await data.json();
}

// revalidating cache
// drwaback of using cache: no-store means the data is not at all cached
// what if we wanted to cache data for certain time - like for 5 mins, and then revlidate cache
// so any no of requests made within 5 mins will be served from cache
// requests made after 5 mins, the actual fecth api call would be made

export async function ServerComponent() {
  let data = await fetch("Some summy URL", {
    next: {
      revalidate: 10, // keep cache for 10s
    },
  });
  data = await data.json();
}

// another way to do this is to using ROUTE SEGMENT CONFIGURATION
export const revalidate = 10;
```

## 2. Data fetching in client components
