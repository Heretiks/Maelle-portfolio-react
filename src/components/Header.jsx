// src/components/Header.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import LogoMc from "../assets/global/logo.svg";
import MotifMc from "../assets/global/motif.png";

const Header = () => {
    const location = useLocation(); // Récupère l'URL actuelle

    return (
        <header className="header">
            <a href="/" className="logo"><img src={LogoMc} alt="Logo de Maëlle Camissogo" className="logo-image"/></a>
            <img src={MotifMc} alt="Motif de Maëlle Camissogo" className="motif"/>
            <a
                href="/contact"
                className="contact-button"
                style={{ visibility: location.pathname === "/contact" ? "hidden" : "visible" }}
            >
                CONTACT
            </a>
        </header>
    );
};

export default Header;
