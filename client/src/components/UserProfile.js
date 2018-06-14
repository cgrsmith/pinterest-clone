import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Moment from "react-moment";
import {getUser} from "../store/actions/users";

import UserPostList from "./UserPostList";

import testPic from "../images/testPic.jpg";


class UserProfile extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        if (this.props.user._id !== this.props.userId) {
            this.props.getUser(this.props.userId);
        }
        
    }
    render() {
        let thisUser =  this.props.user._id === this.props.userId ?
            //User Display once loaded
            <div>
                <img src={this.props.user.profileImage} alt="Profile Image" />
                <h2>{this.props.user.username}</h2>
                <span>Joined </span>
                <Moment className="commentTime" fromNow>
                    {this.props.user.createdAt} 
                </Moment>
                <p>{this.props.user.profileText}</p> 
                
                {this.props.currentUser.id === this.props.userId ? //Only show profile edit if profile is current user
                    <Link to={"/user/" + this.props.userId + "/edit"} style={{ textDecoration: 'none' }}>
                        <button className="button">Edit Profile</button>
                    </Link>
                : false}
                
                <UserPostList posts={this.props.user.posts} />
            </div>
            //User Display prior to user being loaded
            : <div>Loading User Profile</div> ;

        return (
            <div className="centered pinDisplay">
                {thisUser}
            </div>
        )
    }
}

function mapStateToProps(state, props){
    return {
        currentUser : state.currentUser.user,
        user : state.userView.user,
        userId : props.userId
    }
}

export default connect(mapStateToProps, {getUser})(UserProfile);