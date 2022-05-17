import { useState } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'

// note - the backend api needs to be paginated
// then we pass _limit and _page as query params to backend api call to return 
// paginated data
// and on click of the button we update the pageNumber
// since page number is a state variable, the comp re-renders which calls
// all the hooks (which interns make the new api call)
const fetchColors = pageNumber => {
  return axios.get(`http://localhost:4000/colors?_limit=2&_page=${pageNumber}`)
}

export const PaginatedQueriesPage = () => {
  const [pageNumber, setPageNumber] = useState(1)
  const { isLoading, isError, error, data, isFetching } = useQuery(
    ['colors', pageNumber],
    () => fetchColors(pageNumber),
    {
      // reactqueyy will maintain the last fetched data instead of showing loading
      keepPreviousData: true
    }
  )

  if (isLoading) {
    return <h2>Loading...</h2>
  }

  if (isError) {
    return <h2>{error.message}</h2>
  }

  return (
    <>
      <div>
        {data?.data.map(color => {
          return (
            <div key={color.id}>
              <h2>
                {color.id}. {color.label}
              </h2>
            </div>
          )
        })}
      </div>
      <div>
        <button
          onClick={() => setPageNumber(page => page - 1)}
          disabled={pageNumber === 1}>
          Prev Page
        </button>
        <button
          onClick={() => setPageNumber(page => page + 1)}
          disabled={pageNumber === 4}>
          Next Page
        </button>
      </div>
      {isFetching && 'Loading'}
    </>
  )
}
