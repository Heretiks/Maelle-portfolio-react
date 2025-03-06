import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo = () => {
    const dotVariants = {
        initial: {
            rotate: 0,
        },
        animate: {
            rotate: 720,
            transition: {
                duration: 3,
                repeat: 0,
                ease: "linear"
            }
        }
    };

    return (
        <motion.svg className="preloader-logo" width="75.897" height="63.507" viewBox="0 0 75.897 63.507">
            <defs>
                <motion.mask id="mask">
                    <motion.rect
                        x="0"
                        y="0"
                        width="100%"
                        height="100%"
                        fill="white"
                        initial={{ scaleY: 0, scaleX: 0 }}
                        animate={{ scaleY: 1, scaleX: 1 }}
                        transition={{ duration: 2, ease: "easeInOut" }}
                        style={{ transformOrigin: "center" }}
                    />
                </motion.mask>
            </defs>

            <g mask="url(#mask)" fill="white">
                <path id="Tracé_1" d="M0,.968H4.955l.88,4.874h.48A10.206,10.206,0,0,1,15.9,0Q22.7,0,24.856,6.077A11.13,11.13,0,0,1,29.21,1.56,11.756,11.756,0,0,1,35.084,0Q44.992,0,45,12.7L45,42.993l-6.553,0-.008-29.809q0-4.076-1.44-5.714a5.042,5.042,0,0,0-4-1.637q-3.038,0-5.113,3.118a14.926,14.926,0,0,0-2.076,8.392L25.824,43H19.271L19.263,13.19q0-4.076-1.44-5.714a5.043,5.043,0,0,0-4-1.637q-3.038,0-5.154,3.118a14.71,14.71,0,0,0-2.115,8.392L6.564,43,.01,43Z" transform="translate(0 0)"/>
                <path id="Tracé_2" d="M106.221,79.83q-3.479-5.313-3.481-16.662T106.252,46.5q3.516-5.315,10.868-5.317,6.714,0,9.791,4.153t3.08,12.386H123.2q0-5.673-1.321-8.191t-4.756-2.516a6,6,0,0,0-5.673,3.638q-1.839,3.637-1.835,10.989v3.037q0,7.353,1.8,10.988a5.979,5.979,0,0,0,5.715,3.635,5.187,5.187,0,0,0,4.915-2.639q1.478-2.638,1.476-8.072h6.473q0,7.192-3.154,11.868t-9.709,4.678q-7.432,0-10.909-5.312" transform="translate(-54.096 -21.686)"/>

                <motion.g
                    variants={dotVariants}
                    initial="initial"
                    animate="animate"
                    style={{
                        originX: '50%',
                        originY: '50%',
                        transformBox: 'fill-box',
                        transformOrigin: 'center'
                    }}
                >
                    <path
                        id="Tracé_3"
                        d="M87.838,123.506a3.3,3.3,0,1,1-3.3-3.294,3.295,3.295,0,0,1,3.3,3.294"
                        transform="translate(-42.779 -63.295)"
                    />
                    <path
                        id="Tracé_4"
                        d="M109.522,5.467a3.3,3.3,0,1,1-3.3-3.294,3.295,3.295,0,0,1,3.3,3.294"
                        transform="translate(-54.197 -1.144)"
                    />
                </motion.g>
            </g>
        </motion.svg>
    );
};

export default AnimatedLogo;
