import { Card, Col, Row } from 'react-bootstrap'
import { format } from 'date-fns'
import IconButton from './IconButton'

const FeedCard = ({ day }) => {
  const month = format(day, 'MMMM')
  const date = format(day, 'd')
  const dayOfWeek = format(day, 'EEEE') // Mo

  return (
    <Card
      // onClick={() => navigate('/day/0')}
      className='mb-4'
      style={{ fontSize: '1.1rem' }}
    >
      <Card.Header className='bg-secondary text-white d-flex align-items-center justify-content-between'>
        <div>
          <span style={{ color: 'white', fontWeight: 400 }}>{dayOfWeek}</span>{' '}
          <span style={{ opacity: 0.7 }}>{`${month} ${date}`}</span>
        </div>
        <IconButton
          icon={<i className='fa-solid fa-ellipsis-vertical' />}
          className='px-1'
        />
      </Card.Header>
      <Card.Body>
        <Row>
          <Col sm={8}>
            <div>
              <i className='text-primary- fa-duotone fa-circle-b me-1' />{' '}
              Scramble Garlic Whams
            </div>
            <div>
              <i className='text-primary- fa-duotone fa-circle-l me-1' /> Loser
              Toast Pizza
            </div>
            <div>
              <i className='text-primary- fa-duotone fa-circle-d me-1' /> Just
              Gogurt
            </div>
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer
        className='bg-white text-secondary d-flex align-items-center justify-content-between px-2 py-1'
        style={{ fontSize: '1.35rem' }}
      >
        <IconButton
          className='px-2'
          tooltip
          tooltipContent='Edit meal plans for this day'
          icon={<i className='fa-regular fa-pen-to-square' />}
        />

        <div>
          <IconButton
            className='px-2'
            icon={<i className='fa-regular fa-bag-shopping' />}
          />
          <IconButton
            className='px-2'
            icon={<i className='fa-regular fa-bookmark' />}
          />
          {/* <IconButton
                        className='px-2'
                        icon={<i className='fa-regular fa-plate-utensils' />}
                      /> */}
        </div>
      </Card.Footer>
    </Card>
  )
}

export default FeedCard
