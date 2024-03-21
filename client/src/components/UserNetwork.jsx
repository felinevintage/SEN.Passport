import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import InputBox from "./InputBox";
import Button from "./Button";
import axios from "axios";

export default function AddUserForm() {
  const [network, setNetwork] = useState({
    username: "",
    relationship: "",
  });
  const [errors, setErrors] = useState("");
  const { id } = useParams();
  const [userRelationshipOk, setUserRelationshipOk] = useState(false);
  const [childUsers, setChildUsers] = useState([]);

  useEffect(() => {
    getChildUsers();
  }, []);

  async function getChildUsers() {
    try {
      const response = await fetch(`/api/children/${id}/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setChildUsers(userData);
      } else {
        console.log("Failed to get users");
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setNetwork({ ...network, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/users/${id}/addUsers`, network, {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      //console.log(response);
      getChildUsers();
      setUserRelationshipOk(true);
      setErrors("");
      setNetwork({
        username: "",
        relationship: "",
      });
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  return (
    <div>
      <div className="mt-10 mb-10 border-t border-purple-700">
        <h1 className="text-center text-purple-600 my-4 text-3xl">
          Your Network
        </h1>
      </div>
      <div className="grid grid-cols-6 gap-4 mt-4">
        {childUsers.map((childUser, i) => (
          <div key={i} className="bg-purple-50 border-0 rounded-lg">
            <div className="text-center">{childUser.username}</div>
            <div className="text-center">{childUser.Relationships.relationship}</div>
            <div className="flex justify-center">
              <img
                src={childUser.profileImage}
                alt={`Avatar`}
                className="w-20 h-20 rounded-full mb-3"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="bg-white rounded-lg shadow-md mt-2 p-6">
          <h1 className="font-bold text-xl text-purple-600 mb-4">
            Increase your Network!
          </h1>
          <form onSubmit={handleSubmit}>
            <InputBox
              name="username"
              placeholder="Username"
              value={network.username}
              handleChange={handleChange}
            />
            <InputBox
              name="relationship"
              placeholder="Relationship with the child"
              value={network.relationship}
              handleChange={handleChange}
            />
            <Button text="Add User" />
          </form>
          <div className="text-center text-red-600 text-lg font-bold">
            {errors ? errors : null}
          </div>
          {userRelationshipOk ? (
            <p className="text-center text-green-600 text-lg font-bold">
              User added successfully to your network
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
