interface MonitorProps {
    children: React.ReactNode
    theme: "light" | "dark"
    isPadding?: boolean
    isContentCenter?: boolean
}

const Monitor = ({ children, theme, isPadding = true, isContentCenter = false }: MonitorProps) => {
    return (

        <div className={`${(theme === 'light')
            ? 'light-border light-monitor-bg' // light
            : 'dark-border dark-monitor-bg' // dark
            }
            ${isPadding ? 'p-[25px]' : 'p-[20px] py-[15px]'}
            ${isContentCenter ? '' : 'flex justify-center'}
            rounded-[10px] `}>
            {children}
        </div>

    )
}

export default Monitor

