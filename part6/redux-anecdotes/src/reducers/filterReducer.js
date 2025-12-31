const initialState = ""

const filterReducer = (state = initialState, action) => {
    console.log("action",action.payload)
    switch (action.type) {
        case "SET_FILTER":
            return action.payload.filter
        default:
            return state
    }
}

export const updateFilter = filter => {
    return {
        type: "SET_FILTER",
        payload: {
            filter: filter
        }
    } 
}



export default filterReducer