import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CustomerUpdatePage() {
    const [customer, setCustomer] = useState({
        FirstName: '',
        MiddleName: '',
        LastName: '',
        Email: '',
        PhoneNo: '',
        Address: '',
        City: '',
        Pincode: '',
        State: '',
        Login: {
            LoginId: '', 
            Username: '',
            LoginPwd: ''
        }
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const loginId = localStorage.getItem('LoginID');
                if (loginId) {
                    const response = await axios.get(`https://localhost:7016/api/Customer/GetCustomerByLoginId?loginId=${loginId}`);
                    
                    if (response.data) {
                        const {
                            firstName,
                            middleName,
                            lastName,
                            email,
                            phoneNo,
                            address,
                            city,
                            pincode,
                            state,
                            login
                        } = response.data;

                        setCustomer({
                            FirstName: firstName || '',
                            MiddleName: middleName || '',
                            LastName: lastName || '',
                            Email: email || '',
                            PhoneNo: phoneNo || '',
                            Address: address || '',
                            City: city || '',
                            Pincode: pincode || '',
                            State: state || '',
                            Login: {
                                LoginId: login?.loginId || loginId,
                                Username: login?.username || '',
                                LoginPwd: '' // Leave blank for now
                            }
                        });
                    } else {
                        console.error('No customer data found.');
                    }
                } else {
                    console.error('LoginID not found in localStorage');
                    navigate('/'); // Redirect to home if LoginID is missing
                }
            } catch (err) {
                console.error('Failed to fetch customer data:', err);
            }
        };
        fetchCustomer();
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'Username' || name === 'LoginPwd') {
            setCustomer(prevCustomer => ({
                ...prevCustomer,
                Login: {
                    ...prevCustomer.Login,
                    [name]: value
                }
            }));
        } else {
            setCustomer(prevCustomer => ({
                ...prevCustomer,
                [name]: value
            }));
        }
    };

    const handleUpdate = async () => {
        try {
            const loginId = localStorage.getItem('LoginID');
            if (loginId) {
                await axios.put(`https://localhost:7016/api/Customer/UpdateCustomerByLoginId/UpdateCustomerByLoginId?loginId=${loginId}`, customer);
                alert('Customer data updated successfully!');
            } else {
                alert('Update failed: LoginID not found');
            }
        } catch (err) {
            alert('Update failed');
            console.error('Update error:', err);
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
            backgroundColor: 'pink',
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
            }} onClick={() => navigate('/customer')}>Home</button>
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
                            <td><input type="text" name="FirstName" value={customer.FirstName} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td><label>Middle Name:</label></td>
                            <td><input type="text" name="MiddleName" value={customer.MiddleName} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label>Last Name:</label></td>
                            <td><input type="text" name="LastName" value={customer.LastName} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td><label>Email:</label></td>
                            <td><input type="email" name="Email" value={customer.Email} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td><label>Phone Number:</label></td>
                            <td><input type="tel" name="PhoneNo" value={customer.PhoneNo} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td><label>Address:</label></td>
                            <td><input type="text" name="Address" value={customer.Address} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td><label>City:</label></td>
                            <td><input type="text" name="City" value={customer.City} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td><label>Pincode:</label></td>
                            <td><input type="text" name="Pincode" value={customer.Pincode} onChange={handleChange} required /></td>
                        </tr>
                        <tr>
                            <td><label>State:</label></td>
                            <td><input type="text" name="State" value={customer.State} onChange={handleChange} required /></td>
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

export default CustomerUpdatePage;
