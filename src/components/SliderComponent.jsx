import { useState, useEffect } from 'react';
import '../assets/styles/components/Slider.css';

import LeftBullet from '../assets/global/left-bullet-point.svg';
import RightBullet from '../assets/global/right-bullet-point.svg';

const Slider = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };

    useEffect(() => {
        const interval = setInterval(nextImage, 5000);

        return () => clearInterval(interval); // Nettoyage de l'intervalle au démontage
    }, [currentIndex]); // Redémarre l'intervalle à chaque changement d'image

    return (
        <div className="slider">
            <button className="arrow left" onClick={prevImage}>
                <img src={LeftBullet} alt="Previous" className="arrow-icon" />
            </button>
            <div className="image-container">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt="Slider"
                        className={`slider-image ${index === currentIndex ? 'active' : ''}`}
                    />
                ))}
            </div>
            <button className="arrow right" onClick={nextImage}>
                <img src={RightBullet} alt="Next" className="arrow-icon" />
            </button>
        </div>
    );
};

export default Slider;
