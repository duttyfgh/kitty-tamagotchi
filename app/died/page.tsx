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
        <div className='dark-bg min-h-screen pb-[30px] flex flex-col items-center'>
           <div className="w-[414px]">
                <Header text="i miss you" isBorderBottom={false} theme={'dark'} />
                <div className='dark-border dark-container-bg p-[15px] rounded-b-[20px] shadow-md'>
                    <Monitor theme={'dark'} isPadding={false}>
                        <div className="flex flex-col gap-[20px]">
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
           </div>

            <div className='dark-border dark-container-bg rounded-[20px] shadow-md  overflow-hidden mt-[25px] mx-[40px]'>
                <Header theme='dark' text={name} isBorderBottom />

                <div className="p-[15px] flex flex-col gap-[15px] relative">
                    <Monitor theme='dark' isPadding={false}>
                        <Image
                            src='/kitties/died.png'
                            width={248}
                            height={223}
                            alt='...'
                            className="-mt-[25px]"
                            priority
                        />
                    </Monitor>

                    <div className=" flex flex-col gap-[10px]">
                        <Button mode="primary" theme='dark' onClick={onGameOver}>game over</Button>
                    </div>
                </div >
            </div >

        </div>
    )
}

export default DiedPage