import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getUser} from "../store/actions/users";

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
                <h3>{this.props.user.username}</h3>
                <img src={this.props.user.profileImage} alt="Profile Image" />
                <p>Joined: {this.props.user.createdAt}</p>
                <p>{this.props.user.profileText}</p> 
                
                {this.props.currentUser.id === this.props.userId ? //Only show profile edit if profile is current user
                <Link to={"/user/" + this.props.userId + "/edit"}>
                    <span>Edit Profile</span>
                </Link>
                : false}

                <ul>
                    {this.props.user.posts.map((post, index) => (
                        <Link to={"/posts/" + post._id} key={index}>
                            <li>
                                {post.title}
                            </li>
                        </Link>
                    ))}
                </ul>
            </div>
            //User Display prior to user being loaded
            : <div>Loading User Profile</div> ;

        return (
            <div>
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