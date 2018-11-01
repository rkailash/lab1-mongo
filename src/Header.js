import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";
import "styles/header.scss";

const LoginDropdown = () => (
  <Fragment>
    <DropdownToggle caret>Login</DropdownToggle>
    <DropdownMenu>
      <DropdownItem>
        <Link to="/TravelerLogin">Traveler Login</Link>
      </DropdownItem>
      <DropdownItem>
        <Link to="/OwnerLogin">Owner Login</Link>
      </DropdownItem>
    </DropdownMenu>
  </Fragment>
);

const UserDropdown = ({ type, name }) => (
  <Fragment>
    <DropdownToggle caret>{name}</DropdownToggle>
    <DropdownMenu>
      <DropdownItem>
        <img src="/images/envelope.svg" />
        <Link to="/Traveler/inbox">
          Inbox
        </Link>
      </DropdownItem>
      <DropdownItem>
        <img src="/images/admin.svg" />
        <Link to="/Traveler/profile">My Profile</Link>
      </DropdownItem>
      <DropdownItem>
        <img src="/images/earth.svg" />
        <Link to="/Traveler/trips">My Trips</Link>
      </DropdownItem>
      {type === "owner" && (
        <Fragment>
          <DropdownItem divider />
          <DropdownItem>
            <img src="/images/dashboard.svg" />
            <Link to="/od/properties">Owner Dashboard</Link>
          </DropdownItem>
          <DropdownItem divider />
        </Fragment>
      )}
      <DropdownItem>
        <img src="/images/logout.svg" />
        <Link to="/Logout">Log Out</Link>
      </DropdownItem>
    </DropdownMenu>
  </Fragment>
);

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false
    };
  }
  onClickLogin = option => {
    this.props.onClick(option.value);
  };
  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  };
  render() {
    const { showLogin, hideLyp, design, userInfo, renderDropdown } = this.props;
    return (
      <div className={`header ${design === "gradient" ? "gradient" : ""}`}>
        <Link className="logo" to="/">
          <img
            src={
              design === "gradient"
                ? "https://csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/logo-bceheader-white.svg"
                : "https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/logo-bceheader.svg"
            }
          />
        </Link>
        <div className="right-container">
          {userInfo !== undefined && (
            <Link className="trips" to="/Traveler/trips">
              My Trips
            </Link>
          )}
          {showLogin && (
            <Dropdown
              className={`header-menu${
                userInfo === undefined ? "" : " user-profile"
              }`}
              isOpen={this.state.dropdownOpen}
              toggle={() => this.toggle()}
            >
              {userInfo === undefined ? (
                <LoginDropdown />
              ) : (
                <UserDropdown
                  type={userInfo.type}
                  name={`${userInfo.firstname} ${userInfo.lastname.charAt(0)}`}
                />
              )}
            </Dropdown>
          )}
          {renderDropdown &&
            renderDropdown(this.toggle, this.state.dropdownOpen)}
          {userInfo !== undefined && (
            <Link className="inbox" to="/Traveler/inbox">
              <img src="/images/chat.svg" alt="inbox" title="inbox" />
            </Link>
          )}
          {hideLyp || (
            <Link to="/od/add-new" className="lyp">
              <button type="button">List your Property</button>
            </Link>
          )}
          <img
            className="logo-image"
            src={
              design === "gradient"
                ? "https://csvcus.homeaway.com/rsrcs/cdn-logos/2.11.0/bce/moniker/homeaway_us/birdhouse-bceheader-white.svg"
                : "https://csvcus.homeaway.com/rsrcs/cdn-logos/2.10.6/bce/moniker/homeaway_us/birdhouse-bceheader.svg"
            }
            alt="logo"
            title="logo"
          />
        </div>
      </div>
    );
  }
}

export default Header;
