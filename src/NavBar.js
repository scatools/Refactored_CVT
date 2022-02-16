import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

const NavBar = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Navbar.Brand>
        <NavLink to="/" style={{ color: "white", textDecoration: "None" }}>
          Conservation Visualization Tool
        </NavLink>
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/" className="ml-3">
            Map
          </NavLink>
          {loggedIn ? (
            <div className="nav-right">
              <NavLink to="/user" className="ml-3 login">
                Profile
              </NavLink>
            </div>
          ) : (
            <div className="nav-right">
              <NavLink to="/login" className="ml-3 login">
                Login
              </NavLink>
              <NavLink to="/register" className="ml-3 register">
                Register
              </NavLink>
            </div>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
