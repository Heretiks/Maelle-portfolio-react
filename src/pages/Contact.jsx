import "../assets/styles/pages/Contact.scss";
import Motif from '../assets/global/motif-grand.png';
import Bullet from '../assets/global/SVG_MOTIF-POINT_AVANT.svg';
import { Link } from "react-router-dom";
import Header from "../components/Header.jsx";
import {useEffect, useRef, useState} from "react";
import EmailJS from '@emailjs/browser'
import FlipLink from "../components/FlipLink.jsx";
import { motion } from "framer-motion";
import LogoMc from "../components/LogoMc.jsx";

import linkedInSvg from '../assets/global/logo.svg';
import mailSvg from '../assets/global/logo.svg';
import maltSvg from '../assets/global/logo.svg';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const logoRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [bigHeight, setBigHeight] = useState(window.innerHeight > 700);

    // Savoir si on affiche motif-bottom ou non (height > 700px)
    useEffect(() => {
        const handleResize = () => {
            setBigHeight(window.innerHeight > 700);
        };

        // Ajouter un écouteur de redimensionnement
        window.addEventListener("resize", handleResize);

        // Nettoyage de l'écouteur au démontage
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Vérification des champs
        if (!formData.name || !formData.email || !formData.message) {
            alert("Veuillez remplir tous les champs.");
            setIsSubmitting(false);
            return;
        }

        try {
            // Envoi via EmailJS
            await EmailJS.send(
                "service_lfnnnup", // Remplace par ton service ID
                "template_dn3ie19", // Remplace par ton template ID
                {
                    nom: formData.name,
                    email: formData.email,
                    message: formData.message,
                },
                "CgtLsRoIl8NdjzEEP" // Remplace par ton user ID (public key)
            );

            setSuccessMessage("Votre message a été envoyé avec succès !");
            setFormData({ name: "", email: "", message: "" }); // Réinitialisation du formulaire
        } catch (error) {
            console.log(error);
            alert("Une erreur est survenue lors de l'envoi du message.");
        }

        setIsSubmitting(false);
    };

    const fromLeftTransition = {
        initial: { x: '-100vw' },
        animate: { x: 0 },
        exit: { x: '-100vw' },
        transition: { duration: 0.8 }
    };

    const fromRightTransition = {
        initial: { x: '100vw' },
        animate: { x: 0 },
        exit: { x: '100vw' },
        transition: { duration: 0.8 }
    };

    const fromTopTransition = {
        initial: { y: '-100vh' },
        animate: { y: 0 },
        exit: { y: '-100vh' },
        transition: { duration: 0.8 }
    };

    const logoTransition = {
        initial: { x: '-100vw' },
        animate: { x: 0 },
        whileHover: { x: 0 },
        exit: { x: '-100vw' },
        transition: { duration: 0.5 }
    };

    return (
        <div className="container">
            <Header />
            <Link to="/" className="retour-accueil">
                <motion.img src={Bullet} alt="Next" className="arrow-icon" {...fromTopTransition}/>
            </Link>
            <motion.div className="retour-listing" {...fromTopTransition}>
                <FlipLink to={'/projets'}> Vue d&#39;ensemble </FlipLink>
            </motion.div>
            <motion.img src={Motif} alt="Motif haut" className="motif motif-top" {...fromRightTransition}/>
            <div className="content">
                <Link to="/" className="logo" {...logoTransition}>
                    <motion.div {...fromLeftTransition}>
                        <LogoMc ref={logoRef}/>
                    </motion.div>
                </Link>
                <motion.div className="form-container" {...fromRightTransition}>
                    <h2 className="title">PARLONS DE VOTRE PROJET</h2>
                    <form className="form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="name"
                            placeholder="NOM"
                            className="input"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete={"name"}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="MAIL"
                            className="input"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete={"email"}
                        />
                        <textarea
                            name="message"
                            placeholder="MESSAGE"
                            className="textarea"
                            value={formData.message}
                            onChange={handleChange}
                        ></textarea>
                        <button type="submit" className={`button ${successMessage ? "hide" : ""}`}  disabled={isSubmitting}>
                            {isSubmitting ? "ENVOI EN COURS..." : "ENVOYER"}
                        </button>
                    </form>
                    {successMessage && <p className="success-message">{successMessage}</p>}
                </motion.div>
            </div>
            <motion.img src={Motif} alt="Motif bas" className={`motif motif-bottom ${bigHeight ? "big" : ""}`} {...fromLeftTransition}/>

            <div className="reseaux">
                <img src={linkedInSvg} alt="Linkedin" className="linkedin" onClick={() => window.open("https://www.linkedin.com/in/", "_blank")}/>
                <img src={mailSvg} alt="Mail" className="mail" onClick={() => window.open("mailto:m.camissogo@gmail.com", "_blank")}/>
                <img src={maltSvg} alt="Malt" className="malt" onClick={() => window.open("https://malt.io/", "_blank")}/>
            </div>

        </div>
    );
};

export default ContactForm;
