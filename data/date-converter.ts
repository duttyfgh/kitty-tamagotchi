export const dateConverter = (date: string) => {
    const dateArr = date.split('-')

    const year = dateArr[0].split('').splice(2, 4).join('')
    const month = dateArr[2]
    const day = dateArr[1]

    const finalDate = [month, day, year].join('.')

    return finalDate
}