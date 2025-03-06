import { configureStore } from "@reduxjs/toolkit";
import {persistStore,persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import authReducer from "../features/authSlice";
import modalReducer from "../features/modalSlice";
const persistConfig={
  key:'auth',
  storage
}
 const persistedReducer = persistReducer(persistConfig,authReducer);
export const store = configureStore({
  reducer: {
    user:persistedReducer,
    modal:modalReducer,
  },
});

export const  persister = persistStore(store)
