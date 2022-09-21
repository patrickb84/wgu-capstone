import './styles/index.scss'
import 'tippy.js/dist/tippy.css'
import './styles/fontawesome/css/all.css'
import ReactDOM from 'react-dom/client'
import App from './App'
import React from 'react'
import { AppProvider } from 'hooks/AppProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<React.StrictMode>
		<AppProvider>
			<App />
		</AppProvider>
	</React.StrictMode>
)
