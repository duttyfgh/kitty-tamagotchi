'use client'

import Image from "next/image"
import { useEffect, useState } from "react"

interface HeartProps {
    id: number
    top: string
    right: string
    duration: number
    width: number
}

const Heart = ({ duration, right, top, width, id }: HeartProps) => {
    const [isHidden, setIsHidden] = useState<boolean>(false)

    useEffect(() => {
        const hideHeart = setTimeout(() => {
            setIsHidden(true)
        }, duration * 600)

        return () => clearTimeout(hideHeart)
    }, [duration])

    if (!isHidden) return (
        <Image
            src='/hearts-piece.png'
            width={width}
            height={30}
            alt="♥"
            style={{
                top: `${top}rem`,
                right: `${right}rem`
            }}
            className={`absolute heart${id + 1}`}
        />
    )
}

export default Heart