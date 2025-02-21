import {useParams, Navigate, Link} from 'react-router-dom';
import projects from '../data/projets.js';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {useEffect, useRef, useState} from "react";
import SliderComponent from "../components/SliderComponent.jsx";
import '../assets/styles/pages/DetailProjet.scss';

import LeftBullet from '../assets/global/SVG_MOTIF-POINT_AVANT.svg';
import RightBullet from '../assets/global/SVG_MOTIF_POINT_SUIVANT.svg';

import {motion} from "framer-motion";

function DetailProjet() {
    const [isFixed, setIsFixed] = useState(false);
    const infoRef = useRef(null);

    // Récupérer l'id du projet depuis l'URL et Trouver le projet correspondant
    const { projectId } = useParams();
    const project = projects.find(p => p.id === parseInt(projectId, 10));

    useEffect(() => {
        const handleScroll = () => {
            if (infoRef.current) {
                const offsetTop = infoRef.current.offsetTop;
                const scrollPosition = window.scrollY;

                // Passe en `fixed` si on dépasse la position initiale de la div
                if (scrollPosition > offsetTop) {
                    setIsFixed(true);
                } else {
                    setIsFixed(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    let nextProjectId = project.id % projects.length + 1;
    let previousProjectId = project.id === 1 ? projects.length : project.id - 1;
    const isBlackText = (project.id === 1 || project.id === 5);

    if (!project) {
        return <Navigate to="/" replace />;
    }

    const projectNameTransition = {
        initial: { x: '-1000px' },
        animate: { x: 0 },
        exit: { x: '-1000px' },
        transition: { duration: 0.8 }
    };

    const infoTransition = {
        initial: { y: '1000px' },
        animate: { y: 0 },
        exit: { y: '1000px' },
        transition: { duration: 0.8 },
        ease: 'easeInOut',
    };

    const blurTransition = {
        initial: { filter: 'blur(6px)' },
        animate: { filter: 'blur(0px)' },
        exit: { filter: 'blur(6px)' },
        transition: { duration: 0.8 },
        ease: 'easeInOut',
    };

    return (
        <div className="detail-projet">
            <div>
                <Header />
            </div>

            {/* Contenu du projet */}
            <main className="detail-container">
                <div className="presentation-projet">
                    <motion.img className="image-presentaion" src={project.image} alt={project.title} {...blurTransition}/>

                    <motion.div className={`project-name ${isBlackText ? 'black-text' : ''}`} {...projectNameTransition}>
                        <p className="name">{project.title}</p>
                        <p className="category">{project.category}</p>
                    </motion.div>

                    <motion.div className="content-presentation" {...infoTransition}>
                        <div className="info">
                            <div className="first-block">
                                <div className="category">
                                    <p className="category-title">Catégorie</p>
                                    <p className="category-text">
                                        {project.category}
                                    </p>
                                </div>
                                <div className="title">
                                    <p className="title-title">Projet</p>
                                    <p className="title-text">
                                        {project.title}
                                    </p>
                                </div>
                            </div>
                            <div className="second-block">
                                <div className="next-back">
                                    <Link to={`/projet/${previousProjectId}`}>
                                        <img src={LeftBullet} alt="Left bullet" className="prev-text" />
                                    </Link>
                                    <Link to={`/projet/${nextProjectId}`}>
                                        <img src={RightBullet} alt="Left bullet" className="next-text" />
                                    </Link>
                                </div>
                                <div className="listing">
                                    <Link to="/projets"><p className="listing-text">VUE D&#39;ENSEMBLE</p></Link>
                                </div>
                                <div className="contact">
                                    <Link to="/contact"><p className="contact-text">UN PROJET ?</p></Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
                <div className="info-projet">
                    {project.blocks.map((block, index) => {
                        switch (block.type) {
                            case "description-et-image":
                                return (
                                    <div className="description-et-image" key={index}>
                                        <div
                                            className="description"
                                            style={{
                                                backgroundColor: project.couleurPrimaire,
                                                color: project.couleurSecondaire,
                                            }}
                                        >
                                            <p className="description-text">{block.text}</p>
                                        </div>
                                        <img src={block.image} alt="Description" />
                                    </div>
                                );
                            case "image-large":
                                return (
                                    <div className="image-large" key={index}>
                                        <img src={block.image} alt="" />
                                    </div>
                                );
                            case "slider":
                                return (
                                    <SliderComponent images={block.images} />
                                );
                            case "double-image":
                                { const reverse = (project.id === 7) ? 'reverse' : '';

                                return (
                                    <div className={`double-image ${reverse}`} key={index}>
                                        {block.images.map((img, imgIndex) => {
                                            const taille80 = (project.id === 6 && img.includes('6694')) ? 'taille-80' : '';
                                            const taille20 = (project.id === 6 && img.includes('2')) ? 'taille-20' : '';
                                            const taille40 = (project.id === 8) && img.includes('ANTE2-') ? 'taille-40' : '';
                                            const taille60 = (project.id === 8) && img.includes('ANTE-') ? 'taille-60' : '';

                                            return (
                                                <img
                                                    className={`image-${imgIndex} ${taille20} ${taille40} ${taille60} ${taille80} ${reverse}`}
                                                    src={img}
                                                    alt=""
                                                    key={imgIndex}
                                                />
                                            );
                                        })}
                                    </div>
                                ); }
                            case "quadruple-image":
                                return (
                                    <div className="quadruple-image" key={index}>
                                        {block.images.map((img, imgIndex) => (
                                            <img className={`${"image-" + imgIndex}`} src={img} alt="" key={imgIndex} />
                                        ))}
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default DetailProjet;
