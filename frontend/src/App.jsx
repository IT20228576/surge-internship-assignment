import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";

import Home from "./components/main/Home.component";
import Login from "./components/main/Login.component";
import Navbar from "./components/main/NavBar.components";
import Register from "./components/main/Register.component";
import CreateUser from "./components/userManagement/CreateUser.component";

axios.defaults.withCredentials = true;

const App = () => {
  const [user, setUser] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    setUser(localStorage.getItem("type"));
    setStatus(localStorage.getItem("status"));
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
          <Route exact path="/create-user" element={<CreateUser />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
