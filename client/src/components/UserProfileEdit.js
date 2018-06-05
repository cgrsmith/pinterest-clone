import React, {Component} from "react";
import {connect} from "react-redux";

import {editUser} from "../store/actions/users";

//Used to create and edit a Pin
class UserProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileImage : "",
            profileText : ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let userSubmission = {
            profileImage : this.state.profileImage,
            profileText : this.state.profileText
        }
        this.props.editUser(this.props.userId, userSubmission)
            .then(() => {
                this.setState({postTitle : "", postDescription : "", postImage : ""});
                this.props.history.push("/user/" + this.props.userId);
            })
            .catch(err => {
                return err;
            });
    }

    componentWillMount() {
        //this.setState({profileImage : this.props.user.profileImage, profileText : this.props.user.profileText});
    }

    render() {
        return (
            <div className="form"> 
                <form onSubmit={this.handleSubmit}>
                    <h2>Edit User Profile</h2> 
                    <div className="formSegment">
                        <label>Profile Image: </label>
                        <input type="text" placeholder="" name="profileImage" value={this.state["profileImage"]}
                            onChange={this.handleChange} className="input inputSmall"/>
                    </div>
                    <div className="formSegment">
                        <label>Profile Text: </label>
                        <textarea name="profileText" value={this.state["profileText"]} 
                            onChange={this.handleChange} className="input inputTextarea"/>
                    </div>

                    <button type="submit">
                        Submit
                    </button>
                </form> 
            </div>
        )
    }
}

function mapStateToProps(state, props){
    return {
        userId : props.userId,
        user : state.currentUser.user
    }
}

export default connect(mapStateToProps, {editUser})(UserProfileEdit);