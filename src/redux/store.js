import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userRedux";
import medicalRecordReducer from "./medicalRecordRedux";
import newsReducer from "./newsRedux";
import randomReducer from "./randomRedux";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  medicalRecord: medicalRecordReducer,
  news: newsReducer,
  random: randomReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: {
//     userTypeSelectorButton: userTypeSelectorButtonSlice.reducer,
//     user: userReducer,
//   },
// });

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }),
});

export let persistor = persistStore(store);

export default store;
