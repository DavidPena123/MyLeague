import SponsorsSection from "./home/SponsorsSection.jsx";
import HeroSection from "./home/HeroSection.jsx";
import Announcements from "./home/Announcements.jsx";
import GamesThisWeek from "./home/GamesThisWeek.jsx";
import SummarySection from "./home/SummarySection.jsx";

function HomePage() {
    return (
        <>
            <SponsorsSection />
            <HeroSection />
            <Announcements />
            <GamesThisWeek />
            <SummarySection />
        </>
    );
}

export default HomePage;