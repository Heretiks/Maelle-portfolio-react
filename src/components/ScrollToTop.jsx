import { useState, useEffect } from "react";
import img from "../assets/global/SVG_MOTIF-POINT_AVANT.svg";

export default function ScrollToTop(lenis) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setVisible(window.scrollY > window.innerHeight);
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, [lenis]);

    const scrollToTop = () => {
        if (lenis) {
            lenis.lenis.current.scrollTo(0, { duration: 0.8, easing: (t) => t });
        }

        window.scrollTo({ top: 0, behavior: "smooth" });

    };

    return (
        <img
            onClick={scrollToTop}
            className={`scrollTop ${visible ? "visible" : ""}`}
            src={img} alt="Back to top"
        />
    );
}
