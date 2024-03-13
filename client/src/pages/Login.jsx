import React from "react";

// Any component that wants to ‘consume’ / be aware of authContext 
// just needs to import the useAuth 
// Example: import useAuth from “../hooks/useAuth”; at the top of the Login.jsx file. 
// Then, instantiate it by creating a variable 
// const {isLoggedIn} = useAuth().
// From there, you can then use isLoggedIn to show / hide pages, like this:
// {isLoggedIn ? (
// <div>
//    <div className= “alert”> You are logged in </div>
// </div>
// ) : (
// <div>
//    <div className= “alert”> You are logged out</div>
// What we’re saying in the above example is “Is logged in true? If so, show me X (div and whatever it contains). 
// Otherwise, show me Y (div and whatever it contains)”
// BBM
export default function Login () {
    
}