import Image from "next/image"
import { motion, Variants } from 'framer-motion'

interface TalkProps {
    text: string | undefined
    isBig?: boolean
    appearingAnimation: Variants
}

const Talk = ({ text, appearingAnimation, isBig = false }: TalkProps) => {
   
    if (!text) {
        return null
    }

    if(text.length >= 12) {
        isBig = true
    }
    return (
        <motion.div
            animate='visible'
            initial='hidden'
            variants={appearingAnimation}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 -translate-x-1/2 top-[270px] z-30">
            <div className={`bg-white border-b-[4px] border-t-[4px] border-black shadow-2xl p-[8px] text-center relative inline-block w-max 
                ${isBig && 'scale-[0.85]'}`}>
                <Image
                    src='/left-of-talk-block.png'
                    width={20}
                    height={50}
                    alt='...'
                    className="absolute left-[-19px] top-[-4px]"
                    priority
                />

                <span className="text-black w-full font-bold text-[22px]">{text}</span>

                <Image
                    src='/right-of-talk-block.png'
                    width={20}
                    height={74}
                    alt='...'
                    className="absolute right-[-19px] top-[-4px]"
                />

                <Image
                    src='/bottom-of-talk-block.png'
                    width={30}
                    height={34}
                    alt='...'
                    className="absolute bottom-[-27px] left-1/2 -translate-x-1/2"
                    priority
                />
            </div>
        </motion.div>
    )
}

export default Talk