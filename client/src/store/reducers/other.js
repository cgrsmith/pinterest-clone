

const initialState = {
    errorMessage : null,

    isLoading : true,
}

export default function(state = initialState, action) {
    switch(action.type) {
        //Error Reducers
        case "Add_Error" :
            return {...state, errorMessage : action.error};
        case "Clear_Error" :
            return {...state, errorMessage : null};
        case "Page_Is_Loading" :
            return {...state, errorMessage : action.isLoading};
        default :
            return state;
    }
}
