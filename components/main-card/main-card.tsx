'use client'

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, Variants } from "framer-motion"

import { IMood } from "@/mood-manager"

import Header from "@/components/header"
import Monitor from "@/components/monitor"
import Kiss from "@/components/kiss"
import Button from "@/components/button"
import Hearts from "../hearts/hearts"

//TODO: click at kitty makes "meow" talk

const appearingAnimation: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    }
}


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


interface MainCardProps {
    theme: "light" | "dark"
    mood: IMood
    name: string
    onOpenModal: () => void
}

const MainCard = ({ theme, mood, name, onOpenModal }: MainCardProps) => {

    //kiss's state
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

    const onKiss = () => {
        if (clickCount < kissesPositions.length) {
            setVisibleItems([...visibleItems, kissesPositions[clickCount]])
            setClickCount(clickCount + 1)
        } else if (visibleItems.length === 0) {
            setClickCount(0)
            setVisibleItems([])

        }
    }

    const removeItem = () => {

        // delete the first item in the visibleItems[]
        setVisibleItems((prev) => prev.slice(1))

    }

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


    // else
    useEffect(() => {
        //TODO: check if current session has name, if doesn't: isModal(true)
    }, [])


    return (
        <div className={`${(theme === 'light')
            ? 'light-border light-container-bg' // light
            : 'dark-border dark-container-bg' // dark
            }
                rounded-[2rem] shadow-md  overflow-hidden mt-[2.5rem] mx-[4rem] 
            `}>
            <Header theme={theme} text={name} isBorderBottom onTextClick={onOpenModal} /> {/* TODO: make ability to kill the kitty by clicking       on header's widgets, and add a modal window: are you sure?
                    */}
            <div className="p-[1.5rem] flex flex-col gap-6 relative">
                <Monitor theme={theme} isPadding={false}>
                    <Image
                        src={`/kitties/${mood}.png`}
                        width={400}
                        height={347}
                        alt='...'
                        className="-mt-10"
                        priority
                    />

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

                        <Hearts />

                    </AnimatePresence>
                </Monitor>

                <div className=" flex flex-col gap-4">
                    <Button mode="primary" theme={theme} onClick={onKiss}>kiss</Button>
                    <Button mode="secondary" theme={theme} onClick={() => { }}>talk</Button>
                </div>
            </div >
        </div >
    )
}

export default MainCard