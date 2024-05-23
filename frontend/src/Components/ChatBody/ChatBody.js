import React, { Component } from "react";
import "./chatBody.css";
import ChatMessage from "../chatMessege/ChatMessage";
import ChatContent from "../chatContent/ChatContent";
import UserProfile from "../userProfile/UserProfile";
import Settings from "../Settings/Settings";

export default class ChatBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRoomId: null,
    };
  }

  handleChatSelection = (selectedRoomId) => {
    this.setState({ selectedRoomId });
  };

  render() {
    return (
      <div className="main_chatBody">
        <ChatMessage handleChatSelection={this.handleChatSelection} />
        <ChatContent selectedRoomId={this.state.selectedRoomId} />
        <UserProfile />
        <Settings />
      </div>
    );
  }
}
