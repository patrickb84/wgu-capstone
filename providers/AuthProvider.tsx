import { createContext, useState, useContext }  from 'react'

export interface IAuthContext {
	auth: {}
	setAuth: (value: {}) => void
}

const AuthContext = createContext({} as IAuthContext)

interface IAuthProviderProps {
	children: React.ReactNode
}

export const AuthProvider = ({ children }: IAuthProviderProps) => {
	const [auth, setAuth] = useState({})

	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
}

export const useAuthContext = () => {
	return useContext(AuthContext)
}
