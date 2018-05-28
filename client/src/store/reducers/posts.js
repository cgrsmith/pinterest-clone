

const initialState = {

    posts : []
}

export default function(state = initialState, action) {
    switch(action.type) {
        //Post Reducers
        case "Load_Posts" :
            return {
                ...state,
                posts : action.posts
            };
        case "Delete_Post" :
            return  {
                ...state,
                posts : state.posts.filter(post => post._id !== action.id)
            };

        default :
            return state;
    }
}
