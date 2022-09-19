import { createContext, useState, useContext } from 'react'
import { MealPlanProvider } from './MealPlanProvider'
import { RecipeDataProvider } from './RecipeDataProvider'
import { UserProvider } from './UserProvider'

export interface IAppContext {}

const AppContext = createContext({} as IAppContext)

interface IAppProviderProps {
	children: React.ReactNode
}

export const AppProvider = ({ children }: IAppProviderProps) => {
	return (
		<AppContext.Provider value={{}}>
			<UserProvider>
				<RecipeDataProvider>
					<MealPlanProvider>{children}</MealPlanProvider>
				</RecipeDataProvider>
			</UserProvider>
		</AppContext.Provider>
	)
}

export const useAppContext = () => {
	return useContext(AppContext)
}
