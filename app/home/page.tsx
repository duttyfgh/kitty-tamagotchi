'use client'

import { ChangeEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { theme } from "@/theme"
import { IMood } from "@/mood-manager"

import Header from "@/components/header"
import MainCard from "@/components/main-card/main-card"
import Monitor from "@/components/monitor"
import MoodAndScore from "@/components/score-bar/mood-and-score"
import ProgressBar from "@/components/score-bar/progress-bar"
import ModalInputForm from "@/components/main-card/modal-input-form"

const HomePage = () => {
    const [localMood, setLocalMood] = useState<IMood>('normal')//TODO: get this from "get" function which will get it from localStorage
    const [name, setName] = useState<string>('name')//TODO: change it into ''
    const [isModal, setIsModal] = useState<boolean>(false)

    const router = useRouter()

    const onHeaderWidgetsClick = () => {
        router.push('/')
    }

    useEffect(() => {
        // turn off scrolling
        if (isModal) { document.body.style.overflow = 'hidden' }
        return () => {
            // turn on scrolling 
            document.body.style.overflow = ''
        }
    }, [isModal])

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
            {isModal && <div className="h-auto w-screen bg-[#0000008a] z-20 absolute top-0 bottom-0 -mb-24"></div>}

            <div className={`${theme === 'light' ? 'light-bg' : 'dark-bg'} min-h-screen pb-12`}>
                <Header text="i love you" isBorderBottom={false} theme={theme} onClick={onHeaderWidgetsClick} />
                <div className={`${(theme === 'light')
                    ? 'light-border light-container-bg' // light
                    : 'dark-border dark-container-bg' // dark
                    }
                p-6 rounded-b-[2rem] shadow-lg 
            `}>
                    <Monitor theme={theme} isPadding={false}>
                        <div className="flex flex-col gap-8">
                            <MoodAndScore mood={localMood} score={12} theme={theme} />
                            <ProgressBar theme={theme} score={12} />
                        </div>
                    </Monitor>
                </div>

                <MainCard theme={theme} mood={localMood} name={name} onOpenModal={onOpenModal} />

            </div>
        </>
    )
}

export default HomePage