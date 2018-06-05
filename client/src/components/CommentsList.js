import React, {Component} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Moment from "react-moment";
import {getComments, createNewComment} from "../store/actions/comments";

class CommentsList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newComment : ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        e.preventDefault();
        this.setState({newComment : e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        let submissionComment = {
            user : this.props.currentUser.id,
            text : this.state.newComment
        }
        this.props.createNewComment(this.props.postId, submissionComment);
        this.setState({newComment : ""})
    }

    componentWillMount() {
        this.props.getComments(this.props.postId);
    }

    render() {
        let commentsList =  (this.props.commentsPost === this.props.postId) ?
            this.props.comments.map((comment, index) => (
                <li className="comments" key={index}>
                    <hr />
                    <Link to={"/user/"+comment.user._id}>
                        <span className="commentAuthor">{comment.user.username}</span>
                    </Link>
                    <span> - </span>
                    <Moment className="commentTime" fromNow>{comment.createdAt}</Moment>
                    <p>{comment.text}</p>
                    {/* {index < this.props.comments.length ?
                        <hr /> : null
                    } */}
                </li>
            ))
            :
            <li>Loading Comments</li>

        return (
            <div  className="form">
                <form onSubmit={this.handleSubmit}>
                    <h4>Add a Comment:</h4>
                    <textarea value={this.state.newComment} onChange={this.handleChange}
                         className="input inputTextarea"/>
                    <button type="submit">Submit Comment</button>
                </form>
                <ul className="commentList">
                    {commentsList}
                </ul>
            </div>
        )
    }
}

function mapStateToProps(state, props){
    return {
        commentsPost : state.comments.commentsPost,
        comments : state.comments.currentComments,
        currentUser : state.currentUser.user,
        postId : props.postId
    }
}

export default connect(mapStateToProps, {getComments, createNewComment})(CommentsList);