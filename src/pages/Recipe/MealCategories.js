import { useEffect, useState } from 'react'
import MealDB from '../../api/meal.db'

const MealCategories = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    MealDB.list
      .fetchMealCategories()
      .then(data => setCategories(data.categories))
  }, [])

  return (
    <div>
      <h3>Meal Categories</h3>
      {categories.map(
        ({
          idCategory,
          strCategory,
          strCategoryThumb,
          strCategoryDescription
        }) => (
          <div key={idCategory}>
            <div>{strCategory}</div>
            <img src={strCategoryThumb} alt='' />
            <div>{strCategoryDescription}</div>
          </div>
        )
      )}
    </div>
  )
}

export default MealCategories
