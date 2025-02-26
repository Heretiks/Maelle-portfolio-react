// FlipLink.jsx

import { motion } from 'framer-motion';
import '../assets/styles/components/FlipLink.scss';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MotionLink = motion.create(Link);

const FlipLink = ({ children, to, onClick }) => {
    const DURATION = 0.25;
    const STAGGER = 0.03;

    // Fonction pour rendre chaque caractère, y compris les espaces
    const renderCharacters = (text, variants) => {
        return text.split('').map((char, i) => (
            <motion.span
                key={i}
                variants={variants}
                transition={{
                    duration: DURATION,
                    ease: 'easeInOut',
                    delay: STAGGER * i
                }}
            >
                {char === ' ' ? '\u00A0' : char}
            </motion.span>
        ));
    };

    return (
        <MotionLink
            initial="initial"
            whileHover="hovered"
            to={to}
            className="flip-link"
            onClick={onClick}
        >
            <span>
                {renderCharacters(children, {
                    initial: { y: 0 },
                    hovered: { y: '-100%' }
                })}
            </span>

            <span className="second-span">
                {renderCharacters(children, {
                    initial: { y: '100%' },
                    hovered: { y: 0 }
                })}
            </span>
        </MotionLink>
    );
};

FlipLink.propTypes = {
    children: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

export default FlipLink;
