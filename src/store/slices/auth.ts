import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import getToken from 'store/actions/auth/getToken';

type IAuth = {
  access_token: string;
  expires_in: number;
  token_type: string;
};
export interface ITokenInfo extends IAuth {
  request_time: number,
  expire_time: number
}
export interface IAuthState {
  token: ITokenInfo | null;
  isUserLogin: boolean
}

const initialState = {
  token: {
    access_token: null,
    expires_in: null,
    token_type: null,
    request_time: null,
    expire_time: null,
  },
  isUserLogin: false
};

export const authSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    // @ts-ignore
    setUserToken: (state: IAuthState, {payload}: PayloadAction<IAuth>): void => {
      state.token = {
        ...payload,
        request_time: Date.now(),
        expire_time: Date.now() + (payload.expires_in ?? 0) * 1000
      }
      state.isUserLogin = true
    }
  },
  extraReducers: {
    // @ts-ignore
    [getToken.fulfilled]: (state: IAuthState, { payload }: PayloadAction<IAuth>) => {
      state.token = {
        ...payload,
        request_time: Date.now(),
        expire_time: Date.now() + (payload.expires_in ?? 0) * 1000
      };
    },
  },
});

const { actions, reducer } = authSlice;
export const {setUserToken} = actions;
export default reducer;
