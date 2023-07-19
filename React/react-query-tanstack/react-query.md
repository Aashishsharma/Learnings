## React Query

Starer code -  
```bash
 npm i react-query
```
```javascript
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

function Example() {
  const { isLoading, error, data } = useQuery('repoData', () =>
    fetch('https://api.github.com/repos/tannerlinsley/react-query').then(res =>
      res.json()
    )
  )

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
const { isLoading, isError, data, error } = useQuery('todos', fetchTodoList)
//or below syntax of useQuery can be used
useQuery({
  queryKey: ['todo', 7],
  queryFn: fetchTodo,
  ...config, // more on this below
})
//instaed of isloading / error we can use status obj (status = 'loading' / status = 'error')

// keys can be string, array(When a query needs more information to uniquely describe its data)
// array example
const result = useQuery(['todos', todoId], () => fetchTodoById(todoId))


//query keys are also passed into your query function
function Todos({ status, page }) {
  const result = useQuery(['todos', { status, page }], fetchTodoList)
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
  const usersQuery = useQuery('users', fetchUsers)
  const teamsQuery = useQuery('teams', fetchTeams)
  const projectsQuery = useQuery('projects', fetchProjects)
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
const { data: user } = useQuery(['user', email], getUserByEmail)
const userId = user?.id

// Then get the user's projects
const { isIdle, data: projects } = useQuery(
  ['projects', userId],
  getProjectsByUser,
  {
    // The query will not execute until the userId exists
    enabled: !!userId,
  }
)
// isIdle will be `true` until `enabled` is true and the query begins to fetch.
// It will then go to the `isLoading` stage and hopefully the `isSuccess` stage :)
```

###### Indicators
```javascript
// 1. isFetching = additional indicator that a query is refetching in the background, it is defferent than isLoading / status === 'loading' flg
function Todos() {
  const { status, data: todos, error, isFetching } = useQuery(
    'todos',
    fetchTodos
  )
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
// using enabled = false, then need to use refetch() func to trigger the query
function Todos() {
  const {isIdle, isLoading, isError, data, error, refetch, isFetching} = useQuery('todos', fetchTodoList, {
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

#### Concept 2. Mutations
#### Concept 3. Queriy Invalidation

#### Important defaults
