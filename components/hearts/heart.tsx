'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import {motion,  Variants } from "framer-motion"

interface HeartProps {
    id: number
    top: string
    right: string
    width: number
    appearingAnimation: Variants
}

const Heart = ({  right, top, width, id, appearingAnimation }: HeartProps) => {
    const [isHidden, setIsHidden] = useState<boolean>(false)

    //BUG: fix bug when after easter egg hearts are hidden and if I click talk they'll appear forever lots of times 
    useEffect(() => {
        const hideHeart = setTimeout(() => {
            setIsHidden(true)
        },  5000)

        return () => clearTimeout(hideHeart)
    }, [id])

    if (!isHidden) return (
        <motion.div
            animate='visible'
            initial='hidden'
            variants={appearingAnimation}
            exit={{ opacity: 0 }}>
            <Image
                src='/hearts-piece.png'
                width={width}
                height={30}
                alt="♥"
                style={{
                    top: `${top}rem`,
                    right: `${right}rem`
                }}
                className={`absolute transition-all heart${id + 1}`}
            />
        </motion.div>
    )
}

export default Heart