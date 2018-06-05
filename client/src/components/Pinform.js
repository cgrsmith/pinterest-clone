import React, {Component} from "react";
import {connect} from "react-redux";

import {createNewPost} from "../store/actions/posts";

//Used to create and edit a Pin
class PinForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postTitle : "",
            postDescription : "",
            postImage : ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({[e.target.name] : e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let postSubmission = {
            title : this.state.postTitle,
            description : this.state.postDescription,
            image : this.state.postImage,
            user : this.props.currentUser.id
        }
        this.props.createNewPost(postSubmission)
            .then(() => {
                this.setState({postTitle : "", postDescription : "", postImage : ""});
                this.props.history.push("/");
            })
            .catch(err => {
                return err;
            });
    }

    render() {
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    <h2>Create Post</h2> 
                    <div className="formSegment">
                        <label>Post Title: </label>
                        <input type="text" placeholder="" name="postTitle" value={this.state["postTitle"]}
                            onChange={this.handleChange} className="input inputSmall"/>
                    </div>
                    <div className="formSegment">
                        <label>Post Image: </label>
                        <input type="text" placeholder="" name="postImage" value={this.state["postImage"]}
                            onChange={this.handleChange} className="input inputSmall"/>
                    </div>
                    <div className="formSegment">
                        <label>Post Text: </label>
                        <textarea name="postDescription" value={this.state["postDescription"]} 
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
        currentUser : state.currentUser.user
    }
}

export default connect(mapStateToProps, {createNewPost})(PinForm);