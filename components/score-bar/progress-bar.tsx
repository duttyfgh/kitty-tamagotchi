import ProgressBarItem from "./progress-bar-item"

interface ProgressBarProps {
    score: number
    theme: 'light' | 'dark'
}

const ProgressBar = ({ score, theme }: ProgressBarProps) => {
    const progressBarItems = () => {
        const progressBarItemsArray = []

        let i = 0
        while (i < score) {
            i++
            progressBarItemsArray.push(<ProgressBarItem key={i} />)
        }
        return progressBarItemsArray

    }

    return (
        <div className={`${theme === 'light'
            ? 'light-border'
            : 'dark-border'}
         rounded-[1rem] flex gap-[0.4rem] py-2 px-[0.6rem]`}>
            {progressBarItems()}
        </div>
    )
}

export default ProgressBar