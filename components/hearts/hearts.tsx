import Heart from "./heart"

const heartsPosition = [
    {
        id: 0,
        top: '12',
        right: '21',
        duration: 4,
        with: 45
    },
    {
        id: 1,
        top: '15',
        right: '20',
        duration: 3.2,
        with: 30
    },
    {
        id: 2,
        top: '5.4',
        right: '21.5',
        duration: 3.8,
        with: 30
    },
    {
        id: 3,
        top: '3.6',
        right: '17',
        duration: 3.7,
        with: 30
    },
    {
        id: 4,
        top: '3.3',
        right: '7.5',
        duration: 3.4,
        with: 45
    },
    {
        id: 5,
        top: '10',
        right: '6.2',
        duration: 3.5,
        with: 45
    },
    {
        id: 6,
        top: '13.5',
        right: '8.5',
        duration: 3,
        with: 45
    }
]

const Hearts = () => {
    return (
        <div>

            {heartsPosition.map((heart) => (
                <Heart
                    key={heart.id}
                    id={heart.id}
                    duration={heart.duration}
                    width={heart.with}
                    top={heart.top}
                    right={heart.right}
                />
            ))}

        </div>
    )
}

export default Hearts