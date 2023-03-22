<p align="center">
Build with <a href="https://reactjs.org/" target="_blank">React.js v17</a> & <a href="https://redux.js.org/" target="_blank">Redux Toolkit</a> & <a href="https://sass-lang.com/" target="_blank">SASS</a></p>

<br/>

## 🛠 Installation

1. Install deps with NPM or Yarn:

```bash
npm install
#or
yarn install
```

2. In the project directory, run the development server:

```bash
npm start
#or
yarn start
```

## 🚀 Build and Run for Production

Generate full static build for production:

```bash
npm run build
#or
yarn build
```


## 🐳  Build and Run with Docker


```bash
docker compose build
docker compose up
```

## Environment Variables

REACT_APP_SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
REACT_APP_SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET
REACT_APP_SPOTIFY_AUTH_URL=https://accounts.spotify.com/api/token
REACT_APP_SPOTIFY_USER_AUTH_URL=https://accounts.spotify.com/authorize
REACT_APP_SPOTIFY_BASE_URL=https://api.spotify.com/v1/
REACT_APP_SPOTIFY_SCOPES=streaming user-read-email user-read-private user-library-read user-library-modify user-read-playback-state user-modify-playback-state
REACT_APP_REDIRECT_URL=http://localhost:3000


<br/>

## File Directory

|--src <br>
&nbsp;&nbsp; &nbsp;  |--assets<br>
 &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  |--images<br>
 &nbsp;&nbsp; &nbsp;  |--common<br>
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  |--components<br>
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  |--Header<br>
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  |--Player<br>
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  |--Sidebar<br>
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  |--layouts<br>
&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  |--CoreLayout.tsx<br>
 &nbsp;&nbsp; &nbsp;  |--libs<br>
 &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  |--helpers<br>
 &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  |--getTokenInfoFromQuery.ts<br>
 &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  |--injectToken.ts<br>
 &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  |--msToMinutes.ts<br>
 &nbsp;&nbsp; &nbsp; &nbsp; &nbsp; &nbsp;  |--api.ts<br>
 &nbsp;&nbsp; &nbsp;  |--routes<br>
&nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;  |--Discover<br>
&nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;  |--components<br>
&nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;  |--DiscoverBlock<br>
&nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp;  |--Discover.tsx<br>
&nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;  |--styles<br>
 &nbsp;&nbsp; &nbsp;  |--store<br>
 &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;  |--actions<br>
 &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp;  |--slices<br>

## Helper Functions
**getTokenInfoFromQuery.ts**<br>
&nbsp;&nbsp;&nbsp; This functions set to access_token, token_type and expire time when call Spotify Account Services
<br><br>
**injectToken.ts**<br>
&nbsp;&nbsp;&nbsp; This function set every api requests set authorization header.
<br><br>
**msToMinutes.ts**<br>
&nbsp;&nbsp;&nbsp; This function format to milliseconds to m:ss format.
<br><br>
**api.ts**<br>
&nbsp;&nbsp;&nbsp; This functions create axios interceptor.
<br><br>

## Component List
**Header.tsx**<br>
It's header.<br><br>
**Player.tsx**<br>
This component setup Spotify Playback SDK and render Music Player.<br><br>
**Sidebar.tsx**<br>
This component render left layout and menu<br><br>
**CoreLayout.tsx**<br>
This component render App Layout<br><br>
**DiscoverBlock.tsx**<br>
This component render playlist, albums and category list.<br><br>
**DiscoverItem.tsx**<br>
This component render playlist, album and category item<br><br>
**Discover.tsx**<br>
This component render routing page.<br><br>

## State Management
Use redux toolkit for this feature.<br>
````typescript
// store/index.ts
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

````
### auth state
This state holds the user token and whether the user is logged in or not.

### browse state
This state holds data that can be retrieved by spotify independently of the user.

### player state
This state holds data for music player.

### user state
This state holds user information data.


