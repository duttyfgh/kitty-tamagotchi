'use client'

import { ChangeEvent, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"

import { AnimatePresence, Variants } from "framer-motion"

import { theme } from "@/theme"
import { addScore, addTalks, checkLastSeen, deleteCurrentSession, getCurrentSession, getExceeded, getIsAware, getName, getScore, onAware, updateName } from "@/data"
import { getMood, IMood, IScoreLimits, scoreLimits } from "@/data/mood-manager"
import { getTalk, ITalks } from "@/data/talks"

import Talk from "@/components/talk"
import Header from "@/components/header"
import MainCard from "@/components/main-card/main-card"
import Monitor from "@/components/monitor"
import MoodAndScore from "@/components/score-bar/mood-and-score"
import ProgressBar from "@/components/score-bar/progress-bar"
import ModalInputForm from "@/components/main-card/modal-input-form"
import KillKittyModal from "@/components/kill-kitty-modal"

const appearingAnimation: Variants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    },


}

// BUG: if click lots of times at talk, and it was GIMME KISS, and even if you skip it and click a couple of times at talk more, you'd anyway are able to have gimme kiss animations if you kiss the kitty

const HomePage = () => {

    // mood
    const [localMood, setLocalMood] = useState<IMood | 'loading...'>('loading...')

    // name 
    const [name, setName] = useState<string>('')
    const [isModal, setIsModal] = useState<boolean>(false)

    // talk 
    const [isTalk, setIsTalk] = useState<boolean>()
    const [talk, setTalk] = useState<ITalks | null>()

    const [isNameCompliment, setIsNameCompliment] = useState<boolean>(false)
    const [isThanks, setIsThanks] = useState<boolean>(false)

    // gimme kiss 
    const [isGimmeKiss, setIsGimmeKiss] = useState<boolean>(false)
    const [isMua, setIsMua] = useState<boolean>(false)

    const [isHeartsEffect, setIsHeartsEffect] = useState<boolean>(false)

    // scores
    const [score, setScore] = useState<number>(0)
    const [localScoreLimits, setLocalScoreLimits] = useState<IScoreLimits>()

    // exceeded
    const [isExceededScore, setIsExceededScore] = useState<boolean>(false)

    // aware
    const [isAware, setIsAware] = useState<boolean>(false)

    // kill kitty
    const [isSureModal, setIsSureModal] = useState<boolean>(false)

    // refs
    const talkHidingRef = useRef<NodeJS.Timeout | null>(null)
    const gapBetweenTalksRef = useRef<NodeJS.Timeout | null>(null)
    const heartsHidingRef = useRef<NodeJS.Timeout | null>(null)
    const isAwareRef = useRef<NodeJS.Timeout | null>(null)

    const router = useRouter()

    useEffect(() => {

        //current session
        const currentSession = getCurrentSession()

        if (!currentSession) {
            router.push('/')
        }

        if(!currentSession?.isActive) {
            router.push('/died')
        }

        // last seen
        checkLastSeen()

        // mood
        const mood = getMood()

        if (mood) {
            setLocalMood(mood)
        }

        // name
        if (!name) {
            setIsModal(true)
        }

        const storageName = getName()

        if (storageName) {
            setName(storageName)
            setIsModal(false)
        }

        // score
        const newScore = getScore()

        if (newScore) {
            setScore(Math.floor(newScore))
        }

        // exceeded
        const isExceeded = getExceeded()
        setIsExceededScore(isExceeded)

    }, [])

    useEffect(() => {
        const isExceeded = getExceeded()
        setIsExceededScore(isExceeded)

        const newScore = getScore()

        if (newScore) {
            setScore(Math.floor(newScore))
        }

        const mood = getMood()

        if (mood) {
            setLocalMood(mood)
        }

    }, [score])

    useEffect(() => {
        // score
        const scoreByMood = scoreLimits.filter((i) => i.mood === localMood)
        setLocalScoreLimits(scoreByMood[0])

    }, [localMood])

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
        const storageName = getName()

        if (name) {
            setIsModal(false)

            if (storageName !== name) {
                updateName(name)
            }
        }

        // name compliment
        if (talkHidingRef.current) {
            clearTimeout(talkHidingRef.current)
        }
        if (storageName !== name) {
            setIsNameCompliment(true)
            setIsTalk(true)
        }
        talkHidingRef.current = setTimeout(() => {
            setIsNameCompliment(false)
            setIsTalk(false)
        }, 3000)

    }

    const onWidgetsClose = () => {
        const storageName = getName()

        if (storageName) {
            setName(storageName)
            setIsModal(false)
        }
    }

    // talk
    const onTalk = () => {

        checkIsAware()

        if (!isAware) {
            if (isNameCompliment) {
                setIsNameCompliment(false)
            }

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
                    setIsGimmeKiss(true)
                }

                //if all previous "ifs" failed set new talk and show it 
                setTalk(newTalk)
                setIsTalk(true)
                if (!isExceededScore) {
                    setScore((prev) => prev + 0.5)
                    addScore(0.5)
                }
                addTalks(1)

                // when 3s passed hide the talk ui
                talkHidingRef.current = setTimeout(() => {
                    setTalk(null)
                    setIsTalk(false)
                }, 3000)

                //if "isTalk if" above is truth, we hide everything for 150ms before showing next talk to make nice visual effect
            }, 150)
        }
    }

    // hearts effect
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

        setIsMua(true)
        setIsTalk(true)
        if (!isExceededScore) {
            setScore((prev) => prev + 5)
            addScore(5)
        }
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
                id: 1234, // random id to avoid matching with real one
                text: 'MEOW <3'
            })
            setIsTalk(true)

            talkHidingRef.current = setTimeout(() => {
                setTalk(null)
                setIsTalk(false)
            }, 3000)
        }, 100)
    }

    // kill kitty 
    const onOpenKillKittyModal = () => {
        setIsSureModal(true)
    }

    const onCloseKillKittyModal = () => {
        setIsSureModal(false)

        // name compliment
        if (talkHidingRef.current) {
            clearTimeout(talkHidingRef.current)
        }

        setIsThanks(true)
        setIsTalk(true)

        talkHidingRef.current = setTimeout(() => {
            setIsThanks(false)
            setIsTalk(false)
        }, 3000)

    }

    const onKillKitty = () => {
        setIsSureModal(false)
        deleteCurrentSession()
        router.push('/died')
    }

    const checkIsAware = () => {
        if (isAwareRef.current) {
            clearTimeout(isAwareRef.current)
        }

        if (isExceededScore) {
            const isAware = getIsAware()
            if (!isAware) {
                setIsAware(true)
                setIsTalk(true)

                isAwareRef.current = setTimeout(() => {
                    setIsAware(false)
                    setIsTalk(false)
                    onAware()
                }, 3000)
            }
        }
    }

    return (
        <>
            {isModal && <ModalInputForm
                theme={theme}
                onChange={onSetName}
                onClick={onCloseModal}
                onWidgetsClick={onWidgetsClose}
                name={name}
            />}

            {isSureModal && <KillKittyModal
                theme={theme}
                onCloseModal={onCloseKillKittyModal}
                onKillKitty={onKillKitty}
                appearingAnimation={appearingAnimation}
            />}

            {(isModal || isSureModal) && <div className="h-auto w-screen bg-[#0000008a] z-20 absolute top-0 bottom-0 -mb-24"></div>}

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
                            <MoodAndScore mood={localMood} score={score} theme={theme} />
                            <ProgressBar
                                theme={theme}
                                score={score}
                                maxScore={localScoreLimits?.maxScore || 0}
                                minScore={localScoreLimits?.minScore || 0}
                            />
                        </div>
                    </Monitor>
                </div>

                <AnimatePresence mode="wait">
                    {!isAware && isTalk && <Talk text={talk?.text} appearingAnimation={appearingAnimation} />}

                    {isMua && <Talk appearingAnimation={appearingAnimation} text="MUYAAAAA" key='muaaa' />}
                    {!isAware && isNameCompliment && <Talk appearingAnimation={appearingAnimation} text="BEAUTIFUL NAME <3" key='beautiful name' />}
                    {isAware && <Talk appearingAnimation={appearingAnimation} text="only 24 scores per day" key='aware' isBig={true} />}
                    {isThanks && <Talk appearingAnimation={appearingAnimation} text="thank you sweety" key='thank' />}

                </AnimatePresence>

                <div className="w-full flex justify-center">
                    <MainCard
                        theme={theme}
                        mood={localMood}
                        name={name}
                        isGimmeKiss={isGimmeKiss}
                        isTalk={isTalk || false}
                        isHeartsEffect={isHeartsEffect}
                        isExceededScore={isExceededScore}
                        appearingAnimation={appearingAnimation}
                        onTalk={onTalk}
                        onOpenModal={onOpenModal}
                        onKittyClick={onKittyClick}
                        onShowGimmeKiss={onShowGimmeKiss}
                        onOpenKillKittyModal={onOpenKillKittyModal}
                        addKissScore={() => { setScore((prev) => prev + 0.5) }}
                        checkIsAware={checkIsAware}
                    />
                </div>

            </div>
        </>
    )
}

export default HomePage