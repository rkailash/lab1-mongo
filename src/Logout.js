import React, { Component } from "react";
import {toastr} from 'react-redux-toastr'
import cookie from "react-cookies";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { handleLogout } from "actions";

class Logout extends Component {
  constructor(props) {
    super(props);
    props.handleLogout();
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.isLogoutSuccess && this.props.isLogoutSuccess) {
      cookie.remove("user_cookie");
      toastr.success('Signed Out', `See you ${this.props.userInfo.firstname}!`);
      this.props.setUserInfo(undefined);
    }
  }
  render() {
    return this.props.isLogoutSuccess ? <Redirect to="/" /> : null;
  }
}

const mapStateToProps = state => {
  const { isLogoutSuccess } = state.logout;
  return { isLogoutSuccess };
};

const mapDispatchToProps = dispatch => ({
  handleLogout: () => dispatch(handleLogout())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
