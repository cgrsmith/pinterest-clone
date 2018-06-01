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
            <div>
                <h3>Hi, {this.props.currentUser.user.username}</h3>
                <Link to={"/posts/new/"}>
                    <span>Create Post</span>
                </Link>
                <Link to={"/user/" + this.props.currentUser.user.id}>
                    <span>Profile</span>
                </Link>
                <span>
                    <a onClick={this.logout} >Log Out</a >
                </span>
            </div>
            :
            <div>
                <span>
                    <Link to="/signup" className="navLink">Sign Up</Link>
                </span>
                <span>
                    <Link to="/signin" className="navLink">Sign In</Link>
                </span>
            </div>
            
        return (
            <nav>
                <header>
                    <Link to="/">
                        <img src="" alt="Brand Logo" />>
                    </Link>
                </header>
                {userDisplay}
                <hr />
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