import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [loginPwd, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('https://localhost:7016/api/Login/LoginUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Username: username,
          LoginPwd: loginPwd,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('LoginID', data.loginId);

        switch (data.roleId) {
          case 1:
            navigate('/admin');
            break;
          case 2:
            navigate('/customer');
            break;
          case 3:
            navigate('/driver');
            break;
          default:
            setError('Role not recognized.');
            break;
        }
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (error) {
      setError('An error occurred while trying to log in.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.welcomeText}>Welcome to DriverKonnect!! Please Login</h1>
      <h2 style={styles.header}>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <table style={styles.table}>
          <tbody>
            <tr>
              <td><label>Username</label></td>
              <td>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label>Password</label></td>
              <td>
                <input
                  type="password"
                  className="form-control"
                  value={loginPwd}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </td>
            </tr>
            {error && (
              <tr>
                <td colSpan="2">
                  <div style={styles.error}>{error}</div>
                </td>
              </tr>
            )}
            <tr>
              <td colSpan="2">
                <button type="submit" style={styles.button}>
                  Login
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
      <div className="mt-3">
        <a href="/cregister">To Register as a Customer Click Here</a>
      </div>
      <div className="mt-3">
        <a href="/dregister">To Register as a Driver Click Here</a>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    flexDirection: 'column',
  },
  welcomeText: {
    color: 'blue',
    marginBottom: '20px',
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

export default Login;
