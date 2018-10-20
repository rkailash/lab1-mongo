import React, { createRef } from "react";

class Pricing extends React.Component {
  constructor(props) {
    super(props);
    this.price = createRef();
    this.state = {
      price: props.price
    };
  }
  componentWillUnmount() {
    this.props.onChange(this.state.price);
  }
  render() {
    const { price } = this.state;
    return (
      <div className="pricing">
        {this.props.onClickNextButton()}
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

Pricing.defaultProps = {
  price: 0
};

export default Pricing;
