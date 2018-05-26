import axios from "axios";
import {addError, clearError} from "./errors";

//User ACtions
function setCurrentUser(user) {
    return {
        type : "Ser_Current_User",
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

function setAuthToken(token) {
    setTokenHeader(token);
}

export function logout() {
    return dispatch => {
        localStorage.clear();
        setAuthToken(false);
        dispatch(setCurrentUser({}));
    }
}

//type = signin or signup
export function authUser(type, userData) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return axios.post("/api/user/" + type, userData)
                .then(function({token, ...user}){
                    localStorage.setItem("jwtToken", token);
                    setAuthToken(token);
                    dispatch(setCurrentUser(user));
                    dispatch(clearError);
                    resolve(); //Successful api call
                })
                .catch(err => {
                    dispatch(addError(err.message));
                    reject(); //Failed api call
                })
        });
    }
}
