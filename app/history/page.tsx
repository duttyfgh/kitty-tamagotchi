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
        <div className="dark-bg min-h-screen pb-12">
            <Header theme="dark" text="history" isBorderBottom />

            <div className="p-[2.5rem] flex flex-col gap-10 mb-[6.5rem]">

                {!inactiveSessions && (
                    <h1 className="dark-text">No items.</h1>
                )}

                {inactiveSessions?.map((inactiveSession) => (
                    <SessionHistoryCard inactiveSession={inactiveSession} key={inactiveSession.id} />
                ))}

            </div>

            <div className="p-[2.5rem] fixed bottom-0 mx-auto w-full bg-[#BEADB7] restart-shadow">
                <Button theme="dark" mode="primary" onClick={onRestart}>new game</Button>
            </div>

        </div>
    )
}

export default HistoryPage