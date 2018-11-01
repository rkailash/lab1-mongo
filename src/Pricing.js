import React, { createRef } from "react";

class Pricing extends React.Component {
  constructor(props) {
    super(props);
    this.price = createRef();
    this.state = {
      price: 0
    };
  }
  componentWillUnmount() {
    this.props.onChange(this.state);
  }
  render() {
    const { price } = this.state;
    return (
      <div className="pricing">
        {this.props.nextButton()}
        <h2>Pricing</h2>
        <form className="location-form">
          <div className="form-group">
            <label>Price</label>
            <input
              value={price}
              ref={this.price}
              id="price"
              type="number"
              className="form-control"
              onChange={() =>
                this.setState({ price: this.price.current.value })
              }
            />
          </div>
          <button
            type="button"
            className="main-btn submit"
            name="submit"
            onClick={() => this.props.handleSubmit(price)}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Pricing;
