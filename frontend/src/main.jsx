import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'  // import this for routing
import StoreContextProvider from './context/StoreContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(

  // this is to do routing
  // go to App.jsx to set the routes
  <BrowserRouter>

  {/* by using this we can do store context for app, */}
  <StoreContextProvider>
    <App />
  </StoreContextProvider>

  </BrowserRouter>
)
