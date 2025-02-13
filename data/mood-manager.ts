import { getScore } from "./index"

export type IMood = 'exited' | 'happy' | 'calm' | 'sad' | 'unhappy' | 'exhausted' | 'died'

export interface IScoreLimits {
    mood: IMood,
    minScore: number,
    maxScore: number
}

export const scoreLimits: IScoreLimits[] = [
    {
        mood: 'died',
        minScore: 0,
        maxScore: 0,
    },
    {
        mood: 'exhausted',
        minScore: 1,
        maxScore: 24,
    },
    {
        mood: 'unhappy',
        minScore: 25,
        maxScore: 48,
    },
    {
        mood: 'sad',
        minScore: 49,
        maxScore: 72,
    },
    {
        mood: 'calm',
        minScore: 73,
        maxScore: 96,
    },
    {
        mood: 'happy',
        minScore: 97,
        maxScore: 120,
    },
    {
        mood: 'exited',
        minScore: 121,
        maxScore: 144,
    },
]

export const getMood = (): null | IMood => {
    const score = getScore()

    if (!score) {
        return null
    }

    if (score === 24.5) return 'exhausted'
    if (score === 48.5) return 'unhappy'
    if (score === 72.5) return 'sad'
    if (score === 96.5) return 'calm'
    if (score === 120.5) return 'happy'

    switch (true) {
        case (score === 0):
            return 'died'

        case (score >= 1 && score <= 24):
            return 'exhausted'

        case (score >= 25 && score <= 48):
            return 'unhappy'

        case (score >= 49 && score <= 72):
            return 'sad'

        case (score >= 73 && score <= 96):
            return 'calm'

        case (score >= 97 && score <= 120):
            return 'happy'

        case (score >= 121):
            return 'exited'
        default:
            return 'exited'
    }

}