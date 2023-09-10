import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layout/Layout";
import { Provider } from "react-redux";
import { store } from "./store/store";

// PAGES
import SearchPage from "./pages/search/SearchPage";
import ResultPage from "./pages/result/ResultPage";
import HistoryPage from "./pages/history/HistoryPage";
import PlaylistsPage from "./pages/playlists/PlaylistsPage";
import PlaylistPage from "./pages/playlist/PlaylistPage";
import DetailPage from "./pages/detail/DetailPage";


const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <SearchPage />,
            },
            {
                path: "/result",
                element: <ResultPage />,
            },
            {
                path: "/detail",
                element: <DetailPage />,
            },
            {
                path: "/history",
                element: <HistoryPage />,
            },
            {
                path: "/playlists",
                element: <PlaylistsPage />,
            },
            {
                path: "/playlists/:id",
                element: <PlaylistPage />,
            },
        ],
    },
]);

function App() {
    return (
        <div className="App w-100 min-h-screen bg-stone-900 text-red-500">
            <Provider store={store}>
                <RouterProvider router={router} />
            </Provider>
        </div>
    );
}

export default App;