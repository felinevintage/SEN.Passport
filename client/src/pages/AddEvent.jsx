import { useEffect, useState } from "react";
import { useNavigate, Link, useParams, useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import calendar from "../assets/SENcalendar.png";

const initial = {
    event_type: "",
    date: "",
    time: "",
    location: ""
}


export default function AddEvent () {
    const navigate = useNavigate();
    const [event, setEvent] = useState({...initial})
    // const [searchParams, setSearchParams] = useSearchParams();
    const {id} = useParams();


    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch (`/api/events/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({...event }),
            });
            if (response.ok) {
                setEvent({...initial});
                navigate("/events");
            } else {
                console.log("Event not created");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setEvent((input) => ({
            ...input,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <div>
            <div className="flex flex-col h-full mt-4 justify-center items-center">
            <Link to={`/child/${id}`} className="bg-violet-300 text-gar-700 font-bold text-md px-4 py-2 rounded hover:bg-purple-700 mb-4">
          Back to Child Profile
        </Link>
        <img style={{ width: "50%" }} src={calendar}>
        </img>
        
            <div>
                <form className= "mb-6" onSubmit={handleSubmit}>
                    <div className="gap-3">
                        <InputBox
                        handleChange={handleChange}
                        value={event.event_type}
                        name="event_type"
                        id="event_type"
                        type="text"
                        placeholder="Event Type">
                        </InputBox>
                    </div>
                    <div>
                        <InputBox
                        handleChange={handleChange}
                        value={event.date}
                        name="date"
                        id="date"
                        type="date"
                        placeholder="Event Date">
                        </InputBox>
                    </div>
                    <div>
                        <InputBox
                        handleChange={handleChange}
                        value={event.time}
                        name="time"
                        id="time"
                        type="time"
                        placeholder="Event Time">
                        </InputBox>
                    </div>
                    <div>
                        <InputBox
                        handleChange={handleChange}
                        value={event.location}
                        name="location"
                        id="location"
                        type="text"
                        placeholder="Event Location">
                        </InputBox>
                    </div>
                    <Button className="mb-6" text={"Add Event"} onSubmit="handleSubmit"></Button>
                </form>
            </div>
            </div>
        </div>
    )
    
}