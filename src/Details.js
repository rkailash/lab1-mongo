import React, { createRef } from "react";

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.headline = createRef();
    this.desc = createRef();
    this.type = createRef();
    this.bedrooms = createRef();
    this.bathrooms = createRef();
    this.accomodates = createRef();
    this.state = {
      values: {
        headline: props.values.headline,
        description: props.values.description,
        type: props.values.type,
        bedrooms: props.values.bedrooms,
        bathrooms: props.values.bathrooms,
        accomodates: props.values.accomodates
      }
    };
  }

  componentWillUnmount() {
    this.props.onChange(this.state.values);
  }
  render() {
    const {
      headline,
      description,
      type,
      bedrooms,
      bathrooms,
      accomodates
    } = this.state.values;
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          {this.props.onClickNextButton()}
          <h2>Describe your property</h2>
          <hr />
          <form className="details-form">
            <div className="form-group">
              <label>Headline</label>
              <input
                value={headline}
                ref={this.headline}
                id="headline"
                type="text"
                className="form-control"
                onChange={() =>
                  this.setState({
                    values: {
                      ...this.state.values,
                      headline: this.headline.current.value
                    }
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Property description</label>
              <input
                value={description}
                ref={this.desc}
                id="pdescription"
                type="text"
                className="form-control"
                onChange={() =>
                  this.setState({
                    values: {
                      ...this.state.values,
                      description: this.desc.current.value
                    }
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Property type</label>
              <input
                value={type}
                ref={this.type}
                id="ptype"
                type="text"
                className="form-control"
                onChange={() =>
                  this.setState({
                    values: {
                      ...this.state.values,
                      type: this.type.current.value
                    }
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Bedrooms</label>
              <input
                value={bedrooms}
                ref={this.bedrooms}
                id="bedrooms"
                type="text"
                className="form-control"
                onChange={() =>
                  this.setState({
                    values: {
                      ...this.state.values,
                      bedrooms: this.bedrooms.current.value
                    }
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Accomodates</label>
              <input
                value={accomodates}
                ref={this.accomodates}
                id="accomodates"
                type="text"
                className="form-control"
                onChange={() =>
                  this.setState({
                    values: {
                      ...this.state.values,
                      accomodates: this.accomodates.current.value
                    }
                  })
                }
              />
            </div>

            <div className="form-group">
              <label>Bathrooms</label>
              <input
                value={bathrooms}
                ref={this.bathrooms}
                id="bathrooms"
                type="text"
                className="form-control"
                onChange={() =>
                  this.setState({
                    values: {
                      ...this.state.values,
                      bathrooms: this.bathrooms.current.value
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

Details.defaultProps = {
  values: {
    headline: "",
    description: "",
    type: "",
    bedrooms: "",
    bathrooms: "",
    accomodates: ""
  }
};

export default Details;
