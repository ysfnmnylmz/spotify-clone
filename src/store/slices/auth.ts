import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import getToken from '../actions/auth/getToken';

type IAuth = {
  access_token: string;
  expires_in: number;
  token_type: string;
};
interface IAuthState {
  token: IAuth | null;
}

const initialState = {
  token: null,
};

export const authSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [getToken.fulfilled]: (state: IAuthState, { payload }: PayloadAction<IAuth>) => {
      state.token = payload;
    },
  },
});

const { actions, reducer } = authSlice;
export const {} = actions;
export default reducer;
