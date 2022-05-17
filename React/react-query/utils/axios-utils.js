import axios from 'axios'

// this is axios interceptor
// for all the requests, that we make using this client, below would be the baseurl
const client = axios.create({ baseURL: 'http://localhost:4000' })

// this function wraps all the axios request
// this function accepts all the options that axios accepts
export const request = ({ ...options }) => {
  // for all the requests that we make, this header is added for all of those requests
  client.defaults.headers.common.Authorization = `Bearer DummyToken` // ideally token should come from localstorage

  const onSuccess = response => response
  const onError = error => {
  	// here we can write additional logic for all the failed requests like logging
  	// same for onSuccess
    return error
  }

  return client(options).then(onSuccess).catch(onError)
}

// see useSuperHeroesData to see how this custom axios client is used
