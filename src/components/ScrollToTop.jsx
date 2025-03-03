import { useState, useEffect } from "react";
import img from "../assets/global/SVG_MOTIF_POINT_AVANT.svg";

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
            lenis.lenis.current.scrollTo(-100, { immediate: false, force: true, duration: 0.6 });

        }
    };

    return (
        <img
            onClick={scrollToTop}
            className={`scrollTop ${visible ? "visible" : ""}`}
            src={img} alt="Back to top"
        />
    );
}
