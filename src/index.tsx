import './styles/index.scss'
import 'tippy.js/dist/tippy.css'
import './assets/fontawesome/css/all.css'
import ReactDOM from 'react-dom/client'
import { UserProvider } from './providers/AuthProvider'
import { AppRouter } from './routes/AppRouter'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { MealApiProvider } from 'providers/MealDataProvider'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
	<AppRouter>
		<UserProvider>
			<MealApiProvider>
				<App />
			</MealApiProvider>
		</UserProvider>
	</AppRouter>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
