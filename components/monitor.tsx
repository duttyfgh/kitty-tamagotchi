interface MonitorProps {
    children: React.ReactNode
    theme: "light" | "dark"
    isPadding?: boolean
    isContentCenter?: boolean
}

const Monitor = ({ children, theme, isPadding = true, isContentCenter=false }: MonitorProps) => {
    return (

        <div className={`${(theme === 'light')
            ? 'light-border light-monitor-bg' // light
            : 'dark-border dark-monitor-bg' // dark
            }
            ${isPadding ? 'p-[2.5rem]' : 'p-[2rem] py-6'}
            ${isContentCenter ? '' : 'flex justify-center'}
             rounded-[1rem] w-full 
            `}>
            {children}
        </div>

    )
}

export default Monitor

