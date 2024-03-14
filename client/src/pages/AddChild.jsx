import React from "react";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";


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
    <div>
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name</label>
                    <input 
                    onChange={handleChange}
                    value={child.diagnoses}
                    name="firstname"
                    type="text"
                    placeholder="First Name"/>
                      
            </div>
            <div>
                <label>Last Name</label>
                    <input
                    onChange={handleChange}
                    value={child.lastname}
                    name="lastname"
                    type="text"
                    placeholder="Last Name">
                    </input>
            </div>
            <div>
                <label>Diagnoses</label>
                    <input 
                    onChange={handleChange}
                    value={child.diagnoses}
                    name="diagnoses"
                    type="text"
                    placeholder="Diagnoses">
                    </input>
            </div>
            <div>
                <label>School Support</label>
                    <input 
                    onChange={handleChange}
                    value={child.school_support}
                    name="school_support"
                    type="text"
                    placeholder="School Support Needs">
                    </input>
            </div>
        </form>

    </div>
)
    
}