import React from "react";
import projects from "../data/projets.js";
import LogoMc from "../assets/global/logo.svg";
import MotifMc from "../assets/global/motif.png";


const ListingProjects = () => {
    return (
        <div className="listing-projects">
            <header className="header">
                <img src={LogoMc} alt="Logo de Maëlle Camissogo" className="logo"/>
                <img src={MotifMc} alt="Motif de Maëlle Camissogo" className="motif"/>
                <p className="contact-button">CONTACT</p>
            </header>

            {/* Grille des projets */}
            <main className="grid">
                {projects.map((project) => (
                    <a href={project.link} key={project.id} className="grid-item">
                        <img src={project.imageCarre} alt={`Project ${project.id}`}/>
                    </a>
                ))}

            </main>
            <img src={MotifMc} alt="Motif de Maëlle Camissogo" className="end-motif"/>

        </div>
    );
};

export default ListingProjects;
