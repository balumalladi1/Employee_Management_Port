import React, { useState, useEffect } from 'react';
import API from '../API';
import Cookies from 'js-cookie';
import './index.css';
import Header from '../Header/Header';

const UpdateEmployeeDetails = () => {
    const [vendors, setVendors] = useState([]);
    const [error, setError] = useState(null);

    const getEmployeeDetails = async () => {
        try {
            const token = Cookies.get("token");
            if (!token) {
                setError("Token Not Found");
                alert("Token Not Found");
                return;
            }

            const options = {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            const response = await fetch(`${API}/employeedetails/employee-details`, options);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched Data:", data); 

           
            if (data && Array.isArray(data.vendors)) {
                setVendors(data.vendors);
            } else {
                setError("No vendors found.");
            }
        } catch (error) {
            console.error("Failed to Fetch Data:", error);
            setError("Internal Server Error: " + error.message);
        }
    };

    useEffect(() => {
        getEmployeeDetails();
    }, []);

    return (
        <>
        <Header />
        <div>
            
            <h1>Employee Details</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {vendors.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Designation</th>
                            <th>Gender</th>
                            <th>Course</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {vendors.map(vendor => (
                            <tr key={vendor._id}>
                                 <td>
                                    {vendor.image ? (
                                        <img src={vendor.image} alt={vendor.name} style={{ width: '50px', height: 'auto' }} />
                                    ) : (
                                        'N/A'
                                    )}
                                </td>
                                <td>{vendor.name}</td>
                                <td>{vendor.email}</td>
                                <td>{vendor.mobile}</td>
                                <td>{vendor.designation.join(', ')}</td>
                                <td>{vendor.gender.join(', ')}</td>
                                <td>{vendor.course.join(', ')}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Loading...</p>
            )}
        </div>
        </>
    );
};

export default UpdateEmployeeDetails;