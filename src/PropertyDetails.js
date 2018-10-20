import React, { Component } from "react";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController
} from "react-dates";
import Counter from "templates/Counter";
import RadioGroup from "templates/RadioGroup";
import RatingDisplay from "templates/RatingDisplay";
import Dropdown from "templates/Dropdown";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import "styles/propertyDetails.scss";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class PropertyDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownIsOpen: false,
      modalIsOpen: false,
      startDate: null,
      endDate: null,
      guests: {
        adults: 1,
        children: 0,
        pets: false
      }
    };
  }
  updateAdultGuests = i => {
    const guests = {
      ...this.state.guests,
      adults: i
    };
    this.setState({ guests });
  };
  updateChildrenGuests = i => {
    const guests = {
      ...this.state.guests,
      children: i
    };
    this.setState({ guests });
  };
  openModal = () => {
    this.setState({ modalIsOpen: true });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };
  toggleDropdown = () =>
    this.setState({ dropdownIsOpen: !this.state.dropdownIsOpen });
  render() {
    const {
      guests,
      startDate,
      endDate,
      focusedInput,
      dropdownIsOpen
    } = this.state;
    const { item } = this.props;
    return (
      <div className="property-details">
        <div className="pricing">
          <h2>{`$${item.price}`}</h2>
          <span>avg/night</span>
          <div className="wishlist-icon">
            <svg
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 51.997 51.997"
              width="512px"
              height="512px"
            >
              <g>
                <path
                  d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905   c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478   c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014   C52.216,18.553,51.97,16.611,51.911,16.242z M49.521,21.261c-0.984,4.172-3.265,7.973-6.59,10.985L25.855,47.481L9.072,32.25   c-3.331-3.018-5.611-6.818-6.596-10.99c-0.708-2.997-0.417-4.69-0.416-4.701l0.015-0.101C2.725,9.139,7.806,3.826,14.158,3.826   c4.687,0,8.813,2.88,10.771,7.515l0.921,2.183l0.921-2.183c1.927-4.564,6.271-7.514,11.069-7.514   c6.351,0,11.433,5.313,12.096,12.727C49.938,16.57,50.229,18.264,49.521,21.261z"
                  fill="#434343"
                />
              </g>
            </svg>
          </div>
        </div>
        {item.rating !== undefined && <RatingDisplay rating={item.rating} />}
        <p className="available-message">Your dates are available!</p>
        <div className="user-selection">
          <DateRangePicker
            startDate={startDate} // momentPropTypes.momentObj or null,
            startDateId="check_in" // PropTypes.string.isRequired,
            startDatePlaceholderText="Check In"
            endDatePlaceholderText="Check Out"
            endDate={endDate} // momentPropTypes.momentObj or null,
            endDateId="check_out" // PropTypes.string.isRequired,
            onDatesChange={({ startDate, endDate }) =>
              this.setState({ startDate, endDate })
            } // PropTypes.func.isRequired,
            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          />
          <div className="dropdown-group">
            <button
              type="button"
              className="guest-selector"
              onClick={() => this.toggleDropdown()}
            >{`${guests.adults + guests.children} Guest${
              guests.adults + guests.children > 1 ? "s" : ""
            } ${guests.pets ? ", Pets" : ""}`}</button>
            <Dropdown
              isOpen={dropdownIsOpen}
              onClick={() => this.toggleDropdown()}
            >
              <p>Adults:</p>
              <Counter min={1} onIncrement={i => this.updateAdultGuests(i)} />
              <p>Children:</p>
              <Counter
                min={0}
                onIncrement={i => this.updateChildrenGuests(i)}
              />
              <p>Pets:</p>
              <RadioGroup
                options={[
                  { label: "Yes", value: "yes" },
                  { label: "No", value: "no" }
                ]}
                checked={guests.pets ? "yes" : "no"}
                onChange={i =>
                  this.setState({
                    guests: {
                      ...guests,
                      pets: i === "yes" ? true : false
                    }
                  })
                }
              />
              <div className="button-group">
                <button
                  type="button"
                  className="apply-guests"
                  onClick={() => this.toggleDropdown()}
                >
                  Apply
                </button>
              </div>
            </Dropdown>
          </div>
        </div>
        <div className="total-pricing">
          <div>
            <p>Total</p>
            <p>Includes tax and fees</p>
          </div>
          <div>
            <h4>{`$${item.price}`}</h4>
            <button type="button" className="show-details">
              View details
            </button>
          </div>
        </div>
        <button
          onClick={() => this.props.onClickBook()}
          type="button"
          className="request-book main-btn"
        >
          Book Now
        </button>
      </div>
    );
  }
}

export default PropertyDetails;
