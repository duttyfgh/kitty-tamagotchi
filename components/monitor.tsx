interface MonitorProps {
    children: React.ReactNode
    theme: "light" | "dark"
}

const Monitor = ({ children, theme}: MonitorProps) => {
    return (

        <div className={`${(theme === 'light')
            ? 'light-border light-monitor-bg' // light
            : 'dark-border dark-monitor-bg' // dark
            }
            p-[2.5rem] rounded-[1rem] w-full
            `}>
            {children}
        </div>

    )
}

export default Monitor

