import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

function AuthContextProvider(props) {
  /* Setting the state of the component. */
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState("");


  // ────────────────────────────────────────────────────────────────────────────────

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

  // ────────────────────────────────────────────────────────────────────────────────

  /* Returning the AuthContext.Provider component with the value of user and status. */
  return (
    <AuthContext.Provider value={{ user, status }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
