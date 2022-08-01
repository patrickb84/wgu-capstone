import './styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { FirebaseProvider } from './context/FirebaseContext'
import { MealDBProvider } from './context/MealsDBContext'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <FirebaseProvider>
    <MealDBProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MealDBProvider>
  </FirebaseProvider>
)
