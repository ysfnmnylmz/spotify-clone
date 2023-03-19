import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit';
export interface IPlayerState {
    current_track: string | null,
    id: string
}
const initialState = {
    current_track: null,
    id: ''
};

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setCurrentTrack: (state: Draft<IPlayerState>, {payload}: PayloadAction<string>) => {
            state.current_track = payload
        },
        setPlayerID: (state: Draft<IPlayerState>, {payload}: PayloadAction<string>) => {
            state.id = payload
        }
    }
});

const { actions, reducer } = playerSlice;
export const {setCurrentTrack, setPlayerID} = actions;
export default reducer;
