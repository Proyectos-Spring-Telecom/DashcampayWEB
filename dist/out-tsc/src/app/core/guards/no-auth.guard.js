import { __decorate } from "tslib";
import { Injectable, inject } from '@angular/core';
let NoAuthGuard = class NoAuthGuard {
    constructor(router, auth) {
        this.router = router;
        this.auth = auth;
    }
    canActivate(next, state) {
        //your logic goes here
        if (this.auth.isAuthenticated()) {
            this.router.navigate(['dashboard']);
            return false;
        }
        return true;
    }
};
NoAuthGuard = __decorate([
    Injectable({
        providedIn: 'root'
    })
], NoAuthGuard);
export { NoAuthGuard };
export const AuthGuard = (next, state) => {
    return inject(NoAuthGuard).canActivate(next, state);
};
//# sourceMappingURL=no-auth.guard.js.map