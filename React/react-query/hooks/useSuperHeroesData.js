import { useQuery, useMutation, useQueryClient } from 'react-query'
// import axios from 'axios'
import { request } from '../utils/axios-utils'

const fetchSuperHeroes = () => {
  // return axios.get('http://localhost:4000/superheroes')
  return request({ url: '/superheroes' })
}

export const useSuperHeroesData = (onSuccess, onError) => {
  return useQuery('super-heroes', fetchSuperHeroes, {
    onSuccess,
    onError
    // below is for data transformation
    // select: data => {
    //   const superHeroNames = data.data.map(hero => hero.name)
    //   return superHeroNames
    // }
  })
}

const addSuperHero = hero => {
  // return axios.post('http://localhost:4000/superheroes', hero)
  return request({ url: '/superheroes', method: 'post', data: hero })
}


// we use useMutation hook
export const useAddSuperHeroData = () => {
  const queryClient = useQueryClient()

  // useMutation does not require key, hence the 1st arg is cb func (addSuperHero) which returns promise
  // 3rd arg is the optional config obj
  return useMutation(addSuperHero, {
    // onSuccess: data => {
    //   /** Query Invalidation Start */
    // so when we make this post requets to add the superhero, our getsuper hero api call
    // is out of date since the new superHero needs to be fetched
    // for this we invalidate the super-hero query (another reason why query key is imp)
    // using the queryCLient which is available everywhere since we have set it up in App.js
    // when queries are invalidate, they are-refetched
    //   // queryClient.invalidateQueries('super-heroes')
    //   /** Query Invalidation End */


    //   /** Handling Mutation Response Start */ if the post api call returns the super-hero data
    // that we have added, then instaed of invalidating the get-queries, we can use the same hero object
    // and add that in that in the get-query api data - see below
    // queryClient.setQueryData('super-heroes', oldQueryData => {
    //   return {
    //     ...oldQueryData,
    //     data: [...oldQueryData.data, data.data]
    //   }
    // })
    // this saves the network call where we are not invalidaing the queries, which save the network call
    // to fetch the updated list
    // }
  })
}
