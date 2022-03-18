import React, { useState, useEffect } from "react";
import { Button, Container, Jumbotron, Modal } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import axios from "axios";
import "./App.css";

const UserData = ({ userLoggedIn, setAlertText, setAlertType }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [ username, setUsername ] = useState(null);
  const [ password, setPassword ] = useState(null);
  const [ newPassword, setNewPassword ] = useState(null);
  const [ firstName, setFirstName ] = useState(null);
  const [ newFirstName, setNewFirstName ] = useState(null);
  const [ lastName, setLastName ] = useState(null);
  const [ newLastName, setNewLastName ] = useState(null);
  const [ email, setEmail ] = useState(null);
  const [ newEmail, setNewEmail ] = useState(null);
  const [ admin, setAdmin ] = useState(false);
  const [ userMapList, setUserMapList ] = useState([]);
  const [ updateInfo, setUpdateInfo ] = useState(false);
  const [ updatePassword, setUpdatePassword ] = useState(false);

  const showUpdateInfo = () => setUpdateInfo(true);

  const closeUpdateInfo = () => {
    setUpdateInfo(false);
    getUserData();
  };

  const showUpdatePassword = () => setUpdatePassword(true);
  
  const closeUpdatePassword = () => {
    setUpdatePassword(false);
    setPassword(null);
    setNewPassword(null);
  };

  const getUserData = async () => {
    // For development on local server
    // const result = await axios.post(
    //   'http://localhost:5000/user',
    //   { username: userLoggedIn }
    // );

    // For production on Heroku
    const result = await axios.post(
      'https://sca-cpt-backend.herokuapp.com/user',
      { username: userLoggedIn }
    );
    
    setUsername(result.data.rows[0].username);
    setFirstName(result.data.rows[0].first_name);
    setNewFirstName(result.data.rows[0].first_name);
    setLastName(result.data.rows[0].last_name);
    setNewLastName(result.data.rows[0].last_name);
    setEmail(result.data.rows[0].email);
    setNewEmail(result.data.rows[0].email);
    setAdmin(result.data.rows[0].is_admin);
  };

  const updateUserInfo = async () => {
    // For development on local server
    // const result = await axios.post(
    //   'http://localhost:5000/update/information',
    //   {
    //     username: userLoggedIn,
    //     email: newEmail,
    //     first_name: newFirstName,
    //     last_name: newLastName
    //   }
    // );
    
    // For production on Heroku
    const result = await axios.post(
      'https://sca-cpt-backend.herokuapp.com/update/information',
      {
        username: userLoggedIn,
        email: newEmail,
        first_name: newFirstName,
        last_name: newLastName
      }
    );
    if (result) {
      setAlertType("success");
      setAlertText("You have updated your profile!");
      closeUpdateInfo();
    };
  };

  const updateUserPassword = async () => {
    // For development on local server
    // const verification = await axios.post(
    //   'http://localhost:5000/login',
    //   { username: userLoggedIn, password: password }
    // );

    // For production on Heroku
    const verification = await axios.post(
      'https://sca-cpt-backend.herokuapp.com/login',
      { username: userLoggedIn, password: password }
    );

    if (!verification.data.validLogin) {
      setAlertType("danger");
			setAlertText("Incorrect password! Please enter again.");
		} else {
      // For development on local server
      // const result = await axios.post(
      //   'http://localhost:5000/update/password',
      //   {
      //     username: userLoggedIn,
      //     password: newPassword
      //   }
      // );
      
      // For production on Heroku
      const result = await axios.post(
        'https://sca-cpt-backend.herokuapp.com/update/password',
        {
          username: userLoggedIn,
          password: newPassword
        }
      );
      if (result) {
        setAlertType("success");
        setAlertText("You have updated your password!");
        closeUpdatePassword();
      };
		}
  };

  useEffect(() => {
    getUserData();
  }, [userLoggedIn]);
  
  if (userLoggedIn) {
    return (
      <Container>
        <Jumbotron>
          <h1 className="display-4">
            Welcome back, {firstName} {lastName}
          </h1>
          <p className="lead">Please review or modify your personal information here</p>
          <hr className="my-4" />
          <p className="h3">User Profile</p>
          <p>Your username: {username}</p>
          <p>Your email: {email}</p>
          <div className="d-flex justify-content-between btn-container">
            {admin && (
              <Button className="btn btn-success">
                Admin Module
              </Button>
            )}
            <Button className="btn btn-success" onClick={showUpdateInfo}>
              Update Information
            </Button>
            <Button className="btn btn-success" onClick={showUpdatePassword}>
              Change Password
            </Button>
            <Button className="btn btn-danger">
              Delete Account
            </Button>
          </div>
          <hr className="my-4" />
          <p className="h3">Saved Maps</p>
          <br />
          {userMapList.length > 0 ? (
            <></>
          ) : (
            <p className="lead">No map saved yet!</p>
          )}
        </Jumbotron>
        <Modal centered show={updateInfo} onHide={closeUpdateInfo} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              Please enter your profile information here
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              Your Username: 
              <input type="text" value={username} disabled></input>
              Your Email: 
              <input
                type="text"
                value={newEmail}
                onChange={(e)=>setNewEmail(e.target.value)}
                required>
              </input>
              Your First Name: 
              <input
                type="text"
                value={newFirstName}
                onChange={(e)=>setNewFirstName(e.target.value)}
                required>
              </input>
              Your Last Name: 
              <input
                type="text"
                value={newLastName}
                onChange={(e)=>setNewLastName(e.target.value)}
                required>
              </input>
              <br/>
              <div className="d-flex justify-content-between">
                <Button className="btn btn-warning" onClick={closeUpdateInfo}>
                  Cancel
                </Button>
                <Button className="btn btn-primary" onClick={updateUserInfo}>
                  Confirm
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal centered show={updatePassword} onHide={closeUpdatePassword} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              Please enter your current and new passwords here
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              Your Username: 
              <input type="text" value={username} disabled></input>
              Your Current Password: 
              <input
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required>
              </input>
              Your New Password: 
              <input
                type="password"
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
                required>
              </input>
              {/* Confirm Your New Password: 
              <input
                type="password"
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
                required>
              </input> */}
              <br/>
              <div className="d-flex justify-content-between">
                <Button className="btn btn-warning" onClick={closeUpdatePassword}>
                  Cancel
                </Button>
                <Button className="btn btn-primary" onClick={updateUserPassword}>
                  Confirm
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
    );
  }
};

export default UserData;
