import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const checkIfMobile = () => {
            if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }

            if (window.matchMedia("(pointer: fine)").matches) {
                setIsMobile(false);  // Si un dispositif de type souris (précision fine)
            }
        };

        checkIfMobile();
        window.addEventListener("resize", checkIfMobile);

        const cursor = cursorRef.current;
        let mouseX = 0;
        let mouseY = 0;
        let currentX = parseInt(localStorage.getItem("cursorX") || 0);
        let currentY = parseInt(localStorage.getItem("cursorY") || 0);
        const speed = 0.1;

        // Applique les coordonnées enregistrées si elles existent
        if (cursor && currentX && currentY) {
            cursor.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
        }

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

        // Sauvegarde la position actuelle uniquement au survol d'un lien
        const handleMouseEnterLink = () => {
            setIsHovering(true);
            localStorage.setItem("cursorX", mouseX);
            localStorage.setItem("cursorY", mouseY);
        };

        const handleMouseLeaveLink = () => {
            setIsHovering(false);
        };

        window.addEventListener("mousemove", handleMouseMove);

        // Listener pour tous les liens
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
            window.removeEventListener("resize", checkIfMobile);
        };
    }, []);

    // Réinitialiser le hover lors du changement d'URL
    useEffect(() => {
        const linksAndButtons = [...document.querySelectorAll("a"), ...document.querySelectorAll("button")];
        setIsHovering(false);
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
