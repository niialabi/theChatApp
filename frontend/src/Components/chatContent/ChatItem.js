import React, { Component } from "react";
import Avatar from "../chatMessage/Avatar";
import "./chatContent.css";
import axios from "axios";

export default class ChatItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msgOwner: null,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("X-Token");
    axios
      .get(`http://localhost:5000/users/${this.props.owner}`, {
        headers: {
          "X-Token": token,
        },
      })
      .then((res) => {
        this.setState({ msgOwner: res.data.user });
        console.log(this.state);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div
        style={{ animationDelay: `0.8s` }}
        className={`chat__item ${this.props.side === "other" ? "other" : ""}`}
      >
        <div className="chat__item__content">
          <div className="chat__msg">{this.props.content}</div>
          <div className="chat__meta">
            <span>16 mins ago</span>
            <span style={{ fontWeight: "bold" }}>
              {this.state.msgOwner
                ? this.props.side === "other"
                  ? this.state.msgOwner.displayName
                  : ""
                : ""}
            </span>
          </div>
        </div>
        <Avatar isOnline="active" />
      </div>
    );
  }
}
