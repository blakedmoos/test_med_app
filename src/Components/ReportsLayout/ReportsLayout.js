import React, { useState, useEffect } from 'react';
import './ReportsLayout.css';

const ReportsLayout = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Load doctors from local JSON
    fetch(`${process.env.PUBLIC_URL}/doctors.json`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to load doctors');
        return res.json();
      })
      .then(data => setDoctors(data))
      .catch(err => console.error('Error loading doctors:', err));
  }, []);

  const handleViewForm = () => {
    // Open the PDF in a new tab
    window.open(`${process.env.PUBLIC_URL}/patient_report.pdf`, '_blank');
  };

  const handleDownloadForm = () => {
    // Trigger download of the PDF
    const link = document.createElement('a');
    link.href = `${process.env.PUBLIC_URL}/patient_report.pdf`;
    link.download = 'patient_report.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="reports-container">
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Doctor Name</th>
            <th>Doctor Specialty</th>
            <th>View Form</th>
            <th>Download Form</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.name}>
              <td>{doctor.name}</td>
              <td>{doctor.speciality}</td>
              <td>
                <button className="report-btn" onClick={handleViewForm}>
                  View Form
                </button>
              </td>
              <td>
                <button className="report-btn" onClick={handleDownloadForm}>
                  Download Form
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsLayout;