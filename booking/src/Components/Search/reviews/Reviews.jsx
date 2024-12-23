import React from "react";
import Review from "./Review";

const Reviews = ({ reviews }) => {
    return (
        <div className="container">
            {reviews.length !== 0 ? (
                reviews.map((item, index) => (
                    <div className="container" key={index}>
                        <Review item={item} />
                        <hr />
                    </div>
                ))
            ) : (
                <p>Нет отзывов</p>
            )}
        </div>
    );
};

export default Reviews;