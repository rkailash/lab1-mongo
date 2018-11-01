import React, { Component } from "react";
import {
  DateRangePicker,
  SingleDatePicker,
  DayPickerRangeController
} from "react-dates";
import Select from "react-select";
import Counter from "templates/Counter";
import RadioGroup from "templates/RadioGroup";
import Dropdown from "templates/Dropdown";
import moment from "moment";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "styles/search.scss";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownIsOpen: false,
      startDate: null,
      endDate: null,
      guests: {
        adults: 1,
        children: 0,
        pets: false
      },
      location: null,
      showError: false
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
  onEnter = () => {
    this.onClickSearch();
  }
  toggleDropdown = () =>
    this.setState({ dropdownIsOpen: !this.state.dropdownIsOpen });
  onClickSearch = () => {
    const {location} = this.state;
    this.props.onClick({
      location,
    });
  };
  render() {
    const {
      guests,
      startDate,
      endDate,
      focusedInput,
      dropdownIsOpen,
      location,
      showError
    } = this.state;
    const { query } = this.props;
    return (
      <div className="search">
        <input
          className={`location-search${showError && !location ? " error" : ""}`}
          placeholder={`${
            query !== undefined
              ? query.location
              : "Where do you want to go?"
          }`}
          onKeyPress={(e) => e.key == 'Enter' && this.onEnter()}
          onFocus={() => this.setState({ showError: false })}
          onChange={(e) => this.setState({ location: e.target.value })}
        />
        <div className="v-line" />
        <button
          className={`my-date-range${
            showError && !startDate && !endDate ? " error" : ""
          }`}
          onClick={() => this.setState({ showError: false })}
        >
          <DateRangePicker
            startDate={startDate} // momentPropTypes.momentObj or null,
            startDateId="listing_header_start_date" // PropTypes.string.isRequired,
            endDate={endDate} // momentPropTypes.momentObj or null,
            endDateId="listing_header_end_date" // PropTypes.string.isRequired,
            startDatePlaceholderText={
              query === undefined
                ? "Arrive"
                : moment(query.startDate).format("YYYY-MM-DD")
            }
            endDatePlaceholderText={
              query === undefined
                ? "Depart"
                : moment(query.endDate).format("YYYY-MM-DD")
            }
            onDatesChange={({ startDate, endDate }) =>
              this.setState({ startDate, endDate })
            } // PropTypes.func.isRequired,
            focusedInput={focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
            onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
          />
        </button>
        <div className="v-line" />
        <div
          className="dropdown-group"
          onClick={() => this.setState({ showError: false })}
        >
          <button
            type="button"
            className="guest-selector"
            onClick={this.toggleDropdown}
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
            <Counter min={0} onIncrement={i => this.updateChildrenGuests(i)} />
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
        <div className="v-line" />
        <div className="submit">
          <button type="button" id="Popover2" onClick={this.onClickSearch}>
            Search
          </button>
          <Popover
            placement="bottom"
            isOpen={this.state.showError}
            target="Popover2"
          >
            <PopoverHeader>Error</PopoverHeader>
            <PopoverBody>
              {location || <p>Please choose a location.</p>}
              {(!!startDate && !!endDate) || <p>Select valid dates</p>}
            </PopoverBody>
          </Popover>
        </div>
      </div>
    );
  }
}

export default Search;
