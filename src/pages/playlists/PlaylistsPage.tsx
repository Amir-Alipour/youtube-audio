import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ChangeEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPlaylist } from "@/store/playlistSlice/PlaylistReducer";
import { RootState } from "@/store/store";
import { useNavigate } from "react-router-dom";
import Wrapper from "@/components/wrapper/Wrapper";

// ICONS
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";

const PlaylistsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playlists = useSelector(
        (state: RootState) => state.playlist.playlists
    );
    const [searchedPlaylist, setSearchedPlaylist] = useState<Playlist[]>([
        ...playlists,
    ]);

    const [open, setOpen] = useState(false);
    const [playListName, setPlayListName] = useState("");

    const handleCreatePlaylisy = () => {
        if (playListName.trim() !== "") {
            dispatch(createPlaylist(playListName));
            setPlayListName("");
            setOpen(false);
        }
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value;
        if (searchText.trim() === "") {
            setSearchedPlaylist([...playlists]);
        } else {
            const filterdArray = playlists.filter((p) =>
                p.title.toLowerCase().includes(searchText.toLowerCase())
            );
            setSearchedPlaylist([...filterdArray]);
        }
    };

    useEffect(() => {
        setSearchedPlaylist([...playlists]);
    }, [playlists]);

    return (
        <Wrapper>
            <div className="w-full flex flex-col-reverse sm:flex-row gap-y-4 sm:gap-y-0 items-center justify-between">
                <div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <div className="cursor-pointer py-3 pl-2 pr-4 flex items-center gap-x-2 text-gray-400 border border-stone-700 rounded-lg">
                                <AddIcon className="text-red-500" />
                                <p>Create Playlist</p>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle className="text-white">
                                    Create New Playlist
                                </DialogTitle>
                            </DialogHeader>
                            <div className="w-full grid gap-4 py-4 px-2">
                                <div className="grid gap-y-2">
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
                            </div>
                            <DialogFooter>
                                <div
                                    onClick={handleCreatePlaylisy}
                                    className="cursor-pointer mr-1 p-3 flex items-center gap-x-2 text-white border border-stone-500 rounded-lg"
                                >
                                    <p>Create</p>
                                </div>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div
                    className={`flex items-center justify-between fw-full border border-stone-700 rounded-xl h-[50px] w-[300px] pl-3`}
                >
                    <SearchIcon className="text-red-500 mt-0.5" />
                    <input
                        onChange={handleSearch}
                        placeholder="Search in Playlists"
                        type="text"
                        className="text-white w-full h-[100%] bg-transparent outline-none pl-2"
                    />
                </div>
            </div>
            {/* HEADER */}

            <div className="w-full mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-7">
                {[...searchedPlaylist].map((playlist, i) => (
                    <div
                        onClick={() =>
                            navigate(`/playlists/${playlist.playlist_name}`)
                        }
                        key={i}
                        className="h-[350px] md:h-[260px] p-4 rounded-2xl border border-stone-700 hover:bg-stone-800 cursor-pointer flex flex-col justify-between"
                    >
                        {playlist.thumbnail ? (
                            <img
                                src={playlist.thumbnail}
                                className="object-cover rounded-xl	w-full h-[170px]"
                                alt={playlist.title}
                            />
                        ) : (
                            <div className="w-full flex items-center justify-center h-[170px] rounded-xl bg-stone-800">
                                <p className="text-5xl">{playlist.title[0]}</p>
                            </div>
                        )}
                        <h4 className="ml-1 line-clamp-1 text-white mt-3 text-lg">
                            {playlist.title}
                        </h4>
                        <p className="ml-1 text-stone-500 text-sm">
                            {playlist.items.length} items
                        </p>
                    </div>
                ))}
            </div>
        </Wrapper>
    );
};

export default PlaylistsPage;
