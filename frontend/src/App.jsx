// router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// pages
import Search from "./pages/search/Search";
import Result, { resultLoader } from "./pages/result/Result";
import Song, { songLoader } from "./pages/song/Song";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Search />,
    },
    {
        path: "/result",
        element: <Result />,
        loader: resultLoader,
    },
    {
        path: "/song",
        element: <Song />,
        loader: songLoader,
    },
]);

function App() {
    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
