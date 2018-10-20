import React, { Component } from "react";
import Messages from "containers/MessagesContainer";
import "styles/inbox.scss";

const items = [
  {
    name: "Bharadwaj Ramakrishnan"
  }
];

class Inbox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  inboxList = items => (
    <section id={"user_list"}>
      <ul id={"list_container"}>
        {items.map((item, key) => (
          <li className={"list_item"} key={key}>
            <a>
              <div className={"user_card"}>
                <img
                  className={"card_picture"}
                  src="http://placehold.it/100x100"
                />
                <div className={"card_info"}>
                  <div id={"name"}>{item.name}</div>
                </div>
                <span className={`arrow`} />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
  render() {
    return (
      <div className="inbox">
        <div id="user_list_wrap">{this.inboxList(items)}</div>
        <div id="user_profile_wrap">
          <Messages orderId={1} />
        </div>
      </div>
    );
  }
}

export default Inbox;
