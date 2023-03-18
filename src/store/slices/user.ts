import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';
import getUser from "../actions/user/getUser";
import getDevices from "../actions/user/player/getDevices";
interface IExternalURL {
    spotify: string
}
interface IFollowers {
    href: string,
    total: number
}
interface IUserInfo {
    "display_name": string | null,
    "external_urls": IExternalURL | null,
    "followers": IFollowers | null,
    "href": string | null,
    "id": string | null,
    "images": object[] | null,
    "type": string | null,
    "uri": string | null
}
interface IUserState {
    user: IUserInfo,
    isLogin: boolean,
    player: any
}
const initialState = {
    user: {
        "display_name": null,
        "external_urls": null,
        "followers": null,
        "href": null,
        "id": null,
        "images": null,
        "type": null,
        "uri": null
    },
    isLogin: false,
    player: null
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserStatus: (state: Draft<IUserState>, {payload}: PayloadAction<boolean>): void =>{
            state.isLogin = payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state: Draft<IUserState>, {payload}: PayloadAction<IUserInfo>): void => {
            state.user = payload;
        })
        builder.addCase(getDevices.fulfilled, (state: Draft<IUserState>, {payload}: PayloadAction<any>): void => {
            state.player = payload
        })
    }
});

const { actions, reducer } = userSlice;
export const {setUserStatus} = actions;
export default reducer;
