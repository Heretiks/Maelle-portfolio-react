import { useState } from 'react';

const SliderComponent = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };

    return (
        <div className="slider">
            <button className="arrow left" onClick={prevImage}>
                {"<"}
            </button>
            <div className="image-container">
                <img src={images[currentIndex]} alt="Slider" className="slider-image" />
            </div>
            <button className="arrow right" onClick={nextImage}>
                {">"}
            </button>
        </div>
    );
};

export default SliderComponent;
