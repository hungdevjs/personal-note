export default (state = {
    user: null,
    isLoading: false
}, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return {
                ...state,
                isLoading: action.payload
            }
        default:
            return state
    }
}