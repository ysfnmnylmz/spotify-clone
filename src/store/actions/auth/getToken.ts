import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
type DataType = {
  [key: string]: string
}
const getToken = createAsyncThunk('authToken', async (data: DataType, { rejectWithValue }) => {
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };
  const queryData = Object.keys(data)
    .map((key: string) => `${key}=${data[key]}`)
    .join('&');
  try {
    const response = await axios.post(process.env.REACT_APP_SPOTIFY_AUTH_URL as string, queryData, { headers });
    return response.data;
  } catch (e) {
    return rejectWithValue(e);
  }
});

export default getToken;
