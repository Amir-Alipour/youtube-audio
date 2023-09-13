import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const videosFromLocalstorage = localStorage.getItem('history') !== null
    ? JSON.parse(localStorage.getItem('history')!) : []


export type HistoryInitialState = {
    videos: Audio[]
}
const initialState: HistoryInitialState = {
    videos: videosFromLocalstorage
}


export const HistorySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        addHistory: (state, action: PayloadAction<Audio>) => {
            if (state.videos.length === 19) state.videos.shift();
            if (state.videos.find(vid => vid.videoDetail.videoId === action.payload.videoDetail.videoId)) {
                state.videos = state.videos.filter(vid => vid.videoDetail.videoId !== action.payload.videoDetail.videoId)
            }

            state.videos.push(action.payload);
            localStorage.setItem('history', JSON.stringify(state.videos.map(vid => vid)));
        },
        clearHistory: (state) => {
            state.videos = [];
            localStorage.removeItem('history');
        }
    }
})


export const { addHistory, clearHistory } = HistorySlice.actions
export default HistorySlice.reducer
