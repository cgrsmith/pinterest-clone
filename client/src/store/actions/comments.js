import axios from "axios";
import {addError, clearError} from "./errors";

//Comment ACtions
function loadComments(comments) {
    return {
        type : "Load_Comments",
        comments : comments
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
                dispatch(loadComments(res));
            })
            .catch(err =>{
                dispatch(addError(err.message));
            });
    }
}

export function createNewComment(postId, newComment) {
    return function(dispatch, getState) {
        return axios.post("/api/posts/" + postId +"/comments", newPost)
            .then( res => {
                //do nothing
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