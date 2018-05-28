import {combineReducers} from "redux";

import currentUser from "./currentUser";
import posts from "./posts";
import comments from "./comments";
import other from "./other";
import singleView from "./singleView";

const rootReducer = combineReducers({
    currentUser : currentUser,
    posts : posts,
    other : other,
    comments : comments,
    singleView : singleView
});

export default rootReducer;