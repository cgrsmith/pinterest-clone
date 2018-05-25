
//Post ACtions
export function loadPosts(posts) {
    return {
        type : "Load_Posts",
        posts : posts
    }
}

export function loadSinglePost(post) {
    return {
        type : "Load_Single_Post",
        post : post
    }
}

export function deletePost(postId) {
    return {
        type : "Delete_Posts",
        id : postId
    }
}