import React, { useState } from 'react';

const ProfilePage = () => {
  const [appointments, setAppointments] = useState([]);
  const [appointmentName, setAppointmentName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');

  const addAppointment = () => {
    if (appointmentName && appointmentDate && appointmentTime) {
      const newAppointment = {
        name: appointmentName,
        date: appointmentDate,
        time: appointmentTime
      };
      setAppointments([...appointments, newAppointment]);
      setAppointmentName('');
      setAppointmentDate('');
      setAppointmentTime('');
    }
  };

  return (
    <div className="container mx-auto py-8">
      {/* Profile Info */}
      <div className="flex items-start">
        <div className="w-1/4">
          <img src="profile-pic.jpg" alt="Profile" className="rounded-full w-32 h-32" />
        </div>
        <div className="w-3/4 px-4">
          {/* Input fields for profile info */}
        </div>
      </div>

      {/* Medical Info */}
        {/* Input fields for medical info */}

        <div className="mt-8">
        <div className="mb-4">
          <input type="text" placeholder="Medication" className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="mb-4">
          <input type="text" placeholder="Medical Aids" className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="mb-4">
          <textarea placeholder="Home Support" className="w-full border border-gray-300 rounded p-2"></textarea>
        </div>
        <div className="mb-4">
          <textarea placeholder="School Support" className="w-full border border-gray-300 rounded p-2"></textarea>
        </div>
      </div>

      {/* Links */}
      <div className="mt-8 flex justify-between">
        <a href="/documents" className="text-blue-500 hover:underline">Documents</a>
        <a href="/assessments" className="text-blue-500 hover:underline">Assessments</a>
        <span className="text-gray-500">Add in Shared With later</span>
      </div>

      {/* Appointments */}
      <div className="mt-8">
        {/* Input fields and display for appointments */}
      </div>
    </div>
  );
};

export default ProfilePage; // Correct export statement
