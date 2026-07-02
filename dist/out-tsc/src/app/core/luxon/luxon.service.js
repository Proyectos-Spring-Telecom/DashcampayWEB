import { __decorate, __param } from "tslib";
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Settings } from 'luxon';
let LuxonService = class LuxonService {
    constructor(localeId) {
        this.localeId = localeId;
        Settings.defaultLocale = this.localeId;
    }
};
LuxonService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(0, Inject(LOCALE_ID))
], LuxonService);
export { LuxonService };
//# sourceMappingURL=luxon.service.js.map