import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/userSlice";

function NavBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => {
    return state.user.email;
  });

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logoutUser());
    // toast.success("You were successfully logged out", {
    //   position: "top-right",
    //   autoClose: 5000,
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   draggable: true,
    //   progress: undefined,
    // });

    navigate("/");
  };
  return (
    <Navbar expand="lg">
      <Container>
        <Link to="/">
          <Navbar.Brand className="text-center navTitle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-film me-2 align-text-center pb-1"
              viewBox="0 0 16 16"
              style={{ color: "red", height: "25", width: "25" }}
            >
              <path d="M0 1a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V1zm4 0v6h8V1H4zm8 8H4v6h8V9zM1 1v2h2V1H1zm2 3H1v2h2V4zM1 7v2h2V7H1zm2 3H1v2h2v-2zm-2 3v2h2v-2H1zM15 1h-2v2h2V1zm-2 3v2h2V4h-2zm2 3h-2v2h2V7zm-2 3v2h2v-2h-2zm2 3h-2v2h2v-2z" />
            </svg>
            SearchTube
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              as={Link}
              to={"/"}
              style={{ color: "rgba(255,255,255,.5)" }}
            >
              Home
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <NavDropdown
              title={<span className=" my-auto">Menu</span>}
              id="basic-nav-dropdown"
              style={{
                backgroundColor: "212529",
                color: "rgba(255,255,255,.5)",
              }}
            >
              <NavDropdown.Item
                as={Link}
                to={"/search"}
                id="nav-dropdown-search"
              >
                Search
              </NavDropdown.Item>

              {user && (
                <NavDropdown.Item
                  as={Link}
                  onClick={(e) => {
                    handleLogout(e);
                  }}
                  to="/"
                  id="nav-dropdown-search"
                >
                  Logout
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
