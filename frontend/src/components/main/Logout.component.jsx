import axios from "axios";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const navigate = useNavigate();

  /**
   * The logOut function is an asynchronous function that uses the axios library to make a GET request to
   * the logout route on the server, and then navigates to the login page.
   */
  async function logOut() {
    try {
      /* Making a GET request to the logout route on the server. */
      await axios.get("http://localhost:8000/logout");
      /* Removing the type and status from local storage. */
      localStorage.removeItem("type");
      localStorage.removeItem("status");
      /* Reloading the page. */
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert(err);
    }
  }

  return (
    <button className="btn btn-outline-light" onClick={logOut}>
      Log out
    </button>
  );
}

export default LogOut;
