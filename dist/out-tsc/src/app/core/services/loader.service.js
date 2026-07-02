import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
let LoaderService = class LoaderService {
    constructor() {
        this.isLoading = new BehaviorSubject(false);
    }
};
LoaderService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], LoaderService);
export { LoaderService };
//# sourceMappingURL=loader.service.js.map