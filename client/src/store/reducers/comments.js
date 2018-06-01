

const initialState = {
    commentsPost : null,
    currentComments : []
}

export default function(state = initialState, action) {
    switch(action.type) {
        //Comment Reducers
        case "Load_Comments" :
            return {
                ...state,
                commentsPost : action.commentsPost,
                currentComments : action.comments
            };
        case "Add_Comment" :
            return {
                ...state,
                currentComments : [action.newComment, ...state.currentComments]
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
