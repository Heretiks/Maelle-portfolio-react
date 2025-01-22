import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false); // Nouvel état

    useEffect(() => {
        const cursor = cursorRef.current;

        let mouseX = 0;
        let mouseY = 0;
        let currentX = 0;
        let currentY = 0;
        const speed = 0.1; // Vitesse de l'interpolation

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
            setIsHovering(true); // Activer l'état quand on survole un lien
        };

        const handleMouseLeaveLink = () => {
            setIsHovering(false); // Désactiver l'état quand on quitte le lien
        };

        // Écoute des mouvements de souris
        window.addEventListener("mousemove", handleMouseMove);

        // Écoute des événements de survol de lien
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

    return (
        <div
            ref={cursorRef}
            className={`custom-cursor ${isHovering ? "hover" : ""}`}
        ></div>
    );
};

export default CustomCursor;
