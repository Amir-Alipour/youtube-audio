import "./HistoryPage.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ChangeEvent, useState } from "react";
import VerticalAudio from "./VerticalAudio";
import HorizontalAudio from "./HorizontalAudio";

// ICONS
import SearchIcon from "@mui/icons-material/Search";
import VerticalIcon from "@mui/icons-material/SplitscreenOutlined";
import HorizontalIcon from "@mui/icons-material/GridViewOutlined";
import DownIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

// TYPES
type ItemAlign = "vertical" | "horizontal";

const HistoryPage = () => {
    const history = useSelector((state: RootState) => state.history.videos);
    const [searchedHistory, setSearchedHistory] = useState<Audio[]>([...history]);
    const [itemsAlign, setItemsAlign] = useState<ItemAlign>("horizontal");

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const searchText = e.target.value;
        if (searchText.trim() === "") {
            setSearchedHistory([...history]);
        } else {
            const filterdArray = history.filter((a) =>
                a.videoDetail.title
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            );
            setSearchedHistory([...filterdArray]);
        }
    };

    return (
        <div className="w-[1340px] min-h-screen flex flex-col items-center pt-[120px] pb-52">
            <div className="w-full flex items-center justify-between">
                <div className="itemAlign_dropdown">
                    <button className="itemAlign_dropbtn flex rounded-xl items-center space-x-2 h-[50px] border border-stone-700 text-gray-400">
                        {itemsAlign === "horizontal" ? (
                            <>
                                <HorizontalIcon className="text-red-500" />
                                <p>Horizontal</p>
                                <DownIcon />
                            </>
                        ) : (
                            <>
                                <VerticalIcon className="text-red-500" />
                                <p>Vertical</p>
                                <DownIcon />
                            </>
                        )}
                    </button>
                    <div className="itemAlign_dropdown-content">
                        <div className="flex items-center space-x-2 h-[45px] border border-stone-700 text-gray-300">
                            {itemsAlign === "horizontal" ? (
                                <div
                                    onClick={() => setItemsAlign("vertical")}
                                    className="w-full flex items-start text-gray-300 pl-4 cursor-pointer"
                                >
                                    <VerticalIcon className="text-red-500 mr-2" />
                                    <p>Vertical</p>
                                </div>
                            ) : (
                                <div
                                    onClick={() => setItemsAlign("horizontal")}
                                    className="w-full flex items-start text-gray-300 pl-4 cursor-pointer"
                                >
                                    <HorizontalIcon className="text-red-500 mr-2" />
                                    <p>Horizontal</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div
                    className={`flex items-center justify-between fw-full border border-stone-700 rounded-xl h-[50px] w-[300px] pl-3`}
                >
                    <SearchIcon className="text-red-500 mt-0.5" />
                    <input
                        onChange={handleSearch}
                        placeholder="Search in History"
                        type="text"
                        className="text-white w-full h-[100%] bg-transparent outline-none pl-2"
                    />
                </div>
            </div>
            {/* --------------- header of history */}

            <div className="w-full mt-5">
                {!history.length ? (
                    <div className="w-full text-center text-3xl text-gray-400 pt-3">
                        Your History is Empty !
                    </div>
                ) : (
                    <div
                        className={`w-full mt-10 grid  ${
                            itemsAlign === "vertical"
                                ? "grid-cols-1 gap-4"
                                : "grid-cols-5 gap-6"
                        }`}
                    >
                        {[...searchedHistory].reverse().map((audio) =>
                            itemsAlign === "vertical" ? (
                                <VerticalAudio
                                    key={audio.videoDetail.videoId}
                                    audio={audio}
                                />
                            ) : (
                                <HorizontalAudio
                                    key={audio.videoDetail.videoId}
                                    audio={audio}
                                />
                            )
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryPage;
