import { createAsyncThunk } from '@reduxjs/toolkit';
import api from "libs/api";

const getUser = createAsyncThunk('me', async (data, { rejectWithValue }) => {
    try {
        const response = await api.get('me');
        return response.data;
    } catch (e) {
        return rejectWithValue(e);
    }
});

export default getUser;
