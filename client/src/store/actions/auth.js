import axios from "axios";
import {addError, clearError} from "./errors";
import {signinUser, signupUser} from "./users";


//User ACtions
export function setCurrentUser(user) {
    return {
        type : "Set_Current_User",
        user : user
    }
}


function setTokenHeader(token) {
    if (token) {
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
}

export function setAuthToken(token) {
    setTokenHeader(token);
}

export function logout() {
    return dispatch => {
        localStorage.clear();
        setAuthToken(false);
        dispatch(setCurrentUser({}));
    }
}

export function authUser(type, userData) {
    if (type === "signin" ) {
        return dispatch => {
            return signinUser(userData)
                .then(res => {
                    let {token, ...user} = res.data;
                    localStorage.setItem("jwtToken", token);
                    setAuthToken(token);
                    dispatch(setCurrentUser(user));
                    dispatch(clearError());
                })
                .catch(err => {
                    dispatch(addError(err.message));
                })   
        }
    } else if (type === "signup") {
        return dispatch => {
            return signupUser(userData)
                .then(res => {
                    let {token, ...user} = res.data;
                    localStorage.setItem("jwtToken", token);
                    setAuthToken(token);
                    dispatch(setCurrentUser(user));
                    dispatch(clearError());
                })
                .catch(err => {
                    dispatch(addError(err.message));
                })
    
        }
    }
    
}
