import { useParams, Navigate } from 'react-router-dom';
import projects from '../data/projets.js';
import '../App.css';
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import {useEffect, useRef, useState} from "react";

function DetailProjet() {
    const [isFixed, setIsFixed] = useState(false);
    const infoRef = useRef(null);

    // Récupérer l'id du projet depuis l'URL et Trouver le projet correspondant
    const { projectId } = useParams();
    const project = projects.find(p => p.id === parseInt(projectId, 10));

    useEffect(() => {
        const handleScroll = () => {
            if (infoRef.current) {
                const offsetTop = infoRef.current.offsetTop;
                const scrollPosition = window.scrollY;

                // Passe en `fixed` si on dépasse la position initiale de la div
                if (scrollPosition > offsetTop) {
                    setIsFixed(true);
                } else {
                    setIsFixed(false);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    if (!project) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="detail-projet">
            <Header />

            {/* Contenu du projet */}
            <main className="detail-container">
                <div className="presentation-projet">
                    <img className="image-presentaion" src={project.image} alt={project.title} />
                    <div className={`content-presentation ${isFixed ? 'add-margin' : ''}`}>
                        <div
                            className={`info ${isFixed ? 'fixed' : ''}`}
                            ref={infoRef}
                        >
                            <div className="category">
                                <p className="category-title">Catégorie</p>
                                <p className="category-text">{project.category}</p>
                            </div>
                            <span className="divider"></span>
                            <div className="title">
                                <p className="title-title">Projet</p>
                                <p className="title-text">{project.title}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="info-projet">
                    {project.blocks.map((block, index) => {
                        switch (block.type) {
                            case "description-et-image":
                                return (
                                    <div className="description-et-image" key={index}>
                                        <div
                                            className="description"
                                            style={{
                                                backgroundColor: project.couleurPrimaire,
                                                color: project.couleurSecondaire,
                                            }}
                                        >
                                            <p className="description-text">{block.text}</p>
                                        </div>
                                        <img src={block.image} alt="Description" />
                                    </div>
                                );
                            case "image-large":
                                return (
                                    <div className="image-large" key={index}>
                                        <img src={block.image} alt="" />
                                    </div>
                                );
                            case "double-image":
                                return (
                                    <div className="double-image" key={index}>
                                        {block.images.map((img, imgIndex) => (
                                            <img className={`${"image-" + imgIndex}`} src={img} alt="" key={imgIndex} />
                                        ))}
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })}
                </div>
                <div className="autre-projet">
                    <a className="lien-liste-projets" href="/projets">+ de projets</a>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default DetailProjet;
