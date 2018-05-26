import axios from "axios";
import {addError, clearError} from "./errors";

function loadUserProfile(user) {
    return {
        type : "Load_User_Profile",
        user : user
    }
}

export function getUser(userId) {
    return function(dispatch) {
        return axios.get("/api/user/" + userId)
            .then(res => {
                loadUserProfile(res);
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}

export function editUser(userId, editedUser) {
    return function(dispatch) {
        return axios.put("/api/user/" + userId, editedUser)
            .then(res => {
                loadUserProfile(res);
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}

