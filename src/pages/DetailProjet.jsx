import {useParams, Navigate, Link} from 'react-router-dom';
import '../assets/styles/pages/DetailProjet.scss';
import projects from '../data/projets.js';
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import SliderComponent from "../components/SliderComponent.jsx";
import FlipLink from "../components/FlipLink.jsx";

function DetailProjet() {
    const [mobile, setMobile] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isFixed, setIsFixed] = useState(false);

    useEffect(() => {
        // on a un ecran de largeur < a 800 on met la variable mobile true, sinon false
        setMobile(window.innerWidth < 800);

        //Ajouter un event listener de resize
        const handleResize = () => {
            setMobile(window.innerWidth < 800);
            setWindowWidth(window.innerWidth);
        };

        // Pour display la barre info
        const handleScroll = () => {
            setIsFixed(window.scrollY > window.innerHeight/11); // Appliquer la classe si on scroll au-delà de 50px
        };

        // Ajouter un écouteur de redimensionnement
        window.addEventListener("resize", handleResize);
        window.addEventListener("load", handleResize);
        window.addEventListener("scroll", handleScroll);

        // Nettoyage de l'écouteur au démontage
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("load", handleResize);
            window.removeEventListener("scroll", handleScroll);
        };

    }, []);

    // Récupérer l'id du projet depuis l'URL et Trouver le projet correspondant
    const { projectId } = useParams();
    const project = projects.find(p => p.id === parseInt(projectId, 10));

    if (!project) {
        return <Navigate to="/" replace />;
    }

    let nextProjectId = project.id % projects.length + 1;
    let previousProjectId = project.id === 1 ? projects.length : project.id - 1;

    const projectNameTransition = {
        initial: { x: '-1000px' },
        animate: { x: 0 },
        exit: { x: '-1000px' },
        transition: { duration: 0.8 }
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
        <>
            <Helmet>
                <title>{project.title} | Maëlle Camissogo</title>
                <meta name="description" content={`Découvrez le projet "${project.title}" | ${project.category}, réalisé par Maëlle Camissogo, graphiste spécialisée en design créatif.`} />
                <meta property="og:title" content={`${project.title} | Maëlle Camissogo`} />
                <meta property="og:description" content={`Détails et présentation du projet "${project.title}". Découvrez mon travail de graphiste.`} />
                <meta property="og:image" content={project.image} />
                <meta property="og:url" content={`https://maellecamissogo.com/projet/${project.id}`} />
            </Helmet>


            <div className="detail-projet">
                <div> <Header /> </div>

                {/* Contenu du projet */}
                <main className="detail-container">
                    <div className="presentation-projet">
                        <motion.img className="image-presentaion" src={`${mobile ? project.imageMobile : project.image}`} alt={project.title} {...blurTransition}/>

                        <motion.div className="project-name" {...projectNameTransition}>
                            <h1 className="name">{project.title}</h1>
                            <h2 className="category">{project.category}</h2>
                        </motion.div>

                        <div className="content-presentation">
                            <div className={`info ${isFixed ? "display-fixed" : ""}`}>
                                <div className="first-block">
                                    <div className="category">
                                        <p className="category-title">Catégorie</p>
                                        <p className="category-text">
                                            {project.category}
                                        </p>
                                    </div>
                                    <div className="title">
                                        <p className="title-title">Projet</p>
                                        <p className="title-text">{project.title}</p>
                                    </div>
                                </div>
                                <div className="second-block">
                                    <div className="next-back">
                                        <Link to={`/projet/${previousProjectId}`}>
                                            <img src="/images/SVG_MOTIF_POINT_AVANT.svg" alt="Left bullet" className="prev-text" />
                                        </Link>
                                        <Link to={`/projet/${nextProjectId}`}>
                                            <img src="/images/SVG_MOTIF_POINT_SUIVANT.svg" alt="Left bullet" className="next-text" />
                                        </Link>
                                    </div>
                                    <div className="listing">
                                        <p className="listing-text">
                                            <FlipLink to={'/projets'}>VUE D&#39;ENSEMBLE</FlipLink>
                                        </p>
                                    </div>
                                    <div className="contact">
                                        <p className="contact-text">
                                            <FlipLink to={'/contact'} >Contact</FlipLink>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="info-projet">
                        {project.blocks.map((block, index) => {
                            switch (block.type) {
                                case "description-et-image":
                                    { const noDisplay = project.id === 1 && block.image.includes("image-description") && windowWidth < 500;

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
                                            {!noDisplay && (
                                                <motion.img
                                                    src={block.image}
                                                    alt="Description"
                                                    {...fadeInUp}
                                                />
                                            )}
                                        </div>
                                    ); }
                                case "image-large": {
                                    const isFaso = project.title === "Artisan Du Faso";
                                    const isMariage = project.title === "Mariage";

                                    const shouldDisplayImage = (imageSrc) => {
                                        if (isFaso) {
                                            if (imageSrc.includes("mockup-affiche-mobile-x2")) {
                                                return window.innerWidth < 800;
                                            } else {
                                                return window.innerWidth >= 800;
                                            }
                                        }

                                        if (isMariage) {
                                            if (imageSrc.includes("tampon") || imageSrc.includes("photo-nom-table")) {
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
                                    const reverse = project.title === 'Domaine de l\'Aiglade' ? "reverse" : "";
                                    return (
                                        <div
                                            className={`double-image ${reverse}`}
                                            key={index}
                                        >
                                            {block.images.map((img, imgIndex) => {
                                                const taille80 = project.title === 'SPL Agate' && img.includes("6694") ? "taille-80" : "";
                                                const taille20 = project.title === 'SPL Agate' && img.includes("2") ? "taille-20" : "";
                                                const taille40 = project.title === 'Bleu Libellule' && img.includes("ANTE2-") ? "taille-40" : "";
                                                const taille60 = project.title === 'Bleu Libellule' && img.includes("ANTE-") ? "taille-60" : "";

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
        </>
    );
}

export default DetailProjet;
