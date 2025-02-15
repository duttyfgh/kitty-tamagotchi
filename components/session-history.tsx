import { ISession } from "@/data"
import { dateConverter } from "@/data/date-converter"

import Card from "./card"
import Monitor from "./monitor"

interface SessionHistoryCardProps {
    inactiveSession: ISession
}

const SessionHistoryCard = ({ inactiveSession }: SessionHistoryCardProps) => {

    const { createdAt, diedAt, name, days, kisses, talks, score } = inactiveSession

    const dateOfCreating = dateConverter(createdAt)
    const dateDeath = dateConverter(diedAt || '')

    const flooredScore = Math.floor(score)

    return (
        <Card
            theme="dark"
            isHeaderWidgets={false}
            headerText={`${dateOfCreating} - ${dateDeath}`}>
            <Monitor theme="dark" isPadding={false}>
                <div className="flex gap-[10px] flex-col items-center w-full">
                    <div className="flex w-full justify-between">
                        <h1 className="dark-text">name</h1>
                        <h1 className="dark-text">{name}</h1>
                    </div>

                    <div className="flex w-full justify-between">
                        <h1 className="dark-text">days</h1>
                        <h1 className="dark-text">{days}</h1>
                    </div>

                    <div className="flex w-full justify-between">
                        <h1 className="dark-text">score</h1>
                        <h1 className="dark-text">{flooredScore}</h1>
                    </div>

                    <div className="flex w-full justify-between">
                        <h1 className="dark-text">kisses</h1>
                        <h1 className="dark-text">{kisses}</h1>
                    </div>

                    <div className="flex w-full justify-between">
                        <h1 className="dark-text">talks</h1>
                        <h1 className="dark-text">{talks}</h1>
                    </div>
                </div>
            </Monitor>
        </Card>
    )
}

export default SessionHistoryCard