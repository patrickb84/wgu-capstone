import { addDays } from 'date-fns'

import FeedCard from '../../components/FeedCard/FeedCard'

function getNext30 () {
  const days = []
  const today = new Date()
  for (let i = 1; i <= 31; i++) {
    days.push(addDays(today, i))
  }
  return days
}

const Feed = () => {
  const next30 = getNext30()

  return (
    <>
      {next30.map(day => (
        <FeedCard day={day} key={day} />
      ))}
    </>
  )
}

export default Feed
