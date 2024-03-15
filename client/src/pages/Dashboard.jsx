import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

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
            <div>
               <h1 className="text-3xl font-bold mt-4">{user.username}</h1>
               <h1 className="text-3xl font-bold mt-4">{user.firstname}</h1>
               <h1 className="text-3xl font-bold mt-4">{user.lastname}</h1>
               <h1 className="text-3xl font-bold mt-4">{user.email}</h1> 
            </div>
            <div>
              <ul>
                {Object.keys(children).map((childId) => (
                  <li key={childId}>
                    <Link to={`/child/${childId}`}>{children[childId].firstname} {children[childId].lastname}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-3xl font-bold mt-4">Add a Child</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleAddChildClick}>Add Child</button>
        </div>
    );
}