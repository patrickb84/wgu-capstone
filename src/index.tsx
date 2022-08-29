import './styles/index.scss'
import 'tippy.js/dist/tippy.css'
import ReactDOM from 'react-dom/client'
import { AppProvider } from './providers/AppProvider'
import { AppRouter } from './routes/AppRouter'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { MealApiProvider } from 'providers/MealApiProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<AppRouter>
		<AppProvider>
			<MealApiProvider>
				<App />
			</MealApiProvider>
		</AppProvider>
	</AppRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
