import {
    useLoaderData,
    defer,
    Await,
    Link,
    useNavigate,
} from "react-router-dom";
import axios from "axios";
import { Suspense, useState } from "react";

import Hls from "hls.js";
import Description from "../../components/Description";

export const songLoader = async ({ request }) => {
    const id = new URL(request.url).searchParams.get("id");
    let result = axios
        .get(
            `https://y0utubeee-audiooo-api-v1.vercel.app/a@1aa1-13haf--31bbnlm/get?id=${id}`
            // `http://localhost:3001/a@1aa1-13haf--31bbnlm/get?id=${id}`
        )
        .then((res) => res.data);

    return defer({ data: result });
};

const Song = () => {
    const data = useLoaderData();
    const navigate = useNavigate();

    const [isHidden, setIsHidden] = useState(true);

    const handlePlay = (url) => {
        console.log(url);
        const videoPlayer = document.getElementById("video");

        if (Hls.isSupported()) {
            var hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(videoPlayer);
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            videoPlayer.src = url;
        }
    };

    const handlePause = () => {
        const videoPlayer = document.getElementById("video");
        videoPlayer.pause();
    };

    const handleMetaData = (detail) => {
        const { thumbnails } = detail.thumbnail;

        if ("mediaSession" in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: detail.title,
                artist: detail.author,
                artwork: [
                    {
                        src: thumbnails[0].url,
                        sizes: "168x94",
                        type: "image/jpg",
                    },
                    {
                        src: thumbnails[1].url,
                        sizes: "196x110",
                        type: "image/jpg",
                    },
                    {
                        src: thumbnails[2].url,
                        sizes: "246x138",
                        type: "image/jpg",
                    },
                    {
                        src: thumbnails[3].url,
                        sizes: "336x188",
                        type: "image/jpg",
                    },
                    {
                        src: thumbnails[4].url,
                        sizes: "1920x1080",
                        type: "image/jpg",
                    },
                ],
            });
        }
    };

    return (
        <Suspense
            fallback={
                <div className="w-full h-screen flex items-center justify-center bg-black/95 text-white">
                    <h1 className="text-3xl">Loading Audio ...</h1>
                </div>
            }
        >
            <Await resolve={data.data}>
                {(data) => {
                    const audio = [data.download_link.mp4.url];
                    const { videoDetail: detail, isLive } = data;

                    return (
                        <div className="w-full min-h-screen flex md:items-center md:justify-center bg-black/95">
                            <div className="w-[100%] md:w-[60%] min-h-screen flex justify-center flex-col space-y-5 p-2 py-10">
                                <div className="flex space-x-4 text-white">
                                    <button
                                        className="rounded p-2 border"
                                        onClick={() => navigate(-1)}
                                    >
                                        Back
                                    </button>
                                    <Link
                                        className="rounded p-2 border"
                                        to={`/`}
                                    >
                                        Search new Audio
                                    </Link>
                                </div>
                                <div className="flex flex-col md:flex-row w-full text-white space-y-5 md:space-y-0 md:space-x-5">
                                    <div className="w-[100%] md:w-[45%]">
                                        <img
                                            className="w-100 rounded-lg"
                                            src={
                                                data.videoDetail.thumbnail.thumbnails.filter(
                                                    (tumb) =>
                                                        tumb.width === 1920
                                                )[0].url
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <div className="w-[100%] md:w-[55%] flex flex-col justify-between">
                                        <div>
                                            <h2 className="text-lg">
                                                {data.videoDetail.title}
                                            </h2>
                                            <div className="flex items-center space-x-1 text-xs text-gray-400">
                                                <p>
                                                    views :{" "}
                                                    {data.videoDetail.viewCount}
                                                </p>
                                            </div>

                                            <p className="mt-3 text-white text-opacity-80 text-sm">
                                                {data.videoDetail.author}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {/* details */}

                                <div className="mt-4">
                                    {isLive ? (
                                        <div className="text-white space-x-5 w-full flex flex-col space-y-3 justify-center items-center">
                                            <div className="space-x-5">
                                                <button
                                                    onClick={() =>
                                                        handlePlay(
                                                            data.download_link
                                                                .liveData
                                                        )
                                                    }
                                                    className="rounded border p-4 text-lg"
                                                >
                                                    Play
                                                </button>
                                                <button
                                                    onClick={handlePause}
                                                    className="rounded border p-4 text-lg"
                                                >
                                                    Pause
                                                </button>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    setIsHidden(!isHidden)
                                                }
                                                className="-translate-x-2 rounded border p-4 text-lg"
                                            >
                                                {isHidden ? "Show" : "Hide"}{" "}
                                                Video
                                            </button>

                                            <video
                                                hidden={isHidden}
                                                autoPlay
                                                id="video"
                                                onPlay={() =>
                                                    handleMetaData(detail)
                                                }
                                            />
                                        </div>
                                    ) : (
                                        <audio
                                            ref={(player) => player?.focus()}
                                            onPlay={() =>
                                                handleMetaData(detail)
                                            }
                                            controls
                                            className="w-full outline-none"
                                            src={audio}
                                            loop
                                        ></audio>
                                    )}
                                </div>
                                {/* player */}

                                <Description
                                    text={data.videoDetail.shortDescription}
                                />

                                {/* description */}
                            </div>
                        </div>
                    );
                }}
            </Await>
        </Suspense>
    );
};

export default Song;
