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
                `https://y0utubeee-audiooo-api-v1.vercel.app/a@1aa1-13haf--31bbnlm/suggest?q=${e.target.value}`
            )
            .then(({ data }: {data: {result: []}}) => {
                let filteredData: string[] = data.result.length > 6 ? data.result.slice(0,6) : data.result;                
                setSuggests(filteredData);
            })
            .catch((error) => console.error(error));
    };

    const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Enter') {
            setForceSearch(p => p + 1);
        }
    }

    return (
        <div
            className="w-full h-[100vh] flex flex-col items-center justify-center gap-y-5"
            style={{
                backgroundImage: `url('/pattern/search-pattern-full.svg')`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "100% 100%",
            }}
        >
            <img
                className="w-[250px]"
                src="/logo/logo-horizontal-fill.svg"
                alt="Youtobe Audio Logo"
            />
            <p className="text-gray-300 text-md">
                search in youtube and listen the audio of video you select it.
            </p>

            <div
                className={`w-[440px] max-h-[550px]  ${
                    suggests !== null && suggests.length > 0
                        ? "h-[550px] border-4 border-red-500"
                        : "h-[85px]"
                } rounded-3xl p-1.5`}
            >
                <div
                    className={`w-100 h-[100%]  ${
                        suggests !== null && suggests.length > 0
                            ? "border border-red-500"
                            : ""
                    } rounded-2xl p-2`}
                >
                    <div
                        className={`flex items-center justify-between fw-full ${
                            suggests !== null && suggests.length > 0
                                ? "h-[10%] border-b border-b-stone-500 mb-4"
                                : "border border-stone-500 rounded-xl  h-[100%]"
                        }  pr-5`}
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
                        <SuggestList suggests={suggests} searchText={searchText} force={forceSearch} />
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default SearchPage;

