import viewCounter from "../../utils/viewConter";
import HHMMSS from "../../utils/HH-MM-SS";
import { useNavigate } from "react-router-dom";

type VerticalAudioProps = {
    audio: Audio;
};

const VerticalAudio = ({ audio }: VerticalAudioProps) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/detail?id=${audio.videoDetail.videoId}`)}
            className="cursor-pointer flex flex-col sm:flex-row h-[400px] sm:h-[200px] w-full max-w-[300px] sm:max-w-none text-white border border-stone-700 rounded-2xl mb-4  gap-x-5 hover:bg-stone-700"
        >
            <div className="lg:w-[350px] h-[100%] p-3">
                <img
                    src={
                        audio.videoDetail.thumbnail.thumbnails.filter(
                            (tumb) =>
                                tumb.width === 1920 ||
                                tumb.width === 336 ||
                                tumb.width === 196
                        )[0].url
                    }
                    alt={audio.videoDetail.title}
                    className="aspect-audio	 w-[100%] h-[100%] rounded-xl shadow shadow-black"
                />
            </div>
            <div className="w-100 sm:w-[60%] lg:flex-1 h-[100%] p-3 py-5 pr-4 md:pr-8">
                <div className="w-full flex justify-between items-center">
                    <h2 className="hover:text-white/75 mt-2">
                        {audio.videoDetail.title}
                    </h2>
                </div>
                <div className="text-sm text-stone-400 flex items-center gap-x-3 mt-1">
                    <p>{viewCounter(+audio.videoDetail.viewCount, 0)} View</p>
                    <p>{HHMMSS(+audio.videoDetail.lengthSeconds)}</p>
                </div>
                <div className="flex items-center gap-x-2 mt-3 text-stone-200">
                    <h4>{audio.videoDetail.author}</h4>
                </div>
                <div className="mt-10 w-[550px] max-w-[70%]">
                    <p className="truncate text-sm text-white text-opacity-60">
                        {audio.videoDetail.shortDescription}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default VerticalAudio;
