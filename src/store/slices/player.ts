import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';
interface IPlayerState {
    current_track: string | null
}
const initialState = {
    current_track: null
};

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setCurrentTrack: (state: Draft<IPlayerState>, {payload}: PayloadAction<string>) => {
            state.current_track = payload
        }
    }
});

const { actions, reducer } = playerSlice;
export const {setCurrentTrack} = actions;
export default reducer;
