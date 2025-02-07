import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const location = useLocation();

    useEffect(() => {
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
        };
    }, []);

    // Réinitialiser le curseur lors du changement d'URL
    useEffect(() => {
        // Ce useEffect réinitialise le curseur mais ne désactive pas la logique de hover
        const linksAndButtons = [...document.querySelectorAll("a"), ...document.querySelectorAll("button")];

        // Reset l'état de survol à false au moment du changement de page, mais n'affecte pas le hover
        setIsHovering(false);

        // Réactive les listeners pour que le hover fonctionne correctement après un changement de page
        linksAndButtons.forEach((link) => {
            link.addEventListener("mouseenter", () => setIsHovering(true));
            link.addEventListener("mouseleave", () => setIsHovering(false));
        });
    }, [location.pathname]); // Dépendance sur le changement d'URL

    return (
        <div
            ref={cursorRef}
            className={`custom-cursor ${isHovering ? "hover" : ""}`}
        ></div>
    );
};

export default CustomCursor;
