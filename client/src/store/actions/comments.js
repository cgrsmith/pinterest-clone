
//Comment ACtions
export function loadComments(comments) {
    return {
        type : "Load_Comments",
        comments : comments
    }
}

export function deletePost(postId) {
    return {
        type : "Delete_Posts",
        id : postId
    }
}