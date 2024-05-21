import React, { Component } from 'react';
import "./chatBody.css";
import ChatList from '../chatmessege/ChatMessage';
import ChatContent from '../chatContent/ChatContent';
import UserProfile from '../userProfile/UserProfile';
import Settings from '../Settings/Settings';
import Nav from '../Nav/Nav';

export default class ChatBody extends Component {
    render() {
        return (
            <div className="main_chatBody">
                <ChatList />
                <ChatContent />
                <UserProfile />
                <Settings />
            </div>
        );
    }
}