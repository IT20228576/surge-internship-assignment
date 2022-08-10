import { useContext } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import LogOut from "./Logout.component";

import AuthContext from "../context/User.context";

const NavBar = () => {
/* Destructuring the user and status from the AuthContext. */
  const { user, status } = useContext(AuthContext);

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
