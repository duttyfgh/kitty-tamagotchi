import { motion } from 'framer-motion'

import { Variants } from "framer-motion"
import Image from "next/image"

interface KissProps {
    top: string
    right: string
    id: number
}

const kissAppearingAnimation: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    }
}

const Kiss = ({ id, top, right }: KissProps) => {
    return (
        <motion.div
            animate='visible'
            initial='hidden'
            variants={kissAppearingAnimation}
            exit={{ opacity: 0}}>
            <Image
                key={id}
                src='/kiss.svg'
                width={30}
                height={24}
                alt='💋'
                style={{ top: `${top}rem`, right: `${right}rem` }}
                className='absolute transition-all'
            />
        </motion.div>
    )
}

export default Kiss