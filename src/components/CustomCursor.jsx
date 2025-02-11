import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const location = useLocation();

    useEffect(() => {
        // Vérifier si un appareil tactile est présent
        const checkIfMobile = () => {
            if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
                setIsMobile(true);  // Détecte un appareil tactile
            } else {
                setIsMobile(false); // Appareil non tactile
            }
        };

        // Vérifie si l'utilisateur utilise une souris
        const checkForMouse = () => {
            if (window.matchMedia("(pointer: fine)").matches) {
                setIsMobile(false);  // Si un dispositif de type souris (précision fine)
            }
        };

        // Détecte un changement entre un appareil tactile et une souris
        const handlePointerType = () => {
            if (window.matchMedia("(pointer: coarse)").matches) {
                checkIfMobile(); // Si c'est un écran tactile
            } else {
                checkForMouse(); // Si c'est une souris
            }
        };

        // Appeler la détection à l'initialisation
        handlePointerType();

        // Listener sur le changement de type de pointer (souris ou tactile)
        window.addEventListener("pointerdown", handlePointerType);

        // Appeler la fonction pour déterminer si c'est mobile
        checkIfMobile();

        // Mise en place de l'écouteur de mouvement de souris
        const cursor = cursorRef.current;

        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        const speed = 0.1;

        const followMouse = () => {
            currentX += (mouseX - currentX) * speed;
            currentY += (mouseY - currentY) * speed;

            if (cursor) {
                cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
            }

            requestAnimationFrame(followMouse);
        };

        const handleMouseMove = (event) => {
            mouseX = event.clientX;
            mouseY = event.clientY;
        };

        const handleMouseEnterLink = () => {
            setIsHovering(true);
        };

        const handleMouseLeaveLink = () => {
            setIsHovering(false);
        };

        // Listener pour le mouvement de la souris
        window.addEventListener("mousemove", handleMouseMove);

        // Listener pour le survol des liens
        const links = document.querySelectorAll("a");
        links.forEach((link) => {
            link.addEventListener("mouseenter", handleMouseEnterLink);
            link.addEventListener("mouseleave", handleMouseLeaveLink);
        });

        followMouse();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            links.forEach((link) => {
                link.removeEventListener("mouseenter", handleMouseEnterLink);
                link.removeEventListener("mouseleave", handleMouseLeaveLink);
            });
            window.removeEventListener("pointerdown", handlePointerType);
        };
    }, []); // Ce useEffect s'exécute une fois au chargement

    // Réinitialiser le curseur lors du changement d'URL
    useEffect(() => {
        const linksAndButtons = [...document.querySelectorAll("a"), ...document.querySelectorAll("button")];

        // Reset l'état de survol à false au moment du changement de page
        setIsHovering(false);

        // Réactive les listeners pour que le hover fonctionne correctement après un changement de page
        linksAndButtons.forEach((link) => {
            link.addEventListener("mouseenter", () => setIsHovering(true));
            link.addEventListener("mouseleave", () => setIsHovering(false));
        });
    }, [location.pathname]);

    return (
        <div
            ref={cursorRef}
            className={`custom-cursor ${isHovering ? "hover" : ""} ${isMobile ? "mobile" : ""}`}
        ></div>
    );
};

export default CustomCursor;
