import { createSlice } from "@reduxjs/toolkit";
const globalStateSlice = createSlice({
  name: "globalStates",
  initialState: {
    project: null,
  },
  reducers: {
    setProject: (state, action) => {
      state.project = action.payload;
    },
  },
});
export const { setProject } = globalStateSlice.actions;
export default globalStateSlice.reducer;
