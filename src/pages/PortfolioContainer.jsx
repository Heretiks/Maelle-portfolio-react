import { useState } from 'react';
import projects from '../data/projets.js';
import LogoMc from '../assets/global/logo.svg';
import Motif from '../assets/global/motif-grand.png';
import '../assets/styles/pages/PortfolioContainer.scss';
import { Link } from 'react-router-dom';
import Header from "../components/Header.jsx";
import Home from "../components/Home.jsx";

function PortfolioContainer() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isChanging, setIsChanging] = useState(false);
    const [animateCategory, setAnimateCategory] = useState(false);

    const handleProjectChange = (newIndex) => {
        if (newIndex !== currentIndex) {
            setIsChanging(true);
            setAnimateCategory(projects[newIndex].category !== projects[currentIndex].category);
            setCurrentIndex(newIndex);
            setTimeout(() => setIsChanging(false), 500);
        }
    };

    return (
        <div className="portfolio-home">
            <div className={`${currentIndex === 4 ? 'black-menu' : ''}`}>
                <Header />
            </div>

            <Link className="portfolio-container" to={`/projet/${projects[currentIndex].id}`}>
                <Home onProjectChange={handleProjectChange} />

                <div className={`background-motif ${currentIndex === 4 ? 'invert-motif' : ''}`}>
                    <img src={Motif} alt="Motif de Maëlle Camissogo" />
                </div>
                <div className={`content ${currentIndex === 4 ? 'black-text' : ''}`}>
                    <div className="logo">
                        <img src={LogoMc} alt="Logo de Maëlle Camissogo" />
                    </div>
                    <div className="nom-metier">
                        <p className="nom">MAËLLE CAMISSOGO</p>
                        <p className="metier">Graphiste</p>
                    </div>
                </div>
                <div className="info">
                    <div className={`first-block ${currentIndex === 4 ? 'black-text' : ''}`}>
                        <div className="category">
                            <p className="category-title">Catégorie</p>
                            <p className={`category-text ${isChanging && animateCategory ? 'is-changing' : ''}`}>
                                {projects[currentIndex].category}
                            </p>
                        </div>
                        <div className="title">
                            <p className="title-title">Projet</p>
                            <p className={`title-text ${isChanging ? 'is-changing' : ''}`}>
                                {projects[currentIndex].title}
                            </p>
                        </div>
                    </div>
                    <div className={`second-block ${currentIndex === 4 ? 'black-text' : ''}`}>
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
