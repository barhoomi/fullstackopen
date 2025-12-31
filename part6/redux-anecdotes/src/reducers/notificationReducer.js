import {createSlice, current} from '@reduxjs/toolkit'

const initialState = "Default notification value"

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers:{
        setNotification(state,action){
            return action.payload
        }
    }
})

export const {setNotification} = notificationSlice.actions
export default notificationSlice.reducer