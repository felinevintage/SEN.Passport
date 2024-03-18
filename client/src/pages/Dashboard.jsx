import { useNavigate, Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Button from "../components/Button";

export default function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [children, setChildren] = useState([]);
  const { id } = useParams();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deleteChildId, setDeleteChildId] = useState(null);

  useEffect(() => {
    getUser();
    getChild();
  }, [id]);

  async function getUser() {
    try {
      const response = await fetch(`/api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
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
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const childData = await response.json();
        console.log(childData);
        setChildren(childData);
      } else {
        console.log("Failed to get children");
      }
    } catch (err) {
      console.error(err);
    }
  }


  async function deleteChild(id) {
    try {
      const response = await fetch(`/api/users/children/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {

        console.log("Child deleted!");
        // Refresh children after deletion
        getChild();

      } else {
        console.log("Error deleting child");
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleAddChildClick = () => {
    navigate("/addchild");
  };

  const handleDeleteConfirmation = (id) => {
    setShowConfirmation(true);
    setDeleteChildId(id);
  };

  const confirmDelete = () => {
    deleteChild(deleteChildId);
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
    setDeleteChildId(null);
  };

  return (
<div className="flex flex-col h-screen justify-center items-center">
  <div className="bg-violet-300 text-gar-700 font-bold text-2xl px-6 py-3 rounded mb-6">
    {user.username}
  </div>
  <div className="flex justify-center items-center mb-10">
    <div className="mr-6">
      <img
        src="placeholder_profile_picture_url"
        alt="User Avatar"
        className="w-32 h-32 rounded-full"
      />
    </div>
    <div className="bg-cyan-400 p-6 rounded-lg">
      <h1 className="text-xl font-bold">
        {user.firstname} {user.lastname}
      </h1>
      <div className="text-gray-700 text-lg">{user.email}</div>
    </div>
  </div>
  <div className="text-center mb-10">
  <div className="flex items-center justify-center">
    <div className="flex items-center grid grid-cols-3 gap-4 mt-4">
      {children.map((child) => (
        <div key={child.id} className="bg-violet-400/75 p-6 rounded-lg">
          <Link
            to={`/children/${child.id}`}
            className="font-bold text-black hover:underline block text-lg"
          >
            {child.firstname} {child.lastname}
          </Link>
          <div className="flex justify-center">
        <img
          src={child.profileImage}
          alt={`Avatar`}
          className="w-20 h-20 rounded-full mb-3"
        />
      </div>
          <button
            onClick={() => handleDeleteConfirmation(child.id)}
            className="text-red-500 hover:text-red-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  </div>
</div>




  <Button
    text={"Add a Child"}
    onClick={handleAddChildClick}
  ></Button>
  {showConfirmation && (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg">
        <p className="mb-4 text-lg">Are you sure you want to delete this child?</p>
        <div className="flex justify-end">
          <Button text="Cancel" onClick={cancelDelete} className="mr-4" />
          <Button text="Delete" onClick={confirmDelete} variant="danger" />
        </div>
      </div>
    </div>
  )}
</div>

  )
}





