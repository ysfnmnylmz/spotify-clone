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
  extraReducers:(builder)=> {
    builder.addCase(newRelease.fulfilled, (state, {payload})=>{
      state.new_release = payload.albums.items;
    })
    builder.addCase(featuredPlaylists.fulfilled, (state, {payload})=>{
      state.featured_playlists = payload.playlists.items;
    })
    builder.addCase(getCategories.fulfilled, (state, {payload})=>{
      state.categories = payload.categories.items;
    })
  }
});

const { actions, reducer } = browseSlice;
export const {} = actions;
export default reducer;
