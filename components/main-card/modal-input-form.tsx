'use client'

import { ChangeEvent } from "react"

import Button from "@/components/button"
import Card from "@/components/card"
import Monitor from "@/components/monitor"

interface ModalInputProps {
    theme: "light" | "dark"
    name: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    onClick: () => void
    onWidgetsClick: () => void
}

const ModalInputForm = ({ theme, name, onChange, onClick, onWidgetsClick }: ModalInputProps) => {
    return (
        <div className="z-50 absolute right-0 left-0 mx-[30px] top-[252px] flex flex-col items-center ">
           <div className="max-w-[345px]">
                <Card theme={theme} headerText="kitty name" onHeaderClick={onWidgetsClick}>
                    <div className="flex flex-col gap-[15px]">
                        <Monitor theme={theme} isPadding={false}>
                            <input
                                className="outline-none rounded-[10px] px-[7px] w-full bg-transparent"
                                maxLength={10}
                                value={name}
                                onChange={onChange}
                                autoFocus
                            />
                        </Monitor>
    
                        <Button theme={theme} mode="primary" onClick={onClick}>save</Button>
                    </div>
                </Card>
           </div>
        </div>
    )
}

export default ModalInputForm