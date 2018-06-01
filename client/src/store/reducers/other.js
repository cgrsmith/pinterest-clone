


export function errors(state = {errorMessage : null}, action) {
    switch(action.type) {
        //Error Reducers
        case "Add_Error" :
            return {...state, errorMessage : action.error};
        case "Clear_Error" :
            return {...state, errorMessage : null};
        default :
            return state;
    }
}

export function loading(state = {isLoading : true}, action) {
    switch(action.type) {
        case "Page_Is_Loading" :
            return {...state, errorMessage : action.isLoading};
        default :
            return state;
    }
}

export function singlePost(state = {post : {}}, action) {
    switch(action.type) {
        //Single Post Reducers
        case "Load_Single_Post" :
        return {
            ...state,
            post : action.post
        };
        default :
            return state;
    }
}

export function userView(state = {user : {}}, action) {
    switch(action.type) {
        //User profile view reducers
        case "Load_User_Profile" :
            return {
                ...state,
                user : action.user
            };
        default :
            return state;
    }
}
