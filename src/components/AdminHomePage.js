import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleViewDriverRequests = () => {
    window.location.href = 'http://localhost:3000/activatedriver';
  };

  const handleUpdateCharges = () => {
    window.location.href = 'http://localhost:3000/updatecharges';
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
      }} onClick={() => navigate('/admin')}>Home</button>
      <button style={{
        backgroundColor: 'white',
        color: '#007bff',
        border: 'none',
        padding: '10px 20px',
        margin: '0 10px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
      }} onClick={handleViewDriverRequests}>View Driver Registration Request</button>
      <button style={{
        backgroundColor: 'white',
        color: '#007bff',
        border: 'none',
        padding: '10px 20px',
        margin: '0 10px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
      }} onClick={handleUpdateCharges}>Update Charges</button>
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

const AdminHomePage = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '15vh',
      flexDirection: 'column',
      marginTop: '80px', // Adjust this to avoid overlap with the fixed navbar
    }}>
      <AdminNavbar />
      <h2 style={{
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#007bff',
        marginTop: '20px',
      }}>Welcome, Admin!</h2>
    </div>
  );
};

export default AdminHomePage;
