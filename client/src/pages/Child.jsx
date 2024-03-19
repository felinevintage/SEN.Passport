import React, { useState, useEffect } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useParams, Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [relationship, setRelationship] = useState("");
  const [events, setEvents] = useState([]);
  const [userIds, setUserIds] = useState("");
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
    profileImage: "",
  });

  const { id } = useParams();

  useEffect(() => {
    getEvents();
    getUsers();
    getChildInfo();
  }, []);

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
        // console.log(childData);
        setChild(childData);
      } else {
        console.log("Failed to get child");
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function getEvents() {
    try {
      const response = await fetch(`/api/events/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.log("Failed to get events");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getUsers = async () => {
    try {
      const response = await fetch("/api/users/all");
      const data = await response.json();
      // console.log("Users data:", data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleCheckboxChange = (userId) => {
    setUserIds(userId);
    // setUserIds((prevUserIds) =>
    //   prevUserIds.includes(userId)
    //     ? prevUserIds.filter((id) => id !== userId)
    //     : [...prevUserIds, userId]
    // );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/users/${id}/addUsers`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userIds,
          relationship,
        }),
      });

      if (response.ok) {
        console.log("Users added successfully");
        navigate(`/children/${id}`);
      } else {
        console.error("Failed to add users");
      }
    } catch (error) {
      console.error("Error adding users:", error);
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
  };

  return (
    <div className="container mx-auto py-8">
      {renderChildInfo()}

      {/* Links */}
      <div className="mt-8 flex justify-between">
        <Link
          to={`/children/${id}/assessments`}
          className="text-pink-500 text-lg font-bold hover:underline"
        >
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              fillRule="evenodd"
              d="M2 4.95C2 3.697 3.07 3 4.25 3H9v3h6V3h4.75C17.433 3 18 3.567 18 4.25v12.5c0 .683-.567 1.25-1.25 1.25H4.25C3.567 18 3 17.433 3 16.75V4.95zM11 5H9V4h2v1zM4 5h1v1H4V5zm11 11H5V6h10v10zm-4-5h3v1h-3V11z"
              clipRule="evenodd"
            />
          </svg>{" "}
          Assessments
        </Link>
        <div>
          <Link
            to={`/children/${id}/Documents`}
            className="text-pink-500 text-lg font-bold hover:underline"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M2 4.95C2 3.697 3.07 3 4.25 3H9v3h6V3h4.75C17.433 3 18 3.567 18 4.25v12.5c0 .683-.567 1.25-1.25 1.25H4.25C3.567 18 3 17.433 3 16.75V4.95zM11 5H9V4h2v1zM4 5h1v1H4V5zm11 11H5V6h10v10zm-4-5h3v1h-3V11z"
                clipRule="evenodd"
              />
            </svg>{" "}
            Documents
          </Link>
        </div>
        <div>
          <Link
            to={`/children/${id}/allevents`}
            className="text-pink-500 text-lg font-bold hover:underline"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                fillRule="evenodd"
                d="M2 4.95C2 3.697 3.07 3 4.25 3H9v3h6V3h4.75C17.433 3 18 3.567 18 4.25v12.5c0 .683-.567 1.25-1.25 1.25H4.25C3.567 18 3 17.433 3 16.75V4.95zM11 5H9V4h2v1zM4 5h1v1H4V5zm11 11H5V6h10v10zm-4-5h3v1h-3V11z"
                clipRule="evenodd"
              />
            </svg>{" "}
            Events
          </Link>
        </div>
      </div>

      <br />

      {/* <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
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
    </div> */}
      <br></br>

      <div>
        <h1>Add Users to Child</h1>
        <form onSubmit={handleSubmit}>
          <div>
            {users.map((user) => (
              <div key={user.id}>
                <input
                  type="checkbox"
                  id={user.id}
                  // checked={userIds.includes(user.id)}
                  onChange={() => setUserIds(user.id)}
                />
                <label htmlFor={user.id}>{user.username}</label>
              </div>
            ))}
          </div>
          <div>
            <label>
              Relationship:
              <input
                type="text"
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
              />
            </label>
          </div>
          <button type="submit">Add Users</button>
        </form>
      </div>

      <div className="mt-8"></div>
    </div>
  );
};

export default ProfilePage;
