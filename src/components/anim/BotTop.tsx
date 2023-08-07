import { motion } from "framer-motion";
import { FunctionComponent } from "react";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

interface children {
    children: JSX.Element
    delay?: number | undefined
}

const BotTop: FunctionComponent<children> = ({ children, delay }) => {

    const [innerHeight, setHeight] = useState(0)

    useEffect(() => {
        setHeight(window.innerHeight)
    }, [])


    const settings = { triggerOnce: false, threshold: 0.5, rootMargin: `${innerHeight}px 0px  0px 0px` }

    const [ref, inView] = useInView(settings)

    return (
        <motion.div initial={{ y: 50, opacity: 0 }} animate={inView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 1.4, ease: [0.16, 0.77, 0.47, .97], delay: delay ? delay : 0 }} ref={ref}>
            {children}
        </motion.div>
    );
}

export default BotTop;