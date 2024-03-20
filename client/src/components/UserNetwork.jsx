import { useParams } from "react-router-dom";
import { useState } from "react";
import InputBox from "./InputBox";
import Button from "./Button";
import axios from "axios";

export default function AddUserForm() {
  const [network, setNetwork] = useState({
    username: "",
    relationship: "",
  });
  //const navigate = useNavigate();
  const [errors, setErrors] = useState("");
  const { id } = useParams();
  const [userRelationshipOk, setUserRelationshipOk] = useState(false);

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
      //getUsers();
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
      <div className="flex flex-col items-center justify-center h-screen">
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
