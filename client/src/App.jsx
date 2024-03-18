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
import RequireAuth from "./components/RequireAuth";

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
      {/* <NavBarMenu /> */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        />
        <Route
          path="/children/:id"
          element={
            //<RequireAuth>
            <Child />
            //</RequireAuth>
          }
        />
        <Route
          path="/addchild"
          element={
            <RequireAuth>
              <AddChild />
            </RequireAuth>
          }
        />
        <Route
          path="/assessment"
          element={
            <RequireAuth>
              <Assessment />
            </RequireAuth>
          }
        />
        <Route
          path="/children/:id/assessments"
          element={
            <RequireAuth>
              <Assessments />
            </RequireAuth>
          }
        />
        <Route
          path="/addassessment"
          element={
            <RequireAuth>
              <AddAssessment />
            </RequireAuth>
          }
        />
        <Route
          path="/document"
          element={
            <RequireAuth>
              <Document />
            </RequireAuth>
          }
        />
        <Route
          path="/children/:id/documents"
          element={
            <RequireAuth>
              <Documents />
            </RequireAuth>
          }
        />
        <Route
          path="/child/:id/allevents"
          element={
            <RequireAuth>
              <AllEvents />
            </RequireAuth>
          }
        />
        <Route
          path="/child/:id/addevent"
          element={
            <RequireAuth>
              <AddEvent />
            </RequireAuth>
          }
        />
        <Route
          path="/settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
