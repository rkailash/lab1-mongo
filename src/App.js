import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import Home from "./Home";
import Property from "./Property";
import Login from "containers/LoginContainer";
import OwnerDashboard from "./OwnerDashboard";
import Listing from "./Listing";
import "styles/app.scss";
import Register from "./Register";
import TravelerDashboard from "./TravelerDashboard";
import Logout from "./Logout";
import Error from "./Error";

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Home" component={Home} />
        <Route path="/TravelerLogin" component={Login} />
        <Route path="/OwnerLogin" component={Login} />
        <Route path="/Register:type" component={Register} />
        <Route path="/Listing" component={Listing} />
        <Route path="/Property/:id" component={Property} />
        <Route path="/Traveler" component={TravelerDashboard} />
        <Route path="/OwnerDashboard" component={OwnerDashboard} />
        <Route path="/Logout" component={Logout} />
        <Route component={Error} />
      </Switch>
    </div>
  );
};

export default App;
