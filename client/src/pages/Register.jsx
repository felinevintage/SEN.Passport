import { useState } from "react";
import { useForm } from "react-hook-form";
import ConfirmPassword from "../components/ConfirmPassword";

export default function Register() {
  const [newUser, setNewUser] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  return (
    <div>
      <div>
        <div>
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
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          ></input>
          <ConfirmPassword setNewUser={setNewUser} newUser={newUser} />

          {/* <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          ></input>
          <input placeholder="Confirm password" pattern=""></input> */}
        </div>
      </div>
    </div>
  );
}
