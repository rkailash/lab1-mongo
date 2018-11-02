import { connect } from "react-redux";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { handleLoginChange, handleLogin } from "actions";
import TravelerLogin from "../TravelerLogin";
import { toastr } from "react-redux-toastr";
import OwnerLogin from "../OwnerLogin";

const mapStateToProps = state => {
  const { account, authFlag, errorMessage, userInfo } = state.login;
  return {
    account,
    authFlag,
    errorMessage,
    userInfo
  };
};

const mapDispatchToProps = dispatch => ({
  handleChange: e => dispatch(handleLoginChange(e)),
  handleSubmit: i => dispatch(handleLogin(i))
});

class LoginContainer extends Component {
  state = {
    loginType: this.props.location.pathname
  };
  componentDidUpdate(prevProps) {
    if (prevProps.authFlag !== this.props.authFlag) {
      toastr.success(`Welcome, ${this.props.userInfo.firstname}!`);
    }
  }
  render() {
    const { authFlag, userInfo } = this.props;
    const { loginType } = this.state;
    if (authFlag) {
      return userInfo.type === "traveler" ? (
        <Redirect to="/Home" />
      ) : (
        <Redirect to="/OwnerDashboard/inbox" />
      );
    } else {
      return loginType === "/OwnerLogin" ? (
        <OwnerLogin {...this.props} />
      ) : (
        <TravelerLogin {...this.props} />
      );
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
