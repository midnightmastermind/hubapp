import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
        <div className="title-screen">
            <div className="main-header">
                <div className="App-logo" alt="logo"></div>
                <div className="main-title"><span className="thin">Explore</span> THE HUB</div>
            </div>
            <div className="user-options">
                <Link
                    to="/register"
                    style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                    }}
                    className="register-button btn btn-large waves-effect waves-light hoverable black-text accent-3"
                    >
                    Register
                </Link>
                <Link
                    to="/login"
                    style={{
                    width: "140px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px"
                    }}
                    className="login-button btn btn-large btn-flat waves-effect white black-text"
                    >
                    Log In
                </Link>
            </div>
        </div>
    );
  }
}
export default Landing;
