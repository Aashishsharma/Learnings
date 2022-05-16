import { useQuery, useQueryClient } from 'react-query'
import axios from 'axios'

const fetchSuperHero = ({ queryKey }) => {
  const heroId = queryKey[1]
  return axios.get(`http://localhost:4000/superheroes/${heroId}`)
}

export const useSuperHeroData = heroId => {
  const queryClient = useQueryClient()

  // requires 2 args
  // 1. query-key - this is required to get query details (like - see initialData func below) in future from the query client obj which
  // is passed as prop in the app component right at the top
  // 2. function which returns promise 
  // 3. Optional - (object - where we can configure other options like - cache)
  // function returns all the necessary info from the query like 
  // 1. isLoading 2. data 3. isError 
  // 4. isFetching - By default cache for each query is set tp 5 mins, so when we reload the component
  // we don't see loading option, we directly see data from cache, but cache might have older data, in this case
  // cached data is shown while react-query is refetching the data in the background
  // once the data is available, if data is same, no UI update otherwise new data is shown on the UI
  // we use isFetching to check if background fetching is running or not
  // 5. refetch - function to manually trigger the query (e.g on button click), see enabled config below
  // <button onClick={refetch}>
  return useQuery(['super-hero', heroId], fetchSuperHero, {
    initialData: () => {
      const hero = queryClient
        .getQueryData('super-heroes')
        ?.data?.find(hero => hero.id === parseInt(heroId))
      if (hero) {
        return { data: hero }
      } else {
        return undefined
      }
    },
    // 1. cacheTime: 5000 default (5 mins)- setting up cahce time
    // 2. staleTime: 30000 default (0 sec) - even while using cache data, the background query request is made to see if the data is changed
    // to avoid this refetching (if we know data doesn't change too ofter, or if it's ok for users to see stale data
    // for let's say 30 sec, we can use this config property), this avoid api calls to backend, since default is 0 sec
    // data is fetched in the background every time, even of initally cached data is shown on the UI
    // 3. refetchInterval: 2000 default (false) - for data polling, refetch the data every 2 secs
    // 4. enabled: false - by default the useQuery hook is called as soon as the component mounts, if we wan't
    // to call the query on a button click, we specify enabled: false, so the data is not fetched on comp mount
  })// 5. onSuccess: (data) => {} / onError: (error) => {} - functions that get called onquery success / error
}
