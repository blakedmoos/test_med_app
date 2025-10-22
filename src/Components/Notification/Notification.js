import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css'; // Import the CSS file

const Notification = ({ children }) => {
  // State variables
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);

  // New state to control notification visibility
  const [showNotification, setShowNotification] = useState(false);

  // useEffect to load stored data once
  useEffect(() => {
    const readStored = () => {
      const storedUsername = sessionStorage.getItem('email');
      const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
      // if storedDoctorData exists, read appointment keyed by doctor name
      const storedAppointmentData = storedDoctorData ? JSON.parse(localStorage.getItem(storedDoctorData.name)) : null;
  
      if (storedUsername) {
        setIsLoggedIn(true);
        setUsername(storedUsername);
      } else {
        setIsLoggedIn(false);
        setUsername('');
      }
  
      if (storedDoctorData) {
        setDoctorData(storedDoctorData);
      } else {
        setDoctorData(null);
      }
  
      if (storedAppointmentData) {
        setAppointmentData(storedAppointmentData);
        setShowNotification(true);
      } else {
        setAppointmentData(null);
        setShowNotification(false);
      }
    };
  
    // read once on mount
    readStored();
  
    // handle custom events fired from DoctorCard
    const handler = (e) => {
      // read storage again and update state
      readStored();
    };
  
    window.addEventListener('appointmentChange', handler);
  
    const storageHandler = () => readStored();
    window.addEventListener('storage', storageHandler);
  
    return () => {
      window.removeEventListener('appointmentChange', handler);
      window.removeEventListener('storage', storageHandler);
    };
  }, []);
  

  // Function to hide notification manually (optional)
  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  return (
    <div>
      <Navbar />
      {children}

      {/* Display notification only if logged in, appointment data exists, and notification is visible */}
      {isLoggedIn && appointmentData && showNotification && (
        <div className="notification-container">
          <div className="appointment-card">
            <div className="appointment-card__content">
              <div className="appointment-card__header">
                <h3 className="appointment-card__title">Appointment Details</h3>
                <button className="close-btn" onClick={handleCloseNotification}>×</button>
              </div>
              <p className="appointment-card__message">
                <strong>Patient:</strong> {username}
              </p>
              <p className="appointment-card__message">
                <strong>Doctor:</strong> {doctorData?.name}
              </p>
              <p className="appointment-card__message">
                <strong>Date:</strong> {appointmentData?.date || 'Not specified'}
              </p>
              <p className="appointment-card__message">
                <strong>Time:</strong> {appointmentData?.time || 'Not specified'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
