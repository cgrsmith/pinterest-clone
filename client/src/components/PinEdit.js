import React, {Component} from "react";
import {connect} from "react-redux";

import {editSinglePost, getSinglePost} from "../store/actions/posts";

//Used to create and edit a Pin
class PinEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postTitle : "",
            postDescription : ""
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
            description : this.state.postDescription
        }
        this.props.editSinglePost(this.props.postId, postSubmission)
            .then(() => {
                this.setState({postTitle : "", postDescription : "", postImage : ""});
                this.props.history.push("/posts/" + this.props.postId);
            })
            .catch(err => {
                return err;
            });
    }

    componentWillMount() {
        //prefill
        //this.props.getSinglePost(this.props.postid)
        this.setState({postTitle : this.props.post.title, postDescription : this.props.post.description})
    }

    render() {
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    <h2>Edit Post</h2> 
                    <div className="formSegment">
                        <label>Post Title: </label>
                        <input type="text" placeholder="" name="postTitle" value={this.state["postTitle"]}
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
        postId : props.postId,
        post : state.singlePost.post
    }
}

export default connect(mapStateToProps, {editSinglePost, getSinglePost})(PinEdit);