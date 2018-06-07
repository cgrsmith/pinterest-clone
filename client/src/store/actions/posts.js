import axios from "axios";
import {addError, clearError} from "./errors";
import {cloudinaryUpload} from "../../services/externalApi";


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
                dispatch(loadPosts(res.data));
            })
            .catch(err =>{
                dispatch(addError(err.message));
            });
    }
}


export function createNewPost(newPost, newPostImage) {
    return function(dispatch, getState) {
        //Temporarily remove Auth header to interact with Clodinary API
        const authHeader = axios.defaults.headers.common["Authorization"];
        delete axios.defaults.headers.common["Authorization"];
        //Upload image to cloudinary
        return cloudinaryUpload(newPostImage, "post")
            .then(res => {
                //Reinsert Auth header
                axios.defaults.headers.common["Authorization"] = authHeader;
                axios.post("/api/posts", {
                    ...newPost,
                    image : res.data.secure_url
                })
            })
            .catch(err =>{
                //Reinsert Auth header in the event of cloudinary failure
                axios.defaults.headers.common["Authorization"] = authHeader;
                dispatch(addError(err.message));
            });
    }
}


export function getSinglePost(postId) {
    return function(dispatch) {
        return axios.get("/api/posts/" + postId)
            .then( res => {
                dispatch(loadSinglePost(res.data));
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
                dispatch(loadSinglePost(res.data));
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
                dispatch(deletePost(postId));
            })
            .catch(err =>{
                dispatch(addError(err.message));
            });
    }
}