import "../assets/styles/pages/Contact.scss";
import { Link } from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import EmailJS from '@emailjs/browser'
import { motion } from "framer-motion";
import { Helmet } from 'react-helmet-async';
import Header from "../components/Header.jsx";
import FlipLink from "../components/FlipLink.jsx";
import LogoMc from "../components/LogoMc.jsx";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const logoRef = useRef(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [isBigHeight, setIsBigHeight] = useState(window.innerHeight > 700);
    const [isBigWidth, setIsBigWidth] = useState(window.innerWidth > 650);

    // Savoir si on affiche motif-bottom ou non (height > 700px)
    useEffect(() => {
        const handleResize = () => {
            setIsBigHeight(window.innerHeight > 700);
            setIsBigWidth(window.innerWidth > 650);
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
        transition: { duration: 1 }
    };

    const fromRightTransition = {
        initial: { x: '100vw' },
        animate: { x: 0 },
        exit: { x: '100vw' },
        transition: { duration: 1 }
    };

    let listingTransition = window.innerWidth < 900 && window.innerWidth > 800 ? fromRightTransition : fromLeftTransition;

    const logoTransition = {
        initial: { x: '-100vw' },
        animate: { x: 0 },
        whileHover: { x: 0 },
        exit: { x: '-100vw' },
        transition: { duration: 0.5 }
    };

    return (
        <>
            <Helmet>
                <title>Contact | Maëlle Camissogo</title>
                <meta name="description" content="Contactez-moi pour toute demande de projet graphique, collaboration ou toute question." />
                <meta property="og:title" content="Contact | Maëlle Camissogo" />
                <meta property="og:description" content="Besoin d'un projet graphique ? Contactez Maëlle Camissogo pour discuter de vos idées." />
                <meta property="og:image" content="https://maellecamissogo.com/image-partage-contact.jpg" />
                <meta property="og:url" content="https://maellecamissogo.com/contact" />
            </Helmet>
            <div className="container">
                <Header />
                <Link to="/" className="retour-accueil">
                    <motion.img src="/images/SVG_MOTIF_POINT_AVANT.svg" alt="Next" className="arrow-icon" {...fromLeftTransition}/>
                </Link>
                <div className="retour-listing">
                    <motion.div {...listingTransition}>
                        <FlipLink to={'/projets'}> Vue d&#39;ensemble </FlipLink>
                    </motion.div>
                </div>
                <motion.img src="/images/motif-grand.png" alt="Motif haut" className="motif motif-top" {...fromRightTransition}/>
                <div className="content">
                    <Link to="/" className="logo" {...logoTransition}>
                        <motion.div {...fromLeftTransition}>
                            <LogoMc ref={logoRef}/>
                        </motion.div>
                    </Link>
                    <motion.div className="form-container" {...fromRightTransition}>
                        <h1 className="title">PARLONS DE VOTRE PROJET</h1>
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
                            <button type="submit" className={`button btn-14 ${successMessage ? "hide" : ""}`}  disabled={isSubmitting}>
                                {isSubmitting ? "ENVOI EN COURS..." : "ENVOYER"}
                            </button>
                        </form>
                        {successMessage && <p className="success-message">{successMessage}</p>}
                    </motion.div>
                </div>
                <motion.img src="/images/motif-grand.png" alt="Motif bas" className={`motif motif-bottom ${isBigHeight ? "big" : ""}`} {...fromLeftTransition}/>

                <motion.div className={`reseaux ${!isBigWidth && !isBigHeight ? "mobile" :
                                                    !isBigWidth && isBigHeight ? "mobile-haut" : "grand-format"}`} {...fromRightTransition}>
                    <img src="/images/mail.svg" alt="Mail" className="rs mail" onClick={() => window.open("mailto:m.camissogo@gmail.com", "_blank")}/>
                    <img src="/images/malt.svg" alt="Malt" className="rs malt" onClick={() => window.open("https://www.malt.fr/profile/maellecamissogo", "_blank")}/>
                    <img src="/images/linkedin.svg" alt="Linkedin" className="rs linkedin" onClick={() => window.open("https://www.linkedin.com/in/ma%C3%ABlle-camissogo/", "_blank")}/>
                </motion.div>
            </div>
        </>
    );
};

export default ContactForm;
