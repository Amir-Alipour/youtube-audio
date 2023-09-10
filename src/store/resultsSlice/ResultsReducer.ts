import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { fetchVideos } from "./ResultsActions"


export type ResultsInitialState = {
    isLoading: boolean,
    data: Video[]
    lastQuery: string | null
}

const initialState: ResultsInitialState = {
    isLoading: false,
    data: [],
    lastQuery: null
}


export const ResultsSlice = createSlice({
    name: 'results',
    initialState,
    reducers: {
        changeLastQuery: (state, action: PayloadAction<string>) => {
            state.lastQuery = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchVideos.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(fetchVideos.fulfilled, (state, action: PayloadAction<Video[]>) => {
            state.data = action.payload;
            state.isLoading = false;
        });
    }
})


export const { changeLastQuery } = ResultsSlice.actions
export default ResultsSlice.reducer
