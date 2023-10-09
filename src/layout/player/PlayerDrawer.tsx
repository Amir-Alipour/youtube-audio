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
                                    className="flex w-full items-center justify-center"
                                >
                                    <div className="w-[90%] -ml-2 flex flex-col gap-y-2">
                                        <p className="w-[190px] text-md relative top-1.5 truncate text-stone-100">
                                            {track?.videoDetail.title}
                                        </p>
                                        <p className="text-sm relative bottom-1.5  text-stone-400">
                                            {track?.videoDetail.author}
                                        </p>
                                    </div>
                                    <div className="w-[10%] relative -left-5 text-stone-400">
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
