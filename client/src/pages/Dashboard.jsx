import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Button";

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [children, setChildren] = useState({});

    useEffect(() => {
        getUser();
        getChild()
    }, []);


    async function getUser() {
        try {
            const response = await fetch(`/api/users`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${localStorage.getItem('token')}`,
              },
            });
        
            if (response.ok) {
              const userData = await response.json();
              setUser(userData);
            } else {
              console.log("Failed to get users");
            }
          } catch (err) {
            console.error(err);
          }
    }

    async function getChild() {
      try {
        const response = await fetch(`/api/users/children`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "authorization": `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.ok) {
          const childData = await response.json();
          setChildren(childData);
        } else {
          console.log("Failed to get children");
        }
      } catch (err) {
        console.error(err);
      }
    }

    const handleAddChildClick = () => {
        navigate("/addchild");
    };

    return (
      <div className="flex flex-col h-screen justify-center items-center">
      <div className="mb-8">
        <div className="flex items-center justify-end mb-4">
          <img
            src="placeholder_profile_picture_url"
            alt="User Avatar"
            className="w-24 h-24 bg-violet-400 rounded-full mr-4"
          />
          <div>
            <h1 className="text-3xl font-bold">{user.username}</h1>
            <h1 className="text-3xl font-bold">{user.firstname} {user.lastname}</h1>
            <h1 className="text-3xl font-bold">{user.email}</h1>
          </div>
        </div>
      </div>
    <div className="text-center mb-8">
      <div className="grid grid-cols-2 gap-4 mt-4">
        {Object.keys(children).map((childId) => (
          <div key={childId} className="bg-violet-400/75 p-4 rounded-lg">
            <img
              src={`avatar_url_for_${children[childId].firstname}_${children[childId].lastname}`}
              alt={`Avatar`}
              className="w-16 h-16 rounded-full mb-2 mx-auto"
            />
            <p className="font-bold">{children[childId].firstname} {children[childId].lastname}</p>
            <Link to={`/child/${childId}`} className="text-blue-500 hover:underline block">View Profile</Link>
          </div>
        ))}
      </div>
    </div>
    <Button text={"Add a Child"} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleAddChildClick}></Button>
  </div>
    )
}