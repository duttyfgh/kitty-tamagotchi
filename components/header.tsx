'use client'

import { useRouter } from "next/navigation"
import Image from "next/image"

interface HeaderProps {
    theme: 'light' | 'dark'
    text?: string
    link?: string
    isWidgets?: boolean
    isBorderBottom?: boolean
    onClick?: () => void
    onTextClick?: () => void

}

const Header = ({ text, theme, isBorderBottom, onClick, onTextClick, link, isWidgets = true }: HeaderProps) => {
    const router = useRouter()

    const onWidgetsClick = () => {
        if (onClick) {
            onClick()
        }

        if (link) {
            router.push(link)
        }
    }

    return (
        <header className={`${(theme === 'light')
            ? (isBorderBottom ? 'light-border-bottom light-header-bg' : 'light-header-border light-header-bg') // light
            : (isBorderBottom ? 'dark-border-bottom dark-header-bg' : 'dark-header-border dark-header-bg') // dark
            }
            ${text ? 'py-[10px]' : 'py-[17px]'}
            flex items-center justify-between px-[25px] w-full
        `}>

            <div className="flex gap-[10px]">
                <Image src="/heart.svg" width={15} height={16} alt="♥" className={`${(theme === 'dark') && 'dark-filter'}`} />
                {text && (
                    <h1 className={`${(theme === 'dark') && 'dark-text'}`} onClick={onTextClick}>
                        {text}
                    </h1>
                )}
            </div>

            {isWidgets && <button onClick={onWidgetsClick} className="flex items-end gap-[10px]" >
                <Image src="/dash.svg" width={12} height={4} alt="_" className={`${(theme === 'dark') && 'dark-filter'}`} />
                <Image src="/rectangle.svg" width={12} height={12} alt="▯" className={`${(theme === 'dark') && 'dark-filter'}`} />
                <Image src="/x-mark.svg" width={12} height={12} alt="X" className={`${(theme === 'dark') && 'dark-filter'}`} />
            </button>}

        </header>
    )
}

export default Header