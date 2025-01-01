import React, { useEffect, useState } from 'react';

const DriverActivation = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('https://localhost:7016/api/Driver/GetDriversWithStatusZero');
        if (response.ok) {
          const data = await response.json();
          console.log(data); // Log data for debugging
          setDrivers(data);
        } else {
          console.error('Failed to fetch drivers.');
        }
      } catch (error) {
        console.error('An error occurred while fetching drivers.', error);
      }
    };

    fetchDrivers();
  }, []);

  const handleActivateDriver = async (loginId) => {
    if (!loginId) {
      console.error('loginId is undefined or invalid');
      return;
    }

    try {
      const response = await fetch(`https://localhost:7016/api/Driver/UpdateDriverStatusToActive?loginId=${loginId}`, {
        method: 'PUT', // Use PUT method as per the API
      });

      if (response.ok) {
        alert('Driver activated successfully!');
        window.location.reload(); // Refresh the page after successful activation
      } else {
        const errorData = await response.json();
        console.error('Failed to activate driver.', errorData);
      }
    } catch (error) {
      console.error('An error occurred while activating the driver.', error);
    }
  };

  const handleHomeClick = () => {
    window.location.href = '/admin'; // Redirect to AdminHomePage using window.location.href
  };

  const handleLogoutClick = () => {
    // Add logout logic here, such as clearing user session
    window.location.href = '/'; // Redirect to Login page using window.location.href
  };

  return (
    <div style={{ height: '100vh' }}>
      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'pink',
        padding: '10px 20px',
        color: 'white',
      }}>
        <h1 style={{ margin: 0, color: '#4B0082' }}>Driver Activation</h1>
        <div>
          <button onClick={handleHomeClick} style={{
            backgroundColor: 'white',
            color: 'blue',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            fontSize: '16px',
            borderRadius: '4px',
            marginRight: '10px',
          }}>Home</button>
          <button onClick={handleLogoutClick} style={{
            backgroundColor: 'white',
            color: 'blue',
            border: 'none',
            padding: '10px 20px',
            cursor: 'pointer',
            fontSize: '16px',
            borderRadius: '4px',
          }}>Logout</button>
        </div>
      </nav>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(50vh - 70px)', // Adjust height to account for nav bar
        flexDirection: 'column',
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#007bff',
          marginBottom: '20px',
        }}>Pending Activation</h2>
        <table style={{
          borderCollapse: 'collapse',
          width: '60%',
          margin: '0 auto',
        }}>
          <thead>
            <tr>
              <th style={{
                border: '1px solid #dddddd',
                textAlign: 'left',
                padding: '8px',
                backgroundColor: '#f2f2f2',
              }}>Driver Name</th>
              <th style={{
                border: '1px solid #dddddd',
                textAlign: 'left',
                padding: '8px',
                backgroundColor: '#f2f2f2',
              }}>DL Number</th>
              <th style={{
                border: '1px solid #dddddd',
                textAlign: 'center',
                padding: '8px',
                backgroundColor: '#f2f2f2',
              }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {drivers.length > 0 ? (
              drivers.map(driver => (
                <tr key={driver.DriverID}>
                  <td style={{
                    border: '1px solid #dddddd',
                    textAlign: 'left',
                    padding: '8px',
                    color: '#8B4513', // Dark brown color for the name
                  }}>
                    {driver.middleName 
                      ? `${driver.firstName} ${driver.middleName} ${driver.lastName}` 
                      : `${driver.firstName} ${driver.lastName}`}
                  </td>
                  <td style={{
                    border: '1px solid #dddddd',
                    textAlign: 'left',
                    padding: '8px',
                    color: '#8B4513', // Dark brown color for DLNumber
                  }}>{driver.dlNumber}</td>
                  <td style={{
                    border: '1px solid #dddddd',
                    textAlign: 'center',
                    padding: '8px',
                  }}>
                    <button style={{
                      backgroundColor: '#007bff',
                      color: 'white',
                      border: 'none',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      borderRadius: '4px',
                    }} onClick={() => handleActivateDriver(driver.loginId)}>Activate</button> {/* Use LoginID here */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{
                  textAlign: 'center',
                  padding: '8px',
                  fontStyle: 'italic',
                }}>No drivers available for activation.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DriverActivation;
