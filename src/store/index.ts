import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import generalSliceReducer from './slices/general';
import authSliceReducer from './slices/auth';
import browseSliceReducer from "./slices/browse";
import userSlice from "./slices/user";
import playerSlice from "./slices/player";

const reducers = combineReducers<any>({
  general: generalSliceReducer,
  auth: authSliceReducer,
  browse: browseSliceReducer,
  user: userSlice,
  music_player: playerSlice
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;
export default store;
