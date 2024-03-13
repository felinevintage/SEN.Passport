import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import InputBox from "../components/InputBox";

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
  const [errors, setErrors] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  }

  async function login() {
    try {
      const { data } = await axios.post("/api/auth/login", credentials);
      localStorage.setItem("token", data.token);
      setErrors("");
      navigate("/dashboard");
    } catch (error) {
      setErrors(error.response.data.message);
    }
  }

  function logout() {
    localStorage.removeItem("token");
  }

  return (
    <div>
      <InputBox
        name="username"
        placeholder="Username"
        value={credentials.username}
        handleChange={handleChange}
      />
      <InputBox
        name="password"
        placeholder="Password"
        type="password"
        value={credentials.password}
        handleChange={handleChange}
      />
      <button onClick={login}>Login</button>
      <div>{errors ? errors : null}</div>
    </div>
  );
}
