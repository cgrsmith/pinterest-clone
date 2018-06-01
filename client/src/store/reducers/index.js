import {combineReducers} from "redux";

import currentUser from "./currentUser";
import posts from "./posts";
import comments from "./comments";
import {errors, loading, singlePost, userView} from "./other";

const rootReducer = combineReducers({
    currentUser : currentUser,
    posts : posts,
    comments : comments,
    errors : errors,
    loading : loading,
    singlePost : singlePost,
    userView : userView,
});

export default rootReducer;