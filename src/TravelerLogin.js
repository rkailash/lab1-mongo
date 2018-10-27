import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import cookie from "react-cookies";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import Header from "./Header";
import "styles/login.scss";

class Login extends Component {
  state = {
    signUpFlag: false,
    showEmailError: false
  };
  validateEmail = email => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  handleChange = e => {
    this.props.handleChange(e);
  };
  handleSubmit = () =>
    this.props.handleSubmit({ ...this.props.account, type: "traveler" });
  handleSignUp = e => {
    e.preventDefault();
    this.setState({ signUpFlag: true });
  };
  render() {
    const { title, account, authFlag, showLoginError } = this.props;
    if (this.state.signUpFlag) return <Redirect to="/Register:traveler" />;
    //if (authFlag && cookie.load("user_cookie")) {
    if (authFlag && cookie.load("jwt")) {
      return <Redirect to="/Home" />;
    } else {
      return (
        <div className="login">
          <Header />
          <h2>Login to HomeAway</h2>
          <p>
            Need an account?{" "}
            <Link to="/Register" onClick={this.handleSignUp}>
              Sign Up
            </Link>
          </p>
          <form onSubmit={this.handleSubmit}>
            <h3>Account Login</h3>
            <div>
              <input
                autoFocus
                tabIndex={1}
                type="email"
                name="email"
                placeholder="Email address"
                value={account.email}
                onChange={this.handleChange}
                onFocus={() => this.setState({ showEmailError: false })}
                id="Popover1"
              />
              <Popover
                placement="right"
                isOpen={this.state.showEmailError}
                target="Popover1"
              >
                <PopoverHeader>Error</PopoverHeader>
                <PopoverBody>Invalid email address.</PopoverBody>
              </Popover>
            </div>
            <input
              tabIndex={2}
              type="password"
              name="password"
              placeholder="Password"
              value={account.password}
              onChange={this.handleChange}
            />
            <button
              tabIndex={3}
              type="button"
              className="btn-login"
              name="login"
              onClick={this.handleSubmit}
            >
              Log in
            </button>
            {showLoginError && (
              <small className="my-error">
                Email or password is incorrect.
              </small>
            )}
          </form>
        </div>
      );
    }
  }
}

export default Login;
