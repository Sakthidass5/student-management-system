import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "students",
  initialState: [],
  reducers: {
    setStudents: (state, action) => action.payload
  }
});
export const { setStudents } = studentSlice.actions;
export default studentSlice.reducer;
