import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ProfilePage = () => {
  const [appointments, setAppointments] = useState([]);
  const [appointmentName, setAppointmentName] = useState('');
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState('');

  const addAppointment = () => {
    if (appointmentName && appointmentDate && appointmentTime) {
      const newAppointment = {
        name: appointmentName,
        date: appointmentDate.toLocaleDateString(),
        time: appointmentTime
      };
      setAppointments([...appointments, newAppointment]);
      setAppointmentName('');
      setAppointmentDate(null);
      setAppointmentTime('');
    }
  };

  return (
    <div className="container mx-auto py-8">
    {/* Profile Info */}
    <div className="flex items-start">
      <div className="w-2/4">
        <img src="https://www.shutterstock.com/image-photo/five-year-kid-passport-photo-600nw-139484435.jpg" alt="Profile" className="rounded-full w-60 h-60 border-4 border-pink-400" />
      </div>
      <div className="w-3/4 px-4">
        <div className="mb-4">
          <input type="text" placeholder="First Name" className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="mb-4">
          <input type="text" placeholder="Last Name" className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="mb-4">
          <input type="text" placeholder="Date of Birth" className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="mb-4">
          <input type="text" placeholder="Diagnoses" className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="mb-4">
          <input type="text" placeholder="Emergency Contact Name" className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="mb-4">
          <input type="text" placeholder="Emergency Contact Number" className="w-full border border-gray-300 rounded p-2" />
        </div>
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
        <a href="/documents" className="text-pink-500 text-lg font-bold hover:underline">  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-2">
    <path fillRule="evenodd" d="M2 4.95C2 3.697 3.07 3 4.25 3H9v3h6V3h4.75C17.433 3 18 3.567 18 4.25v12.5c0 .683-.567 1.25-1.25 1.25H4.25C3.567 18 3 17.433 3 16.75V4.95zM11 5H9V4h2v1zM4 5h1v1H4V5zm11 11H5V6h10v10zm-4-5h3v1h-3V11z" clipRule="evenodd" />
  </svg> Documents</a>
        <a href="/assessments" className="text-pink-500 text-lg font-bold hover:underline"> 
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 mr-2">
    <path fillRule="evenodd" d="M17.293 5.293a1 1 0 0 1 1.414 1.414l-10 10a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 1.414-1.414L7 14.086l9.293-9.293a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
  </svg> Assessments</a>
        <span className="text-gray-500">Shared with (to be coded) </span>
      </div>
      <br></br>

        <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
          {/* Appointments List */}
          <div className="mt-4">
            <ul className="w-full bg-gray-500 text-white rounded p-2">
              <li className="flex justify-between font-semibold mb-2">
                <span className="w-1/3">Appointment Name</span>
                <span className="w-1/3">Date</span>
                <span className="w-1/3">Time</span>
              </li>
              {appointments.map((appointment, index) => (
                <li key={index} className="flex justify-between">
                  <span className="w-1/3">📅{appointment.name}</span>
                  <span className="w-1/3">{appointment.date}</span>
                  <span className="w-1/3">{appointment.time}</span>
                </li>
          ))}
          </ul>
          <br></br>
          </div>
          <br></br>
          <h2 className="text-lg font-semibold mb-4">Add a new appointment</h2>
            {/* Appointments */}
       <div className="mt-4">
        <div className="mb-4">
          <input type="text" placeholder="Appointment Name" value={appointmentName} onChange={(e) => setAppointmentName(e.target.value)} className="w-full border border-gray-300 rounded p-2" />
        </div>
        <div className="flex mb-4">
          < DatePicker
      selected={appointmentDate} onChange={(date) => setAppointmentDate(date)} placeholderText="Date" className="w-1/2 mr-2 border border-gray-300 rounded p-2" />
          <input type="text" placeholder="Time" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} className="w-1/2 ml-2 border border-gray-300 rounded p-2" />
        </div>
        <button onClick={addAppointment} className="bg-pink-300 text-white px-4 py-2 rounded hover:bg-pink-500">Add Appointment </button>
        <div className="mt-8">
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; // Correct export statement
