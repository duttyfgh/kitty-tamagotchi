import Image from "next/image"

import { Variants } from "framer-motion"

import Button from "./button"
import Card from "./card"
import Monitor from "./monitor"
import Talk from "./talk"

interface KillKittyModalProps {
    theme: 'light' | 'dark'
    appearingAnimation: Variants
    onKillKitty: () => void
    onCloseModal: () => void
}

const KillKittyModal = ({ onKillKitty, onCloseModal, theme, appearingAnimation }: KillKittyModalProps) => {
    return (
        <div className="z-50 absolute right-0 left-0 mx-auto top-[235px] w-[345px]">

            <Card theme={theme} headerText="kill kitty" onHeaderClick={onCloseModal}>

                <div className="flex flex-col gap-[15px] relative">
                    <Monitor theme={theme} isPadding={false}>
                        <Image
                            src='/kitties/exhausted.png'
                            width={400}
                            height={347}
                            alt='...'
                            className="-mt-[25px]"
                            priority />
                    </Monitor>

                    <div className="absolute left-1/2 -translate-x-1/2 -top-[305px]">
                        <Talk appearingAnimation={appearingAnimation} text="are you sure?" key='kill' />
                    </div>

                    <div className="flex flex-col gap-[7px]">
                        <Button theme={theme} mode="primary" onClick={onCloseModal}>cancel</Button>
                        <Button theme={theme} mode="secondary" onClick={onKillKitty}>kill</Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default KillKittyModal