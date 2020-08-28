export function stringNumberToInt(strNumber) {
    // 구분자가 들어간 수치 데이터를 숫자로 변경
    return parseInt(strNumber.replace(/,/g, ''));
}
export function numberFormat(x) {
    // 수치 데이터에 구분자(,)를 넣음
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export function numberToKorean(number) {
    // 수치 데이터를 한글 표현으로 변경
    const inputNumber = number < 0 ? false : number;
    const unitWords = ['', '만', '억', '조', '경'];
    const splitUnit = 10000;
    const splitCount = unitWords.length;
    let resultArray = [];
    let resultString = '';
    for (let i = 0; i < splitCount; i++) {
        let unitResult = (inputNumber % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);
        if (unitResult > 0) {
            resultArray[i] = unitResult;
        }
    }
    for (let i = 0; i < resultArray.length; i++) {
        if (!resultArray[i]) continue;
        resultString = String(numberFormat(resultArray[i])) + unitWords[i] + resultString;
    }
    return resultString;
}

const dateFormatting = (date) => (date < 10 ? '0' + date : date);
export const dateToYYYYMMDD = (date, join) => {
    // Javascript Date 객체를 형식에 맞게 변환하여 표현함.
    const monthFormatting = dateFormatting(date.getMonth());
    const dayFormatting = dateFormatting(date.getDay());
    return date.getFullYear() + join + monthFormatting + join + dayFormatting;
};

export function stringToTel(str) {
    // string을 전화번호 표현(구분자 '-' 추가)으로 변경
    return str.replace(/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,"$1-$2-$3");
}
