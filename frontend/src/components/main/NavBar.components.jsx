import { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import LogOut from "./Logout.component";

const NavBar = () => {
  const [user, setUser] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    setUser(localStorage.getItem("type"));
    setStatus(localStorage.getItem("status"));
  }, []);

    return (
      (
        <div>
          <Navbar bg="dark" variant="dark">
            <Container>
              <Navbar.Brand href="/">surge</Navbar.Brand>
              <Nav className="me-auto">
                {user === "Admin" && status !== true ? (
                  <>
                    <Nav.Link href="/users">Users</Nav.Link>
                  </>
                ) : (
                  ""
                )}

                {user === "Student" && status !== true ? (
                  <>
                    <Nav.Link href="/notes">Notes</Nav.Link>
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
      )
    );
};

export default NavBar;
