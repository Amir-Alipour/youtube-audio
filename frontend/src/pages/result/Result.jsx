import {
    useLoaderData,
    defer,
    Await,
    Link,
    useLocation,
} from "react-router-dom";
import axios from "axios";
import { Suspense } from "react";

export const resultLoader = async ({ request }) => {
    const query = new URL(request.url).searchParams.get("q");
    let result = axios
        .get(
            `https://y0utubeee-audiooo-api-v1.vercel.app/a@1aa1-13haf--31bbnlm/search?q=${query}`
        )
        .then((res) => res.data);

    return defer({ data: result });
};

const Result = () => {
    const data = useLoaderData();
    const location = useLocation();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const search = urlParams.get("q");

    return (
        <Suspense
            fallback={
                <div className="w-full h-screen flex items-center justify-center bg-black text-white">
                    <h1 className="text-3xl">Loading Data ...</h1>
                </div>
            }
        >
            <Await resolve={data.data}>
                {(data) => {
                    const { videos } = data.result;

                    return (
                        <div className="w-full min-h-screen flex justify-center bg-black/95 overflow-hidden">
                            <div className="w-[100%] md:w-[60%] min-h-screen flex flex-col space-y-5 p-2 pb-10">
                                <div className="flex items-center space-x-3">
                                    <Link
                                        className="p-2 rounded border w-[70px] h-[50px] text-white flex items-center justify-center"
                                        to={`/`}
                                    >
                                        Back
                                    </Link>
                                    <h1 className="text-md md:text-4xl my-5 text-white flex space-x-3">
                                        <p className="text-white text-opacity-70">
                                            Result for
                                        </p>{" "}
                                        <p>{search}</p>
                                    </h1>
                                </div>
                                {videos.map((video) => (
                                    <Link
                                        key={video.id}
                                        to={`/song?id=${video.videoId}`}
                                        state={{ prevLocation: location }}
                                    >
                                        <div className="flex flex-col md:flex-row w-full text-white space-y-5 md:space-y-0 md:space-x-5">
                                            <div className="w-[100%] md:w-[45%] relative">
                                                <img
                                                    className="w-100 rounded-lg"
                                                    src={video.thumbnail}
                                                    alt=""
                                                />
                                                <p className="absolute bottom-1 right-1 bg-black px-1 rounded text-sm">
                                                    {video.timestamp}
                                                </p>
                                            </div>
                                            <div className="w-[100%] md:w-[55%] flex flex-col justify-between">
                                                <div>
                                                    <h2 className="text-lg">
                                                        {video.title}
                                                    </h2>
                                                    <div className="flex items-center space-x-1 text-xs text-gray-400">
                                                        <p>
                                                            views :{" "}
                                                            {video.views}
                                                        </p>
                                                        <p>·</p>
                                                        <p>{video.ago}</p>
                                                    </div>

                                                    <p className="mt-3 text-white text-opacity-80 text-sm">
                                                        {video.author.name}
                                                    </p>
                                                </div>

                                                <p className="truncate text-sm  text-white text-opacity-60 mb-5">
                                                    {video.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                }}
            </Await>
        </Suspense>
    );
};

export default Result;
