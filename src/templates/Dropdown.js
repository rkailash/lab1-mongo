import React, { Component } from "react";
import "styles/dropdown.scss";
import onClickOutside from "react-onclickoutside";

class Dropdown extends Component {
  handleClickOutside = () => {
    this.props.onClick();
  };
  render() {
    return this.props.isOpen ? (
      <div className="my-dropdown">{this.props.children}</div>
    ) : null;
  }
}

export default onClickOutside(Dropdown);
