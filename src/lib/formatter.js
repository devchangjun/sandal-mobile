export function stringNumberToInt(stringNumber){
    return parseInt(stringNumber.replace(/,/g , ''));
}
export function numberFormat(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
export function numberToKorean(number){
    let inputNumber  = number < 0 ? false : number;
    let unitWords    = ['', '만', '억', '조', '경'];
    let splitUnit    = 10000;
    let splitCount   = unitWords.length;
    let resultArray  = [];
    let resultString = '';

    for (let i = 0; i < splitCount; i++){
        let unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);
        if (unitResult > 0){
            resultArray[i] = unitResult;
        }
    }

    for (let i = 0; i < resultArray.length; i++){
        if(!resultArray[i]) continue;
        resultString = String(numberFormat(resultArray[i])) + unitWords[i] + resultString;
    }

    return resultString;
}
const dateFormatting = (date) => date < 10 ? '0' + date : date;
export const dateToYYYYMMDD = (date, join) => {
    const monthFormatting = dateFormatting(date.getMonth())
    const dayFormatting = dateFormatting(date.getDay())
    return date.getFullYear() + join + monthFormatting + join + dayFormatting
}
