import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Main from "./Main";
import Help from "./Help";
import Login from "./Login";
import Logout from "./Logout";
import Register from "./Register";
import UserData from "./UserData";

const Routes = ({ setLoggedIn, userLoggedIn, setUserLoggedIn }) =>{
    const [alertText, setAlertText] = useState(false);
    const [alertType, setAlertType] = useState("danger");
    return (
        <>
        <Switch>
            <Route exact path="/">
                <Main userLoggedIn={userLoggedIn}/>
            </Route>
            <Route exact path="/register">
                <Register
                    setLoggedIn={setLoggedIn}
                    setUserLoggedIn={setUserLoggedIn}
                    setAlertText={setAlertText}
                    setAlertType={setAlertType}
                />
            </Route>
            <Route exact path="/login">
                <Login
                    setLoggedIn={setLoggedIn}
                    setUserLoggedIn={setUserLoggedIn}
                    setAlertText={setAlertText}
                    setAlertType={setAlertType}
                />
            </Route>
            <Route exact path="/logout">
                <Logout
                    setLoggedIn={setLoggedIn}
                    setUserLoggedIn={setUserLoggedIn}
                />
            </Route>
            <Route exact path="/user">
                <UserData
                    userLoggedIn={userLoggedIn}
                    setAlertText={setAlertText}
                    setAlertType={setAlertType}
                />
            </Route>
            <Route exact path="/help">
                <Help />
            </Route>
            <Route>
                <Redirect to="/"/>
            </Route>
        </Switch>
        {alertText && (
            <Alert
              className="mt-4"
              variant={alertType}
              onClose={() => setAlertText(false)}
              dismissible
            >
              {alertType === "danger" && (
                <>
                <Alert.Heading>An error occurred!</Alert.Heading>
                <p>{alertText}</p>
                </>
              )}
              {alertType === "success" && (
                <>
                <Alert.Heading>Successfully processed!</Alert.Heading>
                <p>{alertText}</p>
                </>
              )}
            </Alert>
        )}
        </>
    )
}

export default Routes;
