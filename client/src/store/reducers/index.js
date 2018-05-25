

const initialState = {
    errorMessage : null,

    isLoading : true,

    isAuthenticated : false,
    user : {},

    posts : [],

    currentPost : {},

    currentComments : []
}

export default function rootReducer(state = initialState, action) {
    switch(action.type) {
        //Error Reducers
        case "Add_Error" :
            return {...state, errorMessage : action.error};
        case "Clear_Error" :
            return {...state, errorMessage : null};
        case "Page_Is_Loading" :
            return {...state, errorMessage : action.isLoading};
        //User Reducers
        case "Set_Current_User" :
            return {
                ...state, 
                isAuthenticated : Object.keys(action.user) > 0,
                user : action.user
            };
        //Post Reducers
        case "Load_Posts" :
            return {
                ...state,
                posts : action.posts
            };
        case "Load_Single_Post" :
            return {
                ...state,
                currentPost : action.post
            };
        case "Delete_Post" :
            return  {
                ...state,
                posts : state.posts.filter(post => post._id !== action.id)
            };
        //Comment Reducers
        case "Load_Comments" :
            return {
                ...state,
                currentComments : action.comments
            };
        case "Delete_Comment" :
            return  {
                ...state,
                currentComments : state.currentComments.filter(post => post._id !== action.id)
            };
        default :
            return state;
    }
}