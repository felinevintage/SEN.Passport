import { useNavigate } from "react-router-dom";
import { useState } from "react";
import InputBox from "./InputBox";
import Button from "./Button";

export default function AddUserForm() {
  const [network, setNetwork] = useState({
    username: "",
    relationship: "",
  });
  const navigate = useNavigate();

  //   function handleChange() {
  //     setNet
  //   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${id}/addUsers`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          username,
        }),
      });

      if (response.ok) {
        console.log("Users added successfully");
        navigate(`/children/${id}`);
      } else {
        console.error("Failed to add users");
      }
    } catch (error) {
      console.error("Error adding users:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white rounded-lg shadow-md mt-2 p-6">
        <h1 className="font-bold text-xl mb-4">Increase your Network!</h1>
        <form onSubmit={handleSubmit}>
          <InputBox
            name="username"
            placeholder="Username"
            value={network.username}
            handleChange={() =>
              setNetwork({ ...network, username: e.target.value })
            }
          />
          <InputBox
            name="relationship"
            placeholder="Relationship with the child"
          />
          {/* <div className="space-y-2">
            {users.map((user) => (
              <div key={user.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={user.id}
                  checked={username.includes(user.id)}
                  onChange={() => handleCheckboxChange(user.id)}
                  className="mr-2"
                />
                <label htmlFor={user.id} className="text-base">
                  {user.username}
                </label>
              </div>
            ))}
          </div> */}
          <Button text="Add User" />
        </form>
      </div>
    </div>
  );
}
