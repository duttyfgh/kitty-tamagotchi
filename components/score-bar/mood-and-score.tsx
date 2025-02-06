interface MoodAndScoreProps {
    mood: string,
    score: number
    theme: 'light' | 'dark'
}

const MoodAndScore = ({ mood, score, theme }: MoodAndScoreProps) => {
    return (
        <div className="flex justify-between">
            <h1 className={`${(theme === 'light')
                ? 'light-text'
                : 'dark-text'
                }`}>
                {mood}
            </h1>

            <h1 className={`${(theme === 'light')
                ? 'light-text'
                : 'dark-text'
                }`}>
                {score}
            </h1>
        </div>
    )
}

export default MoodAndScore