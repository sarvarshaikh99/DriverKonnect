// src/components/Register.js
import React, { useState } from 'react';
import axios from '../axios'; // Import the configured axios instance

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [roleID, setRoleID] = useState(1); // Default to Customer
    const [errorMessage, setErrorMessage] = useState('');

    const validatePassword = (password) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasSpecialChar = /[@#$&]/.test(password);
        const hasNumber = /\d/.test(password);

        if (password.length < minLength) {
            return `Password must be at least ${minLength} characters long.`;
        }
        if (!hasUpperCase) {
            return 'Password must contain at least one uppercase letter.';
        }
        if (!hasSpecialChar) {
            return 'Password must contain at least one special character (@, #, $, &).';
        }
        if (!hasNumber) {
            return 'Password must contain at least one numeric digit.';
        }
        return '';
    };

    const handleRegister = async (e) => {
        e.preventDefault();

        const validationError = validatePassword(password);
        if (validationError) {
            setErrorMessage(validationError);
            return;
        }

        try {
            await axios.post('/users', {
                Username: username,
                LoginPwd: password,
                RoleID: roleID,
                Status: 0 // Default status as inactive
            });
            alert('User registered successfully! The account will be activated by an admin.');
        } catch (err) {
            alert('Registration failed');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>Register</h2>
            <form onSubmit={handleRegister} style={styles.form}>
                <table style={styles.table}>
                    <tbody>
                        <tr>
                            <td><label>Username:</label></td>
                            <td>
                                <input 
                                    type="text" 
                                    value={username} 
                                    onChange={(e) => setUsername(e.target.value)} 
                                    required 
                                />
                            </td>
                        </tr>
                        <tr>
                            <td><label>Password:</label></td>
                            <td>
                                <input 
                                    type="password" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required 
                                />
                                {errorMessage && <p style={styles.error}>{errorMessage}</p>}
                            </td>
                        </tr>
                        <tr>
                            <td><label>Role:</label></td>
                            <td>
                                <select 
                                    value={roleID} 
                                    onChange={(e) => setRoleID(Number(e.target.value))}>
                                    <option value={1}>Customer</option>
                                    <option value={2}>Driver</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button type="submit" style={styles.button}>Register</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
            <p>Already have an account? <a href="/">Login</a></p>
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
    },
    header: {
        marginBottom: '20px',
    },
    form: {
        width: '100%',
        maxWidth: '400px',
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

export default Register;
