import { ChangeEvent, KeyboardEvent, useState } from "react";
import axios from "axios";

import SearchIcon from "@mui/icons-material/Search";
import SuggestList from "./SuggestList";

const SearchPage = () => {
    const [suggests, setSuggests] = useState<string[] | null>(null);
    const [searchText, setSearchText] = useState<string>("");
    const [forceSearch, setForceSearch] = useState<number>(0);

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchText(e.target.value);

        axios
            .get(
                ` http://localhost:3001/a@1aa1-13haf--31bbnlm/suggest?q=${e.target.value}`
            )
            .then(({ data }: { data: { result: [] } }) => {
                let filteredData: string[] =
                    data.result.length > 6
                        ? data.result.slice(0, 6)
                        : data.result;
                setSuggests(filteredData);
            })
            .catch((error) => console.error(error));
    };

    const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setForceSearch((p) => p + 1);
        }
    };

    return (
        <div className="bg-[url('/pattern/search-pattern-rotate.svg')] lg:bg-[url('/pattern/search-pattern-full.svg')] bg-cover lg:bg-contain bg-center bg-no-repeat w-full h-[100svh] flex flex-col items-center justify-center gap-y-5 mt-4 md:mt-0">
            <img
                className="w-[200px] lg:w-[250px]"
                src="/logo/logo-horizontal-fill.svg"
                alt="Youtobe Audio Logo"
            />
            <p className="text-gray-300 text-xs lg:text-lg">
                search in youtube and listen the audio of video you select it.
            </p>

            <div
                className={`w-[330px] md:w-[440px] max-h-[550px]  ${
                    suggests !== null && suggests.length > 0
                        ? "h-[550px] border-4 border-red-500"
                        : "h-[85px]"
                } rounded-3xl p-1.5 relative left-1 md:left-0`}
            >
                <div
                    className={`w-full h-[100%]  ${
                        suggests !== null && suggests.length > 0
                            ? "border border-red-500"
                            : ""
                    } rounded-2xl p-2`}
                >
                    <div
                        className={`flex items-center justify-between w-[290px] md:w-full ${
                            suggests !== null && suggests.length > 0
                                ? "h-[10%] border-b border-b-stone-500 mb-4"
                                : "border border-stone-500 rounded-xl h-[100%]"
                        } pr-2 md:pr-5`}
                    >
                        <input
                            onKeyDown={handleEnter}
                            onChange={handleSearch}
                            placeholder="Hear anything from YouTube :D"
                            type="text"
                            className="text-white w-full h-[100%] bg-transparent outline-none pl-5"
                        />
                        <SearchIcon />
                    </div>
                    {suggests !== null && suggests.length > 0 ? (
                        <SuggestList
                            suggests={suggests}
                            searchText={searchText}
                            force={forceSearch}
                        />
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;
