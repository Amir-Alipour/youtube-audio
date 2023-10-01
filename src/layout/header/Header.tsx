import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { KeyboardEvent, useState } from "react";

// ICONS
import SearchIcon from "@mui/icons-material/Search";
import HistoryIcon from "@mui/icons-material/History";
import VideoLibraryOutlinedIcon from "@mui/icons-material/VideoLibraryOutlined";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState<string>("");

    const handleSearch = (e: KeyboardEvent) => {
        if (e.key === "Enter") {
            navigate(`/result?q=${searchText}`);
            setSearchText("");
        }
    };

    return (
        <header className="w-[100%] max-w-[1340px] h-[70px] absolute l-0 r-0 ml-auto mr-auto top-3 border-b border-b-stone-800 m-auto flex items-center justify-between  text-sm text-stone-400">
            {location.pathname === "/" ? null : (
                <div className="hidden md:block absolute left-3">
                    <img
                        src="/icons/back-button.svg"
                        alt="back button"
                        onClick={() => navigate(-1)}
                        className="cursor-pointer"
                    />
                </div>
            )}

            <div className="w-full flex items-center justify-center gap-x-12">
                <NavLink
                    to={"/"}
                    className="w-[100px] flex flex-col items-center cursor-pointer"
                >
                    {({ isActive }) => (
                        <>
                            <div
                                className={`flex items-center relative top-2 sm:-left-2 ${
                                    isActive ? "text-red-500" : ""
                                }`}
                            >
                                <SearchIcon />
                                <p className="ml-2 hidden sm:block">Search</p>
                            </div>
                            <div
                                className={`w-4 h-1.5 rounded-lg ${
                                    isActive ? "bg-red-500" : "bg-stone-700"
                                } relative top-[23px]`}
                            ></div>
                        </>
                    )}
                </NavLink>

                <NavLink
                    to={"/history"}
                    className="w-[100px] flex flex-col items-center cursor-pointer"
                >
                    {({ isActive }) => (
                        <>
                            <div
                                className={`flex items-center relative top-2 sm:-left-2 ${
                                    isActive ? "text-red-500" : ""
                                }`}
                            >
                                <HistoryIcon />
                                <p className="ml-2 hidden sm:block">History</p>
                            </div>
                            <div
                                className={`w-4 h-1.5 rounded-lg ${
                                    isActive ? "bg-red-500" : "bg-stone-700"
                                } relative top-[23px]`}
                            ></div>
                        </>
                    )}
                </NavLink>

                <NavLink
                    to={"/playlists"}
                    className="w-[100px] flex flex-col items-center cursor-pointer"
                >
                    {({ isActive }) => (
                        <>
                            <div
                                className={`flex items-center relative top-2 sm:-left-2 ${
                                    isActive ? "text-red-500" : ""
                                }`}
                            >
                                <VideoLibraryOutlinedIcon />
                                <p className="ml-2 hidden sm:block">Playlist</p>
                            </div>
                            <div
                                className={`w-4 h-1.5 rounded-lg ${
                                    isActive ? "bg-red-500" : "bg-stone-700"
                                } relative top-[23px]`}
                            ></div>
                        </>
                    )}
                </NavLink>
            </div>

            {location.pathname === "/" ? null : (
                <div
                    className={`hidden lg:flex absolute right-2 items-center justify-between fw-full border border-stone-700 rounded-xl h-[65%] w-[300px] pr-5`}
                >
                    <input
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={handleSearch}
                        placeholder="Hear anything from YouTube :D"
                        type="text"
                        className="text-white w-full h-[100%] bg-transparent outline-none pl-5"
                    />
                    <SearchIcon className="text-red-500" />
                </div>
            )}
        </header>
    );
};

export default Header;
