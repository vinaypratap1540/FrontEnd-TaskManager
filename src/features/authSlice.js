import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi.js"; 

const initialState = {
   user: null,
   isAuthenticated: false
};

const authSlice = createSlice({
    name: "authSlice",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        userLoggedOut: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(authApi.util.resetApiState, (state) => {
            state.user = null;
            state.isAuthenticated = false;
        });
    }
});

export const { userLoggedIn, userLoggedOut } = authSlice.actions;
export default authSlice.reducer;
