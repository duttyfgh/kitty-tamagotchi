'use client'

import { ChangeEvent, useEffect, useState } from "react"
import ModalInputForm from "./modal-input-form"
import Header from "../header"

interface MainCardProps {
    theme: "light" | "dark"
}

const MainCard = ({ theme }: MainCardProps) => {
    const [isModal, setIsModal] = useState<boolean>(false)
    const [name, setName] = useState<string>('name')//TODO: change it into ''

    useEffect(() => {
        //TODO: if (!this.session.name) isModal(true)
    }, [])

    const onSetName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onOpenModal = () => {
        setIsModal(true)
    }

    const onCloseModal = () => {
        if (name) {
            setIsModal(false)
        }
    }

    return (
        <>
            {isModal && <ModalInputForm theme={theme} onChange={onSetName} onClick={onCloseModal} name={name} />}
            {isModal && <div className="h-screen w-screen bg-[#0000008a] z-20 absolute top-0"></div>}

            <div className={`${(theme === 'light')
                ? 'light-border light-container-bg' // light
                : 'dark-border dark-container-bg' // dark
                }
                rounded-[2rem] shadow-lg overflow-hidden mt-[3rem] mx-[1.7rem]
            `}>
                <Header theme={theme} text={name} isBorderBottom onTextClick={onOpenModal} /> {/* TODO: make ability to kill the kitty by clicking       on header's widgets, and add a modal window: are you sure?
                    */}
                <div className="p-[1.5rem]">

                </div>
            </div>
        </>
    )
}

export default MainCard