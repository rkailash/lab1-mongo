import React, { createRef } from "react";

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      headline: "",
      description: "",
      type: "",
      bedrooms: "",
      bathrooms: "",
      accomodates: ""
    };
  }
  componentWillUnmount() {
    this.props.onChange(this.state);
  }
  render() {
    const {
      headline,
      description,
      type,
      bedrooms,
      bathrooms,
      accomodates
    } = this.state;
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          {this.props.nextButton()}
          <h2>Describe your property</h2>
          <hr />
          <form className="details-form">
            <div className="form-group">
              <label>Headline</label>
              <input
                value={headline}
                id="headline"
                type="text"
                className="form-control"
                onChange={e =>
                  this.setState({
                    ...this.state,
                    headline: e.target.value
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Property description</label>
              <input
                value={description}
                id="pdescription"
                type="text"
                className="form-control"
                onChange={e =>
                  this.setState({
                    ...this.state,
                    description: e.target.value
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Property type</label>
              <input
                value={type}
                id="ptype"
                type="text"
                className="form-control"
                onChange={e =>
                  this.setState({
                    ...this.state,
                    type: e.target.value
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Bedrooms</label>
              <input
                value={bedrooms}
                id="bedrooms"
                type="text"
                className="form-control"
                onChange={e =>
                  this.setState({
                    ...this.state,
                    bedrooms: e.target.value
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Accomodates</label>
              <input
                value={accomodates}
                id="accomodates"
                type="text"
                className="form-control"
                onChange={e =>
                  this.setState({
                    ...this.state,
                    accomodates: e.target.value
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Bathrooms</label>
              <input
                value={bathrooms}
                id="bathrooms"
                type="text"
                className="form-control"
                onChange={e =>
                  this.setState({
                    ...this.state,
                    bathrooms: e.target.value
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

export default Details;
