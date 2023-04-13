import {
    useLoaderData,
    defer,
    Await,
    Link,
    useLocation,
} from "react-router-dom";
import axios from "axios";
import { Suspense } from "react";

export const songLoader = async ({ request }) => {
    const id = new URL(request.url).searchParams.get("id");
    let result = axios
        .get(
            `https://y0utubeee-audiooo-api-v1.vercel.app/a@1aa1-13haf--31bbnlm/get?id=${id}`
        )
        .then((res) => res.data);

    return defer({ data: result });
};

const Song = () => {
    const data = useLoaderData();
    const location = useLocation();

    return (
        <Suspense
            fallback={
                <div className="w-full h-screen flex items-center justify-center bg-black/95 text-white">
                    <h1 className="text-3xl">Loading Song ...</h1>
                </div>
            }
        >
            <Await resolve={data.data}>
                {(data) => {
                    console.log(data);
                    const audio = [data.download_link.mp4.url];

                    return (
                        <div className="w-full min-h-screen flex md:items-center md:justify-center bg-black/95">
                            <div className="w-[100%] md:w-[60%] min-h-screen flex justify-center flex-col space-y-5 p-2 py-10">
                                <div className="flex space-x-4 text-white">
                                    <Link
                                        className="rounded p-2 border"
                                        to={`${location.state.prevLocation.pathname}${location.state.prevLocation.search}`}
                                    >
                                        Back
                                    </Link>
                                    <Link
                                        className="rounded p-2 border"
                                        to={`/`}
                                    >
                                        Search new Song
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
                                    <audio
                                        controls
                                        className="w-full"
                                        src={audio}
                                    ></audio>
                                </div>
                                {/* player */}

                                <div className="text-white text-sm">
                                    {data.videoDetail.shortDescription
                                        .split("\n")
                                        .map(function (item, idx) {
                                            return (
                                                <span className="break-words" key={idx}>
                                                    {item}
                                                    <br />
                                                </span>
                                            );
                                        })}
                                </div>
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
