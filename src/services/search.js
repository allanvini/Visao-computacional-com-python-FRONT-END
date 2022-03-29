export default function getDate(date){
    const day = date.split('-')[2];
    const month = date.split('-')[1];
    const year = date.split('-')[0];

    const urlParams = new URLSearchParams({year, month, day}).toString();

    return urlParams;
}