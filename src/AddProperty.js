import React, { Component } from "react";
import axios from "axios";
import Location from "./Location";
import Pricing from "./Pricing";
import Photos from "./Photos";
import Details from "./Details";
import Header from "./Header";
import "styles/addProperty.scss";

const navList = [
  { value: "location", label: "Location", imgUrl: "/placeholder.svg" },
  { value: "details", label: "Details", imgUrl: "/edit.svg" },
  { value: "photos", label: "Photos", imgUrl: "/photo.svg" },
  { value: "pricing", label: "Pricing", imgUrl: "/hand.svg" }
];

const NextButton = ({ onClickNext }) => (
  <button type="button" className="next main-btn" onClick={onClickNext} />
);

class AddProperty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeNav: "location",
      values: {
        city: "",
        country: "",
        street: "",
        unit: "",
        state: "",
        zipcode: "",
        price: 0,
        headline: "",
        description: "",
        type: "",
        bedrooms: "",
        bathrooms: "",
        accomodates: ""
      }
    };
  }
  renderActiveNav = () => {
    switch (this.state.activeNav) {
      case "location":
        return (
          <Location
            values={this.state.location}
            onChange={values =>
              this.setState({ ...this.state, values: { ...values } })
            }
            nextButton={() => (
              <NextButton onClickNext={() => this.onClickNext()} />
            )}
          />
        );
      case "details":
        return (
          <Details
            values={this.state.details}
            onChange={values =>
              this.setState({ ...this.state, values: { ...values } })
            }
            nextButton={() => (
              <NextButton onClickNext={() => this.onClickNext()} />
            )}
          />
        );
      case "photos":
        return (
          <Photos
            nextButton={() => (
              <NextButton onClickNext={() => this.onClickNext()} />
            )}
          />
        );
      case "pricing":
        return (
          <Pricing
            price={this.state.price}
            onChange={values =>
              this.setState({ ...this.state, values: { ...values } })
            }
            handleSubmit={() => {
              this.handleSubmit();
            }}
            nextButton={() => (
              <NextButton onClickNext={() => this.onClickNext()} />
            )}
          />
        );
      default:
        return null;
    }
  };
  handleSubmit = () => {
    this.props.onAdd(this.state.values);
  };
  onClickNext = () => {
    const currentIndex = navList.findIndex(
      i => i.value === this.state.activeNav
    );
    const length = navList.length;
    this.setState({ activeNav: navList[(currentIndex + 1) % length].value });
  };
  // onClickNext = () => {
  //   const currentIndex = navList.findIndex(
  //     i => i.value === this.state.activeNav
  //   );
  //   const length = navList.length;
  //   this.setState({ activeNav: navList[(currentIndex + 1) % length].value });
  // };
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
                <img
                  src={`/images/${item.imgUrl}`}
                  alt={item.value}
                  title={item.value}
                />
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

export default AddProperty;
