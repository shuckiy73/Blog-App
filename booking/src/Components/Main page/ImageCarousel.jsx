import React from 'react';

const ImageCarousel = ({ image_list }) => {
    return (
        <div>
            {image_list.map((image, index) => (
                <img key={index} src={image} alt={`Image ${index}`} />
            ))}
        </div>
    );
};

export default ImageCarousel;