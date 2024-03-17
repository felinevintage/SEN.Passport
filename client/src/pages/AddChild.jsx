import React from "react";
import {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import blueAvatar from "../assets/Avatars/blue.jpg";
import blue2Avatar from "../assets/Avatars/blue2.jpg";
import pinkAvatar from "../assets/Avatars/pink.jpg";
import purpleAvatar from "../assets/Avatars/purple.jpg";
import yellowAvatar from "../assets/Avatars/yellow.jpg";
import yellow2Avatar from "../assets/Avatars/yellow2.jpg";


const initial = {
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

}

// const avatarOptions = [
//     { path: blueAvatar, selected: false },
//     { path: blue2Avatar, selected: false },
//     { path: pinkAvatar, selected: false },
//     { path: purpleAvatar, selected: false },
//     { path: yellowAvatar, selected: false },
//     { path: yellow2Avatar, selected: false }
//   ];

export default function AddChild () {
    const navigate = useNavigate();
    const [child, setChild] = useState({...initial});
    const [avatarOptions, setAvatarOptions] = useState([
        { path: blueAvatar, selected: false },
        { path: blue2Avatar, selected: false },
        { path: pinkAvatar, selected: false },
        { path: purpleAvatar, selected: false },
        { path: yellowAvatar, selected: false },
        { path: yellow2Avatar, selected: false }
      ]);


    async function handleSubmit(e) {
        e.preventDefault();
    
        try {
            const response = await fetch('/api/children', {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({...child }),
            });
            
            if (response.ok) {
                setChild({...initial});
                navigate("/dashboard"); 
            } else {
                console.log("Child not created");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setChild((input) => ({
          ...input,
          [e.target.name]: e.target.value,
        }));
      };

      const handleAvatarSelection = (index) => {
        const updatedAvatars = avatarOptions.map((avatar, i) => ({
          ...avatar,
          selected: i === index
        }));
        setAvatarOptions(updatedAvatars); // Update the avatarOptions state
        setChild((prevChild) => ({
          ...prevChild,
          profileImage: avatarOptions[index].path // Update the profileImage in the child state
        }));
      };
    

return (
    <div>
    <div className="flex flex-col h-full mt-4 justify-center items-center">
    <Link to="/dashboard" className="bg-violet-300 text-gar-700 font-bold text-1xl px-6 py-3 rounded hover:bg-purple-700 mb-4">
          Back to Dashboard
        </Link>
        <div className="font-medium p-4 text-lg">Add a Child</div>
        
        <form className= "mb-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3">
            <div>
                <label></label>
                    <InputBox 
                    handleChange={handleChange}
                    value={child.firstname}
                    name="firstname"
                    id="firstname"
                    type="text"
                    placeholder="First Name"/>
                      
            </div>
            <div>
                <label></label>
                    <InputBox
                    handleChange={handleChange}
                    value={child.lastname}
                    name="lastname"
                    id="lastname"
                    type="text"
                    placeholder="Last Name">
                    </InputBox>
            </div>
            <div>
                <label></label>
                    <InputBox
                    handleChange={handleChange}
                    value={child.dateofbirth}
                    name="dateofbirth"
                    id="dateofbirth"
                    type="date"
                    placeholder="Date of Birth">
                    </InputBox>
            </div>
            <div>
                <label></label>
                    <InputBox
                    handleChange={handleChange}
                    value={child.medication}
                    name="medication"
                    id="medication"
                    type="text"
                    placeholder="Medication">
                    </InputBox>
            </div>
             <div>
                <label></label>
                    <InputBox
                    handleChange={handleChange}
                    value={child.aids}
                    name="aids"
                    id="aids"
                    type="text"
                    placeholder="Aids">
                    </InputBox>
            </div>
            <div>
                <label></label>
                    <InputBox
                    handleChange={handleChange}
                    value={child.education}
                    name="education"
                    id="education"
                    type="text"
                    placeholder="School/College/Uni">
                    </InputBox>
            </div>
            <div>
                <label></label>
                    <InputBox
                    handleChange={handleChange}
                    value={child.emergency_contact}
                    name="emergency_contact"
                    id="emergency_contact"
                    type="text"
                    placeholder="Emergency Contact Number">
                    </InputBox>
            </div>
            <div>
                <label></label>
                    <InputBox
                    handleChange={handleChange}
                    value={child.diagnoses}
                    name="diagnoses"
                    id="diagnoses"
                    type="text"
                    placeholder="Diagnoses">
                    </InputBox>
            </div>
            <div>
                <label></label>
                    <InputBox
                    handleChange={handleChange}
                    value={child.specialists}
                    name="specialists"
                    id="specialists"
                    type="text"
                    placeholder="Specialists">
                    </InputBox>
            </div>
            </div>
            <div className="container p-4 flex justify-center items-center">
                
                <label></label>
                    <textarea className="w-96 h-32 rounded-md border-2 border-slate-300 hover:border-purple-300 m-2 p-2"
                    onChange={handleChange}
                    value={child.school_support}
                    name="school_support"
                    type="text"
                    placeholder="Support Needed at School or Place of Education">
                    </textarea>
                    </div>
            
            <div className="container p-4 flex justify-center items-center">
                <label></label>
                    <textarea className="w-96 h-32 rounded-md border-2 border-slate-300 hover:border-purple-300 m-2 p-2"
                    onChange={handleChange}
                    value={child.home_support}
                    name="home_support"
                    type="text"
                    placeholder="Support Needed at Home">
                    </textarea>
            </div>

            <div className="mb-4">
          <label htmlFor="profileImage">Select Avatar:</label>
          <div className="flex flex-wrap items-center justify-center">
            {avatarOptions.map((avatar, index) => (
              <div
                key={index}
                className={`relative w-12 h-12 rounded-full cursor-pointer mx-2 my-1 ${
                  avatar.selected ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => handleAvatarSelection(index)}
              >
                <img
                  src={avatar.path}
                  alt={`Avatar ${index + 1}`}
                  className="w-full h-full rounded-full"
                />
                {avatar.selected && (
                  <div className="absolute inset-0 bg-blue-500 opacity-50 rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>
            <Button className="mb-6" text={"Submit Form"} onSubmit="handleSubmit"></Button>
        
    
            
        </form>

    </div>
    </div>
)
    
}