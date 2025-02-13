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
        top: '126', // rem
        right: '130'
    },
    {
        id: 1,
        top: '123',
        right: '170'
    },
    {
        id: 2,
        top: '128',
        right: '155'
    },
    {
        id: 3,
        top: '80',
        right: '170'
    },
    {
        id: 4,
        top: '90',
        right: '190'
    },
    {
        id: 5,
        top: '80',
        right: '155'
    },
    {
        id: 6,
        top: '65',
        right: '187'
    },
    {
        id: 7,
        top: '105',
        right: '105'
    },
    {
        id: 8,
        top: '140',
        right: '155'
    },
    {
        id: 9,
        top: '56',
        right: '110'
    },
    {
        id: 10,
        top: '100',
        right: '155'
    },
    {
        id: 11,
        top: '90',
        right: '130'
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

    return (
        <div className={`${(theme === 'light')
            ? 'light-border light-container-bg' // light
            : 'dark-border dark-container-bg' // dark
            }
                rounded-[2rem] shadow-md  overflow-hidden mt-[2.5rem] w-[334px]
            `}>
            <Header theme={theme} text={name} isBorderBottom onTextClick={onOpenModal} onClick={onOpenKillKittyModal} />

            <div className="p-[1.5rem] flex flex-col gap-6 relative">
                <Monitor theme={theme} isPadding={false} >
                    {mood === 'loading...' ? (
                        <div className="h-[18.5rem] w-[24rem] flex items-center justify-center">
                            <Image
                                src='/loading.png'
                                width={50}
                                height={50}
                                alt='...'
                                className="animate-spin"
                                priority
                                onClick={onKittyClick}
                            />
                        </div>
                    ) : (
                        <Image
                            src={`${isTalk ? `/kitties/${mood}-talking.png` : `/kitties/${mood}.png`}`}
                            width={248}
                            height={223}
                            alt='...'
                            className="-mt-10"
                            priority
                            onClick={onKittyClick}
                        />
                    )}

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
                    </AnimatePresence>
                </Monitor>

                <div className=" flex flex-col gap-4">
                    <Button mode="primary" theme={theme} onClick={onKiss}>kiss</Button>
                    <Button mode="secondary" theme={theme} onClick={onTalk}>talk</Button>
                </div>
            </div>
        </div>
    )
}

export default MainCard