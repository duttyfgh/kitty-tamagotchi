import { IMood } from "@/data/mood-manager"
import { nanoid } from "nanoid"

interface ICurrentSession {
    id: string
    name: string
    days: number
    kisses: number
    talks: number
    isActive: boolean
    score: number
    createdAt: string
    diedAt: string | null
    scores: {
        date: string,
        scores: number,
        isAware: boolean
    }[]
}


// GETS
const getSessions = (): ICurrentSession[] => {
    if (typeof window === 'undefined' || !window.localStorage) {
        return []
    }

    try {
        const sessionsString = localStorage.getItem('sessions')
        if (!sessionsString) {
            return []
        }
        return JSON.parse(sessionsString) as ICurrentSession[]
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

export const getName = () => {
    const currentSession = getCurrentSession()
    const name = currentSession?.name

    return name
}


export const getScore = () => {
    const currentSession = getCurrentSession()
    const score = currentSession?.score

    return score
}

// CREATES
export const createKittySession = () => {
    const id = nanoid()
    const createdAt = getCurrentDate()

    const newSession: ICurrentSession = {
        id,
        name: '',
        days: 1,
        kisses: 0,
        talks: 0,
        isActive: true,
        score: 98,
        createdAt,
        diedAt: null,
        scores: [{
            date: createdAt, // for the first time it can be created at by next time I'll change it I'll put the current date
            isAware: false, // set this to be true when kitty aware her
            scores: 0

        }]
    }

    const sessions = getSessions()

    // add new session
    sessions.push(newSession)

    // push new create or updated array of sessions
    localStorage.setItem('sessions', JSON.stringify(sessions))
    //TODO: return success text and kitty will say this
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
        currentSession.kisses = kisses
        //TODO: update score by calling score updater function

        // then update current session in localStorage
        localStorage.setItem('sessions', JSON.stringify(sessions))
    }
}

export const addTalks = (talks: number) => {
    const sessions = getSessions()

    const currentSession = sessions.find(session => session.isActive)

    if (currentSession) {

        // update talks in local session
        currentSession.talks = talks
        //TODO: update score by calling score updater function

        // then update current session in localStorage
        localStorage.setItem('sessions', JSON.stringify(sessions))
    }
}

// do like 1 progress bar will response for 1 level of happiness and each level show new progress bar, which Diana'll have to full before going to the next level
// MAX SCORE = 24(for bar)
// so I'll have to give each mood has to earn 24 score or lose before going to next level

// kiss and talk + 1 score
// easter egg + 5

// for each day she can earn only 24 scores, when she gets the limit,
// TODO: kitty will say it to her if isAware === false

//  scores: {date: Date, scores: number, isAware: boolean} | each time check if  scores in current date are more then 24, we don't add score

// TODO: each time we change score, update scores for current Date, and each time check if current date !== the latest date in array(or if the function of returning current date scores, returns null) we know that there's no record for today, and we'll have to do it

const updateScores = (additionalScore: number) => {
    const sessions = getSessions()
    if (!sessions) return null

    const currentSession = sessions.find(session => session.isActive)
    if (!currentSession) return

    const currentDate = getCurrentDate()
    const MAX_SCORE = 24

    // find record of current day scores
    let todayScoreRecord = currentSession.scores.find(record => record.date === currentDate)

    if (!todayScoreRecord) {
        // if there's no record for today - create new one
        // initial value - additionalScore, or MAX_SCORE, if additionalScore >= MAX_SCORE
        const initialScore = additionalScore >= MAX_SCORE ? MAX_SCORE : additionalScore
        currentSession.scores.push({
            date: currentDate,
            scores: initialScore,
            isAware: false,
        })
    } else {
        // If record exit sum their scores with additionalScore
        const newTotal = todayScoreRecord.scores + additionalScore
        // if new total is big then 24 save to locaLStorage MAX_SCORE else new total
        todayScoreRecord.scores = newTotal >= MAX_SCORE ? MAX_SCORE : newTotal
    }

    // update data in localStorage
    localStorage.setItem('sessions', JSON.stringify(sessions))
}
