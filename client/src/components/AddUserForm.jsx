import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AddUserForm({ users }) {
  const [username, setUsername] = useState([]);
  const navigate = useNavigate();

  const handleCheckboxChange = (userId) => {
    setUserId((prevUserIds) =>
      prevUserIds.includes(userId)
        ? prevUserIds.filter((id) => id !== userId)
        : [...prevUserIds, userId]
    );
  };

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
          userId,
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
        <h1 className="font-bold text-xl mb-4">Add Users to Child</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
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
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 mt-4 rounded-md hover:bg-blue-600"
          >
            Add Users
          </button>
        </form>
      </div>
    </div>
  );
}
