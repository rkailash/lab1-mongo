import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import "styles/ownerLogin.scss";

class OwnerLogin extends Component {
  state = {
    showEmailError: false,
    showLoginError: false
  };
  validateEmail = email => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };
  onEnter = () => this.handleSubmit();
  handleChange = e => {
    this.props.handleChange(e);
  };
  handleSubmit = () => {
    const { account, handleSubmit } = this.props;
    this.validateEmail(account.email)
      ? handleSubmit({ ...account, type: "owner" })
      : this.setState({ showEmailError: true });
  };
  render() {
    const { account, authFlag, showLoginError } = this.props;
    return (
      <div className="owner-login">
        <Header hideLyp />
        <div className="container">
          <img
            className="banner"
            src="https://csvcus.homeaway.com/rsrcs/stab-cms-resources/0.10.35/images/cas/login-banner-sept16-1.png"
          />
          <div className="login-container">
            <form>
              <h3>Owner Login</h3>
              <p>
                Need an account? <Link to="/Register:owner">Sign Up</Link>
              </p>
              <div>
                <input
                  autoFocus
                  tabIndex={1}
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={account.email}
                  onChange={this.handleChange}
                  onKeyPress={e => e.key == "Enter" && this.onEnter()}
                  onFocus={() => this.setState({ showEmailError: false })}
                  id="Popover3"
                />
                <Popover
                  placement="right"
                  isOpen={this.state.showEmailError}
                  target="Popover3"
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
                onKeyPress={e => e.key == "Enter" && this.onEnter()}
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
        </div>
      </div>
    );
  }
}
export default OwnerLogin;
