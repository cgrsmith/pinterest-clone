import axios from "axios";
import {addError, clearError} from "./errors";

//Post ACtions
function loadPosts(posts) {
    return {
        type : "Load_Posts",
        posts : posts
    }
}

function deletePost(postId) {
    return {
        type : "Delete_Posts",
        id : postId
    }
}
function loadSinglePost(post) {
    return {
        type : "Load_Single_Post",
        post : post
    }
}

export function getPosts() {
    return function(dispatch) {
        return axios.get("/api/posts")
            .then( res => {
                dispatch(loadPosts(res));
            })
            .catch(err =>{
                dispatch(addError(err.message));
            });
    }
}

export function createNewPost(newPost) {
    return function(dispatch, getState) {
        return axios.post("/api/posts", newPost)
            .then( res => {
                //do nothing
            })
            .catch(err =>{
                dispatch(addError(err.message));
            });
    }
}

export function getSinglePost(postId) {
    return function(dispatch) {
        return axios.get("/api/posts/" + postId)
            .then( res => {
                dispatch(loadSinglePost(res));
            })
            .catch(err =>{
                dispatch(addError(err.message));
            });
    }
}

export function editSinglePost(postId, editedPost) {
    return function(dispatch) {
        return axios.put("/api/posts/" + postId, editedPost)
            .then( res => {
                dispatch(loadSinglePost(res));
            })
            .catch(err =>{
                dispatch(addError(err.message));
            });
    }
}

export function removePost(postId) {
    return function(dispatch) {
        return axios.delete("/api/posts/" + postId)
            .then( res => {
                dispatch(deletePost(res));
            })
            .catch(err =>{
                dispatch(addError(err.message));
            });
    }
}