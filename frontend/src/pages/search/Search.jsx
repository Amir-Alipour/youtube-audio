import axios from "axios";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import debounce from "lodash.debounce";
import { Link, useNavigate } from "react-router-dom";

const Search = () => {
    const navigate = useNavigate();

    const [searchValue, setSearchValue] = useState("");
    const [suggest, setSuggest] = useState(null);

    // search in youtube
    const handleSearch = (e) => {
        e.preventDefault();

        navigate(`/result?q=${searchValue}`);
    };

    useEffect(() => {
        if (searchValue.trim() === "") return;

        const debouncedApiCall = debounce(() => {
            axios
                .get(
                    `https://y0utubeee-audiooo-api-v1.vercel.app/a@1aa1-13haf--31bbnlm/suggest?q=${searchValue}`
                )
                .then(({ data }) => {
                    let filteredSuggest = data.result.filter(
                        (sugg) => !sugg.includes("reaction")
                    );
                    setSuggest(filteredSuggest);
                })
                .catch((error) => console.error(error));
        }, 50);

        debouncedApiCall();

        return () => debouncedApiCall.cancel();
    }, [searchValue]);

    return (
        <div className="w-[100%] min-h-screen flex items-center justify-center bg-black bg-opacity-95">
            <div className="max-w-[500px] flex flex-col items-center">
                <form
                    onSubmit={handleSearch}
                    className="flex flex-col items-center"
                >
                    <h1 className="text-md px-2 md:p-0 md:text-2xl text-white">
                        Search in Youtube, for listen what you want.
                    </h1>
                    <div
                        className={`relative bg-black flex items-center justify-center w-[99%] md:w-full h-14 border-2 border-red-500 md:pl-3 space-x-1 rounded-full z-10 mt-5`}
                    >
                        <BiSearch className="text-lg md:text-3xl text-white" />
                        <input
                            placeholder="Search or paste YT-Link"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className="w-[80%] md:flex-1 h-[99%] rounded-full outline-none border-none text-3xl px-1 bg-black text-white placeholder:text-lg placeholder:-translate-y-1.5"
                        />
                    </div>
                    {suggest && (
                        <div className="w-[99%] min-h-[100px] h-auto border -top-8 relative rounded-lg">
                            <div className="w-full mt-12">
                                {suggest.map((sugg) => (
                                    <Link
                                        key={sugg}
                                        to={`/result?q=${sugg}`}
                                    >
                                        <div className="w-full px-3 py-2 text-xl border-t text-white">
                                            {sugg}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Search;
