import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";

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
  const { isLoggedIn, signIn, signOut } = useAuth();
  let location = useLocation();

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
      signIn();
      if (location.state) {
        let newLocation = location.state.from.pathname;
        navigate(`${newLocation}`);
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setErrors(error.response.data.message);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    signOut();
  }

  function goToRegister() {
    navigate("/register");
  }

  return (
    <div className="container p-4 flex justify-center items-center h-screen ">
      <div className="grid grid-cols-1 bg-slate-300 p-8 rounded-md">
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
        <Button text={"Login"} onClick={login} />
        {/* <button onClick={login}>Login</button> */}
        <div className="text-center text-red-500 m-2">
          {errors ? errors : null}
        </div>
        <div className="text-center text-slate-500">
          <p>Are you a new user?</p>
          <Button text={"Register"} onClick={goToRegister} />
        </div>
      </div>
    </div>
  );
}
