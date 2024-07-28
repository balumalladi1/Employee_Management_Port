import React, { useState } from 'react'
import Cookies from "js-cookie"
import "./CreateEmployee.css"

import API from '../API';

import Header from '../Header/Header'

const CreateEmployee = () => {
        const [name,setname] = useState("")
        const [email,setemail] = useState("")
        const [mobile,setmobile] = useState("")
        const [designation,setdesignation] = useState("")
       
        const [course,setcourse] = useState("")
        const [file,setFile] = useState(null)

        
        const handleImageUpload =(event)=>{
            const selectedImage = event.target.files[0];
            setFile(selectedImage)
        }

        const handleCategoryChange = (event)=>{
            const value = event.target.value;
            if(course.includes(value)){
                setcourse(course.filter((item)=> item !== value));
            }else{
                setcourse([...course, value])
            }
        }


        const handleFirmSubmit = async(e)=>{
                e.preventDefault()
                try {
                    const loginToken = Cookies.get("token")
                    console.log(loginToken)
                    if(!loginToken){
                        console.error("User not authenticated");
                    }
            
                    const formData = new FormData();
                      formData.append('name', name);
                      formData.append('email', email);
                      formData.append('mobile', mobile);
                      formData.append('designation', designation);
                      formData.append('image', file)
                      
            
                      course.forEach((value)=>{
                        formData.append('course', value)
                      });
                    
                      const response = await fetch(`${API}/employeedetails/add-employee`,{
                        method:'POST',
                        headers:{
                          'token': `${loginToken}`
                        },
                        body: formData
                      });
                      const data = await response.json()
                      if(response.ok){
                        alert("Firm added Successfully")
                      } else{
                        alert("failed to add Employee")
                      }

                } catch (error) {
                    console.error("failed to add Firm")
                    alert("Internal Server Error")
                }
        }


  return (
    <div>
        <Header />
        <form onSubmit={handleFirmSubmit}>
        <div className="container">
            <div className='sub-container'>
                <p>UserName:</p>
                <input type="text" name="name" value={name} onChange={(e)=>setname(e.target.value)}/>
            </div>
            <div className='sub-container1'>
                <p>Email:</p>
                <input type="text" name="email"  value={email} onChange={(e)=>setemail(e.target.value)}/>
            </div>
            <div className='sub-container'>
                <p>Mobile No:</p>
                <input type="text" name="mobile" value={mobile} onChange={(e)=>setmobile(e.target.value)}/>
            </div>
            <div className='sub-container2'>
                <p>Designation:</p>
                <select value={designation} onChange={(e)=>setdesignation(e.target.value)} >
                    <option> Hr</option>
                    <option> Manager</option>
                    <option> Sales</option>
                </select>
            </div>
            
            <div className='sub-container5'>
                <p>Course:</p>
                <input type="checkbox" checked ={course.includes('MCA')}  value="MCA" onChange={handleCategoryChange}/>
                <p>MCA</p>
                <input type="checkbox" checked ={course.includes('BCA')}  value="BCA" onChange={handleCategoryChange}/>
                <p>BCA</p>
                <input type="checkbox" checked ={course.includes('BSC')}  value="BSC" onChange={handleCategoryChange}/>
                <p>BSC</p>
            </div>
            <div className='sub-container6'>
                <p>Image:</p>
                <input type="file" onChange={handleImageUpload}/>
            </div>
            <div >
                <button type="submit" className='button'>Submit</button>
            </div>
        </div>
        </form>
    </div>
  )
}

export default CreateEmployee