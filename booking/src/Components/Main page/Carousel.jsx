import React from "react";

const Carousel = () => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            {/* Индикаторы слайдов */}
            <div className="carousel-indicators">
                <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                ></button>
                <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                ></button>
                <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                ></button>
            </div>

            {/* Слайды */}
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img
                        src="/image/background/background_1.jpg"
                        className="d-block w-100"
                        alt="Первый слайд"
                        style={{ objectFit: "cover", height: "600px" }}
                    />
                </div>
                <div className="carousel-item">
                    <img
                        src="/image/background/background_2.jpg"
                        className="d-block w-100"
                        alt="Второй слайд"
                        style={{ objectFit: "cover", height: "600px" }}
                    />
                </div>
                <div className="carousel-item">
                    <img
                        src="/image/background/background_3.jpg"
                        className="d-block w-100"
                        alt="Третий слайд"
                        style={{ objectFit: "cover", height: "600px" }}
                    />
                </div>
            </div>

            {/* Кнопки управления */}
            <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
            >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
            >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};

export default Carousel;