import { createAsyncThunk } from '@reduxjs/toolkit';
import api from "libs/api";

const featuredPlaylists = createAsyncThunk('browse/featured-playlists', async (data, { rejectWithValue }) => {
    try {
        const response = await api.get('browse/featured-playlists');
        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue(e);
    }
});

export default featuredPlaylists;
