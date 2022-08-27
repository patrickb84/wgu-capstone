import { createContext, useState, useContext, useEffect } from 'react'

export interface IAppContext {
	app: {}
	setApp: (value: {}) => void
}

const AppContext = createContext({} as IAppContext)

interface IAppProviderProps {
	children: React.ReactNode
}

export const AppProvider = ({ children }: IAppProviderProps) => {
   const [app, setApp] = useState({})
   
	return <AppContext.Provider value={{ app, setApp }}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
	return useContext(AppContext)
}