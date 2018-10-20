import { connect } from "react-redux";
import React from "react";
import { fetchMessages, submitMessage } from "../actions";
import Messages from "../Messages";

const mapStateToProps = state => {
  const messages = state.messages.messages;
  return { messages };
};

const mapDispatchToProps = dispatch => {
  return {
    submitMessage: message => {
      dispatch(submitMessage(message));
    },
    fetchMessages: id => {
      dispatch(fetchMessages(id));
    }
  };
};

class MessagesContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.fetchMessages(this.props.orderId);
  }
  render() {
    return <Messages {...this.props} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagesContainer);
