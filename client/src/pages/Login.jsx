import { useState } from "react";
import axios from "axios";

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
export default function Login() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  async function login() {
    try {
      const { data } = await axios.post("/api/auth/login", credentials);
      localStorage.setItem("token", data.token);
    } catch (error) {
      console.log(error.response.data.message);
    }
  }
  return (
    <div>
      <input
        placeholder="username"
        value={credentials.username}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
      ></input>
      <input
        placeholder="password"
        type="password"
        value={credentials.password}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
      ></input>
      <button onClick={login}>Login</button>
    </div>
  );
}
