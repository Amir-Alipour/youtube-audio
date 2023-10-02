import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PlaylistAudio from "./PlaylistAudio";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useDispatch, useSelector } from "react-redux";
import {
    changeIndex,
    changePlayingPlaylist,
} from "@/store/playerSlice/PlayerReducer";
import { RootState } from "@/store/store";
import axios from "axios";

// ICONS
import MoreIcon from "@mui/icons-material/MoreHoriz";
import ShuffleIcon from "@mui/icons-material/Shuffle";
import PlayIcon from "@mui/icons-material/PlayCircleOutline";
import PhotoIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import EditIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PlaylistModal from "./PlaylistModal";
import Wrapper from "@/components/wrapper/Wrapper";

export type ModalMode = "cover" | "name" | "delete";

const PlaylistPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playlistName = decodeURI(
        useLocation().pathname.split("/").slice(-1)[0]
    );
    const currentPlaylist = useSelector((state: RootState) =>
        state.playlist.playlists.find((p) => p.playlist_name === playlistName)
    );
    const playerPlaylist = useSelector(
        (state: RootState) => state.player.playlist
    );
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [modalMode, setModalMode] = useState<ModalMode>("name");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // STAETS

    const handlePlayPlaylist = async () => {
        setIsLoading(true);
        const playlistItems: Audio[] = [];
        for (let itemIndex in playlist?.items) {
            const vidID = playlist?.items[+itemIndex].videoDetail.videoId;
            await axios
                .get<Audio>(
                    `https://y0utubeee-audiooo-api-v1.vercel.app/a@1aa1-13haf--31bbnlm/get?id=${vidID}`
                )
                .then((res) => {
                    playlistItems.push(res.data);
                });
        }
        setIsLoading(false);
        dispatch(changePlayingPlaylist(playlistItems));
    };

    const handleShuffle = async () => {
        if (
            playerPlaylist.length !== playlist?.items.length ||
            playerPlaylist.every(
                (val, index) =>
                    val.videoDetail.videoId !==
                    playlist?.items[index].videoDetail.videoId
            )
        ) {
            await handlePlayPlaylist();
        }
        dispatch(
            changeIndex(Math.floor(Math.random() * playlist?.items.length!))
        );
    };

    const handleUpdateData = () => {
        setPlaylist(JSON.parse(localStorage.getItem(playlistName)!));
    };
    // FUNCTIONS

    useEffect(() => {
        handleUpdateData();
    }, [currentPlaylist]);

    useEffect(() => {
        const findInLS = JSON.parse(localStorage.getItem(playlistName)!);
        if (!findInLS) {
            navigate("/");
        } else {
            setPlaylist(findInLS);
        }
    }, [playlistName]);
    // EFFECTS

    return (
        <Wrapper>
            {playlist && (
                <PlaylistModal
                    open={modalOpen}
                    onOpenChange={setModalOpen}
                    playlistName={playlist.title}
                    playlistID={playlistName}
                    modalMode={modalMode}
                    handleUpdateData={handleUpdateData}
                />
            )}
            <div className="w-full grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-5 lg:gap-x-0">
                <div className="col-span-1 flex justify-center sm:justify-start">
                    <div className="w-100 max-w-[300px] sticky top-5 rounded-2xl border border-stone-700 h-[480px] p-3.5">
                        {playlist?.thumnail ? (
                            <img
                                src={playlist.thumnail}
                                className="object-cover rounded-xl	w-full h-[60%]"
                                alt={playlist.title}
                            />
                        ) : (
                            <div className="w-full flex items-center justify-center h-[60%] rounded-xl bg-stone-800">
                                <p className="text-6xl font-bold">
                                    {playlist?.title[0]}
                                </p>
                            </div>
                        )}
                        <div className="relative min-h-[70px] flex items-center justify-between gap-x-3">
                            <h4 className="max-w-[75%] ml-1 line-clamp-2 text-white mt-3 text-lg">
                                {playlist?.title} kjhsdjkf jhakjsdfh ddf sdkfklad hadkjfh sdfas
                            </h4>
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <div className="cursor-pointer absolute flex items-center text-gray-400 justify-center right-0 top-4 w-[40px] h-[40px] rounded-xl border border-stone-700 ">
                                        <MoreIcon />
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="mt-6 ml-12 bg-stone-900 text-white border border-red-500 rounded-xl shadow-md shadow-black">
                                    <DropdownMenuItem
                                        onClick={() => {
                                            setModalMode("cover");
                                            setModalOpen(true);
                                        }}
                                        className="hover:bg-stone-700 cursor-pointer p-3"
                                    >
                                        <PhotoIcon className="-ml-0.5 mr-2 text-red-500" />
                                        Change Cover
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="h-[0.090rem] bg-stone-600" />
                                    <DropdownMenuItem
                                        onClick={() => {
                                            setModalMode("name");
                                            setModalOpen(true);
                                        }}
                                        className="hover:bg-stone-700 cursor-pointer p-3"
                                    >
                                        <EditIcon className="-ml-0.5 mr-2 text-red-500" />
                                        Change Name
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator className="h-[0.050rem] bg-stone-600" />
                                    <DropdownMenuItem
                                        onClick={() => {
                                            setModalMode("delete");
                                            setModalOpen(true);
                                        }}
                                        className="hover:bg-stone-700 cursor-pointer p-3"
                                    >
                                        <DeleteIcon className="-ml-0.5 mr-2 text-red-500" />
                                        Delete Playlist
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                        <div className="flex flex-col sm:flex-row items-center gap-x-4 mt-1 ml-1 text-gray-400 text-sm ">
                            <p>{playlist?.items.length} items</p>
                            <p className="line-clamp-1">
                                Last Update{" "}
                                {new Date(
                                    playlist?.last_update!
                                ).toDateString()}
                            </p>
                        </div>
                        <div className="mt-5 sm:mt-9 grid grid-cols-2 gap-x-5">
                            <div
                                onClick={handlePlayPlaylist}
                                className="cursor-pointer h-[45px] border border-stone-700 flex items-center justify-center gap-x-2 text-gray-400 text-md rounded-xl"
                            >
                                {isLoading ? (
                                    <p>Loading ...</p>
                                ) : (
                                    <>
                                        <PlayIcon className="-ml-2" />
                                        <p>Play</p>
                                    </>
                                )}
                            </div>
                            <div
                                onClick={handleShuffle}
                                className="cursor-pointer h-[45px] border border-stone-700 flex items-center justify-center gap-x-2 text-gray-400 text-md rounded-xl"
                            >
                                <ShuffleIcon className="-ml-2" />
                                <p>Shuffle</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-1 lg:col-span-2 xl:col-span-3 flex flex-col items-center gap-y-4">
                    {playlist?.items.reverse().map((audio) => (
                        <PlaylistAudio
                            key={audio.videoDetail.videoId}
                            audio={audio}
                            handleUpdate={handleUpdateData}
                            playlistID={playlistName}
                        />
                    ))}
                </div>
            </div>
        </Wrapper>
    );
};

export default PlaylistPage;
