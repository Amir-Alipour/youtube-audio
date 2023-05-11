import { Link } from "react-router-dom";
import {CgPlayList} from 'react-icons/cg';

const PlayList = ({ data }) => {

    return (
        <Link
            to={`/result?q=${data.listId}`}
        >
            <div className="flex flex-col md:flex-row w-full text-white space-y-5 md:space-y-0 md:space-x-5">
                <div className="w-[100%] md:w-[45%] relative">
                    <img
                        className="w-100 rounded-lg"
                        src={data.thumbnail}
                        alt=""
                    />
                    <div className="w-[35%] h-full opacity-80 absolute bottom-0 right-0 bg-black px-1 rounded flex flex-col space-y-1 items-center justify-center text-lg">
                        <p>{data.videoCount}</p>
                        <CgPlayList className="text-4xl translate-x-1" />
                    </div>
                </div>
                <div className="w-[100%] md:w-[55%] flex flex-col justify-between">
                    <div className="mt-10">
                        <h2 className="text-lg">{data.title}</h2>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PlayList;
