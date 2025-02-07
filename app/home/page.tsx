'use client'

import { useRouter } from "next/navigation"

import { theme } from "@/theme"

import Header from "@/components/header"
import MainCard from "@/components/main-card/main-card"
import Monitor from "@/components/monitor"
import MoodAndScore from "@/components/score-bar/mood-and-score"
import ProgressBar from "@/components/score-bar/progress-bar"

const HomePage = () => {
    const router = useRouter()

    const onHeaderWidgetsClick = () => {
        router.push('/')
    }

    return (
        <div className={`${theme === 'light' ? 'light-bg' : 'dark-bg'} h-screen`}>
            <Header text="i love you" isBorderBottom={false} theme={theme} onClick={onHeaderWidgetsClick} />
            <div className={`${(theme === 'light')
                ? 'light-border light-container-bg' // light
                : 'dark-border dark-container-bg' // dark
                }
                p-6 rounded-b-[2rem] shadow-lg 
            `}>
                <Monitor theme={theme}>
                    <div className="flex flex-col gap-16">
                        <MoodAndScore mood="normal" score={12} theme={theme} />
                        <ProgressBar theme={theme} score={12} />
                    </div>
                </Monitor>
            </div>

            <MainCard theme={theme} />

        </div>
    )
}

export default HomePage