import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import MealDB from '../../api/meal.db'

const Areas = () => {
  const [areas, setAreas] = useState([])

  useEffect(() => {
    MealDB.list.fetchAreas().then(data => setAreas(data.meals))
  }, [])

  return (
    <>
      <h3>Filter by Area</h3>
      {areas.map((area, index) => (
        <div key={index}>
          <Link to={`/dashboard/recipes/area/${area.strArea}`}>
            {area.strArea}
          </Link>
        </div>
      ))}
    </>
  )
}

export default Areas
