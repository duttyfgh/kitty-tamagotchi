'use client'

import { ChangeEvent } from "react"
import Button from "../button"
import Card from "../card"
import Monitor from "../monitor"

interface ModalInputProps {
    theme: "light" | "dark"
    name: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onClick: () => void
}

const ModalInputForm = ({ theme, name, onChange, onClick }: ModalInputProps) => {
    return (
        <div className="z-50 absolute right-0 left-0 mx-[1.5rem] top-[30.3rem]">
            <Card theme={theme} headerText="kitty name" onHeaderClick={onClick}>
                <div className="flex flex-col gap-6">
                    <Monitor theme={theme} isPadding={false}>
                        <input
                            className="outline-none rounded-2xl px-6 w-full py-3 bg-transparent"
                            maxLength={10}
                            value={name}
                            onChange={onChange}
                        />
                    </Monitor>

                    <Button theme={theme} mode="primary" onClick={onClick}>save</Button>
                </div>
            </Card>
        </div>
    )
}

export default ModalInputForm