import React from 'react'

import "./header.css"
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate=useNavigate()

    const gotoCreateEmployee =()=>{
        navigate("/create-employee")
    }

    const logout =()=>{
        navigate("/login")
    }

    const gotoDashboard=()=>{
        navigate("/")
    }

    const gotoUpdate_Employee =()=>{
        navigate("/update-employee")
    }

  return (
    <div>
        <div className="navbar-container">
            <div className='header-section1'>
                <img  src="https://res.cloudinary.com/dlbodeuso/image/upload/v1718886387/logo_cienwq.png" alt="user story"/>
                <p onClick={gotoDashboard}>Dashboard</p>
            </div>
            <div className='header-section2'>
                <p onClick={gotoCreateEmployee}>Create_Employee_Details</p>
                <p onClick={gotoUpdate_Employee}>Update_Employee_Details</p>           
                <p onClick={logout}>Logout</p>
                <img src="https://res.cloudinary.com/dlbodeuso/image/upload/v1721393038/menu_ghniye.svg"/>
            </div>    
        </div>   
    </div>
  )
}

export default Header