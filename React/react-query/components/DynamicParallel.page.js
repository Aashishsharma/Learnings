import { useQueries } from 'react-query'
import axios from 'axios'


// if we don't know how many heroIDs would be passed to use queryBy ID
// we use dynamic parallel queries
// only difference is instaed of calling useQuery hook multiple times, we call useQueriesHook with 2 required args
// we call it once and use arr.map method to generate the 2 required args (queryKey and func that returns promise)
const fetchSuperHero = heroId => {
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const DynamicParallelPage = ({ heroIds }) => {
  const queryResults = useQueries(
    heroIds.map(id => {
      return {
        queryKey: ['super-hero', id],
        queryFn: () => fetchSuperHero(id)
      }
    })
  )

  // return array of queryResults
  //
  console.log({ queryResults })
  return <div>Dynamic Parallel Queries</div>
}
