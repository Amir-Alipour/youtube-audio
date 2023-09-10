import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const playlistsFromLocalstorage: Playlist[] = [];

for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);

    if (key && key.startsWith("playlist")) {
        const value = localStorage.getItem(key);
        if (value !== null) {
            playlistsFromLocalstorage.push({ playlist_name: key, ...JSON.parse(value) });
        }
    }
}


export type PlaylistInitialState = {
    playlists: Playlist[]
}
const initialState: PlaylistInitialState = {
    playlists: playlistsFromLocalstorage
}


export const PlaylistSlice = createSlice({
    name: 'playlist',
    initialState,
    reducers: {
        createPlaylist: (state, action: PayloadAction<string>) => {
            if (state.playlists.map(p => p.playlist_name).includes(action.payload)) return;

            const data = { playlist_name: `playlist_${Date.now()}`, title: action.payload, thumnail: null, last_update: new Date(), items: [] }
            const { playlist_name, ...rest } = data
            state.playlists = [data, ...state.playlists]
            localStorage.setItem(playlist_name, JSON.stringify(rest));
        },
        addItemToPlayList: (state, { payload: { audio, playlist } }: PayloadAction<{ playlist: string, audio: Audio }>) => {
            const selectedPlaylist = getPlaylist(playlist);
            const updatedPlaylist = { ...selectedPlaylist, items: [...selectedPlaylist.items, audio], last_update: new Date() }
            state.playlists[state.playlists.findIndex(p => p.playlist_name === playlist)].items = [...state.playlists[state.playlists.findIndex(p => p.playlist_name === playlist)].items, audio]
            updatePlaylist(updatedPlaylist);
        },
        reNamePlaylist: (state, { payload: { newName, playlist } }: PayloadAction<{ playlist: string, newName: string }>) => {
            const selectedPlaylist = getPlaylist(playlist);
            const updatedPlaylist = { ...selectedPlaylist, title: newName, last_update: new Date() }
            state.playlists[state.playlists.findIndex(p => p.playlist_name === playlist)].title = newName
            updatePlaylist(updatedPlaylist);
        },
        changePlaylistCover: (state, { payload: { cover, playlist } }: PayloadAction<{ playlist: string, cover: string }>) => {
            const selectedPlaylist = getPlaylist(playlist);
            const updatedPlaylist = { ...selectedPlaylist, thumnail: cover, last_update: new Date() }
            state.playlists[state.playlists.findIndex(p => p.playlist_name === playlist)].thumnail = cover
            updatePlaylist(updatedPlaylist);
        },
        deletePlaylist: (state, action: PayloadAction<string>) => {
            state.playlists = state.playlists.filter(p => p.playlist_name !== action.payload)
            localStorage.removeItem(action.payload);
        },
    }
})


export const { createPlaylist, addItemToPlayList, reNamePlaylist, changePlaylistCover, deletePlaylist } = PlaylistSlice.actions
export default PlaylistSlice.reducer

const getPlaylist = (playlist: string): Playlist => {
    return { playlist_name: playlist, ...JSON.parse(localStorage.getItem(playlist)!) };
}

const updatePlaylist = (updatedPlaylist: Playlist): void => {
    const { playlist_name, ...rest } = updatedPlaylist;
    localStorage.setItem(playlist_name, JSON.stringify(rest));
}
