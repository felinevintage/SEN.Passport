import React from "react";
import { Link } from 'react-router-dom';
import useAuth from "../hooks/useAuth"
import Button from "./Button";

export default function NavBar() {
    

  const { isLoggedIn, signIn, signOut } = useAuth();

  const logout = () => {
    localStorage.removeItem("token");
    signOut();
  }


  return (
    <nav className="bg-violet-300 py-2">
      <div className="container mx-auto flex justify-between items-center">
        <ul className="flex">
          {isLoggedIn && (
            <li className="nav-item">
              <Link to="/dashboard" className="text-white hover:text-gray-300 px-3 py-2">Dashboard</Link>
            </li>
          )}
          </ul>
        <div>
        {isLoggedIn && (
          <Button text={"Logout"} onClick={logout} className="items-end justify-end" />
        )}
       </div>
      </div>
    </nav>
  );
}     
