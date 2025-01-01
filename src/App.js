import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import AdminHomePage from './components/AdminHomePage';
import CustomerHomePage from './components/CustomerHomePage';
import DriverHomePage from './components/DriverHomePage';
import CustomerUpdatePage from './components/CustomerUpdatePage';
import DriverUpdatePage from './components/DriverUpdatePage';
import CustomerRegistrationPage from './components/CustomerRegistrationPage';
import DriverRegistrationPage from './components/DriverRegistrationPage';
import RideBooking from  './components/RideBooking';
import DriverActivation from './components/DriverActivation';
import ContactUs from  './components/ContactUs';
import ContactUsDriver from  './components/ContactUsDriver';


function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/admin" element={<AdminHomePage />} />
                    <Route path="/customer" element={<CustomerHomePage />} />
                    <Route path="/driver" element={<DriverHomePage />} />
                    <Route path="/ucustomer" element={<CustomerUpdatePage />} />
                    <Route path="/udriver" element={<DriverUpdatePage />} />
                    <Route path="/cregister" element={<CustomerRegistrationPage />} />
                    <Route path="/dregister" element={<DriverRegistrationPage />} />
                    <Route path="/bookride" element={<RideBooking/>}/>
                    <Route path="/activatedriver" element={<DriverActivation/>}/>
                    <Route path="/contactus" element={<ContactUs />} />
                    <Route path="/contactusdriver" element={<ContactUsDriver />} />

                
                </Routes>
            </div>
        </Router>
    );
}

export default App;
