import React, { createRef } from "react";
import Message from "templates/Message";
import "styles/messages.scss";

const users = {
  userIds: ["1"],
  avatarLocation: "",
  userById: {
    1: {
      userId: "1",
      userName: "pra7na",
      name: "Prasanna T",
      email: "prasanna.t@caratlane.com",
      phone: "9090990909",
      team: "Innovations",
      role: "Visualizer",
      avatarUrl: "images/admin.svg"
    }
  }
};

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.input = createRef();
  }
  onSubmitMessage = () => {
    const content = this.input.current.value;
    this.input.current.value = '';
    this.props.submitMessage(content);
  };
  render() {
    return (
      <div id={"comments"} style={{ height: "100%" }}>
        <div style={{ height: "100%", overflowY: "auto" }}>
          <div id={"messages"}>
            <div id={"message_container"}>
              <div id={"message_pane_scroller"}>
                {this.props.messages.map(item => (
                  <Message
                    key={item.id}
                    avatar={users.userById[1].avatarUrl}
                    content={item.message}
                    timestamp={item.timestamp}
                    owner={users.userById[1].name}
                    team={users.userById[1].team}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div id={"body"}>
          <form onSubmit={e => e.preventDefault()}>
            <div className={"editor"}>
              <textarea ref={this.input} onChange={() => this.onChange()} placeholder="Type a message..." />
            </div>
            <button
              id={"submit"}
              className={"active"}
              onClick={() => this.onSubmitMessage()}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Messages;
