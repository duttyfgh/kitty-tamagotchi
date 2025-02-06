import Header from "./header"

interface CardProps {
    headerText?: string
    children: React.ReactNode
    theme?: "light" | "dark"
}

const Card = ({ children, headerText, theme = 'light' }: CardProps) => {
    return (
        <div className={`${(theme === 'light')
            ? 'light-border light-container-bg' // light
            : 'dark-border dark-container-bg' // dark
            }
            rounded-[2rem] shadow-lg overflow-hidden
        `}>
            <Header text={headerText} isBorderBottom={true} />
            <div className="p-[1.5rem]">
                {children}
            </div>
        </div>
    )
}

export default Card