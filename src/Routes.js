import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import Main from './Main';
import Help from "./Help";

const Routes = () =>{
    return (
        <Switch>
            <Route exact path="/">
                <Main/>
            </Route>
            <Route exact path="/help">
                <Help />
            </Route>
            <Route>
                <Redirect to="/"/>
            </Route>
        </Switch>
    )
}

export default Routes;
