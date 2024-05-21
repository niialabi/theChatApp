import React, { Component } from 'react';
import "./nav.css";
import logo from "./../../images/logo5.jpg";

export default class Nav extends Component {
    render() {
        return (
            <div className="nav">
                <div className='nav_blocks'>
                    <img src={logo} alt=''></img>
                </div>
                <div className='nav_blocks'></div>
                <div className='nav_blocks'></div>
            </div>
        );
    }
}