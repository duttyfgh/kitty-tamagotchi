
// I was lazy to doit by myself so I took it from GPT
export const getDaysPassed = (dateStr: string): number => {
    // Создаем объект Date из строки "YYYY-MM-DD"
    const pastDate = new Date(dateStr);
    const now = new Date();

    // Обнуляем время для обеих дат, чтобы учитывать только полные дни
    pastDate.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);

    // Вычисляем разницу в миллисекундах
    const diffInMs = now.getTime() - pastDate.getTime();

    // Переводим миллисекунды в дни
    const msPerDay = 1000 * 60 * 60 * 24;
    return Math.floor(diffInMs / msPerDay);
}

