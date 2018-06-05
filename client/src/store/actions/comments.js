import axios from "axios";
import {addError, clearError} from "./errors";

//Comment ACtions
function loadComments(postId, comments) {
    return {
        type : "Load_Comments",
        commentsPost : postId, 
        comments : comments
    }
}

function addComment(newComment) {
    return {
        type : "Add_Comment",
        newComment : newComment
    }
}

function deleteComment(commentId) {
    return {
        type : "Delete_Comment",
        id : commentId
    }
}

export function getComments(postId) {
    return function(dispatch) {
        return axios.get("/api/posts/" + postId +"/comments")
            .then( res => {
                dispatch(loadComments(postId, res.data));
            })
            .catch(err =>{
                dispatch(addError(err.message));
            });
    }
}

export function createNewComment(postId, newComment) {
    return function(dispatch, getState) {
        return axios.post("/api/posts/" + postId +"/comments", newComment)
            .then( res => {
                dispatch(addComment(res.data));
            })
            .catch(err =>{
                dispatch(addError(err.message));
            });
    }
}

export function removeComment(postId, commentId) {
    return function(dispatch) {
        return axios.delete("/api/posts/" + postId +"/comments" + "/" + commentId)
            .then( res => {
                dispatch(deleteComment(res));
            })
            .catch(err =>{
                dispatch(addError(err.message));
            });
    }
}