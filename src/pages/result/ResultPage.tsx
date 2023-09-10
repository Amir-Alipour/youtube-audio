import { useEffect } from "react";
import useQuery from "../../hooks/useQuery";
import Loading from "@/components/loading/Loading";
import Video from "@/components/video/Video";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { fetchVideos } from "../../store/resultsSlice/ResultsActions";
import { useNavigate } from "react-router-dom";
import { changeLastQuery } from "../../store/resultsSlice/ResultsReducer";

const ResultPage = () => {
    const navigate = useNavigate();
    const query = useQuery().get("q");
    const {data: result, isLoading, lastQuery} = useSelector((state: RootState) => state.results)
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
        if(!query) navigate('/');

        if(!result.length || query !== lastQuery) {
            dispatch(fetchVideos(query!))
            dispatch(changeLastQuery(query!))
        }
    }, [query]);

    return (
        <div>
            {isLoading ? (
                <div className="w-100 min-h-[100vh] flex items-center justify-center">
                    <Loading />
                </div>
            ) : (
                <div className="w-[1340px] min-h-screen flex flex-col items-center pt-[120px] pb-52">
                    {result.map((video) => (
                        <Video key={video.videoId} video={video} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ResultPage;
