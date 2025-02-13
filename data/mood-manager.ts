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
        maxScore: 24,
    },
    {
        mood: 'exhausted',
        minScore: 25,
        maxScore: 48,
    },
    {
        mood: 'unhappy',
        minScore: 49,
        maxScore: 72,
    },
    {
        mood: 'sad',
        minScore: 73,
        maxScore: 96,
    },
    {
        mood: 'calm',
        minScore: 97,
        maxScore: 120,
    },
    {
        mood: 'happy',
        minScore: 121,
        maxScore: 144,
    },
    {
        mood: 'exited',
        minScore: 145,
        maxScore: 168,
    },
]

export const getMood = (): null | IMood => {
    const score = getScore()

    if (!score) {
        return null
    }

    if (score === 24.5) return 'died'
    if (score === 48.5) return 'exhausted'
    if (score === 72.5) return 'unhappy'
    if (score === 96.5) return 'sad'
    if (score === 120.5) return 'calm'
    if (score === 144.5) return 'happy'

    switch (true) {
        case (score >= 0 && score <= 24):
            return 'died'

        case (score >= 25 && score <= 48):
            return 'exhausted'

        case (score >= 49 && score <= 72):
            return 'unhappy'

        case (score >= 73 && score <= 96):
            return 'sad'

        case (score >= 97 && score <= 120):
            return 'calm'

        case (score >= 121 && score <= 144):
            return 'happy'

        case (score >= 145 && score <= 168):
            return 'exited'
        default:
            return 'exited'
    }

}