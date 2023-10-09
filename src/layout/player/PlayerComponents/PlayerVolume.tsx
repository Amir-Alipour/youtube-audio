import VolumeIcon from "@mui/icons-material/VolumeUpOutlined";
import VolumeOffIcon from "@mui/icons-material/VolumeOffOutlined";

type PlayerVolumeProps = {
    isMute: boolean;
    mute: () => void;
    unmute: () => void;
    volume: number;
    setVolume: (vol: number) => void;
};

const PlayerVolume = ({
    mute,
    isMute,
    unmute,
    volume,
    setVolume,
}: PlayerVolumeProps) => {
    return (
        <div className="dropdownVolume">
            <div
                onClick={() => (isMute ? unmute() : mute())}
                className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-lg border border-stone-600 hover:bg-stone-600"
            >
                {isMute ? (
                    <VolumeOffIcon className="dropbtn text-stone-300" />
                ) : (
                    <VolumeIcon className="dropbtn text-stone-300" />
                )}
            </div>
            <div className="dropdown-content">
                <p className="text-xs text-stone-400">{volume}%</p>
                <input
                    type="range"
                    className="volume bg-transparent"
                    value={volume}
                    step="1"
                    min="0"
                    max="100"
                    onChange={(e) => setVolume(+e.target.value)}
                />
            </div>
        </div>
    );
};

export default PlayerVolume;
