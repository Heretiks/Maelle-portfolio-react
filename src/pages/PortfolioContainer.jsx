import React, { useState } from 'react';
import projects from '../data/projets.js';
import '../assets/styles/pages/PortfolioContainer.scss';
import { Link } from 'react-router-dom';
import {motion} from "framer-motion";
import {Helmet} from "react-helmet-async";
import Header from "../components/Header.jsx";
import Home from "../components/Home.jsx";
import FlipLink from "../components/FlipLink.jsx";
import LogoMcMotion from "../components/LogoMc.jsx";

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
                <title>Maëlle Camissogo | Graphiste Freelance à Montpellier</title>
                <meta name="description" content="Portfolio de Maëlle Camissogo, graphiste et directrice artistique professionnelle spécialisée dans la création de logo, le branding et les supports print et digitaux. Découvrez mes projets et réalisations."/>
                <meta property="og:title" content="Maëlle Camissogo | Graphiste Freelance à Montpellier"/>
                <meta property="og:description" content="Découvrez les projets créatifs et innovants de Maëlle Camissogo, graphiste professionnelle."/>
                <meta property="og:image" content="https://maellecamissogo.com/image-partage.png"/>
                <meta property="og:url" content="https://maellecamissogo.com"/>

                <link rel="canonical" href="https://maellecamissogo.com" />
            </Helmet>

            <div className="portfolio-home">
                <div>
                    <Header/>
                </div>

                <Home onProjectChange={handleProjectChange}/>

                <Link className="portfolio-container" to={`/projet/${projects[currentIndex].id}`}>
                    <div className="background-motif">
                        <motion.img src="/images/motif-grand.webp" alt="Motif de Maëlle Camissogo" {...motifTransition}/>
                    </div>
                    <motion.div {...logoAndNameTransition} className="content">
                        <div className="logo" >
                            <LogoMcMotion/>
                        </div>
                        <div className="nom-metier">
                            <h1 className="nom">MAËLLE CAMISSOGO</h1>
                            <h2 className="metier">Graphiste</h2>
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
