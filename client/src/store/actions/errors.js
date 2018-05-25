
//ERrror Actions
export function addError(error) {
    return {
        type: "Add_Error",
        error : error
    }
}

export function clearError() {
    return {
        type : "Clear_Error"
    }
}