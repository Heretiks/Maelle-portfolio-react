import { useState, useEffect } from "react";
import {Link, useLocation} from "react-router-dom";
import LogoMc from '../assets/global/logo.svg';
import MotifMc from '../assets/global/motif.png';
import Motif from "../assets/global/motif-grand.png";

import HeaderPoint from "../assets/global/SVG_MOTIF_POINT_BURGER.svg";

const Header = () => {
    const location = useLocation();
    const [isInverted, setIsInverted] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isExcludedProject = location.pathname === "/projet/1" || location.pathname === "/projet/5" || location.pathname === "/projets" || location.pathname === "/contact";

            if (isExcludedProject) {
                setIsInverted(false); // Désactive l'inversion pour ces pages spécifiques
            } else {
                setIsInverted(window.scrollY < (window.innerHeight * 0.92));
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Vérifie l'état au changement d'URL même sans scroll
        handleScroll();

        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]); // Ajoute location.pathname comme dépendance pour se réévaluer à chaque changement d'URL

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'; // Désactive le scroll
        } else {
            document.body.style.overflow = ''; // Réactive le scroll
        }

        return () => {
            document.body.style.overflow = ''; // Réactive le scroll en cas de démontage
        };
    }, [isMobileMenuOpen]);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="header">
            <Link
                to="/"
                className="logo"
                style={{ position: (location.pathname.startsWith('/projet/') || location.pathname.startsWith('/projets')) ? "fixed" : "initial" }}
            >
                <img
                    src={LogoMc}
                    alt="Logo de Maëlle Camissogo"
                    className={`logo-image ${isMobileMenuOpen ? "open" : isInverted ? "inverted" : ""}`}
                />
            </Link>
            <img
                src={MotifMc}
                alt="Motif de Maëlle Camissogo"
                className="motif"
                style={{ visibility: "hidden" }}
            />
            <Link
                className="contact-link"
                to="/contact"
                style={{ visibility: location.pathname.startsWith('/projets') ? "initial" : "hidden " }}
            >
                Un projet ?
            </Link>

            {/* Bouton de menu burger */}
            <div
                className={`burger-icon ${isMobileMenuOpen ? "open" : isInverted ? "inverted" : ""}`}
                onClick={toggleMobileMenu}
            >
                <img src={HeaderPoint} alt="Icon menu burger"/>
            </div>
            {/* Menu mobile */}
            <nav className={`header-mobile ${isMobileMenuOpen ? "open" : ""}`}>
                <div className="background-motif top">
                    <img src={Motif} alt="Motif de Maëlle Camissogo"/>
                </div>
                <ul>
                    <li><Link to="/" onClick={toggleMobileMenu}>Accueil</Link></li>
                    <li><Link to="/projets" onClick={toggleMobileMenu}>Vue d&#39;ensemble</Link></li>
                    <li><Link to="/contact" onClick={toggleMobileMenu}>Un projet ?</Link></li>
                </ul>
                <div className="background-motif bottom">
                    <img src={Motif} alt="Motif de Maëlle Camissogo"/>
                </div>
            </nav>
        </header>
    );
};

export default Header;
