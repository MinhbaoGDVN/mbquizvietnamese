export function randomQuestion(data) {

    if (!data || data.length === 0) {
        return null;
    }

    const randomIndex = Math.floor(Math.random() * data.length);

    return data[randomIndex];

}
