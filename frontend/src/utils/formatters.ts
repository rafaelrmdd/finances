export function moneyFormatter(amount: number){
    const moneyFormatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);

    return moneyFormatted;
}

export function wordFormatter(word: string){
    const cleanWords = word.replaceAll('_', " ")

    const words = cleanWords.split(" ");
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

    const wordsFormatted = capitalizedWords.join(" ");

    return wordsFormatted;
}