import projects from "../data/projets.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../assets/styles/pages/ListingProjects.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {Helmet} from "react-helmet-async";

const ListingProjects = () => {

    const fadeInLeft = {
        initial: { opacity: 0, x: -150 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
    };

    const leavePage = {
        initial: { x: "-150vw" },
        animate: { x: 0 },
        exit: { x: "150vw" },
        transition: { duration: 0.6, ease: "easeOut" },
    };

    const fadeInOut = {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 1, ease: "ease" },
    };

    return (
        <>
            <Helmet>
                <title>Vue d&#39;ensemble | Maëlle Camissogo</title>
                <meta name="description" content="Découvrez les projets de Maëlle Camissogo, graphiste et directrice artistique professionnelle spécialisée en design créatif et innovant." />
                <meta property="og:title" content="Mes Projets | Maëlle Camissogo" />
                <meta property="og:description" content="Découvrez mes réalisations graphiques et projets de design." />
                <meta property="og:image" content="https://maellecamissogo.com/image-partage-projets.jpg" />
                <meta property="og:url" content="https://maellecamissogo.com/projets" />
            </Helmet>

            <div className="listing-projects">
                <Header />

                {/* Grille des projets */}
                <motion.main className="grid" {...leavePage}>
                    {projects.map((project) => (
                        <Link to={"/projet/" + project.id} key={project.id} className="grid-item">
                            <motion.img
                                src={project.imageCarre}
                                alt={`Project ${project.id}`}
                                {...fadeInLeft}
                            />

                            <div className="more-info-hover" >
                                <p className="hover-name">{project.title}</p>
                                <p className="hover-category">{project.category}</p>
                            </div>
                        </Link>
                    ))}
                </motion.main>

                <motion.div {...fadeInOut}><Footer /></motion.div>
            </div>
        </>
    );
};

export default ListingProjects;
