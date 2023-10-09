import "./Player.css";
import "./PlayerResponsive.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { PlayerType, Reaplay } from "reaplay";
import { useEffect, useRef, useState } from "react";
import HHMMSS from "../../utils/HH-MM-SS";
import { Link } from "react-router-dom";
import PlayerPlaylist from "./PlayerPlaylist";
import {
    Menu,
    MenuButton,
    MenuContent,
    MenuItem,
} from "@/components/menu/Menu";

// ICONS
import PlayIcon from "@mui/icons-material/PlayArrowOutlined";
import PauseIcon from "@mui/icons-material/PauseOutlined";
import PrevIcon from "@mui/icons-material/SkipPreviousOutlined";
import NextIcon from "@mui/icons-material/SkipNextOutlined";
import RepeatIcon from "@mui/icons-material/RepeatOutlined";
import ShuffleIcon from "@mui/icons-material/ShuffleOutlined";
import VolumeIcon from "@mui/icons-material/VolumeUpOutlined";
import VolumeOffIcon from "@mui/icons-material/VolumeOffOutlined";
import QueueMusicIcon from "@mui/icons-material/QueueMusicOutlined";
import MoreIcon from "@mui/icons-material/MoreHoriz";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAddOutlined";
import PlayerDrawer from "./PlayerDrawer";

const Player = () => {
    const playerState = useSelector((state: RootState) => state.player);
    const [playlistSrc, setPlayingSrc] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

    const indexBtn = useRef<HTMLButtonElement>(null);
    const playlistIndexBtn = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        setPlayingSrc(
            playerState.playlist.map(
                (audio: Audio) => audio.download_link.mp4.url
            )
        );
    }, [playerState.playlist]);

    useEffect(() => {
        indexBtn.current?.click();
    }, [playerState.trackIndex]);

    useEffect(() => {
        if (playerState.isPlaylist) {
            playlistIndexBtn.current?.click();
        }
    }, [playlistSrc]);

    return (
        <>
            {playlistSrc.length > 0 && (
                <div className="w-full sm:w-[650px] md:w-[800px] lg:w-[1050px] xl:w-[1340px] fixed bottom-0 h-[120px]">
                    <Reaplay tracks={playlistSrc}>
                        {(player: PlayerType) => {
                            useEffect(() => {
                                player.pause();
                            }, []);

                            useEffect(() => {
                                if (!playerState.isPlaylist) {
                                    player.onScrubEnd(player.trackProgress);
                                }
                            }, [playlistSrc]);

                            useEffect(() => {
                                player.onScrubEnd(player.trackProgress);
                            }, [player.isRepeat]);

                            return (
                                <div className="player-wrapper text-white w-100 bg-stone-900 border-2 border-b-0 border-red-500 rounded-t-2xl h-[100%] flex items-center justify-between px-5">
                                    <button
                                        ref={indexBtn}
                                        onClick={() =>
                                            player.setTrackIndex(
                                                playerState.trackIndex
                                            )
                                        }
                                        className="hidden"
                                    ></button>
                                    <button
                                        ref={playlistIndexBtn}
                                        onClick={() => {
                                            player.setTrackIndex(0);
                                            player.forceUpdatePlayer();
                                        }}
                                        className="hidden"
                                    ></button>
                                    <div className="detail-container w-[25%] lg:w-[33%] flex flex-col">
                                        <Link
                                            to={`/detail?id=${
                                                playerState.playlist[
                                                    player.trackIndex
                                                ]?.videoDetail.videoId
                                            }`}
                                            className="line-clamp-2 md:line-clamp-1 w-[80%]"
                                        >
                                            {
                                                playerState.playlist[
                                                    player.trackIndex
                                                ]?.videoDetail.title
                                            }
                                        </Link>
                                        <p className="hidden md:block mt-1 text-stone-400 text-sm">
                                            {
                                                playerState.playlist[
                                                    player.trackIndex
                                                ]?.videoDetail.author
                                            }
                                        </p>
                                    </div>
                                    {/* Audio Detail */}

                                    <div className="controllers-container w-[60%] sm:w-[41%] lg:w-[33%] flex flex-col items-center ">
                                        <div className="flex gap-x-5 cursor-pointer items-center">
                                            <ShuffleIcon
                                                className={`icon_25_size ${
                                                    player.isShuffle
                                                        ? "text-red-500"
                                                        : "text-stone-300"
                                                }`}
                                                onClick={() =>
                                                    player.isShuffle
                                                        ? player.playShuffle(
                                                              false
                                                          )
                                                        : player.playShuffle(
                                                              true
                                                          )
                                                }
                                            />
                                            <PrevIcon
                                                className="icon_30_size"
                                                onClick={() =>
                                                    player.toPrevTrack()
                                                }
                                            />
                                            {player.isPlaying ? (
                                                <PauseIcon
                                                    className="icon_30_size"
                                                    onClick={() =>
                                                        player.pause()
                                                    }
                                                />
                                            ) : (
                                                <PlayIcon
                                                    className="icon_30_size"
                                                    onClick={() =>
                                                        player.play()
                                                    }
                                                />
                                            )}
                                            <NextIcon
                                                className="icon_30_size"
                                                onClick={() =>
                                                    player.toNextTrack()
                                                }
                                            />
                                            <RepeatIcon
                                                className={`icon_25_size ${
                                                    player.isRepeat
                                                        ? "text-red-500"
                                                        : "text-stone-300"
                                                }`}
                                                onClick={() =>
                                                    player.isRepeat
                                                        ? player.repeat(false)
                                                        : player.repeat(true)
                                                }
                                            />
                                        </div>
                                        <div className="w-full mt-5 flex gap-x-1 ">
                                            <p className="text-xs text-stone-400">
                                                {player.trackProgressText}
                                            </p>
                                            <input
                                                type="range"
                                                value={player.trackProgress}
                                                step="1"
                                                min="0"
                                                max={
                                                    player.duration
                                                        ? player.duration
                                                        : `${player.duration}`
                                                }
                                                className="progress bg-transparent"
                                                onChange={(e) =>
                                                    player.onScrub(
                                                        e.target.value
                                                    )
                                                }
                                                onMouseUp={(e) =>
                                                    player.onScrubEnd(e)
                                                }
                                                onKeyUp={(e) =>
                                                    player.onScrubEnd(e)
                                                }
                                            />
                                            <p className="text-xs text-stone-400">
                                                {player.isLoading
                                                    ? "Loading"
                                                    : player.durationText}
                                            </p>
                                        </div>
                                    </div>
                                    {/* Player Buttons */}

                                    <div className="options-container w-[12%] flex flex-col sm:hidden items-center justify-end gap-y-2">
                                        <PlayerDrawer
                                            open={isDrawerOpen}
                                            onChange={setIsDrawerOpen}
                                            queue={playerState.playlist}
                                            play={() => player.play()}
                                            pause={() => player.pause()}
                                            setIndex={(i) =>
                                                player.setTrackIndex(i)
                                            }
                                            index={player.trackIndex}
                                            isPlaying={player.isPlaying}
                                        />
                                        <div className="dropdownVolume">
                                            <div
                                                onClick={() =>
                                                    player.isMute
                                                        ? player.unmute()
                                                        : player.mute()
                                                }
                                                className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-lg border border-stone-600 hover:bg-stone-600"
                                            >
                                                {player.isMute ? (
                                                    <VolumeOffIcon className="dropbtn text-stone-300" />
                                                ) : (
                                                    <VolumeIcon className="dropbtn text-stone-300" />
                                                )}
                                            </div>
                                            <div className="dropdown-content">
                                                <p className="text-xs text-stone-400">
                                                    {player.volume}%
                                                </p>
                                                <input
                                                    type="range"
                                                    className="volume bg-transparent"
                                                    value={player.volume}
                                                    step="1"
                                                    min="0"
                                                    max="100"
                                                    onChange={(e) =>
                                                        player.setVolume(
                                                            +e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <Menu>
                                            <MenuButton>
                                                <button className="cus-drp-btn cursor-pointer flex items-center justify-center w-10 h-10 rounded-lg border border-stone-600 hover:bg-stone-600">
                                                    <MoreIcon className="cus-drp-btn w-full h-[40px]" />
                                                </button>
                                            </MenuButton>
                                            <MenuContent>
                                                <MenuItem
                                                    onClick={() => {
                                                        setIsDrawerOpen(true);
                                                    }}
                                                >
                                                    <QueueMusicIcon />
                                                    Queue
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() =>
                                                        setIsModalOpen(true)
                                                    }
                                                >
                                                    <PlaylistAddIcon />
                                                    Add To Playlist
                                                </MenuItem>
                                            </MenuContent>
                                        </Menu>
                                    </div>

                                    <div className="w-[33%] hidden sm:flex items-center justify-end gap-x-5 mr-2">
                                        <PlayerPlaylist
                                            open={isModalOpen}
                                            setOpen={setIsModalOpen}
                                            currentAudioID={
                                                playerState.playlist[
                                                    player.trackIndex
                                                ]?.videoDetail.videoId
                                            }
                                            currentAudio={
                                                playerState.playlist[
                                                    player.trackIndex
                                                ]
                                            }
                                        />

                                        <div className="dropdownQueue">
                                            <div className=" cursor-pointer flex items-center justify-center w-10 h-10 rounded-lg border border-stone-600 hover:bg-stone-600">
                                                <QueueMusicIcon className="text-stone-300" />
                                            </div>
                                            <div className="dropdown-content p-3 px-4">
                                                <h3 className="text-xl font-bold text-white">
                                                    Queue
                                                </h3>
                                                <div className="mt-3 w-full flex flex-1 flex-col gap-y-3 queueList">
                                                    {playerState.playlist.map(
                                                        (track, index) => {
                                                            const indexIsPlaying =
                                                                player.trackIndex ===
                                                                index;

                                                            return (
                                                                <div
                                                                    key={
                                                                        track
                                                                            ?.videoDetail
                                                                            .videoId
                                                                    }
                                                                    className={`cursor-pointer w-100 flex justify-center border border-stone-700 rounded-lg py-1.5 ${
                                                                        indexIsPlaying
                                                                            ? "bg-stone-700"
                                                                            : ""
                                                                    }`}
                                                                >
                                                                    <div className="w-[60px] flex items-center justify-center">
                                                                        {indexIsPlaying ? (
                                                                            player.isPlaying ? (
                                                                                <PauseIcon
                                                                                    onClick={() =>
                                                                                        player.pause()
                                                                                    }
                                                                                    className="icon_30_size text-red-500"
                                                                                />
                                                                            ) : (
                                                                                <PlayIcon
                                                                                    onClick={() =>
                                                                                        player.play()
                                                                                    }
                                                                                    className="icon_30_size text-red-500"
                                                                                />
                                                                            )
                                                                        ) : (
                                                                            <PlayIcon className="icon_30_size text-red-500" />
                                                                        )}
                                                                    </div>
                                                                    <div
                                                                        onClick={() =>
                                                                            player.setTrackIndex(
                                                                                index
                                                                            )
                                                                        }
                                                                        className="flex flex-1 -mt-3 items-center justify-center"
                                                                    >
                                                                        <div className="w-[90%] flex flex-col">
                                                                            <p className="w-[220px] text-md relative top-1.5 truncate text-stone-100">
                                                                                {
                                                                                    track
                                                                                        ?.videoDetail
                                                                                        .title
                                                                                }
                                                                            </p>
                                                                            <p className="text-sm relative bottom-1.5  text-stone-400">
                                                                                {
                                                                                    track
                                                                                        ?.videoDetail
                                                                                        .author
                                                                                }
                                                                            </p>
                                                                        </div>
                                                                        <div className="w-[10%] relative -left-6 text-stone-400">
                                                                            <p className="text-sm">
                                                                                {HHMMSS(
                                                                                    +track
                                                                                        ?.videoDetail
                                                                                        .lengthSeconds
                                                                                )}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="dropdownVolume">
                                            <div
                                                onClick={() =>
                                                    player.isMute
                                                        ? player.unmute()
                                                        : player.mute()
                                                }
                                                className="cursor-pointer flex items-center justify-center w-10 h-10 rounded-lg border border-stone-600 hover:bg-stone-600"
                                            >
                                                {player.isMute ? (
                                                    <VolumeOffIcon className="dropbtn text-stone-300" />
                                                ) : (
                                                    <VolumeIcon className="dropbtn text-stone-300" />
                                                )}
                                            </div>
                                            <div className="dropdown-content">
                                                <p className="text-xs text-stone-400">
                                                    {player.volume}%
                                                </p>
                                                <input
                                                    type="range"
                                                    className="volume bg-transparent"
                                                    value={player.volume}
                                                    step="1"
                                                    min="0"
                                                    max="100"
                                                    onChange={(e) =>
                                                        player.setVolume(
                                                            +e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Playlist Options */}
                                </div>
                            );
                        }}
                    </Reaplay>
                </div>
            )}
        </>
    );
};

export default Player;
