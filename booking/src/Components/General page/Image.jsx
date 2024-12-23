import React from "react";

const Image = ({ image }) => {
    return (
        <img
            src={image}
            className="d-block rounded-end"
            alt="..."
            height="200"
            style={{ display: "flex", objectFit: "cover" }}
        />
    );
};

export default Image;