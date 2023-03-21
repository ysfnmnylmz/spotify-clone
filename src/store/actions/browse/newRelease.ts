import { createAsyncThunk } from '@reduxjs/toolkit';
import api from "libs/api";

const newRelease = createAsyncThunk('browse/new-release', async (data, { rejectWithValue }) => {
    try {
        const response = await api.get('browse/new-releases');
        return response.data;
    } catch (e) {
        return rejectWithValue(e);
    }
});

export default newRelease;
