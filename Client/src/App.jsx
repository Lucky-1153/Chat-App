import { useState,lazy, Suspense } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProtectedRoute from './components/auth/ProtectedRoute'
import './App.css'
const Home = lazy( () => import("./pages/Home"))
const Login = lazy(() => import ('./pages/Login'))
import {BarLoader} from 'react-spinners'
import { SocketProvider } from './utils/Socket'

function App() {
 

  return (
    <BrowserRouter>

    <Suspense fallback={
      <div className='h-screen w-full flex justify-center items-center'>
        <BarLoader color={'#F26D7A'}  size={400} />
      </div>
    } >
      <Routes>
          <Route path='/' element={
            <SocketProvider>
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
            </SocketProvider>}
          />
        


          <Route path='/login' element={<Login />} />
          
        </Routes>
    </Suspense>
      
    </BrowserRouter>
  )
}

export default App
