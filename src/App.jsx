import React from 'react'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import { Route, Routes } from 'react-router-dom'
import UpdateEmployeeDetails from './components/UpdateEmployeeDetails/UpdateEmployeeDetails'
import CreateEmployee from './components/CreateEmployee/CreateEmployee'


const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path='/login' element={<Login/>} />
        <Route exact path='/' element={<Home/>} />
        <Route exact path='/update-employee' element={<UpdateEmployeeDetails/>} />
        <Route exact path="/create-employee" element={<CreateEmployee />}/>
    </Routes>  
    </div>  
  )
}

export default App

