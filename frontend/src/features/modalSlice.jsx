import { createSlice } from "@reduxjs/toolkit";

const ModalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpenAddTask: false,
    isOpenUpdateProject: false,
    projectId:null,
  },
  reducers: {
    openModal: (state,action) => {
      const { type } = action.payload;
      if (type === "addTask") {
        state.isOpenAddTask = true;
      } else if (type === "updateProject") {
        state.isOpenUpdateProject = true;
      }
     
    },
    closeModal: (state) => {
      state.isOpenAddTask = false;
      state.isOpenUpdateProject = false;
    },
    setProjectId: (state, action) => {
      state.projectId = action.payload;
    },
  },
});

export const { openModal, closeModal, setProjectId } = ModalSlice.actions;
export default ModalSlice.reducer;
