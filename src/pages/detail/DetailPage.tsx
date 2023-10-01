import './DetailPage.css'
import { useEffect, useState } from "react";
import useQuery from "../../hooks/useQuery";
import axios from "axios";
import Loading from "@/components/loading/Loading";
import viewCounter from "../../utils/viewConter";
import HHMMSS from "../../utils/HH-MM-SS";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import Description from "./Description";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useNavigate } from "react-router-dom";
import {
    addToPlaylist,
    changeIndex,
} from "../../store/playerSlice/PlayerReducer";
import toast from "react-hot-toast";
import { addHistory } from "../../store/historySlice/HistoryReducer";
import Wrapper from "@/components/wrapper/Wrapper";

const DetailPage = () => {
    const navigate = useNavigate();
    const ID = useQuery().get("id");
    const [audio, setAudio] = useState<Audio | null>(null);
    const playerState = useSelector((state: RootState) => state.player);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!ID) {
            navigate("/");
        }
    }, []);

    useEffect(() => {
        axios
            .get<Audio>(
                `https://y0utubeee-audiooo-api-v1.vercel.app/a@1aa1-13haf--31bbnlm/get?id=${ID}`
            )
            .then((res) => {
                setAudio(res.data);
            });

        return () => {
            setAudio(null);
        };
    }, [ID]);

    const handleAddToPlaylist = () => {
        if (
            audio?.download_link.mp4 &&
            audio?.download_link.mp4.url.trim() !== ""
        ) {
            dispatch(addToPlaylist(audio!));
            dispatch(addHistory(audio!));
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
    };

    const handlePlay = () => {
        if (playerState.ids.includes(ID!)) {
            dispatch(changeIndex(playerState.ids.findIndex((id) => id === ID)));
            dispatch(addHistory(audio!));
        } else {
            handleAddToPlaylist();
        }
    };

    return (
        <div>
            {!audio ? (
                <div className="w-100 min-h-[100vh] flex items-center justify-center">
                    <Loading />
                </div>
            ) : (
                <Wrapper>
                    <div className="w-full flex justify-center">
                        <div className="detail_wrapper w-full lg:w-[90%] xl:w-[70%] min-h-[400px] rounded-xl border border-stone-700 flex flex-col gap-y-4">
                            <div className="w-100 min-h-[200px] flex flex-col sm:flex-row gap-x-3">
                                <div className="w-100 sm:w-[50%] md:w-[35%] p-3">
                                    <img
                                        className="w-full h-[100%] rounded-lg"
                                        src={
                                            audio.videoDetail.thumbnail.thumbnails
                                                .filter(
                                                    (tumb) =>
                                                        tumb.width === 196 ||
                                                        tumb.width === 336 ||
                                                        tumb.width === 1920
                                                )
                                                .sort(
                                                    (a, b) => b.width - a.width
                                                )[0].url
                                        }
                                        alt={
                                            audio.videoDetail.title +
                                            " thumbnail"
                                        }
                                    />
                                </div>
                                <div className="w-100 sm:w-[50%] md:w-[65%] pl-5 sm:pl-0 pr-5 py-5 text-white flex flex-col gap-y-5 sm:gap-y-0 justify-between">
                                    <div className="flex flex-col gap-y-3">
                                        <h2 className="w-100 truncate">
                                            {audio.videoDetail.title}
                                        </h2>
                                        <p className="text-sm text-stone-400">
                                            {viewCounter(
                                                +audio.videoDetail.viewCount,
                                                0
                                            )}{" "}
                                            View
                                        </p>
                                        <h4>{audio.videoDetail.author}</h4>
                                    </div>
                                    <div className="flex gap-x-2.5 text-stone-300 text-sm">
                                        <div
                                            onClick={() => handlePlay()}
                                            className="w-[100px] flex items-center justify-center gap-x-2 p-2 rounded-lg border border-stone-700 cursor-pointer"
                                        >
                                            <PlayCircleOutlineIcon />
                                            <p>
                                                {HHMMSS(
                                                    +audio.videoDetail
                                                        .lengthSeconds
                                                )}
                                            </p>
                                        </div>
                                        {!playerState.ids.includes(ID!) && (
                                            <div
                                                onClick={() =>
                                                    handleAddToPlaylist()
                                                }
                                                className="w-[43px] flex items-center justify-center border border-stone-700 rounded-lg cursor-pointer"
                                            >
                                                <PlaylistAddIcon />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* ------------------- video info */}
                            <div className="w-100 p-3 pb-4 text-gray-400">
                                <Description
                                    text={audio.videoDetail.shortDescription}
                                />
                            </div>
                            {/* ------------------- description */}
                        </div>
                    </div>
                    {/* --------------------- detail section */}

                    <div className="w-[50%] sm:w-[70%] md:w-[100%] lg:w-[80%] xl:w-[70%]  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  grid-rows-1 gap-4 mt-4">
                        {playerState.ids.includes(ID!) &&
                            playerState.playlist
                                .filter((a) => a.videoDetail.videoId !== ID)
                                .slice(0, 5)
                                .map((item) => (
                                    <div
                                        key={item.videoDetail.videoId}
                                        onClick={() =>
                                            navigate(
                                                `/detail?id=${item.videoDetail.videoId}`
                                            )
                                        }
                                        className="rounded-xl p-2 border border-stone-700 flex flex-col hover:bg-stone-700 cursor-pointer"
                                    >
                                        <img
                                            className="rounded-xl"
                                            src={
                                                item.videoDetail.thumbnail.thumbnails.filter(
                                                    (tumb) =>
                                                        tumb.width === 1920
                                                )[0].url
                                            }
                                            alt={
                                                item.videoDetail.title +
                                                "thumbnail"
                                            }
                                        />

                                        <h5 className="line-clamp-2 text-sm mt-2 text-white/80">
                                            {item.videoDetail.title}
                                        </h5>

                                        <p className="line-clamp-1 text-xs text-stone-400 mt-5">
                                            {item.videoDetail.author}
                                        </p>
                                        <div className="flex gap-x-3 justify-between pr-2 mt-1">
                                            <p className="line-clamp-1 text-xs text-stone-400">
                                                {viewCounter(
                                                    +item.videoDetail.viewCount,
                                                    0
                                                )}{" "}
                                                View
                                            </p>
                                            <p className="line-clamp-1 text-xs text-stone-400">
                                                {HHMMSS(
                                                    +item.videoDetail
                                                        .lengthSeconds
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                    </div>
                    {/* --------------------- playlist section */}
                </Wrapper>
            )}
        </div>
    );
};

export default DetailPage;
