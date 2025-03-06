import React, { useState } from 'react';
import projects from '../data/projets.js';
import Motif from '../assets/global/motif-grand.png';
import '../assets/styles/pages/PortfolioContainer.scss';
import { Link } from 'react-router-dom';
import Header from "../components/Header.jsx";
import Home from "../components/Home.jsx";

import {motion} from "framer-motion";
import FlipLink from "../components/FlipLink.jsx";


import LogoMcMotion from "../components/LogoMc.jsx";
import {Helmet} from "react-helmet-async";
import {LoadingProvider} from "../components/LoadingProvider.jsx";
import AppLoader from "../components/AppLoader.jsx";

const PortfolioContainer = React.memo(function PortfolioContainer() {
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

    const logoAndNameTransition = {
        initial: { x: '-250%' },
        animate: { x: 0 },
        exit: { x: '-2000%' },
        transition: { duration: 0.5 },
        ease: 'easeInOut',
    };

    const infoTransition = {
        initial: { y: '1000px' },
        animate: { y: 0 },
        exit: { y: '1000px' },
        transition: { duration: 0.5 },
        ease: 'easeInOut',
    };

    const motifTransition = {
        initial: { x: '250%' },
        animate: { x: 0 },
        exit: { x: '1000px' },
        transition: { duration: 0.4 },
        ease: 'easeInOut',
    };

    return (
        <>
            <Helmet>
                <title>Maëlle Camissogo | Portfolio de Graphiste</title>
                <meta name="description" content="Portfolio de Maëlle Camissogo, graphiste et directrice artistique professionnelle spécialisée en design créatif et innovant. Découvrez mes projets et réalisations graphiques."/>
                <meta property="og:title" content="Maëlle Camissogo | Portfolio de Graphiste"/>
                <meta property="og:description" content="Découvrez les projets créatifs et innovants de Maëlle Camissogo, graphiste professionnelle."/>
                <meta property="og:image" content="https://www.maellecamissogo.com/image-partage.jpg"/>

                <meta property="og:image" content="/images/image-partage.jpg"/>

                <meta property="og:url" content="https://www.maellecamissogo.com"/>
            </Helmet>

            <div className="portfolio-home">
                <div>
                    <Header/>
                </div>

                <LoadingProvider>
                    <AppLoader>
                        <Home onProjectChange={handleProjectChange}/>
                    </AppLoader>
                </LoadingProvider>

                <Link className="portfolio-container" to={`/projet/${projects[currentIndex].id}`}>
                    <div className="background-motif">
                        <motion.img src={Motif} alt="Motif de Maëlle Camissogo" {...motifTransition}/>
                    </div>
                    <motion.div {...logoAndNameTransition} className="content">
                        <div className="logo" >
                            {/*<img src={LogoMc} alt="Logo de Maëlle Camissogo" />*/}
                            <LogoMcMotion/>
                        </div>
                        <div className="nom-metier">
                            <p className="nom">MAËLLE CAMISSOGO</p>
                            <p className="metier">Graphiste</p>
                        </div>
                    </motion.div>
                    <motion.div className="info" {...infoTransition}>
                        <div className="first-block">
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
                        <div className="second-block">
                            <div className="listing">
                                <FlipLink to="/projets" className="listing-text">VUE D&#39;ENSEMBLE</FlipLink>
                            </div>
                            <div className="contact">
                                <FlipLink to="/contact" className="contact-text">Contact</FlipLink>
                            </div>
                        </div>
                    </motion.div>
                </Link>
            </div>
        </>
    );
});

export default PortfolioContainer;
