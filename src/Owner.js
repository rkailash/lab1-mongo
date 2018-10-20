import React, { Component } from "react";
import axios from "axios";
import Location from "./Location";
import Pricing from "./Pricing";
import Photos from "./Photos";
import Details from "./Details";
import Header from "./Header";
import "styles/owner.scss";

const navList = [
  { value: "location", label: "Location", imgUrl: '/placeholder.svg' },
  { value: "details", label: "Details", imgUrl: '/edit.svg' },
  { value: "photos", label: "Photos", imgUrl: '/photo.svg' },
  { value: "pricing", label: "Pricing", imgUrl: '/hand.svg' }
];

const NextButton = ({ onClickNext }) => (
  <button type="button" className="next main-btn" onClick={onClickNext}>
    <svg viewBox="0 0 31.49 31.49" width="512px" height="512px">
      <path
        d="M21.205,5.007c-0.429-0.444-1.143-0.444-1.587,0c-0.429,0.429-0.429,1.143,0,1.571l8.047,8.047H1.111  C0.492,14.626,0,15.118,0,15.737c0,0.619,0.492,1.127,1.111,1.127h26.554l-8.047,8.032c-0.429,0.444-0.429,1.159,0,1.587  c0.444,0.444,1.159,0.444,1.587,0l9.952-9.952c0.444-0.429,0.444-1.143,0-1.571L21.205,5.007z"
        fill="#FFFFFF"
      />
    </svg>
  </button>
);

class Owner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: "location",
      details: undefined,
      location: undefined,
      price: 0
    };
  }
  renderActiveNav = () => {
    switch (this.state.activeNav) {
      case "location":
        return (
          <Location
            values={this.state.location}
            onChange={location => this.setState({ ...this.state, location })}
            onClickNextButton={() => (
              <NextButton onClickNext={() => this.onClickNext()} />
            )}
          />
        );
      case "details":
        return (
          <Details
            values={this.state.details}
            onChange={details => this.setState({ ...this.state, details })}
            onClickNextButton={() => (
              <NextButton onClickNext={() => this.onClickNext()} />
            )}
          />
        );
      case "photos":
        return (
          <Photos
            onClickNextButton={() => (
              <NextButton onClickNext={() => this.onClickNext()} />
            )}
          />
        );
      case "pricing":
        return (
          <Pricing
            price={this.state.price}
            onChange={price => this.setState({ price })}
            handleSubmit={() => {
              this.handleSubmit();
            }}
            onClickNextButton={() => (
              <NextButton onClickNext={() => this.onClickNext()} />
            )}
          />
        );
      default:
        return null;
    }
  };
  handleSubmit = () => {
    const data = {
      location: this.state.location,
      details: this.state.details,
      price: this.state.price
    };

    console.log(data);
    axios.post("http://localhost:3001/Owner", data).then(response => {
      console.log("Axios POST response:", response.status);

      if (response.status === 200) {
        console.log("Property details posted!");
        console.log(response);
      } else {
        console.log("Property details not posted!");
      }
    });
    console.log("here");
  };
  onClickNext = () => {
    const currentIndex = navList.findIndex(
      i => i.value === this.state.activeNav
    );
    const length = navList.length;
    this.setState({ activeNav: navList[(currentIndex + 1) % length].value });
  };
  onClickNext = () => {
    const currentIndex = navList.findIndex(
      i => i.value === this.state.activeNav
    );
    const length = navList.length;
    this.setState({ activeNav: navList[(currentIndex + 1) % length].value });
  };
  render() {
    const { activeNav } = this.state;
    return (
      <div className="owner-container">
        <div className="form-box">
          <ul className="nav-list">
            {navList.map((item, key) => (
              <li
                key={key}
                className={`${item.value === activeNav ? "active" : ""}`}
                onClick={() => this.setState({ activeNav: item.value })}
              >
                <img src={`/images/${item.imgUrl}`} alt={item.value} title={item.value} />
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
          <div className="form">{this.renderActiveNav()}</div>
        </div>
      </div>
    );
  }
}

export default Owner;
