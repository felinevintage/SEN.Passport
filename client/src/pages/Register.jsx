import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
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
    <div>
      {registrationOk ? (
        <div>
          <p>Your user has been registered.</p>
          Click <Link to="/login">here</Link> to login.
        </div>
      ) : (
        <div>
          <form onSubmit={handleSubmit}>
            <input
              name="username"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
            ></input>
            <input
              placeholder="First name"
              value={newUser.firstname}
              onChange={(e) =>
                setNewUser({ ...newUser, firstname: e.target.value })
              }
            ></input>
            <input
              placeholder="Last name"
              value={newUser.lastname}
              onChange={(e) =>
                setNewUser({ ...newUser, lastname: e.target.value })
              }
            ></input>
            <input
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            ></input>
            {/* <ConfirmPassword setNewUser={setNewUser} newUser={newUser} /> */}

            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            ></input>
            {/*<input placeholder="Confirm password" pattern=""></input> */}
            <button>Register</button>
          </form>
        </div>
      )}
    </div>
  );
}
