import React from "react";
import { Container, Jumbotron } from "react-bootstrap";
import "./App.css";

const Logout = ({ setLoggedIn, setUserLoggedIn }) => {
  setLoggedIn(false);
  setUserLoggedIn(null);
  return (
    <Container>
      <Jumbotron>
        <h2>You have successfully logged out.</h2>
        <hr />
        <p className="lead">Thanks for using the SCA Conservation Visualization Tool!</p>
      </Jumbotron>
    </Container>
  )
};

export default Logout;