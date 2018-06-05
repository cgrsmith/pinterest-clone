import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Moment from "react-moment";
import {getSinglePost, editSinglePost, deletePost} from "../store/actions/posts";

import CommentsList from "./CommentsList";

import testPic from "../images/testPic.jpg";

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
                <img src={testPic}/>
                <h2>{this.props.post.title}</h2>
                <span>Posted </span>
                <Moment className="commentTime" format="DD-MM-YYYY">{this.props.post.createdAt}</Moment>
                <span> by </span>
                <Link to={"/user/"+this.props.post.user._id}>
                    <span>{this.props.post.user.username}</span>
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
            <div className="pinDisplay">
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