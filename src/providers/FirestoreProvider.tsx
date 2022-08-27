import { createContext, useState, useContext } from 'react'

export interface IDatabaseContext {
	database: {}
	setDatabase: (value: {}) => void
}

const DatabaseContext = createContext({} as IDatabaseContext)

interface IDatabaseProviderProps {
	children: React.ReactNode
}

export const DatabaseProvider = ({ children }: IDatabaseProviderProps) => {
	const [database, setDatabase] = useState({})

	return <DatabaseContext.Provider value={{ database, setDatabase }}>{children}</DatabaseContext.Provider>
}

export const useDatabaseContext = () => {
	return useContext(DatabaseContext)
}
