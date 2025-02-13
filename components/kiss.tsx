import { motion, Variants } from "framer-motion"
import Image from "next/image"

interface KissProps {
    top: string
    right: string
    id: number
    appearingAnimation: Variants
}

const Kiss = ({ id, top, right, appearingAnimation }: KissProps) => {
    return (
        <motion.div
            animate='visible'
            initial='hidden'
            variants={appearingAnimation}
            exit={{ opacity: 0 }}>
            <Image
                key={id}
                src='/kiss.svg'
                width={30}
                height={24}
                alt='💋'
                style={{ top: `${top}px`, right: `${right}px` }}
                className='absolute z-30'
            />
        </motion.div>
    )
}

export default Kiss