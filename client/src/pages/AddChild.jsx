import React from "react";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import InputBox from "../components/InputBox";
import Button from "../components/Button";


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
      emergency_contact: ""

}

export default function AddChild () {
    const navigate = useNavigate();
    const [child, setChild] = useState({...initial});


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
    

return (
    <div className="flex flex-col h-screen mt-4 justify-center items-center">
        <p className="font-medium p-4 text-lg">Add a Child</p>
        
        <form onSubmit={handleSubmit}>
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
            <Button text={"Submit Form"} onSubmit="handleSubmit"></Button>
        
    
            
        </form>

    </div>
)
    
}