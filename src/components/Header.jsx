import { useState, useEffect } from "react";
import {Link, useLocation} from "react-router-dom";
import {motion} from "framer-motion";
import FlipLink from "./FlipLink.jsx";
import LogoMc from '../components/LogoMc.jsx';

const Header = () => {
    const location = useLocation();
    const [isInverted, setIsInverted] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isExcludedProject = location.pathname === "/projets" || location.pathname === "/contact";

            if (isExcludedProject) {
                setIsInverted(false);
            } else {
                setIsInverted(window.scrollY < (window.innerHeight * 0.92));
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Vérifie l'état au changement d'URL même sans scroll
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]); // Ajoute location.pathname comme dépendance pour se réévaluer à chaque changement d'URL

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    let headerTransition;
    let contactTransition;
    if (location.pathname.includes('/projet/')) {
        headerTransition = {
            initial: { x: '-100vw' },
            animate: { x: 0 },
            exit: { x: '-100vw' },
            transition: { duration: 1 },
            ease: 'easeInOut',
        };
    }
    else if (location.pathname.includes('/projets')) {
        headerTransition = {
            initial: { x: '-100vw' },
            animate: { x: 0 },
            exit: { x: '-100vw' },
            transition: { duration: 1 },
            ease: 'easeInOut',
        };
        contactTransition = {
            initial: { x: '50vw' },
            animate: { x: 0 },
            exit: { x: '50vw' },
            transition: { duration: 0.8 },
            ease: 'easeInOut',
        };
    }

    const mobileMenuTransition = {
        initial: { x: '100vw' },
        animate: { x: 0 },
        exit: { x: '100vw' },
        transition: { duration: 1 },
        ease: 'easeInOut',
    };

    return (
        <header className="header">
            <Link
                to="/"
                className={`logo ${isMobileMenuOpen ? "open" : isInverted ? "inverted" : ""}`}
                style={{ position: (location.pathname.startsWith('/projet/') || location.pathname.startsWith('/projets')) ? "fixed" : "initial" }}
            >
                <motion.div {...headerTransition}><LogoMc/></motion.div>
            </Link>
            <img
                src="/images/motif-grand.webp"
                alt="Motif de Maëlle Camissogo"
                className="motif"
                style={{ visibility: "hidden" }}
            />
            <motion.div
                {...contactTransition}
                className="contact-link"
                style={{ visibility: location.pathname.startsWith('/projets') ? "initial" : "hidden " }}
            >
                <FlipLink to={'/contact'}>Contact</FlipLink>
            </motion.div>

            {/* Bouton de menu burger */}
            <motion.div
                className={`burger-icon ${isMobileMenuOpen ? "open" : isInverted ? "" : "inverted"}`}
                onClick={toggleMobileMenu}
                {...mobileMenuTransition}
            >
                <img src="/images/SVG_MOTIF_POINT_BURGER.svg" alt="Icon menu burger"/>
            </motion.div>
            {/* Menu mobile */}
            <nav className={`header-mobile ${isMobileMenuOpen ? "open" : ""}`}>
                <div className="background-motif top">
                    <img src="/images/motif-grand.webp" alt="Motif de Maëlle Camissogo"/>
                </div>
                <ul>
                    <li><Link to="/" onClick={toggleMobileMenu} >Accueil</Link></li>
                    <li><Link to="/projets" onClick={toggleMobileMenu} >Vue d&#39;ensemble</Link></li>
                    <li><Link to="/contact" onClick={toggleMobileMenu} >Contact</Link></li>
                </ul>
                <div className="background-motif bottom">
                    <img src="/images/motif-grand.webp" alt="Motif de Maëlle Camissogo"/>
                </div>
            </nav>
        </header>
    );
};

export default Header;
