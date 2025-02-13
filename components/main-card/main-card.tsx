'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, Variants } from "framer-motion"

import { IMood } from "@/data/mood-manager"

import Header from "@/components/header"
import Monitor from "@/components/monitor"
import Kiss from "@/components/kiss"
import Button from "@/components/button"
import Hearts from "@/components/hearts/hearts"
import { addKisses, addScore } from "@/data"

const kissesPositions = [
    {
        id: 0,
        top: '12.6', // rem
        right: '13'
    },
    {
        id: 1,
        top: '12.3',
        right: '17'
    },
    {
        id: 2,
        top: '12.8',
        right: '15.5'
    },
    {
        id: 3,
        top: '8',
        right: '17'
    },
    {
        id: 4,
        top: '9',
        right: '19'
    },
    {
        id: 5,
        top: '8',
        right: '15.5'
    },
    {
        id: 6,
        top: '6.5',
        right: '18.7'
    },
    {
        id: 7,
        top: '10.5',
        right: '10.5'
    },
    {
        id: 8,
        top: '14',
        right: '15.5'
    },
    {
        id: 9,
        top: '5.6',
        right: '11'
    },
    {
        id: 10,
        top: '10',
        right: '15.5'
    },
    {
        id: 11,
        top: '9',
        right: '13'
    },

] // TODO: export it from independent file, where will be implemented logic adding scores for kisses, and set it to localStorage

const mouthPositions = [
    {
        mood: 'exited',
        top: '11.3',
        right: '15.6'
    },
    {
        mood: 'happy',
        top: '11.8',
        right: '15.6'
    },
    {
        mood: 'calm',
        top: '11.8',
        right: '15.6'
    },
    {
        mood: 'sad',
        top: '12',
        right: '15.8'
    },
    {
        mood: 'exhausted',
        top: '12.4',
        right: '15.8'
    },
    {
        mood: 'unhappy',
        top: '11.5',
        right: '15.8'
    },
]

interface MainCardProps {
    theme: "light" | "dark"
    mood: IMood | 'loading...'
    name: string
    isTalk: boolean
    isGimmeKiss: boolean
    isHeartsEffect: boolean
    isExceededScore: boolean
    appearingAnimation: Variants
    onOpenModal: () => void
    onTalk: () => void
    onKittyClick: () => void
    onShowGimmeKiss: () => void
    onOpenKillKittyModal: () => void
    addKissScore: () => void
    checkIsAware: () => void
}

const MainCard = ({
    theme,
    mood,
    name,
    isTalk,
    isGimmeKiss,
    isHeartsEffect,
    isExceededScore,
    appearingAnimation,
    onShowGimmeKiss,
    onOpenModal,
    onTalk,
    onKittyClick,
    onOpenKillKittyModal,
    addKissScore,
    checkIsAware
}: MainCardProps) => {

    //kiss
    const [visibleItems, setVisibleItems] = useState<typeof kissesPositions>([])
    const [clickCount, setClickCount] = useState<number>(0)
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

    // don't wrap it up useEffect because it won't work
    const { top, right } = mouthPositions.find(item => item.mood === mood) || {}

    useEffect(() => {

        // if there's already a timer, we delete it not to cause deleting kisses while Diana is kissing
        if (timer) clearTimeout(timer)
        setTimer(
            setTimeout(() => {

                // if visibleItems has already been empty don't delete item
                if (visibleItems.length > 0) {
                    removeItem()
                }
            }, 600)
        )
    }, [visibleItems])// - each time we kiss we do this useEffect

    useEffect(() => {
        /* if we've already added each element from kissesPositions[] and deleted everything from visibleItems()
        *  we still can't kiss be cause we'd try to add to visibleItems item like that kissesPositions[13] 
        *  but kissesPositions has only 12 items in(so that's wy this "if" is here)
        *  so if every thing's possible been added we set clickCounter to 0 in order to Diana can kisses again
        */
        if (clickCount >= kissesPositions.length && visibleItems.length === 0) {
            setClickCount(0)
        }
    }, [visibleItems])// - check it every time we change visibleItems

    const onKiss = () => {
        // TODO: count kisses and write in to localStorage current session

        checkIsAware()

        if (isTalk) return

        if (isGimmeKiss) {
            onShowGimmeKiss()
        }

        if (clickCount < kissesPositions.length) {
            setVisibleItems([...visibleItems, kissesPositions[clickCount]])
            setClickCount(clickCount + 1)
            if (!isExceededScore) {
                addKissScore()
                addScore(0.5)
            }
            
            addKisses(1)

        } else if (visibleItems.length === 0) {
            setClickCount(0)
            setVisibleItems([])

        }
    }

    const removeItem = () => {

        // delete the first item in the visibleItems[]
        setVisibleItems((prev) => prev.slice(1))

    }
    // TODO: connect mouth position to the kitty for different screen width
    return (
        <div className={`${(theme === 'light')
            ? 'light-border light-container-bg' // light
            : 'dark-border dark-container-bg' // dark
            }
                rounded-[2rem] shadow-md  overflow-hidden mt-[2.5rem] mx-[4rem] 
            `}>
            <Header theme={theme} text={name} isBorderBottom onTextClick={onOpenModal} onClick={onOpenKillKittyModal} />

            <div className="p-[1.5rem] flex flex-col gap-6 relative">
                <Monitor theme={theme} isPadding={false}>
                    {mood === 'loading...' ? (
                        <div className="h-[18.5rem] w-[24rem] flex items-center justify-center">
                            <Image
                                src='/loading.png'
                                width={50}
                                height={50}
                                alt='...'
                                className="animate-spin "
                                priority
                                onClick={onKittyClick}
                            />
                        </div>
                    ) : (<Image
                        src={`/kitties/${mood}.png`}
                        width={248}
                        height={223}
                        alt='...'
                        className="-mt-10"
                        priority
                        onClick={onKittyClick}
                    />)}

                    <AnimatePresence>
                        {visibleItems.map((kiss) => (
                            <Kiss
                                key={kiss.id}
                                id={kiss.id}
                                top={kiss.top}
                                right={kiss.right}
                                appearingAnimation={appearingAnimation}
                            />
                        ))}

                        {isHeartsEffect && <Hearts appearingAnimation={appearingAnimation} />}

                        {isTalk && <Image
                            src='/mouth.svg'
                            width={23}
                            height={37}
                            alt='...'
                            style={{
                                top: `${top}rem`,
                                right: `${right}rem`
                            }}
                            className="absolute"
                        />}
                    </AnimatePresence>
                </Monitor>

                <div className=" flex flex-col gap-4">
                    <Button mode="primary" theme={theme} onClick={onKiss}>kiss</Button>
                    <Button mode="secondary" theme={theme} onClick={onTalk}>talk</Button>
                </div>
            </div >
        </div >
    )
}

export default MainCard