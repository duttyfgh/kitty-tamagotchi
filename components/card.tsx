import Header from "./header"

interface CardProps {
    headerText?: string
    isHeaderWidgets?: boolean
    children: React.ReactNode
    theme: "light" | "dark"
    onHeaderClick?: () => void
}

const Card = ({ children, headerText, theme, onHeaderClick, isHeaderWidgets = true }: CardProps) => {
    return (
        <div className={`${(theme === 'light')
            ? 'light-border light-container-bg' // light
            : 'dark-border dark-container-bg' // dark
            }
            rounded-[20px] shadow-md overflow-hidden
        `}>
            <Header text={headerText} isBorderBottom={true} theme={theme} onClick={onHeaderClick} isWidgets={isHeaderWidgets} />
            <div className="p-[15px]">
                {children}
            </div>
        </div>
    )
}

export default Card