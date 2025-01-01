import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerHomePage.css'; // Make sure this path points to your CSS file

import driverHome1 from '../images/driverHome1.png';
import driverHome2 from '../images/driverHome2.png';
import driverHome3 from '../images/driverHome3.png';

const Navbar = () => {
  const navigate = useNavigate();

  const handleUpdateProfile = () => {
    window.location.href = 'http://localhost:3000/udriver';
  };

  const handleViewRideRequest = () => {
    window.location.href = 'http://localhost:3000/viewriderequests';
  };

  const handleLogout = () => {
    localStorage.removeItem('LoginID');
    alert('Logged Out Successfully!');
    window.location.href = 'http://localhost:3000';
  };

  return (
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
      zIndex: 1000, // Ensures the navbar stays on top
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
      }} onClick={() => navigate('/')}>Home</button>
      <button style={{
        backgroundColor: 'white',
        color: '#007bff',
        border: 'none',
        padding: '10px 20px',
        margin: '0 10px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
      }} onClick={handleUpdateProfile}>Update Profile</button>
      <button style={{
        backgroundColor: 'white',
        color: '#007bff',
        border: 'none',
        padding: '10px 20px',
        margin: '0 10px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
      }} onClick={handleViewRideRequest}>View Ride Requests</button>
      <button style={{
        backgroundColor: 'white',
        color: '#007bff',
        border: 'none',
        padding: '10px 20px',
        margin: '0 10px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
      }} onClick={() => navigate('/contactusdriver')}>Contact Us</button>
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
};

const ImageSlider = () => {
  const images = [driverHome1, driverHome2, driverHome3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <img src={images[currentImageIndex]} alt="Driver" style={{ width: '100%', height: '350px', borderRadius: '8px' }} />
    </div>
  );
};

const DriverHomePage = () => {
  const [driverData, setDriverData] = useState(null);

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const loginId = localStorage.getItem('LoginID');
        const response = await fetch(`https://localhost:7016/api/Driver/GetDriverByLoginId?loginId=${loginId}`);

        if (response.ok) {
          const data = await response.json();
          setDriverData(data);
        } else {
          console.error('Failed to fetch driver data.');
        }
      } catch (error) {
        console.error('An error occurred while fetching driver data.', error);
      }
    };

    fetchDriverData();
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'row',
      marginTop: '20px', // Adjust this to avoid overlap with the fixed navbar
    }}>
      <Navbar />
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '80%',
        marginTop: '20px',
        padding: '20px',
      }}>
        <div style={{
          flex: '0 0 25%',
          marginRight: '20px',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
        }}>
          <h3 style={{
            fontSize: '20px',
            fontWeight: 'bold',
            color: '#007bff',
          }}>Profile</h3>
          {driverData ? (
            <div>
            <p><strong>FirstName:</strong> {driverData.firstName}</p>
            <p><strong>MiddleName:</strong> {driverData.middleName}</p>
            <p><strong>LastName:</strong> {driverData.lastName}</p>
            <p><strong>Email:</strong> {driverData.email}</p>
            <p><strong>PhoneNo:</strong> {driverData.phoneNo}</p>
            <p><strong>Address:</strong> {driverData.address}</p>
            <p><strong>City:</strong> {driverData.city}</p>
            <p><strong>Pincode:</strong> {driverData.pincode}</p>
            <p><strong>State:</strong> {driverData.state}</p>
            <p><strong>DL Number:</strong> {driverData.dlNumber}</p>
          </div>
          ) : (
            <p>Loading profile data...</p>
          )}
        </div>
        <div style={{
          flex: '0 0 75%',
          padding: '20px',
          border: '1px solid #ddd',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column', // Align message and image slider vertically
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <h2 style={{ color: 'blue', marginBottom: '20px' }}>
            Welcome To Driver Home Page!
          </h2>
          <ImageSlider />
        </div>
      </div>
    </div>
  );
};

export default DriverHomePage;
