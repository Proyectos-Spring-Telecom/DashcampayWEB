import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
let SearchService = class SearchService {
    constructor() {
        this.valueChangesSubject = new BehaviorSubject('');
        this.valueChanges$ = this.valueChangesSubject.asObservable();
        this.submitSubject = new Subject();
        this.submit$ = this.submitSubject.asObservable();
        this.isOpenSubject = new BehaviorSubject(false);
        this.isOpen$ = this.isOpenSubject.asObservable();
    }
};
SearchService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], SearchService);
export { SearchService };
//# sourceMappingURL=search.service.js.map