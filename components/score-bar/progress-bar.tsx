import ProgressBarItem from "./progress-bar-item"

interface ProgressBarProps {
    theme: 'light' | 'dark'
    score: number
    maxScore: number
    minScore: number
}

const ProgressBar = ({ score, theme, maxScore, minScore }: ProgressBarProps) => {
    const flooredScore = Math.floor(score)

    // limit score between minScore and maxScore
    const clampedScore = Math.max(minScore, Math.min(flooredScore, maxScore))

    // calculate score from 0 to 24
    const progress = Math.round(((clampedScore - minScore) / ((maxScore) - minScore)) * 24)

    // create array of elements
    const progressBarItemsArray = Array.from({ length: progress }, (_, i) => (
        <ProgressBarItem key={i} />
    ))

    return (
        <div className={`${theme === 'light' ? 'light-border light-container-bg' : 'dark-border dark-container-bg'}
            rounded-[10px] flex gap-[3px] py-[4px] px-[6px] min-h-[31px] w-[330px]`}>
            {progressBarItemsArray}
        </div>
    )
}

export default ProgressBar