import { useEffect, useState } from 'react'
import { differenceInCalendarDays, addDays } from 'date-fns'
import { ButtonRandomRecipe } from '../features/recipe-data/components/ButtonRandomRecipe'
import { useMealPlan } from '../features/meal-plan/meal-plan.state'
import { Meal } from '../features/meal-plan/meal-plan.model'
import recipesApi from '../features/recipe-data/api'
import { RecipeAdapter } from '../features/recipe-data/types/RecipeAdapter'
import { Table } from './Table'

export interface IScheduleProps {
   startDate: Date | null
   endDate: Date | null
}

export function Schedule({ startDate, endDate }: IScheduleProps) {
   const [days, setDays] = useState<any>([])

   useEffect(() => {
      if (startDate && endDate) {
         const days = [startDate]
         const numberOfDays = differenceInCalendarDays(endDate, startDate)
         for (let i = 0; i < numberOfDays; i++) {
            days.push(addDays(startDate, i + 1))
         }
         setDays(days)
      } else {
         setDays([])
      }
   }, [startDate, endDate])

   return (
      <>
         <h2>Schedule</h2>
         {days.map((date: any) => (
            <ScheduleDayCard key={date} date={date} />
         ))}
      </>
   )
}

export interface IScheduleDayCardProps {
   date: Date
}

function ScheduleDayCard({ date }: IScheduleDayCardProps) {
   const mealPlan = useMealPlan()
   const [meals, setMeals] = useState<any>(mealPlan.getMealsForDay(date))
   // const [recipes, setRecipe] = useState<any>([])

   const updateMeals = () => {
      setMeals(mealPlan.getMealsForDay(date))
   }

   // useEffect(() => {
   //    if (!meals.length) return

   //    const fetchAssociatedRecipes = async () => {
   //       const recipes = await Promise.all(
   //          meals.map((meal: Meal) => recipesApi.fetchRecipe(meal.recipeId))
   //       )
   //       setRecipe(recipes)
   //    }
   //    fetchAssociatedRecipes()
   // }, [meals])

   return (
      <div className="card mb-4">
         <div className="card-body">
            <h4 className="card-title">{date.toLocaleDateString()}</h4>
            <div className="card-text">
               {!meals.length ? (
                  'Your meal plan for the day'
               ) : (
                  <>
                     <strong>Meals:</strong>
                     <Table columns={['id', 'meal', 'actions']}>
                        {meals.map((meal: Meal) => (
                           <tr key={meal.id}>
                              <td>{meal.id}</td>
                              <td>{meal.recipeName}</td>
                              <td>
                                 <button
                                    className="btn btn-sm btn-dark"
                                    onClick={() => {
                                       mealPlan.removeMeal(meal.id)
                                       updateMeals()
                                    }}>
                                    Remove
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </Table>
                  </>
               )}
            </div>
            <ButtonRandomRecipe
               onClick={recipe => {
                  mealPlan.addMeal(date, recipe.id, recipe.name)
                  updateMeals()
               }}
            />
            <button
               className="btn btn-primary"
               onClick={() => mealPlan.deriveShoppingList()}>
               go
            </button>
         </div>
      </div>
   )
}
