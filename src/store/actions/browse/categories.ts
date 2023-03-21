import { createAsyncThunk } from '@reduxjs/toolkit';
import api from "libs/api";

const getCategories = createAsyncThunk('browse/categories', async (data, { rejectWithValue }) => {
    try {
        const response = await api.get('browse/categories');
        return response.data;
    } catch (e) {
        return rejectWithValue(e);
    }
});

export default getCategories;
