import '../assets/styles/components/Preloader.scss';
import { motion } from "framer-motion";

const Preloader = () => {

    let blackHideVariants;
    if (window.innerWidth < 650) {
        blackHideVariants = {
            animate: {
                x: [0, 160, 0],
                transition: {
                    x: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1.5,
                        ease: "easeInOut"
                    }
                }
            }
        };
    }
    else {
        blackHideVariants = {
            animate: {
                x: [0, 300, 0],
                transition: {
                    x: {
                        repeat: Infinity,
                        repeatType: "reverse",
                        duration: 1.5,
                        ease: "easeInOut"
                    }
                }
            }
        };
    }

    return (
        <div className="preloader">
            <div>
                <img src="/images/motif-grand.webp" alt="Motif de Maëlle Camissogo" className="motif"/>
                <motion.div
                    className="black-hide"
                    variants={blackHideVariants}
                    animate="animate"
                ></motion.div>
            </div>
        </div>
    );
};

export default Preloader;
