import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, Link } from "react-router-dom";

const ProfilePage = () => {
  const [child, setChild] = useState({
    firstname: "", 
      lastname: "", 
      diagnoses: "",
      school_support: "", 
      home_support: "", 
      specialists: "",
      medication: "", 
      education: "", 
      aids: "", 
      dateofbirth: "",
      emergency_contact: "",
      profileImage: ""

});
  const [appointments, setAppointments] = useState([]);
  const [appointmentName, setAppointmentName] = useState("");
  const [appointmentDate, setAppointmentDate] = useState(null);
  const [appointmentTime, setAppointmentTime] = useState("");

  const { id } = useParams();
  useEffect(() => {

    getChildInfo();
  }, [id]);

  async function getChildInfo() {
    try {
      const response = await fetch(`/api/children/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const childData = await response.json();
        console.log(childData);
        setChild(childData);
      } else {
        console.log("Failed to get child");
      }
    } catch (err) {
      console.error(err);
    }
  }



  const addAppointment = () => {
    if (appointmentName && appointmentDate && appointmentTime) {
      const newAppointment = {
        name: appointmentName,
        date: appointmentDate.toLocaleDateString(),
        time: appointmentTime,
      };
      setAppointments([...appointments, newAppointment]);
      setAppointmentName("");
      setAppointmentDate(null);
      setAppointmentTime("");
    }
  };

    const renderChildInfo = () => {
      if (!child) return null;
      return (
        <div className="container mx-auto rounded-md py-8">
 
          <div className="flex items-start">
            <div className="w-2/4">
              <img
                src={child.profileImage}
                alt="Profile"
                className="bg-white rounded-full w-80 h-80 border-4 border-purple-400 m-6"
              />
            </div>
            <div className="w-3/4 px-4">
              <div className="mb-4">
                <h3>First Name</h3>
                <p className="bg-white w-full border border-gray-400 rounded p-2">
                  {child.firstname}
                </p>
              </div>
              <div className="mb-4">
                <h3>Last Name</h3>
                <p className="bg-white w-full border border-gray-400 rounded p-2">
                  {child.lastname}
                </p>
              </div>
              <div className="mb-4">
                <h3>Date of Birth</h3>
                <p className="bg-white w-full border border-gray-400 rounded p-2">
                  {child.dateofbirth}
                </p>
              </div>
              <div className="mb-4">
                <h3>Diagnoses</h3>
                <p className="bg-white w-full border border-gray-400 rounded p-2">
                  {child.diagnoses}
                </p>
              </div>
              <div className="mb-4">
                <h3>Emergency Contact Name</h3>
                <p className="bg-white w-full border border-gray-400 rounded p-4">
                  {child.emergency_contact_name}
                </p>
              </div>
              <div className="mb-4">
                <h3>Emergency Contact Number</h3>
                <p className="bg-white w-full border border-gray-400 rounded p-2">
                  {child.emergency_contact}
                </p>
              </div>
            </div>
          </div>
          {/* Medical Info */}
          <div className="mb-4">
              <h3>Education</h3>
              <p className="bg-white w-full border border-gray-400 rounded p-2">
                {child.education}
              </p>
          </div>
  
          <div className="mt-8">
            <div className="mb-4">
              <h3>Medication</h3>
              <p className="bg-white w-full border border-gray-400 rounded p-2">
                {child.medication}
              </p>
            </div>
            <div className="mb-4">
              <h3>Medical Aids</h3>
              <p className="bg-white w-full border border-gray-400 rounded p-2">
                {child.aids}
              </p>
            </div>
            <div className="mb-4">
              <h3>Specialists</h3>
              <p className="bg-white w-full border border-gray-400 rounded p-2">
                {child.specialists}
              </p>
            </div>
            <div className="mb-4">
              <h3>Home Support</h3>
              <p className="bg-white w-full border border-gray-400 rounded p-2">
                {child.home_support}
              </p>
            </div>
            <div className="mb-4">
              <h3>School Support</h3>
              <p className="bg-white w-full border border-gray-400 rounded p-2">
                {child.school_support}
              </p>
            </div>
          </div>
        </div>
      );
    }
  
    return (
      <div className="container mx-auto py-8">
        {renderChildInfo()}
        
    {/* Links */}
<div className="mt-8 flex justify-between">
  <button
    onClick={() => history.push(`/children/${id}/documents`)}
    className="bg-purple-500 hover:bg-purple-700 text-white font-bold m-2 py-4 px-4 rounded w-40 mx-auto block"
    
  >
    Documents
  </button>
  <button
    onClick={() => history.push(`/children/${id}/assessments`)}
    className="bg-purple-500 hover:bg-purple-700 text-white font-bold m-2 py-4 px-4 rounded w-40 mx-auto block"
    
  >
    Assessments
  </button>
  <span className="text-gray-500">Shared with (to be coded) </span>
</div>
<br />

      <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
      {/* Appointments List */}
      <div className="mt-4">
        <ul className="w-full bg-gray-400 text-white rounded p-2">
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
          <input
            type="text"
            placeholder="Appointment Name"
            value={appointmentName}
            onChange={(e) => setAppointmentName(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
          />
        </div>
        <div className="flex mb-4">
          <DatePicker
            selected={appointmentDate}
            onChange={(date) => setAppointmentDate(date)}
            placeholderText="Date"
            className="w-1/2 mr-2 border border-gray-300 rounded p-2"
          />
          <input
            type="text"
            placeholder="Time"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            className="w-1/2 ml-2 border border-gray-300 rounded p-2"
          />
        </div>
        <br>
        </br>

        <Link to={`/child/${id}/addevent`} className="bg-purple-500 text-gar-700 font-bold text-white text-1xl px-6 py-3 rounded hover:bg-purple-700 mb-4">
          Add Event
        </Link>
<br></br>
      </div>
    </div>
  );
};

export default ProfilePage;