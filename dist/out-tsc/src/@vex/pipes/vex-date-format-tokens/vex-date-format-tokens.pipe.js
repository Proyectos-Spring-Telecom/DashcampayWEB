import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let VexDateFormatTokensPipe = class VexDateFormatTokensPipe {
    transform(value, ...args) {
        if (!args[0]) {
            throw new Error('[DateTokensPipe]: No args defined, please define your format.');
        }
        return value ? value.toFormat(args[0]) : '';
    }
};
VexDateFormatTokensPipe = __decorate([
    Pipe({
        name: 'vexDateFormatTokens',
        standalone: true
    })
], VexDateFormatTokensPipe);
export { VexDateFormatTokensPipe };
//# sourceMappingURL=vex-date-format-tokens.pipe.js.map