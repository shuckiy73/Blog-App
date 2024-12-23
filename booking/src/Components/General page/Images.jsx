import React from "react";
import Image from "./Image";

const Images = ({ image_list, id }) => {
    console.log("IMAGES______FIRST", image_list, id);

    return (
        <div>
            {image_list && image_list.length ? (
                <div
                    id={`selector-${id}`}
                    className="shadow-lg rounded-5 carousel slide"
                    data-bs-ride="carousel"
                >
                    <div className="carousel-indicators">
                        {image_list.map((_, index) => (
                            <button
                                key={index}
                                type="button"
                                data-bs-target={`#selector-${id}`}
                                data-bs-slide-to={index}
                                className={index === 0 ? "active" : ""}
                                aria-current={index === 0 ? "true" : "false"}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>
                    <div className="carousel-inner rounded-5">
                        {image_list.map((image, index) => (
                            <div
                                key={index}
                                className={`carousel-item ${index === 0 ? "active" : ""}`}
                            >
                                <Image image={image.image_path} />
                            </div>
                        ))}
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target={`#selector-${id}`}
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target={`#selector-${id}`}
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            ) : (
                <Image image="/image/user_objects/nophoto_object.jpg" />
            )}
        </div>
    );
};

export default Images;