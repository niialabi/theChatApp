import React, { Component } from "react";

export default class Avatar extends Component {
  constructor(props) {
    super(props);
    // Future initialization can go here
  }

  render() {
    return (
      <div className="avatar">
        <div className="avatar-img">
          <img src={this.props.image} alt="User Avatar" />
        </div>
        <span className={`isOnline ${this.props.isOnline}`}></span>
      </div>
    );
  }
}