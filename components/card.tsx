import Header from "./header"

interface CardProps {
    headerText?: string
    children: React.ReactNode
    theme: "light" | "dark"
}

const Card = ({ children, headerText, theme }: CardProps) => {
    return (
        <div className={`${(theme === 'light')
            ? 'light-border light-container-bg' // light
            : 'dark-border dark-container-bg' // dark
            }
            rounded-[2rem] shadow-lg overflow-hidden
        `}>
            <Header text={headerText} isBorderBottom={true} theme={theme} />
            <div className="p-[1.5rem]">
                {children}
            </div>
        </div>
    )
}

export default Card