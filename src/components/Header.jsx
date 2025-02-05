// src/components/Header.jsx
import { useLocation } from "react-router-dom";
import LogoMc from "../assets/global/logo.svg";
import MotifMc from "../assets/global/motif.png";

const Header = () => {
    const location = useLocation(); // Récupère l'URL actuelle

    return (
        <header className="header">
            <a href="/" className="logo" style={{position: location.pathname.startsWith('/projet/') ? "fixed" : "initial"}}>
                <img src={LogoMc} alt="Logo de Maëlle Camissogo" className="logo-image"/>
            </a>
            <img
                src={MotifMc}
                alt="Motif de Maëlle Camissogo"
                className="motif"
                style={{ visibility: "hidden" }}
            />
            {/*<a*/}
            {/*    href="/contact"*/}
            {/*    className="contact-button"*/}
            {/*    style={{*/}
            {/*        visibility:*/}
            {/*            (location.pathname === "/" || location.pathname === "/contact")*/}
            {/*                ? "hidden"*/}
            {/*                : "visible",*/}
            {/*        position: location.pathname.startsWith("/projet/")*/}
            {/*            ? "fixed"*/}
            {/*            : "static",*/}
            {/*        top: location.pathname.startsWith("/projet/") ? "3vh" : "auto",*/}
            {/*        right: location.pathname.startsWith("/projet/") ? "2vw" : "auto"*/}
            {/*    }}*/}
            {/*>*/}
            {/*    CONTACT*/}
            {/*</a>*/}
        </header>
    );
};

export default Header;
