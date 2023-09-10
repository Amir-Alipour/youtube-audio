import { Outlet, useLocation, Location } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

import Header from "./header/Header";
import Footer from "./footer/Footer";
import Player from "./player/Player";
import ScrollToTop from "../utils/ScrollToTop";
import { Toaster } from "react-hot-toast";

const Layout = () => {
    const playerState = useSelector(
        (state: RootState) => state.player.playlist
    );
    const location: Location = useLocation();

    return (
        <div className="flex flex-col items-center">
            <ScrollToTop />
            <Toaster position="top-center" />
            <Header />
            <Outlet />
            {playerState.length > 0 ? (
                <Player />
            ) : location.pathname === "/" ? (
                <Footer />
            ) : null}
        </div>
    );
};

export default Layout;
