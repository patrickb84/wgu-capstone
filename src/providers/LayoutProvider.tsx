import { createContext, useState, useContext } from 'react'

export interface ILayoutContext {
	showNavbar: boolean
	showFooter: boolean
}

const LayoutContext = createContext({} as ILayoutContext)

interface ILayoutProviderProps {
	children: React.ReactNode
}

export const LayoutProvider = ({ children }: ILayoutProviderProps) => {
	const [showNavbar, setShowNavbar] = useState(true)
	const [showFooter, setShowFooter] = useState(true)

	return (
		<LayoutContext.Provider
			value={{
				showNavbar,
				showFooter
			}}>
			{children}
		</LayoutContext.Provider>
	)
}

export const useLayoutContext = () => {
	return useContext(LayoutContext)
}
