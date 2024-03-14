import React from "react";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import InputBox from "../components/InputBox";


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
            const response = await fetch('/api/child', {
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
    <div className="flex flex-no wrap container max-width: 1024">
        
        <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-3 justify-center">
            <div>
                <label></label>
                    <InputBox 
                    handleChange={handleChange}
                    value={child.firstname}
                    name="firstname"
                    type="text"
                    placeholder="First Name"/>
                      
            </div>
            <div>
                <label></label>
                    <InputBox
                    handleChange={handleChange}
                    value={child.lastname}
                    name="lastname"
                    type="text"
                    placeholder="Last Name">
                    </InputBox>
            </div>
            <div>
                <label></label>
                    <InputBox
                    handleChange={handleChange}
                    value={child.dateofbirth}
                    name="dateobirth"
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
                    type="text"
                    placeholder="specialists">
                    </InputBox>
            </div>
            <div>
                <label></label>
                    <InputBox
                    onChange={handleChange}
                    value={child.aids}
                    name="aids"
                    type="text"
                    placeholder="aids">
                    </InputBox>
            </div>
            </div>
            <div>
                <label></label>
                    <textarea
                    onChange={handleChange}
                    value={child.school_support}
                    name="school_support"
                    type="text"
                    placeholder="Support Needed at School or Place of Education">
                    </textarea>
            </div>
            <div>
                <label></label>
                    <textarea
                    onChange={handleChange}
                    value={child.home_support}
                    name="home_support"
                    type="text"
                    placeholder="Support Needed at Home">
                    </textarea>
            </div>
        </form>

    </div>
)
    
}