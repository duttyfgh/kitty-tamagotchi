interface ButtonProps {
    children: React.ReactNode
    theme: 'dark' | 'light'
    mode: 'primary' | 'secondary'
    onClick: () => void
}

const Button = ({ mode, theme, children, onClick }: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`
            ${theme === 'light' && mode === 'primary'
                && 'light-border light-header-bg'
                }
            ${theme === 'dark' && mode === 'primary'
                && 'dark-border dark-header-bg'
                }
            ${theme === 'light' && mode === 'secondary'
                && 'light-border light-container-bg'
                }
            ${theme === 'dark' && mode === 'secondary'
                && 'dark-border dark-container-bg'
                }
            py-3 flex justify-center items-center w-full rounded-[1rem] shadow-lg
        `}>
            <span className={`${(theme === 'light')
                ? 'light-text'
                : 'dark-text'
                }`}>
                {children}
            </span>
        </button>
    )
}

export default Button