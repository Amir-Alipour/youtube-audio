import "./HistoryPage.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ChangeEvent, useState } from "react";
import VerticalAudio from "./VerticalAudio";
import HorizontalAudio from "./HorizontalAudio";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { clearHistory } from "@/store/historySlice/HistoryReducer";

// ICONS
import SearchIcon from "@mui/icons-material/Search";
import VerticalIcon from "@mui/icons-material/SplitscreenOutlined";
import HorizontalIcon from "@mui/icons-material/GridViewOutlined";

// TYPES
type ItemAlign = "vertical" | "horizontal";

const HistoryPage = () => {
    const dispatch = useDispatch();
    const history = useSelector((state: RootState) => state.history.videos);
    const [searchedHistory, setSearchedHistory] = useState<Audio[]>([
        ...history,
    ]);
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

    const handleClearHistory = () => {
        dispatch(clearHistory());
    };

    return (
        <div className="w-[1340px] min-h-screen flex flex-col items-center pt-[120px] pb-52">
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-x-4">
                    <div
                        onClick={() => handleClearHistory()}
                        className="cursor-pointer p-3 flex items-center  text-red-500 border border-red-500  rounded-lg"
                    >
                        <p>Clear History</p>
                    </div>

                    <Tabs
                        value={itemsAlign}
                        onValueChange={(e) => setItemsAlign(e as ItemAlign)}
                        defaultValue=""
                        className="w-[400px] bg-stone-900"
                    >
                        <TabsList className="h-[50px] bg-stone-900 border border-red-500 px-2">
                            <TabsTrigger
                                className="text-stone-400 data-[state=active]:text-white data-[state=active]:bg-stone-700 gap-x-2 pr-4"
                                value="vertical"
                            >
                                <VerticalIcon className="text-red-500 -ml-1" />
                                Vertical
                            </TabsTrigger>
                            <TabsTrigger
                                className="text-stone-400 data-[state=active]:text-white data-[state=active]:bg-stone-700 gap-x-2"
                                value="horizontal"
                            >
                                <HorizontalIcon className="text-red-500 -ml-1" />
                                Horizontal
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
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

            <div className="w-full">
                {!history.length ? (
                    <div className="w-full text-center text-3xl text-gray-400 pt-3">
                        Your History is Empty !
                    </div>
                ) : (
                    <div
                        className={`w-full mt-8 grid  ${
                            itemsAlign === "vertical"
                                ? "grid-cols-1 gap-4"
                                : "grid-cols-5 gap-6"
                        }`}
                    >
                        {[...searchedHistory]
                            .reverse()
                            .map((audio) =>
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
