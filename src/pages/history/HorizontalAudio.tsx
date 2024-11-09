import { useNavigate } from "react-router-dom";
import HHMMSS from "../../utils/HH-MM-SS";
import viewCounter from "../../utils/viewConter";

type HorizontalAudioProps = {
    audio: Audio;
};

const HorizontalAudio = ({ audio }: HorizontalAudioProps) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/detail?id=${audio.videoDetail.videoId}`)}
            className="min-h-[230px] sm:min-h-[300px] md:min-h-0 rounded-xl p-2 sm:p-4 border border-stone-700 flex flex-col justify-between hover:bg-stone-700 cursor-pointer"
        >
            <img
                className="rounded-xl"
                src={audio.videoDetail.thumbnails.high.url}
                alt={audio.videoDetail.title + "thumbnail"}
            />

            <h5 className="line-clamp-2 text-sm mt-2 text-white/80">
                {audio.videoDetail.title}
            </h5>

            <p className="line-clamp-1 text-xs text-stone-400 mt-5">
                {audio.videoDetail.author}
            </p>
            <div className="flex gap-x-3 justify-between pr-2 mt-1">
                <p className="line-clamp-1 text-xs text-stone-400">
                    {viewCounter(+audio.videoDetail.viewCount, 0)} View
                </p>
                <p className="line-clamp-1 text-xs text-stone-400">
                    {HHMMSS(+audio.videoDetail.lengthSeconds)}
                </p>
            </div>
        </div>
    );
};

export default HorizontalAudio;
