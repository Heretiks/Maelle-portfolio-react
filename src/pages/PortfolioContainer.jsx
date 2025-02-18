import { useState, useEffect } from 'react';
import projects from '../data/projets.js';
import LogoMc from '../assets/global/logo.svg';
import Motif from '../assets/global/motif-grand.png';
import '../assets/styles/pages/PortfolioContainer.scss';
import {Link} from "react-router-dom";
import Header from "../components/Header.jsx";


function PortfolioContainer() {
    const [currentProject, setCurrentProject] = useState(() => Math.floor(Math.random() * projects.length));
    const [scrollOffset, setScrollOffset] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isChanging, setIsChanging] = useState(false);
    const [animateCategory, setAnimateCategory] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const SCROLL_THRESHOLD = 100;
    const SCROLL_DELAY = 1000;
    const AUTO_SCROLL_INTERVAL = 5000;

    // Précharger les images
    const preloadImages = (images) => {
        const promises = images.map((src) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = src;
                img.onload = resolve; // L'image est prête lorsque le onload est appelé
            });
        });
        return Promise.all(promises); // Retourne une promesse résolue lorsque toutes les images sont chargées
    };

    // useEffect du préchargement des images
    useEffect(() => {
        // Récupérer toutes les URL d'image des projets
        const imageUrls = projects.map((project) => project.image);

        // Précharger toutes les images
        preloadImages(imageUrls).then(() => {
            setImagesLoaded(true); // Indiquer que les images sont prêtes
        });

    }, []);

    // Si en mobile on désactive le scroll
    useEffect(() => {
        // Détecte si l'utilisateur est sur un appareil tactile
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        // Vérifie l'URL
        const isHomePage = window.location.pathname === '/';

        // Applique les styles si l'URL est '/' et l'appareil est tactile
        // Test -> ne sais même plus si c'est utile
        if (isTouchDevice && isHomePage) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'relative';
        }

        // Nettoie les styles lorsque le composant est démonté
        return () => {
            if (isTouchDevice && isHomePage) {
                document.body.style.overflow = '';
                document.body.style.position = '';
            }
        };
    }, []);

    // Gestion modif contenu lors du scroll
    useEffect(() => {
        const handleWheel = (event) => {
            if (isScrolling) return;

            setScrollOffset((prevOffset) => {
                const newOffset = prevOffset + event.deltaY;
                let nextProjectIndex = currentProject;

                if (newOffset >= SCROLL_THRESHOLD) {
                    nextProjectIndex = (currentProject + 1) % projects.length;
                } else if (newOffset <= -SCROLL_THRESHOLD) {
                    nextProjectIndex = (currentProject - 1 + projects.length) % projects.length;
                }

                if (nextProjectIndex !== currentProject) {
                    setIsChanging(true);
                    setTimeout(() => setIsChanging(false), 500);

                    setAnimateCategory(projects[nextProjectIndex].category !== projects[currentProject].category);

                    setCurrentProject(nextProjectIndex);
                    setIsScrolling(true);
                    setTimeout(() => setIsScrolling(false), SCROLL_DELAY);
                    return 0;
                }

                return newOffset;
            });
        };

        // Événement pour la souris
        window.addEventListener('wheel', handleWheel);

        // Gestion des événements touch (mobile)
        let touchStartY = 0;
        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            if (isScrolling) return;

            const touchEndY = e.touches[0].clientY;
            const swipeDistance = touchStartY - touchEndY;

            if (Math.abs(swipeDistance) >= (SCROLL_THRESHOLD * 1.5)) {
                let nextProjectIndex = currentProject;

                if (swipeDistance) {
                    nextProjectIndex = (currentProject + 1) % projects.length; // Swipe vers le bas
                }
                // swipeDistance > 0
                // else if (swipeDistance < 0) {
                //     nextProjectIndex = (currentProject - 1 + projects.length) % projects.length; // Swipe vers le haut
                // }

                if (nextProjectIndex !== currentProject) {
                    setIsChanging(true);
                    setTimeout(() => setIsChanging(false), 500);

                    setAnimateCategory(projects[nextProjectIndex].category !== projects[currentProject].category);

                    setCurrentProject(nextProjectIndex);
                    setIsScrolling(true);
                    setTimeout(() => setIsScrolling(false), SCROLL_DELAY);
                    touchStartY = 0; // Réinitialiser pour éviter les faux déclenchements
                }
            }
        };

        window.addEventListener('touchstart', handleTouchStart);
        window.addEventListener('touchmove', handleTouchMove);

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [isScrolling, currentProject]);

    // Auto-scroll toutes les 5 secondes
    useEffect(() => {
        const interval = setInterval(() => {
            const nextProjectIndex = (currentProject + 1) % projects.length;

            setIsChanging(true);
            setTimeout(() => setIsChanging(false), SCROLL_DELAY);

            setAnimateCategory(projects[nextProjectIndex].category !== projects[currentProject].category);

            setCurrentProject(nextProjectIndex);
        }, AUTO_SCROLL_INTERVAL);

        return () => clearInterval(interval);
    }, [currentProject]);

    return (
        <div className="portfolio-home">
            <div className={`${currentProject === 4 ? 'black-menu' : ''}`}>
                <Header/>
            </div>

            <Link className="portfolio-container" to={`/projet/${projects[currentProject].id}`}>
                <div
                    className="background-image"
                    style={{ backgroundImage: `url(${imagesLoaded ? projects[currentProject].image : ''})` }}
                ></div>
                <div className="background-motif">
                    <img src={Motif} alt="Motif de Maëlle Camissogo"/>
                </div>
                <div className={`content ${currentProject === 4 ? 'black-text' : ''}`}>
                    <div className="logo">
                        <img src={LogoMc} alt="Logo de Maëlle Camissogo" />
                    </div>
                    <div className="nom-metier">
                        <p className="nom">MAËLLE CAMISSOGO</p>
                        <p className="metier">Graphiste</p>
                    </div>
                </div>
                <div className="info">
                    <div className={`first-block ${currentProject === 4 ? 'black-text' : ''}`}>
                        <div className="category">
                            <p className="category-title">Catégorie</p>
                            <p className={`category-text ${isChanging && animateCategory ? 'is-changing' : ''}`}>
                                {projects[currentProject].category}
                            </p>
                        </div>
                        <div className="title">
                            <p className="title-title">Projet</p>
                            <p className={`title-text ${isChanging ? 'is-changing' : ''}`}>
                                {projects[currentProject].title}
                            </p>
                        </div>
                    </div>
                    <div className={`second-block ${currentProject === 4 ? 'black-text' : ''}`}>
                        <div className="listing">
                            <Link to="/projets"><p className="listing-text">VUE D&#39;ENSEMBLE</p></Link>
                        </div>
                        <div className="contact">
                            <Link to="/contact"><p className="contact-text">UN PROJET ?</p></Link>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default PortfolioContainer;
