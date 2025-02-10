import { motion } from 'framer-motion'

import { Variants } from "framer-motion"
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
            exit={{ opacity: 0}}>
            <Image
                key={id}
                src='/kiss.svg'
                width={30}
                height={24}
                alt='💋'
                style={{ top: `${top}rem`, right: `${right}rem` }}
                className='absolute transition-all z-30'
            />
        </motion.div>
    )
}

export default Kiss