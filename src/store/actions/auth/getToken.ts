import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getToken = createAsyncThunk('authToken', async (data, { rejectWithValue }) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  // @ts-ignore
  data = Object.keys(data)
    // @ts-ignore
    .map(key => `${key}=${data[key]}`)
    .join('&');
  try {
    const response = await axios.post(process.env.REACT_APP_SPOTIFY_AUTH_URL as string, data, { headers });
    return response.data;
  } catch (e) {
    console.log(e);
    return rejectWithValue(e);
  }
});

export default getToken;
