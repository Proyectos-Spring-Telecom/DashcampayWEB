import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let JwtInterceptor = class JwtInterceptor {
    constructor(authenticationService, authfackservice) {
        this.authenticationService = authenticationService;
        this.authfackservice = authfackservice;
    }
    intercept(request, next) {
        // if (environment.defaultauth === 'firebase') {
        //     const currentUser = this.authenticationService.currentUser();
        //     if (currentUser && currentUser.token) {
        //         request = request.clone({
        //             setHeaders: {
        //                 Authorization: `Bearer ${currentUser.token}`
        //             }
        //         });
        //     }
        // } else {
        //     // add authorization header with jwt token if available
        //     const currentUser = this.authfackservice.currentUserValue;
        //     if (currentUser && currentUser.token) {
        //         request = request.clone({
        //             setHeaders: {
        //                 Authorization: `Bearer ${currentUser.token}`
        //             }
        //         });
        //     }
        // }
        return next.handle(request);
    }
};
JwtInterceptor = __decorate([
    Injectable()
], JwtInterceptor);
export { JwtInterceptor };
//# sourceMappingURL=jwt.interceptor.js.map