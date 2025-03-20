// src/components/Header.jsx
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
        </footer>
    );
};

export default Footer;