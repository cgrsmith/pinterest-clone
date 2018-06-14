import axios from "axios";
import {addError, clearError} from "./errors";
import {cloudinaryUpload} from "../../services/externalApi";
import {setCurrentUser} from "./auth";

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
                dispatch(loadUserProfile(res.data));
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}

export function editUser(userId, editedUser) {
    return async function(dispatch) {
        let user = {
            profileText : editedUser.profileText
        }
        if (editedUser.profileImage) {
            const authHeader = axios.defaults.headers.common["Authorization"];
            delete axios.defaults.headers.common["Authorization"];
            try {
                const imageUpload = await cloudinaryUpload(editedUser.profileImage, "profile");
                user.profileImage = imageUpload.data.secure_url;
                axios.defaults.headers.common["Authorization"] = authHeader;
            } catch(err) {
                axios.defaults.headers.common["Authorization"] = authHeader;
                return err;
            }
        }
        return axios.put("/api/user/" + userId, user)
            .then(res => {
                dispatch(loadUserProfile(res.data));
            })
            .catch(err => {
                dispatch(addError(err.message));
            });
    }
}

export async function signupUser(userData) {
    let user = {
        email : userData.email,
        username : userData.username,
        profileText : userData.profileText,
        password :userData.password
    }
    if (userData.profileImage) {
        try {
            const imageUpload = await cloudinaryUpload(userData.profileImage, "profile");
            user.profileImage = imageUpload.data.secure_url;
        } catch(err) {
            return err;
        }
    }
    return axios.post("/api/user/signup", user);
}

export function signinUser(userData) {
    return axios.post("/api/user/signin", userData)
}