export interface ITalks {
    id: number,
    text: string,
}

const talks: ITalks[] = [
    { id: 1, text: "YOU'RE MY PRINCESS" },
    { id: 2, text: "I LOVE YOU" },
    { id: 3, text: "YOU'RE THE BEST" },
    { id: 4, text: "I LOVE YOUR VOICE" },
    { id: 5, text: "YOU'RE BEAUTIFUL" },
    { id: 6, text: "I LOVE YOUR EYES" },
    { id: 7, text: "YOU'RE SO CUTIE" },
    { id: 8, text: "MEOW <3" },
    { id: 9, text: "I LOVE YOU ALL" },
    { id: 10, text: "YOU'RE SO NICE" },
    { id: 11, text: "FOREVER AND EVER" },
    { id: 12, text: "SWEETHEART, BE MINE" },
    { id: 13, text: "MY HEART'S YOURS" },
    { id: 14, text: "MISS YOU DEARLY" },
    { id: 15, text: "HOLD ME CLOSE" },
    { id: 16, text: "I ALWAYS WITH YOU" },
    { id: 17, text: "MY DEAREST ONE" },
    { id: 18, text: "MY LITTLE STAR" },
    { id: 19, text: "MY LITTLE GIRL" },
    { id: 20, text: "THINKING OF YOU" },
    { id: 21, text: "MY TRUE LOVE" },
    { id: 22, text: "BE MY BABY" },
    { id: 23, text: "DREAMING OF YOU" },
    { id: 24, text: "YOU'RE IN MY HEART" },
    { id: 25, text: "I ADORE YOU" },
    { id: 26, text: "PRECIOUS TO ME" },
    { id: 27, text: "YOU'RE KITTY" },
    { id: 28, text: "I LOVE MY GIRL" },
    { id: 29, text: "SWEET AS HONEY" },
    { id: 30, text: "HAPPY 14st FEBRUARY" },
    { id: 31, text: "TOGETHER FOREVER" },
    { id: 32, text: "YOU'RE MY GIRL" },
    { id: 33, text: "YOU'RE SWEETY" },
    { id: 34, text: "MY SWEETY GIRL" },
    { id: 35, text: "YOU COMPLETE ME" },
    { id: 36, text: "YOU'RE MY WORLD" },
    { id: 37, text: "MY TREASURE" },
    { id: 38, text: "I'M ALL YOURS" },
    { id: 39, text: "MY CUTIE GIRL" },
    { id: 40, text: "ALWAYS MY DARLING" },
    { id: 41, text: "I LOVE YOUR SMILE" },
    { id: 42, text: "ALWAYS LOVE YOU" },
    { id: 43, text: "YOU MELT ME" },
    { id: 44, text: "FOREVER IN LOVE" },
    { id: 45, text: "YOU'RE MY LOVE" },
    { id: 46, text: "LOVE NEVER FADES" },
    { id: 47, text: "YOU'RE SO SPECIAL" },
    { id: 48, text: "SMILE FOR ME" },
    { id: 49, text: "LOVE WITHOUT END" },
    { id: 50, text: "STAY WITH ME" },
    { id: 51, text: "BE MY WIFE" },
    { id: 52, text: "I LIKE YOU" },
    { id: 53, text: "I LIKE YOU" },
    { id: 54, text: "YOU'RE MINE" },
    { id: 55, text: "PLEASE BE MINE" },
    { id: 56, text: "GIMME KISS" },
    { id: 57, text: "525 DAYS TOGETHER" },
]
// assuming `talks` is your original array of ITalks.
let remainingTalks = [...talks]

export const getTalk = (): ITalks => {
    // if we've used all talks, reset the remainingTalks list.
    if (remainingTalks.length === 0) {
        remainingTalks = [...talks]
    }

    // pick a random talk from the remaining ones.
    const randomIndex = Math.floor(Math.random() * remainingTalks.length)
    const selectedTalk = remainingTalks[randomIndex]

    // remove the selected talk so it won't be repeated.
    remainingTalks.splice(randomIndex, 1)

    return selectedTalk
}