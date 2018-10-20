import React, { Component, createRef } from "react";
import "styles/counter.scss";

class Counter extends Component {
  constructor(props) {
    super(props);
    this.input = createRef();
    this.state = {
      currentValue: props.min
    };
  }
  onChange = () => {
    const currentValue = this.input.current.value;
    this.setState({ currentValue });
  };
  onBlur = () => {
    this.input.current.value.length === 0 &&
      this.setState({ currentValue: this.props.min });
  };
  incrementBy = i => {
    const { min } = this.props;
    const currentValue =
      this.state.currentValue + i < min ? min : this.state.currentValue + i;
    this.setState({ currentValue });
  };
  componentDidUpdate(prevProps, prevState) {
    prevState.currentValue !== this.state.currentValue &&
      this.props.onIncrement(this.state.currentValue);
  }
  render() {
    const { currentValue } = this.state;
    return (
      <div className="counter">
        <button type="button" onClick={() => this.incrementBy(-1)}>
          -
        </button>
        <input
          type="number"
          name="countervalue"
          min={this.props.min}
          value={currentValue}
          onChange={this.onChange}
          onBlur={this.onBlur}
          ref={this.input}
        />
        <button type="button" onClick={() => this.incrementBy(1)}>
          +
        </button>
      </div>
    );
  }
}

Counter.defaultProps = {
  min: 0
};

export default Counter;
