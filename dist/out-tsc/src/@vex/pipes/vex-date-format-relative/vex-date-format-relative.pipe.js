import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
import { DateTime } from 'luxon';
let VexDateFormatRelativePipe = class VexDateFormatRelativePipe {
    transform(value, ...args) {
        if (!value) {
            return;
        }
        if (!(value instanceof DateTime)) {
            value = DateTime.fromISO(value);
        }
        return value.toRelative();
    }
};
VexDateFormatRelativePipe = __decorate([
    Pipe({
        name: 'vexDateFormatRelative',
        standalone: true
    })
], VexDateFormatRelativePipe);
export { VexDateFormatRelativePipe };
//# sourceMappingURL=vex-date-format-relative.pipe.js.map