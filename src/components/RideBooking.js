import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios'; // Import the configured axios instance

function RideBooking() {
    const [rideDate, setRideDate] = useState('');
    const [pickupAddress, setPickupAddress] = useState('');
    const [pickupCity, setPickupCity] = useState('');
    const [pincode, setPincode] = useState('');
    const [state, setState] = useState('');
    const [chargeType, setChargeType] = useState('Hourly'); // Default to Hourly
    const [rideQuantity, setRideQuantity] = useState('');
    const [paymentMode, setPaymentMode] = useState('Cash');
    const [chargeID, setChargeID] = useState(11); // Set default ChargeID to 11 for Hourly
    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        // Update chargeID whenever chargeType changes
        setChargeID(chargeType === 'Hourly' ? 11 : 12);
    }, [chargeType]);

    const handleBookRide = async (e) => {
        e.preventDefault();

        // Validate Pincode
        if (pincode < 100000 || pincode > 999999) {
            setErrorMessage('Pincode must be between 100000 and 999999');
            return;
        }

        try {
            await axios.post('/ride_booking', {
                RideDate: rideDate,
                PickupAddress: pickupAddress,
                PickupCity: pickupCity,
                Pincode: pincode,
                State: state,
                ChargeType: chargeType,
                RideQuantity: rideQuantity,
                Paymentmode: paymentMode,
                ChargeID: chargeID, // Include ChargeID in the request
            });
            alert('Ride booking request submitted successfully!');
            setErrorMessage(''); // Clear any previous error message
        } catch (err) {
            setErrorMessage('Booking request failed');
        }
    };

    const handleUpdateProfile = () => {
        navigate('/ucustomer');
    };

    const handleLogout = () => {
        localStorage.removeItem('LoginID');
        alert('Logged Out Successfully!');
        window.location.href = 'http://localhost:3000';
    };

    const handleChargeTypeChange = (e) => {
        const selectedType = e.target.value;
        setChargeType(selectedType);
        setRideQuantity(''); // Reset rideQuantity when chargeType changes
    };

    const generateRideQuantityOptions = () => {
        const maxQuantity = chargeType === 'Hourly' ? 23 : 31;
        const label = chargeType === 'Hourly' ? 'Hours' : 'Days';
        const options = [];

        for (let i = 1; i <= maxQuantity; i++) {
            options.push(
                <option key={i} value={i}>
                    {i} {label}
                </option>
            );
        }

        return options;
    };

    return (
        <div style={styles.container}>
            <nav style={styles.navbar}>
                <button style={styles.navButton} onClick={() => navigate('/customer')}>Home</button> {/* Redirect to CustomerHomePage */}
                <button style={styles.navButton} onClick={handleUpdateProfile}>Update Profile</button>
                <button style={styles.navButton} onClick={() => navigate('/ContactUs')}>Contact Us</button>
                <button style={styles.navButton} onClick={handleLogout}>Logout</button>
            </nav>
            <h2 style={styles.header}>Create Ride Request</h2>
            <form onSubmit={handleBookRide} style={styles.form}>
                <table style={styles.table}>
                    <tbody>
                        <tr>
                            <td><label>Ride Date:</label></td>
                            <td><input type="datetime-local" value={rideDate} onChange={(e) => setRideDate(e.target.value)} required /></td>
                        </tr>
                        <tr>
                            <td><label>Pickup Address:</label></td>
                            <td><input type="text" value={pickupAddress} onChange={(e) => setPickupAddress(e.target.value)} required /></td>
                        </tr>
                        <tr>
                            <td><label>Pickup City:</label></td>
                            <td><input type="text" value={pickupCity} onChange={(e) => setPickupCity(e.target.value)} required /></td>
                        </tr>
                        <tr>
                            <td><label>Pincode:</label></td>
                            <td><input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} required /></td>
                        </tr>
                        <tr>
                            <td><label>State:</label></td>
                            <td><input type="text" value={state} onChange={(e) => setState(e.target.value)} required /></td>
                        </tr>
                        <tr>
                            <td><label>Ride Type:</label></td>
                            <td>
                                <select value={chargeType} onChange={handleChargeTypeChange}>
                                    <option value="Hourly">Hourly</option>
                                    <option value="Daily">Daily</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Select Duration:</label></td>
                            <td>
                                <select value={rideQuantity} onChange={(e) => setRideQuantity(e.target.value)} required>
                                    <option value="" disabled>Select {chargeType === 'Hourly' ? 'Hours' : 'Days'}</option>
                                    {generateRideQuantityOptions()}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Payment Mode:</label></td>
                            <td>
                                <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
                                    <option value="Cash">Cash</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button type="submit" style={styles.button}>Book Ride</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                {errorMessage && <p style={styles.error}>{errorMessage}</p>}
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        marginTop: '80px', // Adjust to avoid overlap with fixed navbar
    },
    navbar: {
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
    },
    navButton: {
        backgroundColor: 'white',
        color: '#007bff',
        border: 'none',
        padding: '10px 20px',
        margin: '0 10px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
    },
    header: {
        marginBottom: '20px',
    },
    form: {
        width: '100%',
        maxWidth: '600px',
        padding: '20px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
    },
    table: {
        width: '100%',
        border: '0', // Border width 0
    },
    error: {
        color: 'red',
        fontSize: '12px',
        marginTop: '10px',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default RideBooking;