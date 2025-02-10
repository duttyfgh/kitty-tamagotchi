import ProgressBarItem from "./progress-bar-item"

interface ProgressBarProps {
    theme: 'light' | 'dark'
    score: number
    maxScore: number
    minScore: number
}

const ProgressBar = ({ score, theme, maxScore, minScore }: ProgressBarProps) => {
    // limit score between minScore and maxScore
    const clampedScore = Math.max(minScore, Math.min(score, maxScore))

    // calculate score from 0 to 24
    const progress = Math.round(((clampedScore - minScore) / (maxScore - minScore)) * 24)

    // create array of elements
    const progressBarItemsArray = Array.from({ length: progress }, (_, i) => (
        <ProgressBarItem key={i} />
    ))

    return (
        <div className={`${theme === 'light' ? 'light-border' : 'dark-border'}
            rounded-[1rem] flex gap-[0.3rem] py-[0.4rem] px-[0.6rem]`}>
            {progressBarItemsArray}
        </div>
    )
}

export default ProgressBar