interface MonitorProps {
    children: React.ReactNode
    theme: "light" | "dark"
    isPadding?: boolean
}

const Monitor = ({ children, theme, isPadding = true }: MonitorProps) => {
    return (

        <div className={`${(theme === 'light')
            ? 'light-border light-monitor-bg' // light
            : 'dark-border dark-monitor-bg' // dark
            }
            ${isPadding ? 'p-[2.5rem]' : 'p-[2rem] py-6'}
             rounded-[1rem] w-full
            `}>
            {children}
        </div>

    )
}

export default Monitor

