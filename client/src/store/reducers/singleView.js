const initialState = {
    currentPost : {},

    userProfileView : {}

}


export default function(state = initialState, action) {
    switch(action.type) {
        //Single Post Reducers
        case "Load_Single_Post" :
        return {
            ...state,
            currentPost : action.post
        };
        //User profile view reducers
        case "Load_User_Profile" :
            return {
                ...state,
                userProfileView : action.user
            };
        default :
            return state;
    }
}
