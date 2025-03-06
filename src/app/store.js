import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer.js";
import { authApi } from "../features/api/authApi.js";

export const appStore = configureStore({
    reducer:rootReducer,
    middleware:(getDefaultMiddleware)=> getDefaultMiddleware().concat(authApi.middleware)
});

const initializeApp = async()=>{
    await appStore.dispatch(authApi.endpoints.getUserProfile.initiate({},{forceRefresh:true}))
}
initializeApp()