import Image from "next/image"
import Link from "next/link"

interface HeaderProps {
    text?: string
    theme: 'light' | 'dark'
    isBorderBottom?: boolean
}

const Header = ({ text, theme, isBorderBottom }: HeaderProps) => {
    return (
        <header className={`${(theme === 'light')
            ? (isBorderBottom ? 'light-border-bottom light-header-bg' : 'light-header-border light-header-bg') // light
            : (isBorderBottom ? 'dark-border-bottom dark-header-bg' : 'dark-header-border dark-header-bg') // dark
            }
            ${text ? 'py-4' : 'py-8'}
        flex items-center justify-between px-10 
                
        `}>

            <div className="flex gap-4">
                <Image src="/heart.svg" width={15} height={16} alt="♥" className={`${(theme === 'dark') && 'dark-filter'}`} />
                {text && (
                    <h1 className={`${(theme === 'light')
                        ? 'light-text'
                        : 'dark-text'
                    }`}>
                        {text}
                        </h1>
                )}
            </div>

            <Link href='/' className="flex items-end gap-4">
                <Image src="/dash.svg" width={12} height={4} alt="_" className={`${(theme === 'dark') && 'dark-filter'}`} />
                <Image src="/rectangle.svg" width={12} height={12} alt="▯" className={`${(theme === 'dark') && 'dark-filter'}`} />
                <Image src="/x-mark.svg" width={12} height={12} alt="X" className={`${(theme === 'dark') && 'dark-filter'}`} />
            </Link>

        </header>
    )
}

export default Header