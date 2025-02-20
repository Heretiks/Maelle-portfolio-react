import { useState, useEffect } from 'react';
import projects from '../data/projets.js';
import LogoMc from '../assets/global/logo.svg';
import Motif from '../assets/global/motif-grand.png';
import '../assets/styles/pages/PortfolioContainer.scss';
import { Link } from 'react-router-dom';
import Header from "../components/Header.jsx";

const imageCache = new Map(); // Cache global des images

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
        return Promise.all(
            images.map((src) => {
                return new Promise((resolve) => {
                    if (imageCache.has(src)) {
                        // Si l'image est déjà dans le cache, pas besoin de la recharger
                        resolve();
                    } else {
                        const img = new Image();
                        img.src = src;
                        img.onload = () => {
                            imageCache.set(src, img); // Stocker l'image dans le cache
                            resolve();
                        };
                    }
                });
            })
        );
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
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        const isHomePage = window.location.pathname === '/';

        if (isTouchDevice && isHomePage) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'relative';
        }

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

        window.addEventListener('wheel', handleWheel);

        let touchStartY = 0;
        const handleTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            if (isScrolling) return;

            const touchEndY = e.touches[0].clientY;
            const swipeDistance = touchStartY - touchEndY;

            if (Math.abs(swipeDistance) >= (SCROLL_THRESHOLD * 1.2)) {
                let nextProjectIndex = currentProject;
                if (swipeDistance) {
                    nextProjectIndex = (currentProject + 1) % projects.length;
                }

                if (nextProjectIndex !== currentProject) {
                    setIsChanging(true);
                    setTimeout(() => setIsChanging(false), 500);
                    setAnimateCategory(projects[nextProjectIndex].category !== projects[currentProject].category);
                    setCurrentProject(nextProjectIndex);
                    setIsScrolling(true);
                    setTimeout(() => setIsScrolling(false), SCROLL_DELAY);
                    touchStartY = 0;
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
                <Header />
            </div>

            <Link className="portfolio-container" to={`/projet/${projects[currentProject].id}`}>
                <div className="background-image">
                    {imagesLoaded && imageCache.has(projects[currentProject].image) && (
                        <img
                            src={imageCache.get(projects[currentProject].image).src}
                            alt={`Projet ${projects[currentProject].title}`}
                        />
                    )}
                </div>

                <div className={`background-motif ${currentProject === 4 ? 'invert-motif' : ''}`}>
                    <img src={Motif} alt="Motif de Maëlle Camissogo" />
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
