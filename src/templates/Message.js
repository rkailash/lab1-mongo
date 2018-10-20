import React from "react";
import "styles/message.scss";

const Message = ({ avatar, content, owner, team, timestamp }) => {
  return (
    <div id={"message"}>
      <div id={"gutter"}>
        <div id={"icon"}>
          <button
            id={"thumb"}
            style={{ backgroundImage: "url(" + avatar + ")" }}
            aria-hidden="true"
            tabIndex="-1"
          />
        </div>
      </div>
      <div id={"content"}>
        <div id={"header"}>
          <span>{owner}</span>
          ,&nbsp;
          <span>{team}</span>
        </div>
        <span id={"body"}>{content}</span>
        <div id={"footer"}>
          <div id={"timestamp"}>
            <span>{timestamp.date}</span>
            ,&nbsp;
            <span>{timestamp.time}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
