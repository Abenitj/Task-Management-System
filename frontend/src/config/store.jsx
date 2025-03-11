import { configureStore } from "@reduxjs/toolkit";
import {persistStore,persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"
import authReducer from "../features/authSlice";
import modalReducer from "../features/modalSlice";
import notificationReducer from "../features/notificationSlice";
import globalStatesReducer from "../features/globalStatesSlice";
const persistConfig={
  key:'auth',
  storage
}
 const persistedReducer = persistReducer(persistConfig,authReducer);
export const store = configureStore({
  reducer: {
    user:persistedReducer,
    modal:modalReducer,
    states:globalStatesReducer,
    notification:notificationReducer,
  },
});

export const  persister = persistStore(store)
