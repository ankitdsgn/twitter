import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
  },
  reducers: {
    update: (state, action) => {
      state.username = action.payload.username;
    },
  },
});

// Action creators are generated for each case reducer function
export const { update } = userSlice.actions;

export default userSlice.reducer;
