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

    useEffect(() => {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        // Sélectionne tous les éléments de la grille
        const items = gridRef.current.querySelectorAll(".grid-item>img");

        // Fonction d'animation
        const animateItems = () => {
            items.forEach((item) => {
                gsap.fromTo(
                    item,
                    { opacity: 0, x: -100 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 1,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: item.parentElement,
                            start: "top 85%",
                            end: "bottom 15%",
                            toggleActions: "play reverse play reverse",
                        },
                    }
                );
            });
        };

        // Attendre le chargement complet des images
        const imagesLoaded = Array.from(items).map(
            (item) =>
                new Promise((resolve) => {
                    if (item.complete) resolve();
                    else item.onload = resolve;
                })
        );

        Promise.all(imagesLoaded).then(() => {
            animateItems();
            ScrollTrigger.refresh();
        });

        // Écoute les changements de taille pour rafraîchir le ScrollTrigger
        const resizeHandler = () => {
            ScrollTrigger.refresh();
        };
        window.addEventListener("resize", resizeHandler);

        // Nettoyage
        return () => {
            window.removeEventListener("resize", resizeHandler);
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

                        <div className="more-info-hover">
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
