import { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";

// the sponsor list is hard-coded here, when the database is set up it should load from the server instead.
const sponsors = [
    { name: "Kona Ice", url: "https://www.kona-ice.com/local-site/kona-ice-of-south-san-joaquin-county/", logo: "" },
    { name: "Clark Pest Control", url: "https://www.clarkpest.com/", logo: "" },
    { name: "Trosien Orthodontics", url: "https://www.trosienorthodontics.com/", logo: "" },
    { name: "All American Sports Academy", url: "https://allamericansportsacademy.net/", logo: "" },
    {
        name: "Dick's Sporting Goods",
        url: "https://www.dickssportinggoods.com/",
        logo: "",
        coupon: "https://www.tracybaberuth.com/documents/dicks2026.pdf",
    },
    { name: "Train Thought Landscapes", url: "https://www.trainathought.com/", logo: "" },
];

// shuffling so the sponsors are in a different order every time
function shuffle(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

function sponsorsPerSlide() {
    if (window.innerWidth >= 992) return 3;
    if (window.innerWidth >= 576) return 2;
    return 1;
}

function SponsorCard({ sponsor }) {
    // Logo (or name) should link
    const Main = sponsor.url ? "a" : "div";
    const linkProps = sponsor.url
        ? { href: sponsor.url, target: "_blank", rel: "noopener noreferrer" }
        : {};

    return (
        <div className="col">
            <div className="card sponsor-card h-100 text-center">
                <Main
                    className="sponsor-logo d-flex align-items-center justify-content-center p-3"
                    {...linkProps}
                >
                    {sponsor.logo ? (
                        <img src={sponsor.logo} alt={sponsor.name} className="img-fluid" />
                    ) : (
                        <span className="sponsor-name">{sponsor.name}</span>
                    )}
                </Main>

                {sponsor.coupon && (
                    <a
                        href={sponsor.coupon}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-warning btn-sm mx-auto mb-3"
                    >
                        <i className="bi bi-ticket-perforated" aria-hidden="true"></i> Get Coupon
                    </a>
                )}
            </div>
        </div>
    );
}

function SponsorsSection() {
    const [shuffledSponsors] = useState(() => shuffle(sponsors));
    const [perSlide, setPerSlide] = useState(sponsorsPerSlide);

    useEffect(() => {
        function handleResize() {
            setPerSlide(sponsorsPerSlide());
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const slides = [];
    for (let i = 0; i < shuffledSponsors.length; i += perSlide) {
        slides.push(shuffledSponsors.slice(i, i + perSlide));
    }

    return (
        <section id="sponsors" className="tbr-sponsors py-4" aria-labelledby="sponsors-heading">
            <div className="container">
                <div className="text-center mb-3">
                    <h2 id="sponsors-heading" className="mb-1">
                        Our Sponsors
                    </h2>
                    <p className="text-secondary mb-0">Their support</p>
                </div>

                <Carousel
                    key={perSlide}
                    id="sponsor-carousel"
                    aria-label="League sponsors"
                    interval={4000}
                    pause="hover"
                    indicators={false}
                    prevLabel="Previous sponsors"
                    nextLabel="Next sponsors"
                >
                    {slides.map((slide, index) => (
                        <Carousel.Item key={index}>
                            <div className={`row row-cols-${perSlide} g-3 px-5`}>
                                {slide.map((sponsor) => (
                                    <SponsorCard key={sponsor.name} sponsor={sponsor} />
                                ))}
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>

                <div className="text-center mt-3">
                    <a href="#" className="btn btn-outline-primary btn-sm">
                        View All sponsors
                    </a>
                </div>
            </div>
        </section>
    );
}

export default SponsorsSection;