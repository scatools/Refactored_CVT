import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import UserData from "./UserData";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Main />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/user">
        <UserData />
      </Route>
      <Route>
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default Routes;
