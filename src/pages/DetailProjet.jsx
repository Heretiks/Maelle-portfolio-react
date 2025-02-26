import {useParams, Navigate, Link} from 'react-router-dom';
import projects from '../data/projets.js';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import SliderComponent from "../components/SliderComponent.jsx";
import '../assets/styles/pages/DetailProjet.scss';

import LeftBullet from '../assets/global/SVG_MOTIF-POINT_AVANT.svg';
import RightBullet from '../assets/global/SVG_MOTIF_POINT_SUIVANT.svg';

import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import FlipLink from "../components/FlipLink.jsx";

function DetailProjet() {
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
        // on a un ecran de largeur < a 800 on met la variable mobile true, sinon false
        setMobile(window.innerWidth < 800);

        //Ajouter un event listener de resize
        const handleResize = () => {
            setMobile(window.innerWidth < 800);
        };

        // Ajouter un écouteur de redimensionnement
        window.addEventListener("resize", handleResize);
        window.addEventListener("load", handleResize);

        // Nettoyage de l'écouteur au démontage
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("load", handleResize);
        };

    }, []);

    // Récupérer l'id du projet depuis l'URL et Trouver le projet correspondant
    const { projectId } = useParams();
    const project = projects.find(p => p.id === parseInt(projectId, 10));

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

    const fadeInUp = {
        initial: { opacity: 0, x: -150 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.6 },
        // viewport: { once: true },
    };

    const fadeInUpQuad = {
        initial: { opacity: 0, x: -80 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.6 },
        // viewport: { once: true },
    };

    return (
        <div className="detail-projet">
            <div>
                <Header />
            </div>

            {/* Contenu du projet */}
            <main className="detail-container">
                <div className="presentation-projet">
                    <motion.img className="image-presentaion" src={`${mobile ? project.imageMobile : project.image}`} alt={project.title} {...blurTransition}/>

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
                                    <p className="listing-text">
                                        <FlipLink to={'/projets'}>VUE D&#39;ENSEMBLE</FlipLink>
                                    </p>
                                </div>
                                <div className="contact">
                                    <p className="contact-text">
                                        <FlipLink to={'/contact'} >UN PROJET ?</FlipLink>
                                    </p>
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
                                    <div
                                        className="description-et-image"
                                        key={index}
                                    >
                                        <motion.div
                                            className="description"
                                            style={{
                                                backgroundColor: project.couleurPrimaire,
                                                color: project.couleurSecondaire,
                                            }}
                                            {...fadeInUp}
                                        >
                                            <p className="description-text">{block.text}</p>
                                        </motion.div>
                                        <motion.img
                                            src={block.image}
                                            alt="Description"
                                            {...fadeInUp}
                                        />
                                    </div>
                                );
                            case "image-large": {
                                const isFaso = project.id === 10;
                                const isMariage = project.id === 11;

                                const shouldDisplayImage = (imageSrc) => {
                                    if (isFaso) {
                                        if (imageSrc.includes("mockup-affiche-mobile-x2.webp")) {
                                            return window.innerWidth < 800;
                                        } else {
                                            return window.innerWidth >= 800;
                                        }
                                    }

                                    if (isMariage) {
                                        if (imageSrc.includes("tampon.webp") || imageSrc.includes("photo-nom-table.webp")) {
                                            return true;
                                        }

                                        if (imageSrc.includes("mobile")) {
                                            return window.innerWidth < 800;
                                        } else {
                                            return window.innerWidth >= 800;
                                        }
                                    }

                                    return true;
                                };

                                if (shouldDisplayImage(block.image)) {
                                    return (
                                        <div className="image-large" key={index}>
                                            <motion.img
                                                src={block.image}
                                                alt=""
                                                {...fadeInUp}
                                            />
                                        </div>
                                    );
                                }

                                return null;
                            }
                            case "slider":
                                return (
                                    <SliderComponent images={block.images} length={block.images.length} />
                                );
                            case "double-image": {
                                const reverse = project.id === 7 ? "reverse" : "";
                                return (
                                    <div
                                        className={`double-image ${reverse}`}
                                        key={index}
                                    >
                                        {block.images.map((img, imgIndex) => {
                                            const taille80 = project.id === 6 && img.includes("6694") ? "taille-80" : "";
                                            const taille20 = project.id === 6 && img.includes("2") ? "taille-20" : "";
                                            const taille40 = project.id === 8 && img.includes("ANTE2-") ? "taille-40" : "";
                                            const taille60 = project.id === 8 && img.includes("ANTE-") ? "taille-60" : "";

                                            return (
                                                <motion.img
                                                    className={`image-${imgIndex} ${taille20} ${taille40} ${taille60} ${taille80} ${reverse}`}
                                                    src={img}
                                                    alt=""
                                                    key={imgIndex}
                                                    {...fadeInUp}
                                                />
                                            );
                                        })}
                                    </div>
                                );
                            }
                            case "quadruple-image":
                                return (
                                    <div
                                        className="quadruple-image"
                                        key={index}
                                    >
                                        {block.images.map((img, imgIndex) => (
                                            <motion.img
                                                className={`image-${imgIndex}`}
                                                src={img}
                                                alt=""
                                                key={imgIndex}
                                                {...fadeInUpQuad}
                                            />
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
