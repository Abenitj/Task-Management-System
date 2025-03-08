import {createSlice} from "@reduxjs/toolkit"
import notificationModel from "../../../backend/src/models/notificationModel";

const NotificationSlice=createSlice({
    name:"notification",
    initialState:{
        notifications:null,
    },
    reducers:{
        setNotification:(state,action)=>{
            state.notifications=action.payload;
        },
    }
})

export const {setNotification}=NotificationSlice.actions;
export default NotificationSlice.reducer;