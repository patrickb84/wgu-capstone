import { createContext, useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
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
		<BrowserRouter>
			<AppContext.Provider value={{}}>
				<UserProvider>
					<RecipeDataProvider>
						<MealPlanProvider>{children}</MealPlanProvider>
					</RecipeDataProvider>
				</UserProvider>
			</AppContext.Provider>
		</BrowserRouter>
	)
}

export const useAppContext = () => {
	return useContext(AppContext)
}
