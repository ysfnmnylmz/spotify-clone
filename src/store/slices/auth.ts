import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import getToken from 'store/actions/auth/getToken';

type IAuth = {
  access_token: string;
  expires_in: number;
  token_type: string;
};
interface ITokenInfo extends IAuth {
  request_time: number,
  expire_time: number
}
interface IAuthState {
  token: ITokenInfo | null;
}

const initialState = {
  token: {
    access_token: null,
    expires_in: null,
    token_type: null,
    request_time: null,
    expire_time: null,
  },
};

export const authSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {},
  extraReducers: {
    // @ts-ignore
    [getToken.fulfilled]: (state: IAuthState, { payload }: PayloadAction<IAuth>) => {
      state.token = {
        ...payload,
        request_time: Date.now(),
        expire_time: Date.now() + payload.expires_in * 1000
      };
    },
  },
});

const { actions, reducer } = authSlice;
export const {} = actions;
export default reducer;
