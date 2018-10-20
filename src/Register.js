import React, { Component } from "react";
import { connect } from "react-redux";
import Header from "./Header";
import axios from "axios";
import { registerUser } from "actions";
import "styles/login.scss";
import { Link, Redirect } from "react-router-dom";

const Register = ({
  account,
  handleSubmit,
  handleChange,
  signUpFormIsOpen,
  openSignupForm
}) => {
  return (
    <div className="register">
      <Header />
      <h2>Sign up for HomeAway</h2>
      <p>
        Already have an account?&nbsp;
        <Link to="/TravellerLogin">Login</Link>
      </p>
      <form onSubmit={handleSubmit}>
        {signUpFormIsOpen ? (
          <fieldset>
            <input
              tabIndex={1}
              type="text"
              name="firstname"
              placeholder="First Name"
              onChange={handleChange}
            />
            <input
              tabIndex={2}
              type="text"
              name="lastname"
              placeholder="Last Name"
              onChange={handleChange}
            />
            <input
              tabIndex={3}
              type="email"
              name="email"
              placeholder="Email address"
              onChange={handleChange}
            />
            <input
              tabIndex={4}
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <button
              tabIndex={5}
              autoFocus
              type="button"
              className="btn-register"
              name="register"
              onClick={() => handleSubmit(account)}
            >
              Sign Me Up
            </button>
          </fieldset>
        ) : (
          <button
            tabIndex={1}
            autoFocus
            type="button"
            className="btn-register"
            name="register"
            onClick={() => openSignupForm()}
          >
            Sign up with Email
          </button>
        )}
        <small>We don't post anything without your permission.</small>
        <small>
          By creating an account you are accepting our Terms and Conditions and
          Privacy Policy.
        </small>
      </form>
    </div>
  );
};

class RegisterContainer extends Component {
  state = {
    signUpFormIsOpen: false,
    account: {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      type: this.props.match.params.type.split(":")[1]
    }
  };

  handleChange = e => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };

  render() {
    const { signUpFormIsOpen, account } = this.state;
    if (this.props.registerSuccess === true) {
      return <Redirect to="/TravellerLogin" />;
    } else {
      return (
        <Register
          {...this.props}
          handleChange={this.handleChange}
          account={account}
          signUpFormIsOpen={signUpFormIsOpen}
          openSignupForm={() => this.setState({ signUpFormIsOpen: true })}
        />
      );
    }
  }
}

const mapStateToProps = state => ({
  registerSuccess: state.register.isRegistered
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: i => dispatch(registerUser(i))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterContainer);
