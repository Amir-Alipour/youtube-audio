import IntToString from "../utils/IntToString";
import { Link } from "react-router-dom";

const OfflineVideo = ({ video }) => {

    return (
        <Link
            to={`/song?id=${video.videoId}`}
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
                        <h2 className="text-lg">{video.title}</h2>
                        <div className="flex items-center space-x-1 text-xs text-gray-400">
                            <p className="font-medium">
                                {IntToString(video.views, 0)} views
                            </p>
                            <p className="text-3xl -translate-y-0.5">·</p>
                            <p>{video.ago}</p>
                        </div>

                        <p className="mt-3 text-white text-opacity-80 text-sm ">
                            {video.author.name}
                        </p>
                    </div>

                    <p className="truncate text-sm  text-white text-opacity-60 mb-5">
                        {video.description}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default OfflineVideo;
