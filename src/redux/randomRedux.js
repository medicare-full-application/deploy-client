import { createSlice } from "@reduxjs/toolkit";

const randomRedux = createSlice({
  name: "random",
  initialState: {
    randomNumber: null,
    userId: null,
  },
  reducers: {
    setRandomNumber: (state, action) => {
      state.randomNumber = action.payload.RandomNumber;
      state.userId = action.payload.userId;
    },
    removeRandomNumber: (state, action) => {
      state.randomNumber = null;
      state.userId = null;
    },
  },
});

export const { setRandomNumber, removeRandomNumber } = randomRedux.actions;
export default randomRedux.reducer;
