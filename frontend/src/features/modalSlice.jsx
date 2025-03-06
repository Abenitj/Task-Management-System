import { createSlice } from "@reduxjs/toolkit";

const ModalSlice=createSlice({
    name:'modal',
    initialState:{
        isOpen:false,
        projectId:null
    },
    reducers:{
        openModal:(state)=>{
            state.isOpen=true;
        },
        closeModal:(state)=>{
           state.isOpen=false;
        },
        setProjectId:(state,action)=>{
            state.projectId=action.payload;
        }

    }})

    export const {openModal,closeModal,setProjectId}= ModalSlice.actions;
    export default ModalSlice.reducer