import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../features/shopSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import { shopApi } from "../services/shopService";
import { authApi } from "../services/authService";
import cartReducer from "../features/cartSlice";
import authReducer from "../features/authSlice";
import counterReducer from "../features/counterSlice";

const store = configureStore({
    reducer: {
        counterReducer,
        shopReducer,
        cartReducer,
        authReducer,
        [shopApi.reducerPath]: shopApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(shopApi.middleware).concat(authApi.middleware)
})

setupListeners(store.dispatch)

export default store