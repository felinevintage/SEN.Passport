import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
//import ConfirmPassword from "../components/ConfirmPassword";
import avatar1 from "../assets/Avatars/userAvatars/avatar1.jpg";
import avatar2 from "../assets/Avatars/userAvatars/avatar2.jpg";
import avatar3 from "../assets/Avatars/userAvatars/avatar3.jpg";
import avatar4 from "../assets/Avatars/userAvatars/avatar4.jpg";
import avatar5 from "../assets/Avatars/userAvatars/avatar5.jpg";
import avatar6 from "../assets/Avatars/userAvatars/avatar6.jpg";

export default function Register() {
  const [newUser, setNewUser] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    profileImage: "",
  });
  const [avatarOptions, setAvatarOptions] = useState([
    { path: avatar1, selected: false },
    { path: avatar2, selected: false },
    { path: avatar3, selected: false },
    { path: avatar4, selected: false },
    { path: avatar5, selected: false },
    { path: avatar6, selected: false },
  ]);

  const [registrationOk, setRegistrationOk] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  }

  function handleAvatarSelection(index) {
    const avatar = avatarOptions.map((avatar, i) => ({
      ...avatar,
      selected: i === index,
    }));
    setAvatarOptions(avatar);
    setNewUser({ ...newUser, profileImage: avatar[index].path });
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
        <div>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 justify-items-center bg-slate-300 p-8 rounded-md"
          >
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

            <div className="mb-4">
              <label htmlFor="profileImage" className="text-slate-600">
                Select Avatar:{" "}
              </label>
              <div className="flex flex-wrap items-center justify-center">
                {avatarOptions.map((avatar, index) => (
                  <div
                    key={index}
                    className={`relative w-12 h-12 rounded-full cursor-pointer mx-2 my-1 ${
                      avatar.selected ? "border-2 border-blue-500" : ""
                    }`}
                    onClick={() => handleAvatarSelection(index)}
                  >
                    <img
                      src={avatar.path}
                      alt={`Avatar ${index + 1}`}
                      className="w-full h-full rounded-full"
                    />
                    {avatar.selected && (
                      <div className="absolute inset-0 bg-blue-500 opacity-50 rounded-full" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Button text={"Register"} />
          </form>
        </div>
      )}
    </div>
  );
}
