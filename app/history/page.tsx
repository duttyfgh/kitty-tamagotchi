'use client'

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { getInactiveSessions, ISession } from "@/data"

import Header from "@/components/header"
import SessionHistoryCard from "@/components/session-history"
import Button from "@/components/button"

const HistoryPage = () => {
    const [inactiveSessions, setInactiveSessions] = useState<ISession[]>()

    const router = useRouter()

    useEffect(() => {
        const inactiveSessions = getInactiveSessions()

        if (!inactiveSessions) {
            router.push('/')
        }

        setInactiveSessions(inactiveSessions)

    }, [])

    const onRestart = () => {
        router.push('/')
    }

    return (
        <div className="dark-bg min-h-screen pb-[30px] flex flex-col items-center">
            <div className="w-[414px] rounded-b-[20px] md:overflow-hidden">
                <Header theme="dark" text="history" isBorderBottom />
            </div>

            <div className="p-[25px] flex flex-col gap-[25px] mb-[65px]">

                {!inactiveSessions && (
                    <h1 className="dark-text">No items.</h1>
                )}

                {inactiveSessions?.map((inactiveSession) => (
                    <SessionHistoryCard inactiveSession={inactiveSession} key={inactiveSession.id} />
                ))}

            </div>

            <div className="p-[25px] fixed bottom-0 mx-auto bg-[#BEADB7] restart-shadow w-full max-w-[414px]">
                <Button theme="dark" mode="primary" onClick={onRestart}>new game</Button>
            </div>

        </div>
    )
}

export default HistoryPage