import React, { Component } from 'react';
import './setting.css';

export default class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: true,
      darkMode: false,
      privacy: 'friends', // Options: 'public', 'friends', 'private'
    };
  }

  handleToggle = (setting) => {
    this.setState((prevState) => ({
      [setting]: !prevState[setting],
    }));
  };

  handlePrivacyChange = (event) => {
    this.setState({ privacy: event.target.value });
  };

  render() {
    return (
      <div className="settings">
        <div className="blocks">
            <div className="settings">
              <button className="btn-nobg">
                <i className="fa fa-cog"></i>
                <h2>Settings</h2>
              </button>
            </div>
          </div>
        <div className="setting-item">
          <label>Notifications</label>
          <input
            type="checkbox"
            checked={this.state.notifications}
            onChange={() => this.handleToggle('notifications')}
          />
        </div>
        <div className="setting-item">
          <label>Dark Mode</label>
          <input
            type="checkbox"
            checked={this.state.darkMode}
            onChange={() => this.handleToggle('darkMode')}
          />
        </div>
        <div className="setting-item">
          <label>Privacy</label>
          <select value={this.state.privacy} onChange={this.handlePrivacyChange}>
            <option value="public">Public</option>
            <option value="friends">Friends</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="main__chatlist">
            <button className="btn">
              <i className="fa fa-plus"></i>
              <span>New Chat</span>
           </button>
          </div>
      </div>
    );
  }
}