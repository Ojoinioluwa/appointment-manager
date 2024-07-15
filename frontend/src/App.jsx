import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import Signup from './pages/signup'
import Landingpage from './pages/landing'
import Schedules from './pages/schedules'
import Inventory from './pages/inventory'
import Prescriptions from './pages/prescriptions'
import Homepage from './pages/homepage'
import PrivateRoutes from './protectedRoutes'

function App() {

  return (
    <div>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Homepage />}>
          <Route path='/' element={<Dashboard />} />
            <Route path='/schedules' element={<Schedules />} />
            <Route path='/inventory' element={<Inventory />} />
            <Route path='/prescriptions' element={<Prescriptions />} />
          </Route>
        </Route>
        
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/landing' element={<Landingpage />} />
      </Routes>
    </div>
  )
}

export default App
