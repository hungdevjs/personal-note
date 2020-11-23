export default (state = {
    noteList: []
}, action) => {
    switch (action.type) {
        case "SET_NOTES":
            return {
                ...state,
                noteList: action.payload
            }
        default:
            return state
    }
}