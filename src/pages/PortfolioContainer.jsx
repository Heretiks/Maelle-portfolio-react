import { useState, useEffect } from 'react';
import projects from '../data/projets.js';
import LogoMc from '../assets/global/logo.svg';
import '../assets/styles/pages/PortfolioContainer.css';
import {Link} from "react-router-dom";


function PortfolioContainer() {
    const [currentProject, setCurrentProject] = useState(() => Math.floor(Math.random() * projects.length));
    const [scrollOffset, setScrollOffset] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isChanging, setIsChanging] = useState(false);
    const [animateCategory, setAnimateCategory] = useState(true);

    const SCROLL_THRESHOLD = 100;
    const SCROLL_DELAY = 1000;
    const AUTO_SCROLL_INTERVAL = 5000;

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

                    // Vérifie si la catégorie est identique et met à jour l'état
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
        return () => window.removeEventListener('wheel', handleWheel);
    }, [isScrolling, currentProject]);

    // Auto-scroll toutes les 3 secondes
    useEffect(() => {
        const interval = setInterval(() => {
            const nextProjectIndex = (currentProject + 1) % projects.length;

            setIsChanging(true);
            setTimeout(() => setIsChanging(false), 500);

            setAnimateCategory(projects[nextProjectIndex].category !== projects[currentProject].category);

            setCurrentProject(nextProjectIndex);
        }, AUTO_SCROLL_INTERVAL);

        return () => clearInterval(interval);
    }, [currentProject]);

    return (
        <Link className="portfolio-container" to={`/projet/${projects[currentProject].id}`}>
            <div
                className="background-image"
                style={{ backgroundImage: `url(${projects[currentProject].image})` }}
            ></div>
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
    );
}

export default PortfolioContainer;
