import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../form.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setPasswordVerify] = useState("");

  const navigate = useNavigate();

  /**
   * When the user clicks the submit button, prevent the default action, then send a Put request to the
   * server with the user's details, and if successful, navigate to the home page.
   */
  const register = async (e) => {
    e.preventDefault();
    try {
      /* Creating an object with the same name as the variables. */
      const RegisterData = {
        firstName,
        lastName,
        email,
        dateOfBirth,
        mobile,
        password,
        passwordVerify,
      };

      /* Sending a PUT request to the server with the user's details. */
      const result = await axios.put(
        "http://localhost:8000/users/register",
        RegisterData
      );

      /* This is a conditional statement that checks if the status of the response is 200. If it is,
      then it will alert the user that the registration was successful and then it will remove the
      type and status from local storage. It will then navigate to the login page and reload the
      page. */
      if (result?.status === 200) {
        alert("Registration successful ! Please login to continue.");
        /* Removing the type and status from local storage. */
        localStorage.removeItem("type");
        localStorage.removeItem("status");
        /* Reloading the page. */
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      console.error(err?.response?.data?.errorMessage);
      alert(err?.response?.data?.errorMessage);
    }
  };

  useEffect(() => {
    /* This is a function that is used to get the user's details from the database. */
    const getUser = async () => {
      try {
        const user = await axios.get("http://localhost:8000/users/own");
        if (user?.data?.dateOfBirth) {
          const dobEdited = new Date(user?.data?.dateOfBirth)
            .toISOString()
            .substring(0, 10);
          setDateOfBirth(dobEdited);
        }
        /* This is a conditional statement that checks if the user's details are in the database. If they
      are, then it will set the state of the user's details */
        if (user?.data?.firstName) setFirstName(user?.data?.firstName);
        if (user?.data?.lastName) setLastName(user?.data?.lastName);
        if (user?.data?.email) setEmail(user?.data?.email);
        if (user?.data?.mobile) setMobile(user?.data?.mobile);
      } catch (error) {
        // console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <div className="main">
      <div className="sub-main">
        <h1>Register</h1>
        <hr />
        <form onSubmit={register}>
          <div>
            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
              required
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className="form-input"
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Last Name"
              required
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="form-input"
            />
          </div>
          <div>
            <label>Date Of Birth</label>
            <input
              type="date"
              placeholder="Date Of Birth"
              required
              onChange={(e) => setDateOfBirth(e.target.value)}
              value={dateOfBirth}
              className="form-input"
            />
          </div>
          <div>
            <label>Mobile</label>
            <input
              type="text"
              placeholder="Mobile"
              maxLength="10"
              required
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              className="form-input"
            />
          </div>
          <div>
            <label>E-mail</label>
            <input
              type="email"
              placeholder="E-mail"
              disabled
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-input"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-input"
            />
          </div>
          <div>
            <label>Password Verify</label>
            <input
              type="password"
              placeholder="Password Verify"
              required
              onChange={(e) => setPasswordVerify(e.target.value)}
              value={passwordVerify}
              className="form-input"
            />
          </div>
          <div>
            <button className="button" type="submit">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
