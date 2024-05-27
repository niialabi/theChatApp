import React, { Component, createRef } from "react";

import "./chatContent.css";
import Avatar from "../chatMessage/Avatar";
import ChatItem from "./ChatItem";
import axios from "axios";
import io from "socket.io-client";

export default class ChatContent extends Component {
  messagesEndRef = createRef(null);
  // chatItms = [
  //   {
  //     key: 1,
  //     image:
  //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&fit=crop&w=200&h=200",
  //     type: "",
  //     msg: "Hi Tim, How are you?",
  //   },
  //   {
  //     key: 2,
  //     image:
  //       "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?crop=faces&fit=crop&w=200&h=200",
  //     type: "other",
  //     msg: "I am fine.",
  //   },
  //   {
  //     key: 3,
  //     image:
  //       "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?crop=faces&fit=crop&w=200&h=200",
  //     type: "other",
  //     msg: "What about you?",
  //   },
  //   {
  //     key: 4,
  //     image:
  //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&fit=crop&w=200&h=200",
  //     type: "",
  //     msg: "Awesome these days.",
  //   },
  //   {
  //     key: 5,
  //     image:
  //       "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?crop=faces&fit=crop&w=200&h=200",
  //     type: "other",
  //     msg: "Finally. What's the plan?",
  //   },
  //   {
  //     key: 6,
  //     image:
  //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&fit=crop&w=200&h=200",
  //     type: "",
  //     msg: "what plan mate?",
  //   },
  //   {
  //     key: 7,
  //     image:
  //       "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?crop=faces&fit=crop&w=200&h=200",
  //     type: "other",
  //     msg: "I'm taliking about the tutorial",
  //   },
  // ];

  constructor(props) {
    super(props);
    this.state = {
      room: null,
      newMsg: "",
    };
    this.socket = io("http://localhost:5000");
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    // window.addEventListener("keydown", (e) => {
    //   if (e.keyCode === 13) {
    //     if (this.state.msg !== "") {
    //       this.chatItms.push({
    //         key: 1,
    //         type: "",
    //         msg: this.state.msg,
    //         image:
    //           "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?crop=faces&fit=crop&w=200&h=200",
    //       });
    //       this.setState({ chat: [...this.chatItms] });
    //       this.scrollToBottom();
    //       this.setState({ msg: "" });
    //     }
    //   }
    // });
    this.scrollToBottom();
    this.socket.on("connect", () => {
      console.log("connected to server");
    });
    console.log(this.props);
    console.log(this.state);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedRoomId !== prevProps.selectedRoomId) {
      console.log(this.props.selectedRoomId);
      if (!this.props.selectedRoomId) return;
      const roomId = this.props.selectedRoomId;
      const token = localStorage.getItem("X-Token");
      axios
        .get(`http://localhost:5000/rooms/${roomId}`, {
          headers: {
            "X-Token": token,
          },
        })
        .then((response) => {
          this.setState({ room: response.data.room });
        })
        .catch((error) => {
          console.log(error);
          if (error.resposne.data.error) console.log(error.response.data.error);
        });

      if (prevProps.selectedRoomId) this.leaveRoom(prevProps.selectedRoomId);
      this.joinRoom(roomId);

      this.socket.on(`message`, (data) => {
        console.log(data);
        this.setState(
          (prevState) => ({
            room: {
              ...prevState.room,
              messages: [...prevState.room.messages, data.message],
            },
          }),
          this.scrollToBottom
        );
      });
    }
  }

  joinRoom = (roomId) => {
    this.socket.emit("joinRoom", roomId);
  };

  leaveRoom = (roomId) => {
    this.socket.emit("leaveRoom", roomId);
  };

  onStateChange = (e) => {
    this.setState({ newMsg: e.target.value });
  };

  sendMsg = (e) => {
    if (this.state.newMsg === "") return;
    const message = {
      owner: this.props.userId,
      content: this.state.newMsg,
      roomId: this.props.selectedRoomId,
    };
    this.socket.emit("message", { message });
    this.setState({ newMsg: "" });
  };

  render() {
    return (
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            <div className="current-chatting-user">
              <Avatar isOnline="active" image="https://placehold.co/50x50" />
              <p>{this.state.room ? this.state.room.name : ""}</p>
            </div>
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            {this.state.room
              ? this.state.room.messages.map((msg, index) => {
                  return (
                    <ChatItem
                      animationDelay={index + 2}
                      key={msg._id}
                      side={msg.owner === this.props.userId ? "me" : "other"}
                      owner={msg.owner}
                      content={msg.content}
                    />
                  );
                })
              : ""}
            <div ref={this.messagesEndRef} />
          </div>
        </div>
        <div className="content__footer">
          <div className="sendNewMessage">
            <button className="addFiles">
              <i className="fa fa-plus"></i>
            </button>
            <input
              type="text"
              placeholder="Type a message here"
              onChange={this.onStateChange}
              value={this.state.newMsg}
            />
            <button
              className="btnSendMsg"
              onClick={this.sendMsg}
              id="sendMsgBtn"
            >
              <i className="fa fa-paper-plane"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
