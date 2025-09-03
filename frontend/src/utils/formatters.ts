import { TypesEnum } from "../../context/TransactionProvider";

// type DateFormats = "yyyy/mm/dd" | "yyyy/mm/dd hh:mm:ss"

export function formatMoney(value: number | string){
    const intlFormatMoney = (display: 'code' | 'symbol') => new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: display
    });

    if (typeof value === "string"){
        value = Number(value);

        const moneyFormatted = intlFormatMoney('code').format(value).replace('USD', "").trim();

        return String(moneyFormatted);
    }

    const moneyFormatted = intlFormatMoney('symbol').format(value);

    return moneyFormatted;
}

export function formatWord(word: string){ 
    const cleanWords = word.replaceAll('_', " ");
    
    const words = cleanWords.split(" ");
    const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

    const wordsFormatted = capitalizedWords.join(" ");

    return wordsFormatted;
}

export function formatDate(date: Date, format?: string) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  if (format === "yyyy/mm/dd") return `${year}/${month}/${day}`

  return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
}