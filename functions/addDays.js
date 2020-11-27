function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

const NDays = (days) => {
    var someDate = new Date();
    var duration = days; //In Days
    someDate.setTime(someDate.getTime() +  (duration * 24 * 60 * 60 * 1000));
    return someDate;
}

export default NDays;
