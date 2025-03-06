import { useEffect, useRef, useState, useCallback, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

    const handleMouseEnterLink = useCallback(() => {
        setIsHovering(true);
        const mouseX = localStorage.getItem("cursorX");
        const mouseY = localStorage.getItem("cursorY");
        if (mouseX && mouseY) {
            localStorage.setItem("cursorX", mouseX);
            localStorage.setItem("cursorY", mouseY);
        }
    }, []);

    const handleMouseLeaveLink = useCallback(() => {
        setIsHovering(false);
    }, []);

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
        let currentX = parseInt(localStorage.getItem("cursorX") || "0");
        let currentY = parseInt(localStorage.getItem("cursorY") || "0");
        const speed = 0.2;

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

        window.addEventListener("mousemove", handleMouseMove);

        followMouse();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", checkIfMobile);
        };
    }, []);

    useLayoutEffect(() => {
        const linksAndButtons = [
            ...document.querySelectorAll("a"),
            ...document.querySelectorAll("button"),
            ...document.querySelectorAll(".burger-icon"),
            ...document.querySelectorAll(".rs")
        ];
        setIsHovering(false);

        const addHoverListeners = (element) => {
            element.addEventListener("mouseenter", handleMouseEnterLink);
            element.addEventListener("mouseleave", handleMouseLeaveLink);
        };

        linksAndButtons.forEach(addHoverListeners);

        return () => {
            linksAndButtons.forEach((element) => {
                element.removeEventListener("mouseenter", handleMouseEnterLink);
                element.removeEventListener("mouseleave", handleMouseLeaveLink);
            });
        };
    }, [location.pathname, handleMouseEnterLink, handleMouseLeaveLink]);

    useEffect(() => {
        const handleMouseEnter = (e) => {
            if (!e.target || !e.target.matches) return;
            if (e.target.matches('a, button, .burger-icon')) {
                handleMouseEnterLink();
            }
        };

        const handleMouseLeave = (e) => {
            if (!e.target || !e.target.matches) return;
            if (e.target.matches('a, button, .burger-icon')) {
                handleMouseLeaveLink();
            }
        };

        document.addEventListener('mouseenter', handleMouseEnter, true);
        document.addEventListener('mouseleave', handleMouseLeave, true);

        return () => {
            document.removeEventListener('mouseenter', handleMouseEnter, true);
            document.removeEventListener('mouseleave', handleMouseLeave, true);
        };
    }, [handleMouseEnterLink, handleMouseLeaveLink]);

    return (
        <div
            ref={cursorRef}
            className={`custom-cursor ${isHovering ? "hover" : ""} ${isMobile ? "mobile" : ""}`}
        ></div>
    );
};

export default CustomCursor;
