import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import calendar from "../assets/SENcalendarevents.png";
import Button from "../components/Button";
import BackButton from "../components/BackButton";

export default function AllEvents() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();
  const navigate = useNavigate();

  const {id} = useParams();

  useEffect(() => {
    getEvents();
  }, []);


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

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div>
      <BackButton onClick={() => navigate(`/children/${id}`)} />
        <div className="flex flex-col h-screen justify-center items-center">
          <div>
          
          <Link to={`/children/${id}/addevent`} className="bg-pink-300 text-gar-700 font-bold text-white text-1xl px-6 py-3 rounded hover:bg-purple-700 mb-4">
          Add Event
        </Link>
        </div>
        <img style={{ width: "50%" }} src={calendar}>
        </img>
      <ul>
        {events.map((event) => (
          <li className="bg-violet-300 text-purple-800 font-bold text-2xl px-6 py-3 rounded mb-6" key={event.id}>
            <button onClick={() => handleEventClick(event)}>
              {event.event_type}
            </button>
          </li>
        ))}
      </ul>
      {selectedEvent && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-cyan-200 p-24 rounded-lg">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
            
            <h2 className="text-2xl text-purple-800 font-bold mb-4">
              {selectedEvent.event_type}
            </h2>
            <p className="text-purple-700 text-xl mb-2">Date: {selectedEvent.date}</p>
            <p className="text-purple-700 text-xl mb-2">Time: {selectedEvent.time}</p>
            <p className="text-purple-700 text-xl mb-4">
              Location: {selectedEvent.location}
            </p>
            <div className="flex justify-end">
              <Button 
              text="Close"
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2" onClick={closeModal}>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}
