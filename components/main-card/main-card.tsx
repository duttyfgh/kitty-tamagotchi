'use client'

import { ChangeEvent, useEffect, useState } from "react"
import { AnimatePresence } from "framer-motion"

import { IMood } from "@/mood-manager"

import Header from "@/components/header"
import Monitor from "@/components/monitor"
import Image from "next/image"
import Kiss from "@/components/kiss"
import Button from "@/components/button"

import ModalInputForm from "./modal-input-form"

const kissesPositions = [
    {
        id: 0,
        top: '15.6', // rem
        right: '13.8'
    },
    {
        id: 1,
        top: '11',
        right: '17.6'
    },
    {
        id: 2,
        top: '15.8',
        right: '20'
    },
    {
        id: 3,
        top: '16.5',
        right: '17'
    },
    {
        id: 4,
        top: '9',
        right: '19'
    },
    {
        id: 5,
        top: '11',
        right: '22.7'
    },
    {
        id: 6,
        top: '7.8',
        right: '22'
    },
    {
        id: 7,
        top: '12.5',
        right: '11.5'
    },
    {
        id: 9,
        top: '13.8',
        right: '17'
    },
    {
        id: 10,
        top: '14',
        right: '22'
    },
    {
        id: 11,
        top: '19',
        right: '18'
    },
    {
        id: 12,
        top: '7',
        right: '12'
    },

]

interface MainCardProps {
    theme: "light" | "dark",
    mood: IMood
}

const MainCard = ({ theme, mood }: MainCardProps) => {
    const [isModal, setIsModal] = useState<boolean>(false)
    const [name, setName] = useState<string>('name')//TODO: change it into ''

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
        //TODO: if (!this.session.name) isModal(true)
    }, [])

    const onSetName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onOpenModal = () => {
        setIsModal(true)
    }

    const onCloseModal = () => {
        if (name) {
            setIsModal(false)
        }
    }

    return (
        <>
            {isModal && <ModalInputForm theme={theme} onChange={onSetName} onClick={onCloseModal} name={name} />}
            {isModal && <div className="h-screen w-screen bg-[#0000008a] z-20 absolute top-0"></div>}

            <div className={`${(theme === 'light')
                ? 'light-border light-container-bg' // light
                : 'dark-border dark-container-bg' // dark
                }
                rounded-[2rem] shadow-lg overflow-hidden mt-[3rem] mx-[1.7rem]
            `}>
                <Header theme={theme} text={name} isBorderBottom onTextClick={onOpenModal} /> {/* TODO: make ability to kill the kitty by clicking       on header's widgets, and add a modal window: are you sure?
                    */}
                <div className="p-[1.5rem] flex flex-col gap-6 relative">
                    <Monitor theme={theme}>
                        <Image
                            src={`/kitties/${mood}.png`}
                            width={400}
                            height={347}
                            alt='...'
                            className="scale-110 -mt-10"
                            priority
                        />

                        <AnimatePresence>
                            {visibleItems.map((kiss) => (
                                <Kiss key={kiss.id} id={kiss.id} top={kiss.top} right={kiss.right} />
                            ))}
                        </AnimatePresence>

                    </Monitor>

                    <div className=" flex flex-col gap-4">
                        <Button mode="primary" theme={theme} onClick={onKiss}>kiss</Button>
                        <Button mode="secondary" theme={theme} onClick={() => { }}>talk</Button>
                    </div>
                </div >
            </div >
        </>
    )
}

export default MainCard