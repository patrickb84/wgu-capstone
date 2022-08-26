import { IMealPlan, MealPlan } from './meal-plan.model'
import { createContext, useContext } from 'react'
import { useEffect, useState } from 'react'

export const MealPlanContext = createContext({} as MealPlan)

interface MealPlanProviderProps {
   children: React.ReactNode
}

export const MealPlanProvider = ({ children }: MealPlanProviderProps) => {
   const [mealPlan] = useState<MealPlan>(
      new MealPlan({
         id: '0',
         userId: 'patrick',
         meals: []
      })
   )

   const context: MealPlan = mealPlan

   return (
      <MealPlanContext.Provider value={context}>
         {children}
      </MealPlanContext.Provider>
   )
}

export const useMealPlan = () => {
   const context = useContext(MealPlanContext)
   if (context === undefined) {
      throw new Error('useMealPlan must be used within a MealPlanProvider')
   }
   return context
}
