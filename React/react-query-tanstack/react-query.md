## React Query

Starer code -  
```bash
npm i @tanstack/react-query
npm i @tanstack/react-query-devtools
```
```javascript
import {QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

// by default on every re-render the below fetch api is execurted
function Example() {
  const { isLoading, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then(
        (res) => res.json(),
      ),
  })

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  )
}

```

### 3 concepts
#### Concept 1. Queries
Requires 2 args, 1. Key, 2 func that returns promise or throws error
```javascript
const { isLoading, isError, data, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodoList,
  })

  
//instaed of isloading / error we can use status obj (status = 'loading' / status = 'error')
const result = useQuery({ queryKey: ['todos'], queryFn: fetchTodoList })
// result.status === 'loading' / result.status === 'error' / === 'success'

//In addition to the status field, the result object, you will also get an additional fetchStatusproperty with the following options:
//fetchStatus === 'fetching' - The query is currently fetching.
//fetchStatus === 'paused' - The query wanted to fetch, but it is paused. Read more about this in the Network Mode guide.
//fetchStatus === 'idle' - The query is not doing anything at the moment.


// keys can be string, array(When a query needs more information to uniquely describe its data)
// array example
useQuery({ queryKey: ['todo', 5], ... })


//query keys are also passed into your query function
function Todos({ status, page }) {
  const result = useQuery({
    queryKey: ['todos',  { status, page }],
    queryFn: () => fetchTodoList({ status, page }),
    //or
    queryFn: fetchTodoList,
  })
}

// Access the key, status and page variables in your query function!
function fetchTodoList({ queryKey }) {
  const [_key, { status, page }] = queryKey
  return new Promise()
}
```

##### Query types
###### 1. Manual parallel queries
```javascript
function App () {
  // The following queries will execute in parallel
  const usersQuery = useQuery({ queryKey: ['users'], queryFn: fetchUsers })
  const teamsQuery = useQuery({ queryKey: ['teams'], queryFn: fetchTeams })
  const projectsQuery = useQuery({ queryKey: ['projects'], queryFn: fetchProjects })
  ...
}
```

###### 2. Dynamic parallel queries
If the number of queries you need to execute is changing from render to render, you cannot use manual querying since that would violate the rules of hooks.  
Instead use useQueries hook
```javascript
// useQueries accepts an array of query options objects and returns an array of query results
function App({ users }) {
  const userQueries = useQueries(
    users.map(user => {
      return {
        queryKey: ['user', user.id],
        queryFn: () => fetchUserById(user.id),
      }
    })
  )
}
```

###### 3. Dependent / serial queries
```javascript
// Get the user
// Get the user
const { data: user } = useQuery({
  queryKey: ['user', email],
  queryFn: getUserByEmail,
})

const userId = user?.id

// Then get the user's projects
const {status, fetchStatus, data: projects} = useQuery({
  queryKey: ['projects', userId],
  queryFn: getProjectsByUser,
  // The query will not execute until the userId exists
  enabled: !!userId,
})
// The projects query will start in:
//status: 'loading'
//fetchStatus: 'idle'
//As soon as the user is available, the projects query will be enabled and will then transition to:

//status: 'loading'
//fetchStatus: 'fetching'
//Once we have the projects, it will go to:

//status: 'success'
//fetchStatus: 'idle'
```

###### Indicators
```javascript
// 1. isFetching = additional indicator that a query is refetching in the BACKGROUND, it is defferent than isLoading / status === 'loading' flg
function Todos() {
  const { status, data: todos, error, isFetching } =useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })
  return status === 'loading' ? (
    <span>Loading...</span>
  ) : status === 'error' ? (
    <span>Error: {error.message}</span>
  ) : (
    <>
      {isFetching ? <div>Refreshing...</div> : null}

      <div>
        {todos.map(todo => (
          <Todo todo={todo} />
        ))}
      </div>
    </>
  )
}
```

##### Pausing query
```javascript
//// by default on every re-render the below fetch api is execurted
// using enabled = false, then need to use refetch() func to trigger the query
function Todos() {
  const {isIdle, isLoading, isError, data, error, refetch, isFetching} =useQuery({
      queryKey: ['todos'],
      queryFn: fetchTodoList,
      enabled: false,
    })

  //instaed of this - {isIdle, isLoading, isError, data, error, refetch, isFetching} we can use one obj as result = useQuery() and then
  // use all the above keys as result.isIdle or result.refetch() or result.data

  return (
    <>
      <button onClick={() => refetch()}>Fetch Todos</button>

      {isIdle ? (
        'Not ready...'
      ) : isLoading ? (
        <span>Loading...</span>
      ) : isError ? (
        <span>Error: {error.message}</span>
      ) : (
        <>
          <ul>
            {data.map(todo => (
              <li key={todo.id}>{todo.title}</li>
            ))}
          </ul>
          <div>{isFetching ? 'Fetching...' : null}</div>
        </>
      )}
    </>
  )
}
```

##### Paginated queries
workes using - keepPreviousData to true, because by default The UI jumps in and out of the success and loading states because each new page is treated like a brand new query.
To avoid this use keepPreviousData to true
```javascript
function Todos() {
  const [page, setPage] = React.useState(0)

  const fetchProjects = (page = 0) => fetch('/api/projects?page=' + page).then((res) => res.json())

  const { isLoading, isError, error, data, isFetching, isPreviousData,} = useQuery(['projects', page], () => fetchProjects(page), { keepPreviousData : true })

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div>
          {data.projects.map(project => (
            <p key={project.id}>{project.name}</p>
          ))}
        </div>
      )}
      <span>Current Page: {page + 1}</span>
      <button
        onClick={() => setPage(old => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>{' '}
      <button
        onClick={() => {
          if (!isPreviousData && data.hasMore) {
            setPage(old => old + 1)
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={isPreviousData || !data?.hasMore}
      >
        Next Page
      </button>
      {isFetching ? <span> Loading...</span> : null}{' '}
    </div>
  )
}
```

##### useInfiniteQuery
##### Network Mode

##### Prefetching or setting query data manually
```javascript
const prefetchTodos = async () => {
  // The results of this query will be cached like a normal query
  await queryClient.prefetchQuery('todos', fetchTodos)
}

// manually setting the data
queryClient.setQueryData('todos', todos)
```

#### Concept 2. Mutations
mutations are used to create/update/delete data or perform server side-effects
#### Concept 3. Queriy Invalidation

#### Important defaults
```javascript
// we can configure queries at global level (for all queries) or at a query level
// at global level - using the QueryCLient Object
// below values are default values
const queryClientConfig = {
    defaultOptions: {
      queries: {
        retry: 3 //, // false // (failureCnt, error) => if(err.type === network || failureCnt < 10) return true else return false
        cacheTime: 1000 * 60 * 5 // 5 mins, Infinity// after 5 mins - if comp rerenders, user will see cached data but still API call would be made, 
                    // and if api data has changed, the data will change on UI. isLoading would be false, but isFetching would be true
        staleTime: 0 // 0 secs, Infinity// if comp reredners, cahced data would be shown and no API would be made for staletime secs. (no api call made)
                     // react query by default consider cached data as stale. (understand)
        refetchOnMount: "always", // false - query won't be called when component re-renders
        refetchOnWindowFocus: "always", // false - query won't be called when window focused back
        refetchOnReconnect: "always", // internet connection lost
        refetchInterval: 1000 * 30, //30 seconds, default - false else time in ms (5000), refetch after every 5 secs
        refetchIntervalInBackground: false,
        suspense: false,

      },
      mutations: {
        retry: 2,
      },
    },
}

// and then using that obj in app.js
function App() {
  return <QueryClientProvider client={queryClient}>...</QueryClientProvider>
}
```
