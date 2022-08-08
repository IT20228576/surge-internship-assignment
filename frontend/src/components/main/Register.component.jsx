import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./form.css";

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
   * When the user clicks the submit button, prevent the default action, then send a POST request to the
   * server with the user's email and password, and if successful, navigate to the home page.
   */
  const register = async (e) => {
    e.preventDefault();
    try {
      /* Creating an object with the email and password. */
      const RegisterData = {
        firstName,
        lastName,
        email,
        dateOfBirth,
        mobile,
        password,
        passwordVerify,
      };
      console.log(RegisterData);

      const result = await axios.put(
        "http://localhost:8000/users/register",
        RegisterData
      );

      console.log(result);

      if (result?.status === 200) {
        alert("Registration successful ! Please login to continue.");
        localStorage.removeItem("type");
        localStorage.removeItem("status");
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      console.error(err?.response?.data?.errorMessage);
      alert(err?.response?.data?.errorMessage);
    }
  };

  const getUser = async () => {
    const user = await axios.get("http://localhost:8000/users/own");
    if (user.data.dateOfBirth) {
      const dobEdited = new Date(user?.data?.dateOfBirth)
        .toISOString()
        .substring(0, 10);
      setDateOfBirth(dobEdited);
    }

    if (user?.data?.firstName) setFirstName(user?.data?.firstName);
    if (user?.data?.lastName) setLastName(user?.data?.lastName);
    if (user?.data?.email) setEmail(user?.data?.email);
    if (user?.data?.mobile) setMobile(user?.data?.mobile);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="main">
      <div className="sub-main">
        <h1>Register</h1>
        <hr />
        <form onSubmit={register}>
          <label>First Name</label>
          <div>
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
              className="form-input"
            />
          </div>
          <label>Last Name</label>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              value={lastName}
              className="form-input"
            />
          </div>
          <label>Date Of Birth</label>
          <div>
            <input
              type="date"
              placeholder="Date Of Birth"
              onChange={(e) => setDateOfBirth(e.target.value)}
              value={dateOfBirth}
              className="form-input"
            />
          </div>
          <label>Mobile</label>
          <div>
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
          <label>E-mail</label>
          <div>
            <input
              type="text"
              placeholder="E-mail"
              disabled
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-input"
            />
          </div>
          <label>Password</label>
          <div>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-input"
            />
          </div>
          <label>Password Verify</label>
          <div>
            <input
              type="password"
              placeholder="Password Verify"
              onChange={(e) => setPasswordVerify(e.target.value)}
              value={passwordVerify}
              className="form-input"
            />
          </div>
          <div>
            <button className="button" type="submit">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
