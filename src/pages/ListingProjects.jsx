import projects from "../data/projets.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../assets/styles/pages/ListingProjects.scss";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const ListingProjects = () => {

    const fadeInLeft = {
        initial: { opacity: 0, x: -150 },
        whileInView: { opacity: 1, x: 0 },
        transition: { duration: 0.6, ease: "easeOut" },
    };

    return (
        <div className="listing-projects">
            <Header />

            {/* Grille des projets */}
            <main className="grid">
                {projects.map((project) => (
                    <Link to={"/projet/" + project.id} key={project.id} className="grid-item">
                        <motion.img
                            src={project.imageCarre}
                            alt={`Project ${project.id}`}
                            {...fadeInLeft} // Animation
                        />

                        <div className="more-info-hover" >
                            <p className="hover-name">{project.title}</p>
                            <p className="hover-category">{project.category}</p>
                        </div>
                    </Link>
                ))}
            </main>

            <Footer />
        </div>
    );
};

export default ListingProjects;
