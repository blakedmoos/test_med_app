import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import { v4 as uuidv4 } from 'uuid';

const DoctorCard = ({ name, speciality, experience, ratings }) => {
  const [showModal, setShowModal] = useState(false);
  const [appointments, setAppointments] = useState([]);

  const handleFormSubmit = (appointmentData) => {
    const newAppointment = {
      id: uuidv4(),
      ...appointmentData,
    };
    const updatedAppointments = [...appointments, newAppointment];
    setAppointments(updatedAppointments);
    setShowModal(false);

    // ✅ Save doctor info and appointment details to localStorage
    const doctorData = { name, speciality };
    localStorage.setItem('doctorData', JSON.stringify(doctorData));
    localStorage.setItem(
      name,
      JSON.stringify({
        date: appointmentData.date,
        time: appointmentData.time,
      })
    );

    window.dispatchEvent(new Event('appointmentChange'));
  };

  const handleCancel = (appointmentId) => {
    const updatedAppointments = appointments.filter((a) => a.id !== appointmentId);
    setAppointments(updatedAppointments);

    // remove from localStorage and notify
    localStorage.removeItem(name);
    window.dispatchEvent(new Event('appointmentChange'));
  };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
          <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor"
            className="bi bi-person-fill" viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
      </div>

      <div className="doctor-card-options-container">
        <Popup
          trigger={
            <button className="book-appointment-btn" onClick={() => setShowModal(true)}>
              Book Appointment
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          <div className="doctorbg" style={{ height: '100vh', overflow: 'scroll' }}>
            <div className="doctor-card-detail-name">{name}</div>
            <div className="doctor-card-detail-speciality">{speciality}</div>
            <div className="doctor-card-detail-experience">{experience} years experience</div>
            <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>

            {appointments.length > 0 ? (
              <>
                <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                {appointments.map((a) => (
                  <div key={a.id}>
                    <p>Name: {a.name}</p>
                    <p>Phone: {a.phoneNumber}</p>
                    <p>Date: {a.date}</p>
                    <p>Time: {a.time}</p>
                    <button onClick={() => handleCancel(a.id)}>Cancel</button>
                  </div>
                ))}
              </>
            ) : (
              <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
            )}
          </div>
        </Popup>
      </div>
    </div>
  );
};

export default DoctorCard;