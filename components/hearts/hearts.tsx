import { Variants } from "framer-motion"
import Heart from "./heart"

const heartsPosition = [
    {
        id: 0,
        top: '3.6',
        right: '15',
        with: 45
    },
    {
        id: 1,
        top: '3.8',
        right: '19',
        with: 30
    },
    {
        id: 2,
        top: '3.7',
        right: '11.5',
        with: 30
    },
    {
        id: 3,
        top: '4',
        right: '17.3',
        with: 30
    },
    {
        id: 4,
        top: '3.3',
        right: '13',
        with: 30
    },
    {
        id: 5,
        top: '3.6',
        right: '10',
        with: 30
    },
    {
        id: 6,
        top: '3.8',
        right: '14.2',
        with: 30
    },
    {
        id: 7,
        top: '3.8',
        right: '14.2',
        with: 30
    },
    {
        id: 8,
        top: '4',
        right: '19.6',
        with: 30
    },
    {
        id: 9,
        top: '4',
        right: '9.4',
        with: 30
    },
    {
        id: 10,
        top: '3.6',
        right: '15',
        with: 30
    },
]

interface HeartsProps {
    appearingAnimation: Variants
}

const Hearts = ({ appearingAnimation }: HeartsProps) => {
    
    return (
        <div>

            {heartsPosition.map((heart) => (
                <Heart
                    key={heart.id}
                    id={heart.id}
                    width={heart.with}
                    top={heart.top}
                    right={heart.right}
                    appearingAnimation={appearingAnimation}
                />
            ))}

        </div>
    )
}

export default Hearts