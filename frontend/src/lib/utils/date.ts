export function getHoursFromDate(time: string) {    
    return time.substr(11, 2).replace(":", ""); // filter only hour from time and replace : for one digit times like 6:40
}

export function getHoursFromTime(time: string) { 
    return time.substr(0, 2).replace("0", ""); // filter only hour from time and replace : for one digit times like 6:40
}

export function getTimeFromDate(time: string) {    
    return time.substr(11, 5); // filter time from date
}