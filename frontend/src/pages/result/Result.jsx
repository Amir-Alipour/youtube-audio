import {
    useLoaderData,
    defer,
    Await,
    Link,
    useNavigate,
} from "react-router-dom";
import axios from "axios";
import { Suspense } from "react";
import LiveVideo from "../../components/LiveVideo";
import OfflineVideo from "../../components/OfflineVideo";
import Channel from "../../components/Channel";
import PlayList from "../../components/PlayList";

export const resultLoader = async ({ request }) => {
    const query = new URL(request.url).searchParams.get("q");
    let result = axios
        .get(
            `https://y0utubeee-audiooo-api-v1.vercel.app/a@1aa1-13haf--31bbnlm/search?q=${query}`
        )
        .then((res) => res.data);

    return defer({ data: result });
};

const DataTypeComponent = ({ data }) => {
    const types = {
        live: <LiveVideo video={data} />,
        channel: <Channel data={data} />,
        video: <OfflineVideo video={data} />,
        list: <PlayList data={data} />,
    };

    return types[data.type];
};

const Result = () => {
    const data = useLoaderData();
    const navigate = useNavigate();

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
                    const { all } = data.result;

                    return (
                        <div className="w-full min-h-screen flex justify-center bg-black/95 overflow-hidden">
                            <div className="w-[100%] md:w-[60%] min-h-screen flex flex-col space-y-5 p-2 pb-10">
                                <div className="flex items-center space-x-3">
                                   
                                    <button
                                        className="p-2 rounded border w-[70px] h-[50px] text-white flex items-center justify-center"
                                        onClick={() => navigate(-1)}
                                        
                                    >
                                        Back
                                    </button>

                                    <Link
                                        className="p-2 rounded border w-[70px] h-[50px] text-white flex items-center justify-center"
                                        to={`/`}
                                        
                                    >
                                        Home
                                    </Link>
                                    <h1 className="text-md md:text-4xl my-5 text-white flex space-x-3">
                                        <p className="text-white text-opacity-70">
                                            Result for
                                        </p>{" "}
                                        <p>{search}</p>
                                    </h1>
                                </div>

                                {all.map((data) => (
                                    <DataTypeComponent
                                        key={data.id}
                                        data={data}
                                    />
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
