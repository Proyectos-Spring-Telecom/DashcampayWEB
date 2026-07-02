import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let UserProfileService = class UserProfileService {
    constructor(http) {
        this.http = http;
    }
    getAll() {
        return this.http.get(`/api/login`);
    }
    register(user) {
        return this.http.post(`/users/register`, user);
    }
};
UserProfileService = __decorate([
    Injectable({ providedIn: 'root' })
], UserProfileService);
export { UserProfileService };
//# sourceMappingURL=user.service.js.map