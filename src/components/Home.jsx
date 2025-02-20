import {useState, useEffect, useCallback, useRef} from "react";
import projects from "../data/projets.js";
import "../assets/styles/components/Home.scss";

const Home = ({ onProjectChange }) => {
    const [currentIndex, setCurrentIndex] = useState(() => Math.floor(Math.random() * projects.length));    const [direction, setDirection] = useState(null);
    const [transitioning, setTransitioning] = useState(false);
    const SCROLL_DELAY = 1000; // Délai de 1 seconde
    const AUTO_SCROLL_INTERVAL = 5000; // 5 secondes
    const SCROLL_THRESHOLD = 20;
    const lastScrollTime = useRef(0);
    const accumulatedDelta = useRef(0);
    const touchStartY = useRef(null);

    useEffect(() => {
        onProjectChange(currentIndex);
    }, [currentIndex, onProjectChange]);

    const handleScroll = useCallback((newDirection) => {
        if (transitioning) return;

        setDirection(newDirection);
        setTransitioning(true);

        if (newDirection === "top") {
            setCurrentIndex((prevIndex) =>
                prevIndex === projects.length - 1 ? 0 : prevIndex + 1
            );
        } else {
            setCurrentIndex((prevIndex) =>
                prevIndex === 0 ? projects.length - 1 : prevIndex - 1
            );
        }

        setTimeout(() => {
            setTransitioning(false);
        }, SCROLL_DELAY);
    }, [transitioning]);

    const handleScrollEvent = useCallback((delta) => {
        const now = Date.now();
        if (now - lastScrollTime.current > SCROLL_DELAY) {
            accumulatedDelta.current = 0;
        }
        lastScrollTime.current = now;

        accumulatedDelta.current += delta;

        if (Math.abs(accumulatedDelta.current) > SCROLL_THRESHOLD) {
            handleScroll(accumulatedDelta.current > 0 ? "top" : "bottom");
            accumulatedDelta.current = 0;
        }
    }, [handleScroll, SCROLL_THRESHOLD, SCROLL_DELAY]);

    const handleWheel = useCallback((event) => {
        event.preventDefault();
        handleScrollEvent(event.deltaY);
    }, [handleScrollEvent]);

    const handleTouchStart = useCallback((event) => {
        touchStartY.current = event.touches[0].clientY;
    }, []);

    const handleTouchMove = useCallback((event) => {
        if (touchStartY.current === null) return;

        const currentY = event.touches[0].clientY;
        const delta = touchStartY.current - currentY;
        touchStartY.current = currentY;

        handleScrollEvent(delta);
    }, [handleScrollEvent]);

    const handleTouchEnd = useCallback(() => {
        touchStartY.current = null;
        accumulatedDelta.current = 0;
    }, []);

    const handleKeyDown = useCallback((event) => {
        if (event.key === "ArrowUp") {
            handleScrollEvent(-SCROLL_THRESHOLD - 1);
        } else if (event.key === "ArrowDown") {
            handleScrollEvent(SCROLL_THRESHOLD + 1);
        } else if (event.code === "Space") {
            handleScrollEvent(SCROLL_THRESHOLD + 1);
        }
    }, [handleScrollEvent, SCROLL_THRESHOLD]);

    useEffect(() => {
        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleTouchEnd);
        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleWheel, handleTouchStart, handleTouchMove, handleKeyDown, handleTouchEnd]);

    // Auto-scroll
    useEffect(() => {
        const interval = setInterval(() => {
            if (!transitioning) {
                handleScroll("top");
            }
        }, AUTO_SCROLL_INTERVAL);

        return () => clearInterval(interval);
    }, [handleScroll, transitioning]);

    return (
        <div className="home-container">
            {projects.map((project, index) => (
                <div
                    key={project.id}
                    className={`background ${
                        index === currentIndex
                            ? "active"
                            : direction === "top"
                                ? index === (currentIndex === 0 ? projects.length - 1 : currentIndex - 1)
                                    ? "slide-in-top"
                                    : "slide-in-bottom"
                                : index === (currentIndex === projects.length - 1 ? 0 : currentIndex + 1)
                                    ? "slide-in-bottom"
                                    : "slide-in-top"
                    }`}
                    style={{
                        backgroundImage: `url(${project.image})`,
                        transitionDelay: index === currentIndex ? "0s" : "0.6s",
                    }}
                ></div>
            ))}
        </div>
    );
};

export default Home;
