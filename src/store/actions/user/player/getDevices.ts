import { createAsyncThunk } from '@reduxjs/toolkit';
import api from "libs/api";

const getDevices = createAsyncThunk('me/player/devices', async (data, { rejectWithValue }) => {
    try {
        const response = await api.get('me/player/devices');
        return response.data;
    } catch (e) {
        return rejectWithValue(e);
    }
});

export default getDevices;
