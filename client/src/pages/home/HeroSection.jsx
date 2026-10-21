import Carousel from "react-bootstrap/Carousel";

function HeroSection() {
    return (
        <section>
            <div className="container col-xxl-8 px-4 py-5">
                <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
                    <div className="col-10 col-sm-8 col-lg-6">
                        <Carousel id="carouselExampleAutoplaying" variant="dark" indicators={false}>
                            {/* placeholders for team pictures for now */}
                            <Carousel.Item>
                                <img src="/images/legacy_fields.jpg" className="d-block w-100" alt="..." />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src="/images/tbrLogo.png" className="d-block w-100" alt="..." />
                            </Carousel.Item>
                            <Carousel.Item>
                                <img src="/images/legacy_fields.jpg" className="d-block w-100" alt="..." />
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    <div className="col-lg-6">
                        <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
                            Register to Play!
                        </h1>
                        <p className="lead">
                            Log in or create an account to register and secure your spot.
                        </p>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-start">
                            <button type="button" className="btn btn-lg px-4 me-md-2 tracy-color">
                                Register
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;