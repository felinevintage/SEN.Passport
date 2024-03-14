import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import InputBox from "../components/InputBox";
//import ConfirmPassword from "../components/ConfirmPassword";

export default function Register() {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
  });
  const [registrationOk, setRegistrationOk] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/register", newUser);
      console.log(response);

      if (response.status === 200) {
        setNewUser({
          username: "",
          password: "",
          firstname: "",
          lastname: "",
          email: "",
        });
        setRegistrationOk(true);
      } else {
        console.log("Failed to register");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container p-4 flex justify-center items-center h-screen">
      {registrationOk ? (
        <div className="max-w-100 text-center text-2xl">
          <p>Your user has been registered.</p>
          <p>
            Click{" "}
            <Link to="/login" className="text-purple-500">
              here
            </Link>{" "}
            to login.
          </p>
        </div>
      ) : (
        <div className="max-w-80">
          <form onSubmit={handleSubmit} className="grid grid-cols-1">
            <InputBox
              name="username"
              placeholder="Username"
              value={newUser.username}
              handleChange={handleChange}
            />
            <InputBox
              name="firstname"
              placeholder="First name"
              value={newUser.firstname}
              handleChange={handleChange}
            />
            <InputBox
              name="lastname"
              placeholder="Last name"
              value={newUser.lastname}
              handleChange={handleChange}
            />
            <InputBox
              name="email"
              placeholder="Email"
              value={newUser.email}
              handleChange={handleChange}
            />
            {/* <ConfirmPassword setNewUser={setNewUser} newUser={newUser} /> */}
            <InputBox
              name="password"
              type="password"
              placeholder="Password"
              value={newUser.password}
              handleChange={handleChange}
            />
            {/*<input placeholder="Confirm password" pattern=""></input> */}
            <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold m-2 py-2 px-4 rounded w-40 mx-auto block">
              Register
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
