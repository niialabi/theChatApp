import React, { Component } from "react";
import "./chatMessage.css";
import ChatListItems from "./ChatMessageItems";
import axios from "axios";
import SearchInput from "./SearchInput";
import Logout from "../Auth/Logout";
import { Link } from "react-router-dom";
import NewChat from "./NewChat";

export default class ChatMessage extends Component {
  // allChatUsers = [
  //   {
  //     image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?crop=faces&fit=crop&w=200&h=200",
  //     id: 1,
  //     name: "Steven Crown",
  //     active: true,
  //     isOnline: true,
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?crop=faces&fit=crop&w=200&h=200",
  //     id: 2,
  //     name: " Alice Ayub ",
  //     active: false,
  //     isOnline: false,
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=faces&fit=crop&w=200&h=200",
  //     id: 3,
  //     name: "Kofi Kwame",
  //     active: false,
  //     isOnline: false,
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=faces&fit=crop&w=200&h=200",
  //     id: 4,
  //     name: "Alabi Ali",
  //     active: false,
  //     isOnline: true,
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?crop=faces&fit=crop&w=200&h=200",
  //     id: 5,
  //     name: "Elsa Brown",
  //     active: false,
  //     isOnline: false,
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1545420331-2615287d15bb?crop=faces&fit=crop&w=200&h=200",
  //     id: 6,
  //     name: "Emmanuella Aye",
  //     active: false,
  //     isOnline: true,
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?crop=faces&fit=crop&w=200&h=200",
  //     id: 7,
  //     name: "Kelvina Kubi",
  //     active: false,
  //     isOnline: true,
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?crop=faces&fit=crop&w=200&h=200",
  //     id: 8,
  //     name: "Mary Owusu",
  //     active: false,
  //     isOnline: false,
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=faces&fit=crop&w=200&h=200",
  //     id: 9,
  //     name: "Allen koi",
  //     active: false,
  //     isOnline: true,
  //   },
  //   {
  //     image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=faces&fit=crop&w=200&h=200",
  //     id: 10,
  //     name: "Davina David",
  //     active: false,
  //     isOnline: true,
  //   },
  // ];

  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
    };
  }

  componentDidMount() {
    const token = localStorage.getItem("X-Token");
    axios
      .get("http://localhost:5000/rooms", {
        headers: {
          "X-Token": token,
        },
      })
      .then((response) => {
        this.setState({ rooms: response.data.rooms });
      })
      .catch((error) => {
        console.log(error);
        if (error.resposne.data.error) console.log(error);
      });
  }

  render() {
    return (
      <div className="main__chatlist">
        <div className="chatlist__heading">
          <h2>App</h2>
          <button className="btn-nobg">
            <Logout />
          </button>
        </div>
        <div className="main__chatlist">
            <button className="btn">
              <NewChat />
           </button>
        </div>
        <div className="chatList__search">
          <div className="search_wrap">
            <SearchInput />
          </div>
        </div>
        <div className="chatlist__items">
          {this.state.rooms.map((room, index) => {
            return (
              <ChatListItems
                id={room._id}
                name={room.name}
                key={room._id}
                animationDelay={index + 1}
                active={room.active ? "active" : ""}
                isOnline={room.isOnline ? "active" : ""}
                onSelectChat={this.props.handleChatSelection}
                // image={room.image}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
