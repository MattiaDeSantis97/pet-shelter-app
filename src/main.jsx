import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import App from './App.jsx'
import './index.css'

// Punto di ingresso dell'applicazione, con rendering del componente App all'interno del provider Redux per la gestione dello stato globale, con supporto per operazioni asincrone e persistenza su localStorage
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)