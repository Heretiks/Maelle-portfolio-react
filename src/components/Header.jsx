import { useState, useEffect } from "react";
import {Link, useLocation} from "react-router-dom";
import LogoMc from '../assets/global/logo.svg'
import MotifMc from '../assets/global/motif.png'

const Header = () => {
    const location = useLocation();
    const [isInverted, setIsInverted] = useState(true);

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
                    className={`logo-image ${isInverted ? "inverted" : ""}`}
                />
            </Link>
            <img
                src={MotifMc}
                alt="Motif de Maëlle Camissogo"
                className="motif"
                style={{ visibility: "hidden" }}
            />
        </header>
    );
};

export default Header;
