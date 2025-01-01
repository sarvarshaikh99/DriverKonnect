//customer
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CustomerHomePage.css'; // Make sure this path points to your CSS file

import driver1 from '../images/driver_1.jpg'; // Adjust the path if needed
import driver2 from '../images/driver_2.png'; // Adjust the path if needed
import driver3 from '../images/driver_3.png'; // Adjust the path if needed

const Navbar = () => {
  const navigate = useNavigate();

  const handleUpdateProfile = () => {
    window.location.href = 'http://localhost:3000/ucustomer';
  };

  const handleBookRide = () => {
    window.location.href = 'http://localhost:3000/bookride';
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
      }} onClick={() => navigate('/Customer')}>Home</button>
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
      }} onClick={handleBookRide}>Book Ride</button>
      <button style={{
        backgroundColor: 'white',
        color: '#007bff',
        border: 'none',
        padding: '10px 20px',
        margin: '0 10px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
      }} onClick={() => navigate('/ContactUs')}>Contact Us</button>
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
  const images = [driver1, driver2, driver3];
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

const ContactUs = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      flexDirection: 'row',
      marginTop: '30px', // Adjust this to avoid overlap with the fixed navbar
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
          }}>Contact Us</h3>
          <p><strong>Address:</strong> 356, FC Road, Deccan, Pune, 411004</p>
          <p><strong>Email:</strong> contactus@driverkonnect.in</p>
          <p><strong>Contact No:</strong> 1800 103 7593</p>
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
            Welcome, To Contact Us Page!
          </h2>
          <ImageSlider />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
