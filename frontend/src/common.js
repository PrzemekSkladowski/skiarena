export function toLocalTimezone(date) {
    return new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0, 16);
}
export function toUTC(dateString) {
    return new Date(dateString).toISOString().slice(0, 16);
}
