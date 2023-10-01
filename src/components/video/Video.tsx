import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import viewCounter from "../../utils/viewConter";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToPlaylist } from "../../store/playerSlice/PlayerReducer";
import { useState } from "react";
import Spinner from "../spinner/Spinner";
import { RootState } from "../../store/store";
import toast from "react-hot-toast";
import { addHistory } from "../../store/historySlice/HistoryReducer";

type VideoProps = {
    video: Video;
};

const Video = ({ video }: VideoProps) => {
    const ids = useSelector((state: RootState) => state.player.ids);
    const dispatch = useDispatch();
    const [isLoading, setisLoading] = useState<boolean>(false);

    const handleAddToPlaylist = () => {
        setisLoading(true);
        axios
            .get<Audio>(
                `https://y0utubeee-audiooo-api-v1.vercel.app/a@1aa1-13haf--31bbnlm/get?id=${video.videoId}`
            )
            .then((res) => {
                if (
                    res.data.download_link.mp4 &&
                    res.data.download_link.mp4.url.trim() !== ""
                ) {
                    dispatch(addToPlaylist(res.data));
                    dispatch(addHistory(res.data));
                } else {
                    toast.error("Can't crawl data of this video :(", {
                        duration: 2500,
                        style: {
                            backgroundColor: "#292524",
                            color: "white",
                            padding: "7px",
                            boxShadow: "7px 10px 48px 0px rgba(0,0,0,0.71)",
                            marginTop: "10px",
                        },
                    });
                }
                setisLoading(false);
            });
    };

    return (
        <div className="flex flex-col sm:flex-row h-[400px] sm:h-[200px] w-full max-w-[300px] sm:max-w-none text-white border border-stone-700 rounded-2xl mb-4  gap-x-5 hover:bg-stone-700">
            <div className="lg:w-[350px] h-[100%] p-3">
                <Link to={`/detail?id=${video.videoId}`}>
                    <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="aspect-video w-[100%] h-[100%] rounded-xl shadow shadow-black"
                    />
                </Link>
            </div>
            <div className="w-100 sm:w-[60%] lg:flex-1 h-[100%] p-3 py-5 pr-4 md:pr-8">
                <div className="w-full flex justify-between items-center">
                    <Link to={`/detail?id=${video.videoId}`}>
                        <h2 className="hover:text-white/75">{video.title}</h2>
                    </Link>
                    {!ids.includes(video.videoId) ? (
                        isLoading ? (
                            <Spinner />
                        ) : (
                            <PlaylistAddIcon
                                onClick={handleAddToPlaylist}
                                className="text-stone-400 icon_30_size cursor-pointer"
                            />
                        )
                    ) : null}
                </div>
                <div className="text-sm text-stone-400 flex items-center gap-x-3 mt-1">
                    <p>{viewCounter(video.views, 0)} View</p>
                    <p>{video.ago}</p>
                </div>
                <div className="flex items-center gap-x-2 mt-3 text-stone-200">
                    <h4>{video.author.name}</h4>
                </div>
                <div className="mt-10 w-[550px] max-w-[70%]">
                    <p className="truncate text-sm text-white text-opacity-60">
                        {video.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Video;
