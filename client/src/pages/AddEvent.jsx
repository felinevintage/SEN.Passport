import { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import InputBox from "../components/InputBox";
import calendar from "../assets/SENcalendar.png";
import BackButton from "../components/BackButton";

const initial = {
    event_type: "",
    date: "",
    time: "",
    location: ""
}


export default function AddEvent () {
    const navigate = useNavigate();
    const [event, setEvent] = useState({...initial})
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
                navigate(`/children/${id}/allevents`);
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
             <BackButton onClick={() => navigate(`/children/${id}/allevents`)} />
            <div className="flex flex-col h-full justify-center items-center">
           
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