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
        this.props.logout();
    }

    render() {
        return (
            <nav>
                <header>
                    <Link to="/">
                        <img src="" alt="Brand Logo" />>
                    </Link>
                </header>
                {this.props.currentUser.isAuthenticated ?
                <div>
                    <h3>Hi, {this.props.currentUser.user.username}</h3>
                    <span>
                        <a onClick={this.logout} >Log Out</a>
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
                }
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