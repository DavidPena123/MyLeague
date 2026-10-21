import { Outlet } from "react-router-dom";
import Banner from "./Banner.jsx";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";

function Layout() {
    return (
        <>
            <Banner />
            <NavBar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
}

export default Layout;