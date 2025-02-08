import { AnimatePresence } from "framer-motion"

const Kisses = () => {
    return (
        <AnimatePresence>
            {visibleItems.map((kiss) => (
                <Kiss key={kiss.id} id={kiss.id} top={kiss.top} right={kiss.right} />
            ))}
        </AnimatePresence>
    )
}

export default Kisses