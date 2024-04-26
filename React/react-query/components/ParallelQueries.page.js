import { useQuery } from 'react-query'
import axios from 'axios'

// to execute queries in parallel, just call the useQuery hooks multiple times
// those are executed in parallel
const fetchSuperHeroes = () => {
  return axios.get('http://localhost:4000/superheroes')
}

const fetchFriends = () => {
  return axios.get('http://localhost:4000/friends')
}

export const ParallelQueriesPage = () => {
  // now both the hooks return an object which has same property data - see below code
  // now if we do data.name - should it be returning superheros name or freinds name
  // for that we use aliases as {data: superHeroes} and then we can use superHeroes obj wherever we want
  const { data: superHeroes } = useQuery('super-heroes', fetchSuperHeroes)
  const { data: friends } = useQuery('friends', fetchFriends)
  console.log(superHeroes, friends)
  return <div>Parallel Queries</div>
}
