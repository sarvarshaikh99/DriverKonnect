import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function DriverUpdatePage() {
    const [driver, setDriver] = useState({
        DriverID: '',
        FirstName: '',
        MiddleName: '',
        LastName: '',
        Email: '',
        PhoneNo: '',
        Address: '',
        City: '',
        Pincode: '',
        State: '',
        DLNumber: '',
        Username: '',
        LoginPwd: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchDriver = async () => {
            try {
                const loginId = localStorage.getItem('LoginID');
                if (loginId) {
                    const response = await axios.get(`https://localhost:7016/api/Driver/GetDriverByLoginId?loginId=${loginId}`);
                    if (response.data) {
                        const {
                            driverID,
                            firstName,
                            middleName,
                            lastName,
                            email,
                            phoneNo,
                            address,
                            city,
                            pincode,
                            state,
                            dlNumber,
                            login
                        } = response.data;

                        setDriver({
                            DriverID: driverID || '',
                            FirstName: firstName || '',
                            MiddleName: middleName || '',
                            LastName: lastName || '',
                            Email: email || '',
                            PhoneNo: phoneNo || '',
                            Address: address || '',
                            City: city || '',
                            Pincode: pincode || '',
                            State: state || '',
                            DLNumber: dlNumber || '', // Ensure DL Number is set
                            Username: login?.username || '',
                            LoginPwd: ''
                        });
                    } else {
                        console.error('No driver data found.');
                    }
                } else {
                    console.error('LoginID not found in localStorage');
                    navigate('/'); // Redirect to home if LoginID is missing
                }
            } catch (err) {
                console.error('Failed to fetch driver data:', err);
            }
        };
        fetchDriver();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDriver(prevDriver => ({
            ...prevDriver,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
        try {
            const loginId = localStorage.getItem('LoginID');
            if (loginId) {
                const response = await axios.put(`https://localhost:7016/api/Driver/UpdateDriverByLoginId?loginId=${loginId}`, {
                    loginId: Number(loginId),
                    firstName: driver.FirstName,
                    middleName: driver.MiddleName,
                    lastName: driver.LastName,
                    email: driver.Email,
                    phoneNo: driver.PhoneNo,
                    address: driver.Address,
                    city: driver.City,
                    pincode: driver.Pincode,
                    state: driver.State,
                    dlNumber: driver.DLNumber, // Include DL Number in the update
                    login: {
                        loginId: Number(loginId),
                        username: driver.Username,
                        loginPwd: driver.LoginPwd
                    }
                });
                if (response.status === 200) {
                    alert('Driver data updated successfully!');
                } else {
                    alert('Update failed');
                }
            } else {
                alert('Update failed: LoginID not found');
            }
        } catch (err) {
            console.error('Update error:', err);
            alert('Update failed');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('LoginID');
        alert('Logged Out Successfully!');
        navigate('/');
    };

    const Navbar = () => (
        <nav style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'center',
            backgroundColor: 'lightblue',
            padding: '10px',
            width: '100%',
            zIndex: 1000,
        }}>
            <button style={{
                backgroundColor: 'white',
                color: '#007bff',
                border: 'none',
                padding: '10px 20px',
                margin: '0 10px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
            }} onClick={() => navigate('/driver')}>Home</button>
            <button style={{
                backgroundColor: 'white',
                color: '#007bff',
                border: 'none',
                padding: '10px 20px',
                margin: '0 10px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
            }} onClick={handleLogout}>Logout</button>
        </nav>
    );

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
            marginTop: '80px',
        }}>
            <Navbar />
            <h2 style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#007bff',
                marginTop: '20px',
            }}>Update Your Details</h2>
            <form>
                <table style={{
                    width: '100%',
                    border: '0',
                }}>
                    <tbody>
                        <tr>
                            <td><label>First Name:</label></td>
                            <td><input type="text" name="FirstName" value={driver.FirstName} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td><label>Middle Name:</label></td>
                            <td><input type="text" name="MiddleName" value={driver.MiddleName} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Last Name:</label></td>
                            <td><input type="text" name="LastName" value={driver.LastName} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td><label>Email:</label></td>
                            <td><input type="email" name="Email" value={driver.Email} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td><label>Phone Number:</label></td>
                            <td><input type="tel" name="PhoneNo" value={driver.PhoneNo} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td><label>Address:</label></td>
                            <td><input type="text" name="Address" value={driver.Address} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td><label>City:</label></td>
                            <td><input type="text" name="City" value={driver.City} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td><label>Pincode:</label></td>
                            <td><input type="text" name="Pincode" value={driver.Pincode} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td><label>State:</label></td>
                            <td><input type="text" name="State" value={driver.State} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td><label>DL Number:</label></td>
                            <td>
                                <input 
                                    type="text" 
                                    name="DLNumber" 
                                    value={driver.DLNumber} 
                                    onChange={handleChange} 
                                    readOnly 
                                    style={{
                                        filter: 'blur(0.5px)',
                                        backgroundColor: '#e9ecef', // Grey background to indicate it's disabled
                                        cursor: 'not-allowed' // Change cursor to indicate it's not editable
                                    }}
                                    required 
                                />
                            </td>
                        </tr>
            {/*
                        <tr>
                            <td><label>Username:</label></td>
                            <td><input type="text" name="Username" value={driver.Username} onChange={handleChange} required /></td>
                        </tr>
                        */}
                        <tr>
                            <td><label>Password:</label></td>
                            <td><input type="password" name="LoginPwd" value={driver.LoginPwd} onChange={handleChange} /></td>
                        </tr>
            
                    </tbody>
                </table>
                <button type="button" onClick={handleUpdate} style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '20px',
                }}>Update</button>
            </form>
        </div>
    );
}

export default DriverUpdatePage;
