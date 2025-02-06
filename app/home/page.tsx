import Header from "@/components/header"
import Monitor from "@/components/monitor"
import MoodAndScore from "@/components/score-bar/mood-and-score"
import ProgressBar from "@/components/score-bar/progress-bar"
import { theme } from "@/theme"

const HomePage = () => {
    return (
        <div className={`${theme === 'light' ? 'light-bg' : 'dark-bg'} h-screen`}>
            <Header text="i love you" isBorderBottom={false} theme={theme} />
            <div className={`${(theme === 'light')
                ? 'light-border light-container-bg '
                : 'dark-border dark-container-bg'
                }
            p-6 rounded-b-[2rem] shadow-lg 
            `}>

                <Monitor theme={theme}>
                    <div className="flex flex-col gap-16">
                        <MoodAndScore mood="normal" score={12} theme={theme} />
                        <ProgressBar theme={theme} score={12}/>
                    </div>
                </Monitor>

            </div>
        </div>
    )
}

export default HomePage