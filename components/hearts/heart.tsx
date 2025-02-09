'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import {motion,  Variants } from "framer-motion"

interface HeartProps {
    id: number
    top: string
    right: string
    duration: number
    width: number
    appearingAnimation: Variants
}

const Heart = ({ duration, right, top, width, id, appearingAnimation }: HeartProps) => {
    const [isHidden, setIsHidden] = useState<boolean>(false)

    useEffect(() => {
        const hideHeart = setTimeout(() => {
            setIsHidden(true)
        }, duration * 2000)

        return () => clearTimeout(hideHeart)
    }, [duration])

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