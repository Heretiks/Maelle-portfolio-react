// src/components/Header.jsx
// import MotifMc from "../assets/global/motif.png";
// import {Link} from "react-router-dom";
import FlipLink from "./FlipLink.jsx";

const Footer = () => {
    return (
        <footer
            className="footer"
            style={{ visibility: location.pathname.startsWith('/projets') ? "initial" : "hidden " }}
        >
            <p className="nom-maelle" >Maëlle Camissogo, Graphiste</p>
            <div className="contact-link" to="/contact">
                <FlipLink to="/contact" >Contact</FlipLink>
            </div>
            {/*<img src={MotifMc} alt="Motif de Maëlle Camissogo" className="end-motif"/>*/}
        </footer>
    );
};

export default Footer;