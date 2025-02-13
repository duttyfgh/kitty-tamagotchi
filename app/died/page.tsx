'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

import { getDiedName } from "@/data"

import Button from "@/components/button"
import Header from "@/components/header"
import Monitor from "@/components/monitor"
import MoodAndScore from "@/components/score-bar/mood-and-score"
import ProgressBar from "@/components/score-bar/progress-bar"

const DiedPage = () => {
    const [name, setName] = useState<string>('')

    const router = useRouter()

    useEffect(() => {
        const name = getDiedName()
        setName(name)

    }, [])

    const onGameOver = () => {
        router.push('/history')
    }

    return (
        <div className='dark-bg min-h-screen pb-12'>
            <Header text="i miss you" isBorderBottom={false} theme={'dark'} />
            <div className='dark-border dark-container-bg p-6 rounded-b-[2rem] shadow-md'>
                <Monitor theme={'dark'} isPadding={false}>
                    <div className="flex flex-col gap-8">
                        <MoodAndScore mood={'died'} score={0} theme={'dark'} />
                        <ProgressBar
                            theme={'dark'}
                            score={0}
                            maxScore={100}
                            minScore={0}
                        />
                    </div>
                </Monitor>
            </div>

            <div className='dark-border dark-container-bg rounded-[2rem] shadow-md  overflow-hidden mt-[2.5rem] mx-[4rem]'>
                <Header theme='dark' text={name} isBorderBottom />

                <div className="p-[1.5rem] flex flex-col gap-6 relative">
                    <Monitor theme='dark' isPadding={false}>
                        <Image
                            src='/kitties/died.png'
                            width={248}
                            height={223}
                            alt='...'
                            className="-mt-10"
                            priority
                        />
                    </Monitor>

                    <div className=" flex flex-col gap-4">
                        <Button mode="primary" theme='dark' onClick={onGameOver}>game over</Button>
                    </div>
                </div >
            </div >

        </div>
    )
}

export default DiedPage