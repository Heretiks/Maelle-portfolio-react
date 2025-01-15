import { useState, useEffect } from 'react';
import './App.css';
import LogoMc from './assets/global/logo.svg';
import projects from './data/projets.js';

import ListingProject from "./pages/ListingProjects.jsx";
import Contact from "./pages/Contact.jsx";

function App() {
    const [currentProject, setCurrentProject] = useState(0);
    const [scrollOffset, setScrollOffset] = useState(0);
    const [isScrolling, setIsScrolling] = useState(false);
    const [isChanging, setIsChanging] = useState(false);

    const SCROLL_THRESHOLD = 100;
    const SCROLL_DELAY = 1000; // Délai en millisecondes avant de pouvoir changer de projet à nouveau

    useEffect(() => {
        const handleWheel = (event) => {
            if (isScrolling) return;

            setScrollOffset((prevOffset) => {
                const newOffset = prevOffset + event.deltaY;

                if (newOffset >= SCROLL_THRESHOLD) {
                    // Scroll vers le bas
                    setIsChanging(true);
                    setTimeout(() => setIsChanging(false), 500);

                    setCurrentProject((prev) => (prev + 1) % projects.length);
                    setIsScrolling(true);
                    setTimeout(() => setIsScrolling(false), SCROLL_DELAY);
                    return 0;
                } else if (newOffset <= -SCROLL_THRESHOLD) { // Scroll vers le haut
                    setIsChanging(true);
                    setTimeout(() => setIsChanging(false), 500);

                    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
                    setIsScrolling(true);
                    setTimeout(() => setIsScrolling(false), SCROLL_DELAY);
                    return 0;
                }

                return newOffset;
            });
        };

        window.addEventListener('wheel', handleWheel);
        return () => window.removeEventListener('wheel', handleWheel);
    }, [isScrolling]);

    return (
        <>
            {/*<div className="portfolio-container">*/}
            {/*    <div*/}
            {/*        className="background-image"*/}
            {/*        style={{ backgroundImage: `url(${projects[currentProject].image})` }}*/}
            {/*    ></div>*/}
            {/*    <div className="content">*/}
            {/*        <div className="logo">*/}
            {/*            <img src={LogoMc} alt="Logo de Maëlle Camissogo"/>*/}
            {/*        </div>*/}
            {/*        <div className="info">*/}
            {/*            <div className="category">*/}
            {/*                <p className="category-title">Catégorie</p>*/}
            {/*                <p className={`category-text ${isChanging ? 'is-changing' : ''}`}>{projects[currentProject].category}</p>*/}
            {/*            </div>*/}
            {/*            <span className="divider"></span>*/}
            {/*            <div className="title">*/}
            {/*                <p className="title-title">Projet</p>*/}
            {/*                <p className={`title-text ${isChanging ? 'is-changing' : ''}`}>{projects[currentProject].title}</p>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</div>*/}


            {/*<ListingProject />*/}

            <Contact/>
        </>
    );
}

export default App;

