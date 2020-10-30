import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Modal, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import SigninForm from './SigninForm';
import RegisterForm from './RegisterFrom';
import { useSelector, useDispatch } from 'react-redux';
import { removeUser } from './action';

const Nav = () => {
	const [ show, setShow ] = useState(false);
	const [ formType, setFormType ] = useState('signin');
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const handleChange = (e) => {
		setFormType(e);
	};
	const user = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const handleLogOut = () => {
		dispatch(removeUser());
		console.log(user);
	};
	function isEmpty(obj) {
		for (var key in obj) {
			if (obj.hasOwnProperty(key)) return false;
		}
		return true;
	}
	return (
		<div>
			<Navbar bg="dark" variant="dark" fixed="top">
				<Navbar.Brand href="#home">
					<Link to="/" style={{ color: 'white', textDecoration: 'None' }}>
						Conservation Visualization Tool
					</Link>
				</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse className="justify-content-end">
					{isEmpty(user) && (
						<span className="ml-3" style={{ color: 'white' }} onClick={handleShow}>
							Sign up / Log in
						</span>
					)}
					{!isEmpty(user) && (
					    <>
					        <Navbar.Text>
					        Signed in as: {user.username}
					        </Navbar.Text>
					        <span className="ml-1" style={{ color: 'white' }} onClick={handleLogOut}>
					        Log out
				            </span>
					    </>
					)}
				</Navbar.Collapse>
			</Navbar>
			<Modal show={show} onHide={handleClose} centered>
				<Modal.Header closeButton>
					<ToggleButtonGroup
						className="mb-2"
						type="radio"
						value={formType}
						onChange={handleChange}
						name="formType"
					>
						<ToggleButton variant="outline-dark" value="signin">
							Sign in
						</ToggleButton>
						<ToggleButton variant="outline-dark" value="register">
							Register
						</ToggleButton>
					</ToggleButtonGroup>
				</Modal.Header>
				<Modal.Body>
					{formType === 'signin' && <SigninForm handleClose={handleClose} />}
					{formType === 'register' && <RegisterForm handleClose={handleClose} />}
					<hr/>
					<a href="https://www.quest.fwrc.msstate.edu/sca/newsletter.php">Stay connected by signing up our newsletter!</a>
				</Modal.Body>
			</Modal>
		</div>
	);
};

export default Nav;
