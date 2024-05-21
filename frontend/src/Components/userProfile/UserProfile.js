import React, { Component } from "react";
import "./userProfile.css";

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  toggleInfo = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  render() {
    return (
      <div className="main__userprofile">
        <div className="profile__card user__profile__image">
          <div className="profile__image">
            <img
              src="https://images.unsplash.com/photo-1546967191-fdfb13ed6b1e?crop=faces&fit=crop&w=200&h=200"
              alt="Profile"
            />
          </div>
          <h4>Mary Owusu</h4>
          <p>Student</p>
        </div>
        <div className={`profile__card ${this.state.isOpen ? 'open' : ''}`}>
          <div className="card__header" onClick={this.toggleInfo}>
            <h4>View profile</h4>
            <i className={`fa ${this.state.isOpen ? 'fa-angle-up' : 'fa-angle-down'}`}></i>
          </div>
          <div className="card__content">
            <p><strong>Name:</strong> Mary Owusu</p>
            <p><strong>Status:</strong> Student</p>
            <p><strong>Bio:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ultrices urna a imperdiet egestas. Donec in magna quis ligula venenatis malesuada.</p>
            <p><strong>Email:</strong> mary.owusu@example.com</p>
            <p><strong>Phone:</strong> (123) 456-7890</p>
          </div>
        </div>
      </div>
    );
  }
}