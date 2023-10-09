import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import HHMMSS from "@/utils/HH-MM-SS";
import { memo } from "react";

import PlayIcon from "@mui/icons-material/PlayArrowOutlined";
import PauseIcon from "@mui/icons-material/PauseOutlined";
import arraysEqual from "@/utils/ArraysEqual";

type PlayerDrawerProps = {
    open: boolean;
    onChange: React.Dispatch<React.SetStateAction<boolean>>;
    queue: Audio[];
    index: number;
    isPlaying: boolean;
    play: () => void;
    pause: () => void;
    setIndex: (i: number) => void;
};

const PlayerDrawer = ({
    open,
    onChange,
    queue,
    play,
    pause,
    setIndex,
    index,
    isPlaying,
}: PlayerDrawerProps) => {
    return (
        <Sheet open={open} onOpenChange={onChange}>
            <SheetContent className="overflow-y-auto bg-stone-900 text-white shadow-[0px_1px_20px_5px_#000000] border-none">
                <SheetHeader>
                    <SheetTitle className="text-white">Queue</SheetTitle>
                </SheetHeader>
                <div className="mt-5 ">
                    {queue.map((track, i) => {
                        const indexIsPlaying = index === i;

                        return (
                            <div
                                key={track?.videoDetail.videoId}
                                className={`mt-4 cursor-pointer w-100 h-[60px] flex justify-center border border-stone-700 rounded-lg py-1.5 ${
                                    indexIsPlaying ? "bg-stone-700" : ""
                                }`}
                            >
                                <div className="w-[40px] flex items-center justify-center">
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
                                    className="flex flex-1 items-center justify-between"
                                >
                                    <div className="w-100 flex flex-col gap-y-2 pr-2">
                                        <p className="line-clamp-1 w-full text-xs sm:text-md relative top-1.5  text-stone-100">
                                            {track?.videoDetail.title}
                                        </p>
                                        <div className="flex justify-between items-center">
                                        <p className="text-[12px] relative text-stone-400">
                                            {track?.videoDetail.author}
                                        </p>
                                        <p className="text-xs text-stone-400">
                                            {HHMMSS(
                                                +track?.videoDetail
                                                    .lengthSeconds
                                            )}
                                        </p>
                                        </div>
                                    </div>
                                   
                                </div>
                            </div>
                        );
                    })}
                </div>
            </SheetContent>
        </Sheet>
    );
};

function PlayerDrawerPropsAreEqual(
    prev: PlayerDrawerProps,
    next: PlayerDrawerProps
) {
    return (
        arraysEqual(prev.queue, next.queue) &&
        prev.index === next.index &&
        prev.isPlaying === next.isPlaying &&
        prev.open === next.open
    );
}

export default memo(PlayerDrawer, PlayerDrawerPropsAreEqual);
