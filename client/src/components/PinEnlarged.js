import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {getSinglePost, editSinglePost, deletePost} from "../store/actions/posts";

import CommentsList from "./CommentsList";

class PinEnlarged extends Component {
    constructor(props) {
        super(props);
    }
    componentWillMount() {
        if (this.props.post._id !== this.props.postId) {
            this.props.getSinglePost(this.props.postId);
        }
    }
    render() {
        let thisPost =  this.props.post._id === this.props.postId ?
            <div>
                <img src=""/>
                <h4>{this.props.post.title}</h4>
                <p>Created {this.props.post.createdAt}</p>
                <Link to={"/user/"+this.props.post.user._id}>
                    <p>Created by: {this.props.post.user.username}</p>
                </Link>
                <p>{this.props.post.description}</p>
                {this.props.currentUser.id === this.props.post.user._id ? //Only show post edit if profile is current user
                <Link to={"/posts/" + this.props.postId + "/edit"}>
                    <span>Edit Post</span>
                </Link>
                : false}

            </div> 
            : 
            <div>
                Loading Post
            </div>
            ;



        return (
            <div>
                {thisPost}
                <CommentsList postId={this.props.postId}/>
            </div>
        )
    }
}

function mapStateToProps(state, props){
    return {
        currentUser : state.currentUser.user,
        post : state.singlePost.post,
        postId : props.postId
    }
}

export default connect(mapStateToProps, {getSinglePost})(PinEnlarged);