export function formatTime(isoTime: string): string {
    const date = new Date(isoTime);
    const now = new Date();

    const isToday = 
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth() &&
        date.getDate() === now.getDate();

    const options: Intl.DateTimeFormatOptions = isToday
        ? { hour: '2-digit', minute: '2-digit' } // Current day: hour:min
        : { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }; // Not today: month day at hour:min

    return date.toLocaleString('en-US', options);
}