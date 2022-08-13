import './styles/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { FirebaseProvider } from './context/FirebaseContext'
import { MealApiProvider } from './context/MealApiContext'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <FirebaseProvider>
    <MealApiProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </MealApiProvider>
  </FirebaseProvider>
)
