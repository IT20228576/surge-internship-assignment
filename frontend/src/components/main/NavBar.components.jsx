import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import LogOut from "./Logout.component";
import Cookies from "js-cookie";

const NavBar = () => {
  const [user, setUser] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    /* Setting the user and status to the localStorage. */
    setUser(localStorage.getItem("type"));
    setStatus(localStorage.getItem("status"));

    /* This is checking if the token is undefined, if it is, it removes the type and status from
    localStorage and sets the user and status to an empty string. */
    if (Cookies.get("token") === undefined) {
      localStorage.removeItem("type");
      localStorage.removeItem("status");
      setUser("");
      setStatus("");
    }
  }, []);

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">surge</Navbar.Brand>
          <Nav className="me-auto">
            {user === "Admin" && status !== true ? (
              <>
                <Nav.Link href="/">Users</Nav.Link>
              </>
            ) : (
              ""
            )}

            {user === "Student" && status !== true ? (
              <>
                <Nav.Link href="/">Notes</Nav.Link>
              </>
            ) : (
              ""
            )}
          </Nav>
          <Nav>
            {(user === "Student" || user === "Admin") && status !== true ? (
              <>
                <LogOut />
              </>
            ) : (
              ""
            )}
            {!user && (
              <>
                <Nav.Link href="/">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBar;
