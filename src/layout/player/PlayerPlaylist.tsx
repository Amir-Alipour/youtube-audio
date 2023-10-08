import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    addItemToPlayList,
    createPlaylist,
    deleteItemFromPlaylist,
} from "@/store/playlistSlice/PlaylistReducer";

import { RootState } from "@/store/store";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAddOutlined";
import { useEffect, useState, memo } from "react";
import { useDispatch, useSelector } from "react-redux";

type PlayerPlaylistProps = {
    currentAudioID: string;
    currentAudio: Audio;
    hideTrigger?: boolean;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const PlayerPlaylist = ({
    currentAudioID,
    currentAudio,
    hideTrigger = false,
    open,
    setOpen,
}: PlayerPlaylistProps) => {
    const dispatch = useDispatch();
    let playlists = useSelector((state: RootState) => state.playlist.playlists);
    const [onAddingNew, setOnAddingNew] = useState<boolean>(false);
    const [playListName, setPlayListName] = useState("");
    // STATES

    const handleAddToPlaylist = (playlist_name: string) => {
        dispatch(
            addItemToPlayList({
                playlist: playlist_name,
                audio: currentAudio,
            })
        );
    };

    const handleCreateNewPlaylist = () => {
        if (!onAddingNew) {
            setOnAddingNew(true);
        } else {
            dispatch(createPlaylist(playListName));
            setOnAddingNew(false);
        }
    };

    const handleRemove = (playlist_name: string) => {
        dispatch(
            deleteItemFromPlaylist({
                playlist: playlist_name,
                ID: currentAudioID,
            })
        );
    };

    useEffect(() => {
        if (open === false) {
            setOnAddingNew(false);
            setPlayListName("");
        }
    }, [open]);

    return (
        <div
            className={`${
                !hideTrigger &&
                "cursor-pointer flex items-center justify-center w-10 h-10 rounded-lg border border-stone-600 hover:bg-stone-600"
            } `}
        >
            <Dialog open={open} onOpenChange={setOpen}>
                {!hideTrigger && (
                    <DialogTrigger asChild>
                        <PlaylistAddIcon className="text-stone-300" />
                    </DialogTrigger>
                )}

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-white">
                            Add To Playlist
                        </DialogTitle>
                    </DialogHeader>
                    <div className="w-full grid gap-3 pt-4">
                        {onAddingNew && (
                            <div className="grid gap-y-2 mb-5">
                                <h3 className="text-white">
                                    Title of Playlist ?
                                </h3>
                                <input
                                    value={playListName}
                                    onChange={(e) =>
                                        setPlayListName(e.target.value)
                                    }
                                    placeholder="title"
                                    className="w-full rounded-lg h-[50px] pl-3 border border-stone-400 bg-transparent text-white outline-none"
                                />
                            </div>
                        )}
                        {/* ================ */}
                        {/* === Create Form ===== */}
                        {/* ================ */}

                        <div className="flex gap-x-3">
                            {onAddingNew && (
                                <div
                                    onClick={() => setOnAddingNew(false)}
                                    className="w-full cursor-pointer p-3 flex items-center gap-x-2 bg-stone-700 text-white rounded-lg"
                                >
                                    <p>cancel</p>
                                </div>
                            )}
                            <div
                                onClick={handleCreateNewPlaylist}
                                className="w-full cursor-pointer mr-1 p-3 flex items-center gap-x-2 text-white border border-red-500 rounded-lg"
                            >
                                <p>
                                    {onAddingNew
                                        ? "Create"
                                        : "Create New Playlist"}
                                </p>
                            </div>
                        </div>
                        {/* ================ */}
                        {/* === Create Butto ===== */}
                        {/* ================ */}

                        {!onAddingNew && (
                            <div className="add_to_playlist_list mt-3 w-full h-[300px] flex flex-col gap-y-3 overflow-y-auto">
                                {playlists.map((playlist) => (
                                    <div
                                        key={playlist.playlist_name}
                                        className="w-full h-[50px] flex items-center justify-between text-white "
                                    >
                                        <p className="text-xl">
                                            {playlist.title}
                                        </p>

                                        {!playlist.items
                                            .map((a) => a.videoDetail.videoId)
                                            .includes(currentAudioID) ? (
                                            <div
                                                onClick={() =>
                                                    handleAddToPlaylist(
                                                        playlist.playlist_name
                                                    )
                                                }
                                                className="cursor-pointer mr-2 p-3 flex items-center gap-x-2 text-white border border-stone-500 rounded-lg"
                                            >
                                                <p>Add</p>
                                            </div>
                                        ) : (
                                            <div
                                                onClick={() =>
                                                    handleRemove(
                                                        playlist.playlist_name
                                                    )
                                                }
                                                className="cursor-pointer mr-2 p-3 flex items-center gap-x-2 text-red-500 border border-red-500 rounded-lg"
                                            >
                                                <p>Remove</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default memo(PlayerPlaylist);
