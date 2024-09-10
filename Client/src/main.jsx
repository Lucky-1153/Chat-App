import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import {CssBaseline} from "@mui/material"
import {HelmetProvider} from 'react-helmet-async'
import { configureStore } from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import {Toaster} from 'react-hot-toast'
import rootReducer from './redux/store.jsx'
import { BrowserRouter } from 'react-router-dom'

const store = configureStore({
  reducer: rootReducer,
})

createRoot(document.getElementById('root')).render(

  <Provider store = {store} >

    <HelmetProvider>
      <CssBaseline />
      <App />
      <Toaster />
    </HelmetProvider>

   
  </Provider> 

)
