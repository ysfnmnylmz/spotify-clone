import { createSlice } from '@reduxjs/toolkit';
import newRelease from "../actions/browse/newRelease";
import featuredPlaylists from "../actions/browse/featuredPlaylists";
import getCategories from "../actions/browse/categories";

const initialState = {
  new_release: null,
  featured_playlists: null,
  categories: null
};

export const browseSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [newRelease.fulfilled]: (state, {payload}: any) => {
      state.new_release = payload.albums.items;
    },
    // @ts-ignore
    [featuredPlaylists.fulfilled]: (state, {payload}: any) => {
      state.featured_playlists = payload.playlists.items;
    },
    // @ts-ignore
    [getCategories.fulfilled]: (state, {payload}: any) => {
      state.categories = payload.categories.items;
    }
  }
});

const { actions, reducer } = browseSlice;
export const {} = actions;
export default reducer;
