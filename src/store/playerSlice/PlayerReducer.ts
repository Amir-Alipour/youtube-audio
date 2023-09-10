import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type PlayerInitialState = {
    trackIndex: number,
    playlist: Audio[],
    ids: string[]

}

const initialState: PlayerInitialState = {
    trackIndex: 0,
    playlist: [],
    ids: []
}


export const PlayerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        addToPlaylist: (state, action: PayloadAction<Audio>) => {
            state.playlist = [ ...state.playlist, action.payload];
            state.ids = [...state.ids, action.payload.videoDetail.videoId];
        },
        changeIndex: (state, action: PayloadAction<number>) => {
            state.trackIndex = action.payload;            
        },
        changePlayingPlaylist: (state, action: PayloadAction<Audio[]>) => {
            state.trackIndex = 0;
            state.playlist = [...action.payload];
            state.ids = [...action.payload.map(a => a.videoDetail.videoId)]
        }
    }
})


export const { addToPlaylist, changeIndex, changePlayingPlaylist } = PlayerSlice.actions
export default PlayerSlice.reducer
