import React, { Component } from "react";
import "./chatBody.css";
import ChatMessage from "../chatMessage/ChatMessage";
import ChatContent from "../chatContent/ChatContent";
import axios from "axios";
import UserProfile from "../userProfile/UserProfile";
import Settings from "../Settings/Settings";

export default class ChatBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRoomId: null,
      userId: null,
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("X-Token");
    axios
      .get("http://localhost:5000/users/me", {
        headers: {
          "X-Token": token,
        },
      })
      .then((response) => {
        this.setState({ userId: response.data.id });
      })
      .catch((error) => {
        console.log(error);
        if (error.resposne.data.error) console.log(error);
      });
  }

  handleChatSelection = (selectedRoomId) => {
    this.setState({ selectedRoomId });
  };

  render() {
    return (
      <div className="main_chatBody">
        <ChatMessage handleChatSelection={this.handleChatSelection} />
        <ChatContent
          selectedRoomId={this.state.selectedRoomId}
          userId={this.state.userId}
        />
        {/* <UserProfile />
        <Settings /> */}
      </div>
    );
  }
}
