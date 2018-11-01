import React from "react";

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      country: "",
      street: "",
      unit: "",
      state: "",
      zipcode: ""
    };
  }
  componentDidMount() {}
  componentWillUnmount() {
    this.props.onChange(this.state);
  }
  render() {
    const { city, country, state, unit, street, zipcode } = this.state;
    return (
      <div>
        <div className="content-panel-container col-md-7" />
        <div className="panel-body">
          {this.props.nextButton()}
          <h2>Location</h2>
          <hr />
          <form className="location-form">
            <div className="form-group">
              <label>Country</label>
              <input
                value={country}
                onChange={e =>
                  this.setState({
                    ...this.state,
                    country: e.target.value
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
                id="address"
                type="text"
                className="form-control"
                onChange={e =>
                  this.setState({
                    ...this.state,
                    street: e.target.value
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Unit, Suite, Building, Etc.</label>
              <input
                value={unit}
                id="unit"
                type="text"
                className="form-control"
                onChange={e =>
                  this.setState({
                    ...this.state,
                    unit: e.target.value
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <input
                autoFocus
                id="city"
                type="text"
                className="form-control small"
                placeholder=""
                autoComplete="off"
                onChange={e =>
                  this.setState({
                    ...this.state,
                    city: e.target.value
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                value={state}
                id="state"
                type="text"
                className="form-control small"
                onChange={e =>
                  this.setState({
                    ...this.state,
                    state: e.target.value
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Postal Code</label>
              <input
                value={zipcode}
                id="postal"
                type="text"
                className="form-control small"
                onChange={e =>
                  this.setState({
                    ...this.state,
                    zipcode: e.target.value
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

export default Location;
