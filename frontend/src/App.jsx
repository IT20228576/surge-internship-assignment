import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Home from "./components/main/Home.component";
import Login from "./components/main/Login.component";
import Navbar from "./components/main/NavBar.components";
import Register from "./components/main/Register.component";
import CreateUser from "./components/userManagement/CreateUser.component";
import ViewUsers from "./components/userManagement/ViewUsers.component";

axios.defaults.withCredentials = true;

const App = () => {
  const [user, setUser] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    setUser(localStorage.getItem("type"));
    setStatus(localStorage.getItem("status"));

    if (Cookies.get("token") === undefined) {
      localStorage.removeItem("type");
      localStorage.removeItem("status");
      setUser(localStorage.getItem("type"));
      setStatus(localStorage.getItem("status"));
    }
  }, []);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/"
            element={user !== null ? <Home /> : <Login />}
          />
          <Route
            exact
            path="/register"
            element={status === false ? <Login /> : <Register />}
          />

          {user === "Admin" && status !== true ? (
            <>
              <Route exact path="/users" element={<ViewUsers />} />
              <Route exact path="/create-user" element={<CreateUser />} />
            </>
          ) : (
            ""
          )}

          {user === "Student" && status !== true ? <></> : ""}

          <Route exact path="*" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
