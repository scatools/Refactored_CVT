import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

const NavBar = ({ loggedIn, userLoggedIn }) => {
	return (
		<Navbar bg="dark" variant="dark" fixed="top">
			<Navbar.Brand href="#home">
				<NavLink to="/" style={{ color: 'white', textDecoration: 'None' }}>
					Conservation Visualization Tool
				</NavLink>
			</Navbar.Brand>
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					<NavLink to="/" className="ml-3 mt-2" style={{ color: 'white'}}>
						Map
					</NavLink>
					<NavLink to="/help" className="ml-3 mt-2" style={{ color: 'white'}}>
						Support
					</NavLink>
					<NavDropdown title="More" className="ml-3">
					<NavDropdown.Item
						href="https://www.quest.fwrc.msstate.edu/sca/about-the-project.php"
						target="_blank"
					>
						Strategic Conservation Assessment (SCA) Project
					</NavDropdown.Item>
					<NavDropdown.Divider />
					<NavDropdown.Item
						href="https://sca-cit.herokuapp.com/"
						target="_blank"
					>
						Conservation Planning Inventory Tool (CIT)
					</NavDropdown.Item>
					<NavDropdown.Item
						href="https://sca-cpt.herokuapp.com/"
						target="_blank"
					>
						Conservation Prioritization Tool (CPT)
					</NavDropdown.Item>
					</NavDropdown>
					{loggedIn ? (
						<div className="nav-right">
							<NavLink to="/user" className="ml-3 mt-2 login">
								{userLoggedIn}
							</NavLink>
							<NavLink to="/logout" className="ml-3 mt-2 login">
								Log Out
							</NavLink>
						</div>
						) : (
						<div className="nav-right">
							<NavLink to="/login" className="ml-3 mt-2 login">
								Log In
							</NavLink>
							<NavLink to="/register" className="ml-3 mt-2 register">
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
