import React, { createRef } from "react";

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.input = createRef();
    this.country = createRef();
    this.street = createRef();
    this.unit = createRef();
    this.st = createRef();
    this.pcode = createRef();
    this.state = {
      showCityInput: props.values.location.label === undefined,
      values: {
        location: props.values.location,
        country: props.values.country,
        street: props.values.street,
        unit: props.values.unit,
        state: props.values.street,
        pcode: props.values.pcode
      }
    };
  }
  componentDidMount() {
  }
  onChangeLocation = () => {
  };
  componentWillUnmount() {
    this.props.onChange(this.state.values);
  }
  handleSubmit = e => {
    e.preventDefault();
    const data = {
      location: this.state.location
    };
    axios.post("http://localhost:3001/Owner/Location", data).then(response => {
      console.log("Axios POST response:", response.status);
      if (response.status === 200) {
        console.log(response);
      } else {
        console.log(response);
      }
    });
  };
  changeLocation = () => {
    this.setState({ showCityInput: true });
  };
  render() {
    const { location, country, state, unit, street, pcode } = this.state.values;
    console.log(location);
    return (
      <div>
        <div className="content-panel-container col-md-7" />
        <div className="panel-body">
          {this.props.onClickNextButton()}
          <h2>Location</h2>
          <hr />
          <form className="location-form">
            <div className="form-group">
              <label>Country</label>
              <input
                ref={this.country}
                value={country}
                onChange={() =>
                  this.setState({
                    values: {
                      ...this.state.values,
                      country: this.country.current.value
                    }
                  })
                }
                id="country"
                type="text"
                className="form-control small"
              />
            </div>
            <div className="form-group">
              <label>Street Address</label>
              <input
                value={street}
                ref={this.street}
                id="address"
                type="text"
                className="form-control"
                onChange={() =>
                  this.setState({
                    values: {
                      ...this.state.values,
                      street: this.street.current.value
                    }
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Unit, Suite, Building, Etc.</label>
              <input
                value={unit}
                ref={this.unit}
                id="unit"
                type="text"
                className="form-control"
                onChange={() =>
                  this.setState({
                    values: {
                      ...this.state.values,
                      unit: this.unit.current.value
                    }
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>City</label>
              {this.state.showCityInput ? (
                <input
                  autoFocus
                  id="city"
                  type="text"
                  className="form-control small"
                  placeholder=""
                  autoComplete="off"
                  ref={this.input}
                  onChange={() => this.onChangeLocation()}
                />
              ) : (
                <div className="city-label">
                  <span>{location.label}</span>
                  <button
                    type="button"
                    className="change-location"
                    onClick={this.changeLocation}
                  >
                    Change
                  </button>
                </div>
              )}
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                value={state}
                ref={this.st}
                id="state"
                type="text"
                className="form-control small"
                onChange={() =>
                  this.setState({
                    values: {
                      ...this.state.values,
                      state: this.st.current.value
                    }
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Postal Code</label>
              <input
                value={pcode}
                ref={this.pcode}
                id="postal"
                type="text"
                className="form-control small"
                onChange={() =>
                  this.setState({
                    values: {
                      ...this.state.values,
                      pcode: this.pcode.current.value
                    }
                  })
                }
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

Location.defaultProps = {
  values: {
    location: {
      id: "",
      label: undefined
    },
    country: "",
    street: "",
    unit: "",
    state: "",
    pcode: ""
  }
};

export default Location;
