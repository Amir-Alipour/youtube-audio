import HHMMSS from "@/utils/HH-MM-SS";

import PlayIcon from "@mui/icons-material/PlayArrowOutlined";
import PauseIcon from "@mui/icons-material/PauseOutlined";
import QueueMusicIcon from "@mui/icons-material/QueueMusicOutlined";
import arraysEqual from "@/utils/ArraysEqual";
import { memo } from "react";

type PlayerDropdownQueueProps = {
    queue: Audio[];
    index: number;
    isPlaying: boolean;
    play: () => void;
    pause: () => void;
    setIndex: (i: number) => void;
};

const PlayerDropdownQueue = ({
    queue,
    play,
    pause,
    setIndex,
    index,
    isPlaying,
}: PlayerDropdownQueueProps) => {
    return (
        <div className="dropdownQueue">
            <div className=" cursor-pointer flex items-center justify-center w-10 h-10 rounded-lg border border-stone-600 hover:bg-stone-600">
                <QueueMusicIcon className="text-stone-300" />
            </div>
            <div className="dropdown-content p-3 px-4">
                <h3 className="text-xl font-bold text-white">Queue</h3>
                <div className="mt-3 w-full flex flex-1 flex-col gap-y-3 queueList">
                    {queue.map((track, i) => {
                        const indexIsPlaying = index === i;

                        return (
                            <div
                                key={track?.videoDetail.videoId}
                                className={`cursor-pointer w-100 flex justify-center border border-stone-700 rounded-lg py-1.5 ${
                                    indexIsPlaying ? "bg-stone-700" : ""
                                }`}
                            >
                                <div className="w-[60px] flex items-center justify-center">
                                    {indexIsPlaying ? (
                                        isPlaying ? (
                                            <PauseIcon
                                                onClick={() => pause()}
                                                className="icon_30_size text-red-500"
                                            />
                                        ) : (
                                            <PlayIcon
                                                onClick={() => play()}
                                                className="icon_30_size text-red-500"
                                            />
                                        )
                                    ) : (
                                        <PlayIcon className="icon_30_size text-red-500" />
                                    )}
                                </div>
                                <div
                                    onClick={() => setIndex(i)}
                                    className="flex flex-1 -mt-3 items-center justify-center"
                                >
                                    <div className="w-[90%] flex flex-col">
                                        <p className="w-[220px] text-md relative top-1.5 truncate text-stone-100">
                                            {track?.videoDetail.title}
                                        </p>
                                        <p className="text-sm relative bottom-1.5  text-stone-400">
                                            {track?.videoDetail.author}
                                        </p>
                                    </div>
                                    <div className="w-[10%] relative -left-6 text-stone-400">
                                        <p className="text-sm">
                                            {HHMMSS(
                                                +track?.videoDetail
                                                    .lengthSeconds
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

function PlayerDropdownQueuePropsAreEqual(
    prev: PlayerDropdownQueueProps,
    next: PlayerDropdownQueueProps
) {
    return (
        arraysEqual(prev.queue, next.queue) &&
        prev.index === next.index &&
        prev.isPlaying === next.isPlaying
    );
}

export default memo(PlayerDropdownQueue, PlayerDropdownQueuePropsAreEqual);
