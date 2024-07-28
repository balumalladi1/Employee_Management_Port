import React, { useState } from 'react'
import Cookies from "js-cookie"
import "./Login.css"
import API from '../API';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username,setuserName]=useState("");
    const [password,setPassword]=useState("")

    const navigate = useNavigate()

    const navigate1 =()=>{
        navigate("/")
    }

    const changedetailsusername=(event)=>{
        setuserName(event.target.value)
    }

    const changedetailspassword=(event)=>{
        setPassword(event.target.value)
    }

    const rendersucess = (JwtToken) =>{
        Cookies.set("token",JwtToken,{expires:30,path:"/"})
        navigate1()
    }

    const submitdetails=async(e)=>{
        e.preventDefault()
        try {
            const options = {
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({username,password})
            }
            const response=await fetch(`${API}/employee/login`,options)
            const data = await response.json()
            
            console.log(data)
            if (response.ok) {
                console.log(data)
               alert("Login Succesfull")
               rendersucess(data.token)
            } else {
                alert("Login unSuccesfull")
            }
        } catch (error) {
            console.log(error)
            alert("Internal Server Error")
        }
    }

  return (
    <div>
        <div className="Login-container">
            <div className="First-container">
                <img src="https://res.cloudinary.com/dlbodeuso/image/upload/v1718886071/Illustration_pm8mzg.png" alt="loginpage" />
            </div>

            <div className="Second-container">
            <div className="Second-container-sub-container1">
                    <img src="https://res.cloudinary.com/dlbodeuso/image/upload/v1718886387/logo_cienwq.png" alt="website logo" />
                    <p>EMPLOYEE_MANAGEMENT_PORTAL</p>
                </div>
            <form onSubmit={submitdetails}>
                <div className="Second-container-sub-container2">
                <p>USERNAME</p>
                <input type="text" value={username} name="username" onChange={changedetailsusername}/>
                <p>PASSWORD</p>
                <input type="password" value={password} name="username" onChange={changedetailspassword}/>
                <div className="button">
                    <button type="submit" >
                        Submit
                    </button>
                </div>
                </div>
                
            </form> 
            </div>
        </div>
    </div>
  )
}

export default Login