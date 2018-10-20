import { connect } from "react-redux";
import React, { Component } from "react";
import { handleLoginChange, handleLogin } from "actions";
import TravelerLogin from "../TravelerLogin";
import {toastr} from 'react-redux-toastr'
import OwnerLogin from "../OwnerLogin";

const mapStateToProps = state => {
  const { account, authFlag, showLoginError, userInfo } = state.login;
  return {
    account,
    authFlag,
    showLoginError,
    userInfo
  };
};

const mapDispatchToProps = dispatch => ({
  handleChange: e => dispatch(handleLoginChange(e)),
  handleSubmit: i => dispatch(handleLogin(i))
});

class LoginContainer extends Component {
  state = {};
  componentDidUpdate(prevProps) {
    if(prevProps.authFlag !== this.props.authFlag) {
      this.props.setUserInfo(this.props.userInfo);
      toastr.success(`Welcome, ${this.props.userInfo.firstname}!`)
    }
  }
  render() {
    return this.props.location.pathname === "/OwnerLogin" ? (
      <OwnerLogin {...this.props} />
    ) : (
      <TravelerLogin {...this.props} />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginContainer);
