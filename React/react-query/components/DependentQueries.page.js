import { useQuery } from 'react-query'
import axios from 'axios'

// to make api calls sequentially
// to achieve this, we leverage the ENABLED prop from the config obj
// if enabled is false the api call is not made, and when it's tru, we make the api call
const fetchUserByEmail = email => {
  return axios.get(`http://localhost:4000/users/${email}`)
}

const fetchCoursesByChannelId = channelId => {
  return axios.get(`http://localhost:4000/channels/${channelId}`)
}

export const DependentQueriesPage = ({ email }) => {
  const { data: user } = useQuery(['user', email], () =>
    fetchUserByEmail(email) 
  )
  const channelId = user?.data?.channelId
  useQuery(['courses', channelId], () => fetchCoursesByChannelId(channelId), {
    // we use !! to conver any value to a boolean value
    // e.g. when channelId is number/string !channelId would be false and !false = true
    // when channelId is null/undefined !channelId = true and !true = false
    enabled: !!channelId
  })
  return <div>DependentQueries</div>
}
