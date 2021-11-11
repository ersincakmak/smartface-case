import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { users } from "../../data/data";
import { LoginCreds, UserState } from "../../types/user";
import { checkUserExist } from "../../utils/checkers";

const initialState: UserState = {
  error: "",
  isLoggedIn: false,
  user: undefined,
};

export const userSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoginCreds>) => {
      const userExist = checkUserExist(action.payload);
      if (userExist !== false) {
        state.user = users[userExist];
        state.isLoggedIn = true;
        state.error = "";
      } else {
        state.error = "Wrong credetials";
        state.isLoggedIn = false;
      }
    },

    clearError: (state) => {
      state.error = "";
    },
  },
});

export const { login, clearError } = userSlice.actions;

export default userSlice.reducer;
