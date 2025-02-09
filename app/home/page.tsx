'use client'

import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

import { AnimatePresence, Variants } from "framer-motion"

import { theme } from "@/theme"
import { IMood } from "@/mood-manager"
import { getTalk, ITalks } from "@/talks"

import Talk from "@/components/talk"
import Header from "@/components/header"
import MainCard from "@/components/main-card/main-card"
import Monitor from "@/components/monitor"
import MoodAndScore from "@/components/score-bar/mood-and-score"
import ProgressBar from "@/components/score-bar/progress-bar"
import ModalInputForm from "@/components/main-card/modal-input-form"
import Image from "next/image"

const appearingAnimation: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    }
}
//TODO: when she change her name say "such a beautiful name"
const HomePage = () => {
    const [localMood, setLocalMood] = useState<IMood>('calm')//TODO: get this from "get" function which will get it from localStorage

    // name 
    const [name, setName] = useState<string>('name')//TODO: change it into ''
    const [isModal, setIsModal] = useState<boolean>(false)

    // talk 
    const [isTalk, setIsTalk] = useState<boolean>()
    const [talk, setTalk] = useState<ITalks | null>()

    const [isNameCompliment, setIsNameCompliment] = useState<boolean>(false)

    // gimme kiss 
    const [isGimmeKiss, setIsGimmeKiss] = useState<boolean>(false)
    const [isMua, setIsMua] = useState<boolean>(false)

    const [isHeartsEffect, setIsHeartsEffect] = useState<boolean>(false)

    // refs
    const talkHidingRef = useRef<NodeJS.Timeout | null>(null)
    const gapBetweenTalksRef = useRef<NodeJS.Timeout | null>(null)
    const heartsHidingRef = useRef<NodeJS.Timeout | null>(null)

    const router = useRouter()

    // block scroll when modal window is active
    useEffect(() => {
        if (isModal) { document.body.style.overflow = 'hidden' }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isModal])

    // make something similar to closing current page like in browser, because the widgets are similar
    const onHeaderWidgetsClick = () => {
        router.push('/')
    }

    // setting name
    const onSetName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onOpenModal = () => {
        if (isTalk) {
            setIsTalk(false)
        }

        setIsModal(true)
    }

    const onCloseModal = () => {
        if (name) {
            setIsModal(false)
        }

        // name compliment
        if (talkHidingRef.current) {
            clearTimeout(talkHidingRef.current)
        }
        setIsNameCompliment(true) // TODO: set true only if new name differ of name in localStorage 
        talkHidingRef.current = setTimeout(() => {
            setIsNameCompliment(false)
        }, 3000)

    }

    // talk
    const onTalk = () => {

        // clear timeouts if they ended
        if (talkHidingRef.current) {
            clearTimeout(talkHidingRef.current)
        }

        if (gapBetweenTalksRef.current) {
            clearTimeout(gapBetweenTalksRef.current)
        }

        // hide the talk ui if we click and there's an active talk rn
        if (isTalk) {
            setIsTalk(false)
        }

        // this timeout is responsible for hiding talk ui when 3s passed
        gapBetweenTalksRef.current = setTimeout(() => {
            const newTalk = getTalk()

            // if current talk is "gimme kiss", set it true and hope that Diana will kiss the kitty after this talk, if she does, show "muaaa"(cute video)
            if (newTalk.id === 56) {
                alert(1)
                setIsGimmeKiss(true)
            }

            //if all previous "ifs" failed set new talk and show it 
            setTalk(newTalk)
            setIsTalk(true)

            // when 3s passed hide the talk ui
            talkHidingRef.current = setTimeout(() => {
                setTalk(null)
                setIsTalk(false)
            }, 3000)

            //if "isTalk if" above is truth, we hide everything for 150ms before showing next talk to make nice visual effect
        }, 150)

    }

    const onHeartsEffect = () => {
        if (heartsHidingRef.current) {
            clearTimeout(heartsHidingRef.current)
        }

        heartsHidingRef.current = setTimeout(() => {
            setIsHeartsEffect(true)
        }, 3200)

        setIsHeartsEffect(false)

    }

    // gimme kiss
    const onShowGimmeKiss = () => {
        if (talkHidingRef.current) {
            clearTimeout(talkHidingRef.current)
        }

        // TODO: push Diana to the next level of happiness if she find this easter egg
        setIsMua(true)
        setIsTalk(true)
        onHeartsEffect()

        // hide "muaaa" talk after 3s showing it
        talkHidingRef.current = setTimeout(() => {
            setIsMua(false)
            setIsGimmeKiss(false)
            setIsTalk(false)

        }, 3000)
    }

    // If she click at kitty show "meow <3" talk, and do it exactly as with usual talk, but push our hardcoded talk object
    const onKittyClick = () => {
        if (talkHidingRef.current) {
            clearTimeout(talkHidingRef.current)
        }

        if (gapBetweenTalksRef.current) {
            clearTimeout(gapBetweenTalksRef.current)
        }

        if (isTalk) {
            setIsTalk(false)
        }

        gapBetweenTalksRef.current = setTimeout(() => {

            // here's a hardcoded talk object I've told above
            setTalk({
                id: 8,
                text: 'MEOW <3'
            })
            setIsTalk(true)

            talkHidingRef.current = setTimeout(() => {
                setTalk(null)
                setIsTalk(false)
            }, 3000)
        }, 100)
    }

    return (
        <>
            {isModal && <ModalInputForm theme={theme} onChange={onSetName} onClick={onCloseModal} name={name} />}
            {isModal && <div className="h-auto w-screen bg-[#0000008a] z-20 absolute top-0 bottom-0 -mb-24"></div>}

            <div className={`${theme === 'light' ? 'light-bg' : 'dark-bg'} min-h-screen pb-12`}>
                <Header text="i love you" isBorderBottom={false} theme={theme} onClick={onHeaderWidgetsClick} />
                <div className={`${(theme === 'light')
                    ? 'light-border light-container-bg' // light
                    : 'dark-border dark-container-bg' // dark
                    }
                p-6 rounded-b-[2rem] shadow-md 
            `}>
                    <Monitor theme={theme} isPadding={false}>
                        <div className="flex flex-col gap-8">
                            <MoodAndScore mood={localMood} score={12} theme={theme} />
                            <ProgressBar theme={theme} score={12} />
                        </div>
                    </Monitor>
                </div>

                <AnimatePresence>
                    {isTalk && <Talk text={talk?.text} appearingAnimation={appearingAnimation} />}

                    {isMua && <Talk appearingAnimation={appearingAnimation} text="MUYAAAAA" key={129192} />}
                    {isNameCompliment && <Talk appearingAnimation={appearingAnimation} text="BEAUTIFUL NAME <3" key={12314} />}

                </AnimatePresence>

                <MainCard
                    theme={theme}
                    mood={localMood}
                    name={name}
                    isGimmeKiss={isGimmeKiss}
                    isTalk={isTalk || false}
                    isHeartsEffect={isHeartsEffect}
                    appearingAnimation={appearingAnimation}
                    onTalk={onTalk}
                    onOpenModal={onOpenModal}
                    onKittyClick={onKittyClick}
                    onShowGimmeKiss={onShowGimmeKiss}
                />

            </div>
        </>
    )
}

export default HomePage