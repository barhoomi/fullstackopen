import { createSlice, current } from '@reduxjs/toolkit'
import { createNew, voteForId } from './anecdoteReducer'

const initialState = "Default notification value"

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createNew, (state, action) => {
                console.log(state, action)
                return `you added "${action.payload.content}"`
            })
            .addCase(voteForId, (state, action) => {
                return `you voted for "${action.payload.content}"`
            })
    },
})


export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer