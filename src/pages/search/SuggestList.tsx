import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useKeyPress from "../../hooks/useKeyPress";

type SuggestListProps = {
    suggests: string[];
    searchText: string;
    force: number;
};

const SuggestList = ({ suggests, searchText, force }: SuggestListProps) => {
    const navigate = useNavigate();

    const [selected, setSelected] = useState<string | undefined>(undefined);
    const downPress = useKeyPress("ArrowDown");
    const upPress = useKeyPress("ArrowUp");
    const enterPress = useKeyPress("Enter");
    const [cursor, setCursor] = useState(-1);
    // const [hovered, setHovered] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (suggests.length && downPress) {
            setCursor((prevState) =>
                prevState < suggests.length - 1 ? prevState + 1 : prevState
            );
        }
    }, [downPress]);

    useEffect(() => {
        if (suggests.length && upPress) {
            setCursor((prevState) =>
                prevState > 0 ? prevState - 1 : prevState
            );
        }
    }, [upPress]);

    useEffect(() => {
        if (suggests.length && enterPress) {
            setSelected(suggests[cursor]);
        }
    }, [cursor, enterPress]);

    // useEffect(() => {
    //     if (suggests.length && hovered) {
    //         setCursor(suggests.indexOf(hovered));
    //     }
    // }, [hovered]);

    useEffect(() => {
        if (selected !== undefined) {
            navigate(`/result?q=${selected}`);
        }

        return () => {
            setSelected(undefined);
        };
    }, [enterPress]);

    useEffect(() => {
        if (force > 0 && cursor === -1) {
            navigate(`/result?q=${searchText}`);
        }
    }, [force]);

    return (
        <div className="flex flex-col justify-around w-full h-[88%] px-2">
            {suggests.map((sugg, i) => (
                <ListItem
                    key={sugg}
                    active={i === cursor}
                    item={sugg}
                    setSelected={setSelected}
                    // setHovered={setHovered}
                    searchText={searchText}
                />
            ))}
        </div>
    );
};

export default SuggestList;

const ListItem = ({
    item,
    active,
    setSelected,
    // setHovered,
    searchText,
}: {
    item: string;
    active: boolean;
    setSelected: React.Dispatch<React.SetStateAction<string | undefined>>;
    // setHovered: React.Dispatch<React.SetStateAction<string | undefined>>;
    searchText: string;
}) => {
    let searchHighlight = filterWords(searchText, item);

    return (
        <Link key={item} to={`/result?q=${item}`}>
            <div
                className={`w-full px-3 py-4 text-xl text-white ${
                    active ? "bg-stone-800 rounded-md" : ""
                }`}
                onClick={() => setSelected(item)}
                // onMouseEnter={() => setHovered(item)}
                // onMouseLeave={() => setHovered(undefined)}
            >
                {searchHighlight.length > 1
                    ? searchHighlight.map((word) => (
                          <span
                              className={`${
                                  word.highlight ? "text-white" : "text-red-500"
                              }`}
                          >
                              {word.text}
                          </span>
                      ))
                    : searchHighlight.map((word) => (
                          <span className={`text-white`}>{word.text}</span>
                      ))}
            </div>
        </Link>
    );
};

function filterWords(searchText: string, itemText: string) {
    let index = itemText.indexOf(searchText);
    let wordsArray: { highlight: boolean; text: string }[] = [];

    if (index >= 0) {
        wordsArray.push({
            highlight: true,
            text:
                itemText.substring(0, index) +
                itemText.substring(index, index + searchText.length),
        });

        wordsArray.push({
            highlight: false,
            text: itemText.substring(index + searchText.length),
        });
    } else {
        wordsArray.push({
            highlight: false,
            text: itemText,
        });
    }
    return wordsArray;
}
