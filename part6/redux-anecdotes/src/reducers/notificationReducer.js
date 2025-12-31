import { createSlice, current } from '@reduxjs/toolkit'
import { createNewAnecdote, voteForId } from './anecdoteReducer'

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
            .addCase(createNewAnecdote, (state, action) => {
                return `you added "${action.payload}"`
            })
            .addCase(voteForId, (state, action) => {
                return `you voted for "${action.payload.content}"`
            })
    },
})


export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer