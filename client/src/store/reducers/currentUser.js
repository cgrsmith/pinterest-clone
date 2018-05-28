

const initialState = {

    isAuthenticated : false,
    user : {}
}

export default function(state = initialState, action) {
    switch(action.type) {
        //User Reducers
        case "Set_Current_User" :
            return {
                ...state, 
                isAuthenticated : Object.keys(action.user).length > 0,
                user : action.user
            };
        default :
            return state;
    }
}
