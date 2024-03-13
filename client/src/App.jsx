import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import NavBarMenu from "./components/NavBar";
import AddAssessment from "./pages/AddAssessment";
import AddChild from "./pages/AddChild";
import AddEvent from "./pages/AddEvent";
import AllEvents from "./pages/AllEvents";
import Assessment from "./pages/Assessment";
import Assessments from "./pages/Assessments";
import AuthContext from "./contexts/AuthContext";
import Child from "./pages/Child";
import Dashboard from "./pages/Dashboard";
import Document from "./pages/Document";
import Documents from "./pages/Documents";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function signIn() {
    setIsLoggedIn(true);
  }
  function signOut() {
    setIsLoggedIn(false);
  }

  const authObject = {
    isLoggedIn,
    signIn,
    signOut,
  };
  return (
    <AuthContext.Provider value={authObject}>
  
    
        <NavBarMenu />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/child" element={<Child />} />
          <Route path="/addchild" element={<AddChild />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/addassessment" element={<AddAssessment />} />
          <Route path="/document" element={<Document />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/allevents" element={<AllEvents />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
    
    </AuthContext.Provider>
  );
}

export default App;
