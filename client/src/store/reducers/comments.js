

const initialState = {
    currentComments : []
}

export default function(state = initialState, action) {
    switch(action.type) {
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
