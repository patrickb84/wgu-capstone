import { Container } from 'react-bootstrap'

const Home = () => {
  return (
    <section className='bg-secondary'>
      <Container>
        <div
          style={{
            height: '35rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <h1 className='font-display'>Welcome, try it out</h1>
        </div>
      </Container>
    </section>
  )
}

export default Home
