import React, {Component} from "react";

import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {logout} from "../store/actions/auth";

import "../style.css";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(e) {
        e.preventDefault();
        // console.log(this.props);
        this.props.logout();
        // this.props.history.push("/");
    }

    render() {
        let userDisplay = this.props.currentUser.isAuthenticated ?
            <div className="navListRight">
                <h3>Hi, {this.props.currentUser.user.username}</h3>
                <Link to={"/posts/new/"} className="navLink">
                    <span>Create Post</span>
                </Link>
                <Link to={"/user/" + this.props.currentUser.user.id} className="navLink">
                    <span>Profile</span>
                </Link>

                <a onClick={this.logout} className="navLink" >
                    <span >Log Out</span>
                </a >
            </div>
            :
            <div className="navListRight">
                <Link to="/signup" className="navLink">
                    <span>Sign Up</span>
                </Link>
                <Link to="/signin" className="navLink">
                    <span>Sign In</span>
                </Link>
            </div>
            
        return (
            <nav className="navTop">
                <Link to="/" className="navLogo">
                
                    <img src="" alt="C" />
                    <h2>Cloneterest</h2>
                
                </Link>
                {userDisplay}
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser : state.currentUser,
        isAuthenticated : state.user
    }
}

export default connect(mapStateToProps, {logout})(Navbar);