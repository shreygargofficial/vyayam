export function sortArrayBasedOnDate(unSortedArr = []) {
    let newUnSortedArray = JSON.parse(JSON.stringify(unSortedArr)) //deep copy so that we don't mututate actual store value
    if (newUnSortedArray.length > 0)
        return newUnSortedArray.sort((a, b) => new Date(a.date) - new Date(b.date))
    else
        return []
}



export function dateFormatterToShowOnXAxis(x) {
    let fullDate = new Date(x);
    let date = fullDate.getDate();
    date = date > 9 ? date : '0' + date;
    let month = fullDate.getMonth() + 1;
    month = month > 9 ? month : '0' + month;
    let year = fullDate.getFullYear();
    return `${date}/${month}/${year.toString().substring(2,)}`

}