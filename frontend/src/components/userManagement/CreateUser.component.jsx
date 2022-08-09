import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../form.css";

const CreateUser = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [mobile, setMobile] = useState("");
  const [accountType, setAccountType] = useState("Student");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  /**
   * When the user clicks the submit button, prevent the default action, then send a POST request to the
   * server with the user's email and password, and if successful, navigate to the home page.
   */
  const createUser = async (e) => {
    e.preventDefault();
    try {
      /* Creating an object with the email and password. */
      const CreateUserData = {
        firstName,
        lastName,
        email,
        dateOfBirth,
        mobile,
        accountType,
      };

      setLoading(true);

      const result = await axios.post(
        "http://localhost:8000/users/create",
        CreateUserData
      );

      if (result?.status === 201) {
        setLoading(false);
        alert(result?.data?.Message);
        localStorage.removeItem("type");
        localStorage.removeItem("status");
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      setLoading(false);
      console.error(err?.response?.data?.errorMessage);
      alert(err?.response?.data?.errorMessage);
    }
  };

  return (
    <div className="main">
      <div className="sub-main">
        <h1>Create User</h1>
        <hr />
        <form onSubmit={createUser}>
          <div>
            <label>E-mail *</label>
            <input
              type="text"
              placeholder="E-mail"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-input"
            />
          </div>
          <div className="form-radio-space">
            <label>Account Type * </label>
            <span
              onChange={(e) => setAccountType(e.target.value)}
              value={accountType}
            >
              <span className="form-radio">
                <input
                  className="form-check-input"
                  defaultChecked
                  type="radio"
                  value="Student"
                  name="accountType"
                />
                Student
              </span>
              <span className="form-radio">
                <input
                  className="form-check-input"
                  type="radio"
                  value="Admin"
                  name="accountType"
                />
                Admin
              </span>
            </span>
          </div>
          <hr />
          <div>
            <label>First Name</label>
            <input
              type="text"
              placeholder="First Name"
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
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              className="form-input"
            />
          </div>
          <div>
            <button className="button" type="submit">
              {loading ? (
                <>
                  <span
                    class="spinner-border spinner-border-m"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  <span class="sr-only">Creating...</span>
                </>
              ) : (
                "Create User"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
