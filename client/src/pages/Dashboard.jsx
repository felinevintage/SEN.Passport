import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const navigate = useNavigate();

    const handleAddChildClick = () => {
        navigate("/addchild");
    };

    return (
        <div className="flex flex-col h-screen justify-center items-center">
            <p className="text-3xl font-bold mt-4">Add a Child</p>
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={handleAddChildClick}>Add Child</button>
        </div>
    );
}