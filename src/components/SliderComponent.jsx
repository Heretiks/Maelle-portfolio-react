import { useState, useEffect } from 'react';
import '../assets/styles/components/Slider.scss';
import { motion } from 'framer-motion';

import LeftBullet from '../assets/global/SVG_MOTIF-POINT_AVANT.svg';
import RightBullet from '../assets/global/SVG_MOTIF_POINT_SUIVANT.svg';

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

    const fadeInUp = {
        initial: { opacity: 0, x: -100 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.6 },
        viewport: { once: true },
    };
    
    return (
        <motion.div className="slider-container" {...fadeInUp}>
            <div className="slider" >

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

            </div>

            <button className="arrow left" onClick={prevImage}>
                <img src={LeftBullet} alt="Previous" className="arrow-icon" />
            </button>
            <button className="arrow right" onClick={nextImage}>
                <img src={RightBullet} alt="Next" className="arrow-icon" />
            </button>
        </motion.div>

    );
};

export default Slider;
