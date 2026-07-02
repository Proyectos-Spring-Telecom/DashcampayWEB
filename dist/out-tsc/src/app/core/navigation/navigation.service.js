import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
let NavigationService = class NavigationService {
    constructor(navigationLoaderService) {
        this.navigationLoaderService = navigationLoaderService;
        this.items$ = this.navigationLoaderService.items$;
        this._openChangeSubject = new Subject();
        this.openChange$ = this._openChangeSubject.asObservable();
    }
    triggerOpenChange(item) {
        this._openChangeSubject.next(item);
    }
    isLink(item) {
        return item.type === 'link';
    }
    isDropdown(item) {
        return item.type === 'dropdown';
    }
    isSubheading(item) {
        return item.type === 'subheading';
    }
};
NavigationService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], NavigationService);
export { NavigationService };
//# sourceMappingURL=navigation.service.js.map