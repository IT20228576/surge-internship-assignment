import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

import Login from "./components/main/Login.component";
import Navbar from "./components/main/NavBar.components";
import Register from "./components/main/Register.component";
import CreateUser from "./components/userManagement/CreateUser.component";
import ViewUsers from "./components/userManagement/ViewUsers.component";
import ViewNotes from "./components/noteManagement/ViewNotes.component";
import ViewNote from "./components/noteManagement/ViewNote.component";
import CreateNote from "./components/noteManagement/CreateNote.component";
import UpdateNote from "./components/noteManagement/UpdateNote.component";

axios.defaults.withCredentials = true;

const App = () => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    /* Setting the user and status to the local storage. */
    setUser(localStorage.getItem("type"));
    setStatus(localStorage.getItem("status"));

   /* This is checking if the token is undefined, if it is, it will remove the type and status from
   local storage and set the user and status to the local storage. */
    if (Cookies.get("token") === undefined) {
    /* This is removing the type and status from local storage. */
      localStorage.removeItem("type");
      localStorage.removeItem("status");
      /* This is setting the user and status to the local storage. */
      setUser(localStorage.getItem("type"));
      setStatus(localStorage.getItem("status"));
    }
  }, []);

  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          {user === null ? (
            <>
              <Route
                exact
                path="/register"
                element={status === false ? <Register /> : <Login />}
              />
              <Route exact path="*" element={<Login />} />
            </>
          ) : (
            ""
          )}

          {status !== true ? (
            <>
              {user === "Admin" && (
                <>
                  <Route exact path="/" element={<ViewUsers />} />
                  <Route exact path="/create-user" element={<CreateUser />} />
                  <Route exact path="*" element={<ViewUsers />} />
                </>
              )}
              {user === "Student" && (
                <>
                  <Route exact path="/" element={<ViewNotes />} />
                  <Route exact path="/note" element={<ViewNote />} />
                  <Route exact path="/create-note" element={<CreateNote />} />
                  <Route exact path="/update-note" element={<UpdateNote />} />
                  <Route exact path="*" element={<ViewNotes />} />
                </>
              )}
            </>
          ) : (
            ""
          )}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
