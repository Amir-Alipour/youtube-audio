import { useEffect } from "react";
import useQuery from "../../hooks/useQuery";
import Loading from "@/components/loading/Loading";
import Video from "@/components/video/Video";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchVideos } from "../../store/resultsSlice/ResultsActions";
import { useNavigate } from "react-router-dom";
import { changeLastQuery } from "../../store/resultsSlice/ResultsReducer";
import Wrapper from "@/components/wrapper/Wrapper";

const ResultPage = () => {
    const navigate = useNavigate();
    const query = useQuery().get("q");
    const {
        data: result,
        isLoading,
        lastQuery,
    } = useSelector((state: RootState) => state.results);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        if (!query) navigate("/");

        if (!result.length || query !== lastQuery) {
            dispatch(fetchVideos(query!));
            dispatch(changeLastQuery(query!));
        }
    }, [query]);

    return (
        <div>
            {isLoading ? (
                <div className="w-100 min-h-[100vh] flex items-center justify-center">
                    <Loading />
                </div>
            ) : (
                <Wrapper>
                    {result.map((video) => (
                        <Video key={video.videoId} video={video} />
                    ))}
                </Wrapper>
            )}
        </div>
    );
};

export default ResultPage;
