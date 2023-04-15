import { Link, useLocation } from "react-router-dom";
import IntToString from "../utils/IntToString";

const LiveVideo = ({ video }) => {
    const location = useLocation();

    return (
        <Link
            to={`/song?id=${video.videoId}`}
            state={{
                prevLocation: location,
            }}
        >
            <div className="flex flex-col md:flex-row w-full text-white space-y-5 md:space-y-0 md:space-x-5">
                <div className="w-[100%] md:w-[45%] relative">
                    <img
                        className="w-100 rounded-lg"
                        src={video.thumbnail}
                        alt=""
                    />
                </div>
                <div className="w-[100%] md:w-[55%] flex flex-col justify-between">
                    <div>
                        <h2 className="text-lg">{video.title}</h2>
                        <div className="flex items-center space-x-1 text-xs text-gray-400">
                            <p className="font-medium">
                                {IntToString(video.watching, 0)} watching
                            </p>
                        </div>

                        <p className="mt-3 text-white text-opacity-80 text-sm ">
                            {video.author.name}
                        </p>
                    </div>

                    <p className="truncate text-sm  text-white text-opacity-60 ">
                        {video.description}
                    </p>

                    <div className="mt-3 mb-5 text-white bg-red-600 w-[35px] rounded flex items-center justify-center text-xs font-bold p-1">
                        LIVE
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default LiveVideo;
