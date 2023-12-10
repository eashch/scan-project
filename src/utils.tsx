
export const dateFormatDDMMYYYY = (date: string): string => {
    const dateObj = new Date(date);
    const yyyy = dateObj.getFullYear();
    let mm: number | string = dateObj.getMonth() + 1;
    let dd: number | string = dateObj.getDate();
    if (dd < 10) 
        dd = '0' + dd;
    if (mm < 10) 
        mm = '0' + mm;

    return dd + '.' + mm + '.' + yyyy;
}

export const checkTaxpayerId10Digits = (str: string): boolean => {
    if (str.length !== 10)
        return false;
    const inputNumber = Array.from(str).map(Number);

    if ((inputNumber[9] == ((
            2 * inputNumber[0] 
            + 4 * inputNumber[1] 
            + 10 * inputNumber[2] 
            + 3 * inputNumber[3] 
            + 5 * inputNumber[4] 
            + 9 * inputNumber[5] 
            + 4 * inputNumber[6] 
            + 6 * inputNumber[7] 
            + 8 * inputNumber[8]) % 11) % 10))
        return true;
    return false;
}

export const validateDate = (dateStr: string): boolean => {
    const dateObj = new Date(dateStr);
    const text = Date.prototype.toString.call(dateObj);
    if (text === 'Invalid Date')
        return false;
    const dateNow = new Date();
    if (dateNow < dateObj)
        return false;
    return true;
}

export const validateDateRange = (startDate: string, 
        endDate: string) => {
    const validStart = validateDate(startDate);
    const validEnd = validateDate(endDate);
    if (!validStart || !validEnd)
        return false;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
    return startDateObj < endDateObj;
} 

export const removeMarkup = (str: string): string => {
    var div = document.createElement("div");
    div.innerHTML = str;
    const cleared =  div.innerText.replace(/<\/?[^>]+(>|$)/g, "");
    return cleared;
} 