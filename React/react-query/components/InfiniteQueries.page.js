import { Fragment } from 'react'
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'

// note - the backend api needs to be paginated
// then we pass _limit and _page as query params to backend api call to return 
// paginated data
// imp diff to note is useInfineQuery also saves the result from older pages
// hence the older data is not lost when new data is loaded

// we use useInfiniteQuery hook
const fetchColors = ({ pageParam = 1 }) => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageParam}`)
}

export const InfiniteQueriesPage = () => {
  const {
    isLoading,
    isError,
    error,
    data,
    // this is calculated based on the page length val we set in the getNextPageParam func below
    fetchNextPage,
    // see getNextPageParam func below to understand how this val changes
    hasNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteQuery(['colors'], fetchColors, {
    // lastPage is not used hence underscore
    // here we return pages.length + 1 to move to next page
    // if we return undefined then hasNextPage = false
    getNextPageParam: (_lastPage, pages) => {
      if (pages.length < 4) {
        return pages.length + 1
      } else {
        return undefined
      }
    }
  })

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <div>
      /// note here that useInfineQuery return data which has pages as prop instaed of data
      // so data.pages instead of data.data
        {data?.pages.map((group, i) => {
          return (
            <Fragment key={i}>
              {group.data.map(color => (
                <h2 key={color.id}>
                  {color.id} {color.label}
                </h2>
              ))}
            </Fragment>
          )
        })}
      </div>
      <div>
        <button onClick={() => fetchNextPage()} disabled={!hasNextPage}>
          Load more
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
    </>
  )
}
