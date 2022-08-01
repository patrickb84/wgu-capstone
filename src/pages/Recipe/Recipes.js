import { useEffect, useState } from 'react'
import MealDB from '../../api/meal.db'

const Recipes = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    // MealDB.list
    //   .fetchMealCategories()
    //   .then(data => setCategories(data.categories))
    MealDB.lookup.fetchRandomMeal().then(data => console.log(data))
  }, [])
  return (
    <>
      <h1>Recipes</h1>
      {/* {categories.map(
        ({
          idCategory,
          strCategory,
          strCategoryThumb,
          strCategoryDescription,
        }) => (
          <div key='idCategory'>
            <div>{idCategory}</div>
            <div>{strCategory}</div>
            <img src={strCategoryThumb} />
            <div>{strCategoryDescription}</div>
          </div>
        )
      )} */}
    </>
  )
}

export default Recipes
