import { Button } from 'react-bootstrap'
import Layout from '../components/Layout'
import _ from 'lodash'
import MealDB from '../api/MealDB'

const Home = () => {
  const apiTest = async () => {
    const { list, search, filter, lookup } = MealDB

    // const { fetchCategories } = list
    // const mealCategories = await list.fetchMealCategories()
    // console.log({ mealCategories })

    // const categories = await fetchCategories()
    // console.log('categories: ', categories);

    const res = await filter.filterMainIngredient('chicken_breast')
    console.log('res: ', res);

  }

  return (
    <Layout>
      <h1>Home</h1>

      <div className='py-5'>
        <Button onClick={apiTest}>Get Meal Categories</Button>
      </div>
    </Layout>
  )
}

export default Home
