import { useCallback, useState } from 'react'
import { Form, Table } from 'react-bootstrap'
import TastyAPI from '../api/tasty.api'
import Layout from '../components/Layout'
import _ from 'lodash'

const Home = () => {
  const [autoText, setAutoText] = useState('')
  const [autoTextResults, setAutoTextResults] = useState([])

  const onAutoTextChange = async e => {
    let { value } = e.target

    if (value.length > 3) {
      // const res = await TastyAPI.recipes.autocomplete(value)
      let results = [
        {
          display: 'chicken',
          search_value: 'chicken',
          type: 'ingredient',
        },
        {
          display: 'chicken breast',
          search_value: 'chicken breast',
          type: 'ingredient',
        },
        {
          type: 'ingredient',
          display: 'chicken thighs',
          search_value: 'chicken thighs',
        },
        {
          display: 'chicken alfredo',
          search_value: 'chicken alfredo',
          type: 'ingredient',
        },
        {
          display: 'chicken wings',
          search_value: 'chicken wings',
          type: 'ingredient',
        },
        {
          search_value: 'chicken teriyaki',
          type: 'ingredient',
          display: 'chicken teriyaki',
        },
        {
          display: 'chicken pasta',
          search_value: 'chicken pasta',
          type: 'ingredient',
        },
        {
          type: 'ingredient',
          display: 'creamy tuscan chicken',
          search_value: 'creamy tuscan chicken',
        },
        {
          display: 'fried chicken',
          search_value: 'fried chicken',
          type: 'ingredient',
        },
        {
          display: 'butter chicken',
          search_value: 'butter chicken',
          type: 'ingredient',
        },
        {
          display: 'chicken parmesan',
          search_value: 'chicken parmesan',
          type: 'ingredient',
        },
        {
          display: 'chicken salad',
          search_value: 'chicken salad',
          type: 'ingredient',
        },
        {
          display: 'orange chicken',
          search_value: 'orange chicken',
          type: 'ingredient',
        },
        {
          display: 'chicken and rice',
          search_value: 'chicken and rice',
          type: 'ingredient',
        },
        {
          display: 'chicken drumstick',
          search_value: 'chicken drumstick',
          type: 'ingredient',
        },
        {
          type: 'ingredient',
          display: 'chicken curry',
          search_value: 'chicken curry',
        },
        {
          display: 'chicken noodle soup',
          search_value: 'chicken noodle soup',
          type: 'ingredient',
        },
        {
          display: 'baked chicken',
          search_value: 'baked chicken',
          type: 'ingredient',
        },
        {
          display: 'chicken stir fry',
          search_value: 'chicken stir fry',
          type: 'ingredient',
        },
        {
          display: 'chicken fajitas',
          search_value: 'chicken fajitas',
          type: 'ingredient',
        },
      ]

      console.log(results)
      results = results.sort((a, b) => a.display.localeCompare(b.display))
      setAutoTextResults(results)
    }

    setAutoText(value)
  }

  return (
    <Layout>
      <h1>Home</h1>

      <Form.Group className='mb-4 py-3' style={{width: '20rem'}}>
        <Form.Label>AutoComplete</Form.Label>
        <Form.Control
          type='text'
          value={autoText}
          onChange={onAutoTextChange}
        />
      </Form.Group>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Type</th>
            <th>Display</th>
          </tr>
        </thead>
        <tbody>
          {autoTextResults.map((r, idx) => (
            <tr key={idx}>
              <td>{r.type}</td>
              <td>{r.display}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Layout>
  )
}

export default Home
