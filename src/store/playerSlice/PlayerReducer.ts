import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type PlayerInitialState = {
    trackIndex: number,
    playlist: Audio[],
    ids: string[],
    isPlaylist: boolean,
}

const initialState: PlayerInitialState = {
    trackIndex: 0,
    playlist: [],
    ids: [],
    isPlaylist: false
}


export const PlayerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        addToPlaylist: (state, action: PayloadAction<Audio>) => {
            state.playlist = [...state.playlist, action.payload];
            state.ids = [...state.ids, action.payload.videoDetail.videoId];
            state.isPlaylist = false;
        },
        changeIndex: (state, action: PayloadAction<number>) => {
            state.trackIndex = action.payload;
        },
        changePlayingPlaylist: (state, action: PayloadAction<Audio[]>) => {
            state.trackIndex = 0;
            state.playlist = [...action.payload];
            state.ids = [...action.payload.map(a => a.videoDetail.videoId)]
            state.isPlaylist = true;
        },
    }
})


export const { addToPlaylist, changeIndex, changePlayingPlaylist } = PlayerSlice.actions
export default PlayerSlice.reducer
