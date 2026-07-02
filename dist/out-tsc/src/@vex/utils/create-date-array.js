import { DateTime } from 'luxon';
export function createDateArray(length) {
    const dates = [];
    for (let i = 0; i < length; i++) {
        dates.push(+DateTime.local().minus({ day: i }).toJSDate());
    }
    return dates.reverse();
}
//# sourceMappingURL=create-date-array.js.map