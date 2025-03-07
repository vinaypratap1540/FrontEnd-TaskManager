import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";
import { authApi } from "../features/api/authApi.js";
import { userLoggedIn } from "../features/authSlice.js"; 

export const appStore = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
});

const initializeApp = async () => {
    try {
        const { data } = await appStore.dispatch(authApi.endpoints.getUserProfile.initiate());
        if (data && data.user) {
            appStore.dispatch(userLoggedIn({ user: data.user })); // Dispatch userLoggedIn
        }
    } catch (error) {
        console.error("Error initializing app:", error);
    }
};
initializeApp();

