import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import projects from "../data/projets.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import "../assets/styles/pages/ListingProjects.scss";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const ListingProjects = () => {
    const gridRef = useRef(null);

    ScrollTrigger.config({
        // Ignore les changements de taille liés au clavier virtuel ou aux rotations d'écran
        ignoreMobileResize: true,
    });

    useEffect(() => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        // Sélectionne tous les éléments de la grille
        const items = gridRef.current.querySelectorAll(".grid-item>img");

        // ScrollTrigger individuellement à chaque image
        items.forEach((item) => {
            item.onload = () => {
                gsap.fromTo(
                    item,
                    { opacity: 0, y: 100 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 85%",
                            end: "bottom 20%",
                            // markers: true,
                            toggleActions: "play reverse play reverse",
                        },
                    }
                );
            };
        });

        ScrollTrigger.refresh();

        // Nettoyage
        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };

    }, []);

    return (
        <div className="listing-projects">
            <Header />

            {/* Grille des projets */}
            <main className="grid" ref={gridRef}>
                {projects.map((project) => (
                    <Link to={"/projet/" + project.id} key={project.id} className="grid-item">
                        <img src={project.imageCarre} alt={`Project ${project.id}`} />
                    </Link>
                ))}
            </main>

            <Footer />
        </div>
    );
};

export default ListingProjects;
