import { configureStore } from "@reduxjs/toolkit";
import PlayerReducer from "./playerSlice/PlayerReducer";
import ResultsReducer from "./resultsSlice/ResultsReducer";
import HistoryReducer from "./historySlice/HistoryReducer";
import PlaylistReducer from "./playlistSlice/PlaylistReducer";


export const store = configureStore({
    reducer: {
        player: PlayerReducer,
        results: ResultsReducer,
        history: HistoryReducer,
        playlist: PlaylistReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch