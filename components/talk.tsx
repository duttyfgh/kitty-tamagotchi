import Image from "next/image"
import { motion, Variants } from 'framer-motion'

interface TalkProps {
    text: string | undefined
    appearingAnimation: Variants
}

const Talk = ({ text, appearingAnimation }: TalkProps) => {

    if (!text) {
        return null
    }

    return (
        <motion.div
            animate='visible'
            initial='hidden'
            variants={appearingAnimation}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 -translate-x-1/2 top-[27rem] z-30 shadow-2xl transition-all">
            <div className="bg-white border-b-[0.4rem] border-t-[0.4rem] border-black p-[0.8rem] text-center relative inline-block w-max">
                <Image
                    src='/left-of-talk-block.png'
                    width={20}
                    height={50}
                    alt='...'
                    className="absolute left-[-1.9rem] top-[-0.4rem]"
                />

                <span className="text-black w-full font-bold">{text}</span>

                <Image
                    src='/right-of-talk-block.png'
                    width={20}
                    height={74}
                    alt='...'
                    className="absolute right-[-1.9rem] top-[-0.4rem]"
                />

                <Image
                    src='/bottom-of-talk-block.png'
                    width={30}
                    height={34}
                    alt='...'
                    className="absolute bottom-[-2.7rem] left-1/2 -translate-x-1/2"
                />
            </div>
        </motion.div>
    )
}

export default Talk