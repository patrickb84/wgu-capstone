import { Container } from 'react-bootstrap'
import Layout from '../../components/Layout'

import { format, addDays } from 'date-fns'

const getNext30 = () => {
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
    <Layout>
      <Container className='py-3'>
        <div className='row'>
          {next30.map((day, idx) => {
            const month = format(day, 'MMMM')
            const date = format(day, 'd')
            const dayOfWeek = format(day, 'EEE') // Mo

            return (
              <div
                key={idx}
                className='col-12 py-2'
                style={{ lineHeight: 1.8 }}>
                <div className='card card-body'>
                  <div className='p-3 d-flex justify-content-end-'>
                    {/* <i class='fa-light fa-pot-food fa-lg text-muted'></i> */}
                    <i class='fa-light fa-user-chef' style={{fontSize: 24}}></i>
                  </div>
                  <div className='row'>
                    <div className='col'>
                      <div>{`${month} ${date}`}</div>
                      <div className='text-muted'>{dayOfWeek}</div>
                    </div>
                    <div className='col-8'>
                      <div>
                        <i class='text-primary- fa-duotone fa-circle-b me-1'></i>{' '}
                        Scramble Garlic Whams
                      </div>
                      <div>
                        <i class='text-primary- fa-duotone fa-circle-l me-1'></i>{' '}
                        Loser Toast Pizza
                      </div>
                      <div>
                        <i class='text-primary- fa-duotone fa-circle-d me-1'></i>{' '}
                        Just Gogurt
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </Layout>
  )
}

export default Feed
