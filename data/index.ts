import { nanoid } from "nanoid"
import { getDaysPassed } from "./day-passed"

export interface ISession {
    id: string
    name: string
    days: number
    kisses: number
    talks: number
    isActive: boolean
    score: number
    createdAt: string
    diedAt: string | null
    lastSeen: string
    scores: {
        date: string
        scores: number
        isExceeded: boolean
        isAware: boolean
    }[]
}

const MAX_SCORE = 122

// LOCAL GETS
const getSessions = (): ISession[] => {
    if (typeof window === 'undefined' || !window.localStorage) {
        return []
    }

    try {
        const sessionsString = localStorage.getItem('sessions')
        if (!sessionsString) {
            return []
        }
        return JSON.parse(sessionsString) as ISession[]
    } catch (error) {
        return []
    }
}

const getCurrentDate = (): string => {
    const currentDate = new Date().toISOString().split("T")[0]
    return currentDate // "2025-02-10"
}

export const getCurrentSession = () => {
    const sessions = getSessions()

    const currentSession = sessions.find(session => session.isActive)

    return currentSession
}

export const getTodayScoreRecord = () => {
    const currentSession = getCurrentSession()
    const currentDate = getCurrentDate()

    if (!currentSession) return

    const todayScoreRecord = currentSession.scores.find(record => record.date === currentDate)  

    return todayScoreRecord
}

// GETS
export const getName = () => {
    const currentSession = getCurrentSession()
    const name = currentSession?.name

    return name
}

export const getDiedName = () => {
    const session = getSessions()

    const lastSession = session[session.length - 1]

    const lastName = lastSession?.name

    return lastName
}

export const getScore = () => {
    const currentSession = getCurrentSession()
    const score = currentSession?.score

    return score
}

export const getExceeded = (): boolean => {
    const todayScoreRecord = getTodayScoreRecord()
    const isExceeded = todayScoreRecord?.isExceeded

    return isExceeded || false

}

export const getIsAware = (): boolean => {
    const todayScoreRecord = getTodayScoreRecord()
    const isAware = todayScoreRecord?.isAware

    return isAware || false

}

export const getInactiveSessions = () => {
    const sessions = getSessions()
    const inactiveSessions = sessions.filter((sessions) => sessions.isActive === false)

    return inactiveSessions
}

// CREATES
export const createKittySession = () => {
    const id = nanoid()
    const createdAt = getCurrentDate()

    const newSession: ISession = {
        id,
        name: '',
        days: 1,
        kisses: 0,
        talks: 0,
        isActive: true,
        score: 25,
        createdAt,
        diedAt: null,
        lastSeen: createdAt,
        scores: [{
            date: createdAt, // for the first time it can be created at by next time I'll change it I'll put the current date
            scores: 0,
            isExceeded: false,
            isAware: false

        }]
    }

    const sessions = getSessions()

    // add new session
    sessions.push(newSession)

    // push new create or updated array of sessions
    localStorage.setItem('sessions', JSON.stringify(sessions))
}

// UPDATES
export const updateName = (name: string) => {
    const sessions = getSessions()

    const currentSession = sessions.find(session => session.isActive)

    if (currentSession) {
        currentSession.name = name

        // then update current session in localStorage
        localStorage.setItem('sessions', JSON.stringify(sessions))
    }
}

export const addKisses = (kisses: number) => {
    const sessions = getSessions()

    const currentSession = sessions.find(session => session.isActive)

    if (currentSession) {

        // update kisses in local session
        currentSession.kisses += kisses

        // then update current session in localStorage
        localStorage.setItem('sessions', JSON.stringify(sessions))
    }
}

export const addTalks = (talks: number) => {
    const sessions = getSessions()

    const currentSession = sessions.find(session => session.isActive)

    if (currentSession) {

        // update talks in local session
        currentSession.talks += talks

        // then update current session in localStorage
        localStorage.setItem('sessions', JSON.stringify(sessions))
    }
}

export const onAware = () => {
    const sessions = getSessions()

    const currentSession = sessions.find(session => session.isActive)

    if (!currentSession) return

    const currentDate = getCurrentDate()
    const todayScoreRecord = currentSession.scores.find(record => record.date === currentDate)

    if (todayScoreRecord?.scores) {
        todayScoreRecord.isAware = true
    }

    localStorage.setItem('sessions', JSON.stringify(sessions))
}

export const addScore = (additionalScores: number) => {
    const sessions = getSessions()

    const currentSession = sessions.find(session => session.isActive)
    if (!currentSession) return

    const currentDate = getCurrentDate()
    const todayScoreRecord = currentSession.scores.find(record => record.date === currentDate)

    // add score logic
    if (todayScoreRecord?.scores) {

        // if she exceeds the 24 score limit we'll tell it to her and don't do anything else
        if (todayScoreRecord.scores >= MAX_SCORE) {
            todayScoreRecord.isExceeded = true

            // if everything is fine with limit we just add scores
        } else {
            currentSession.score += additionalScores
        }
    }

    // update scores array
    if (!todayScoreRecord) {
        // if there's no record for today - create new one
        // initial value - additionalScore, or MAX_SCORE, if additionalScore >= MAX_SCORE
        const initialScore = additionalScores >= MAX_SCORE ? MAX_SCORE : additionalScores
        currentSession.scores.push({
            date: currentDate,
            scores: initialScore,
            isExceeded: false,
            isAware: false
        })
    } else {
        // If record exit sum their scores with additionalScore
        const newTotal = todayScoreRecord.scores + additionalScores

        // if new total is big then 24 save to locaLStorage MAX_SCORE else new total
        todayScoreRecord.scores = newTotal >= MAX_SCORE ? MAX_SCORE : newTotal
    }

    localStorage.setItem('sessions', JSON.stringify(sessions))
}

// checks
export const checkLastSeen = () => {
    const sessions = getSessions()

    const currentSession = sessions.find(session => session.isActive)
    const currentDate = getCurrentDate()

    if (!currentSession) return

    const lastSeen = currentSession?.lastSeen

    // if she came to the site any another day but today...
    if (lastSeen !== currentDate) {
        const dayPassedFromLastSeen = getDaysPassed(lastSeen)

        // ...we check if it's 1 or more days passed...
        if (dayPassedFromLastSeen >= 1) {

            // ...and if it's true and 1 or more days are passed we disincrease her scores in such a way: 1 day = -10 scores
            currentSession.score -= (dayPassedFromLastSeen * 10)

            if (currentSession.score < 0) {
                currentSession.isActive = false
                currentSession.diedAt = currentDate

            }
        }

        // even if we didn't disincreased the score we update lastSeen date anyway
        currentSession.lastSeen = currentDate
    }

    localStorage.setItem('sessions', JSON.stringify(sessions))
}

// delete
export const deleteCurrentSession = () => {
    const sessions = getSessions()

    const currentSession = sessions.find(session => session.isActive)

    if (!currentSession) return

    // we don't actually delete we just mark isActive as false
    currentSession.isActive = false
    currentSession.diedAt = getCurrentDate()

    localStorage.setItem('sessions', JSON.stringify(sessions))
}