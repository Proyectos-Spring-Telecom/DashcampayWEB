import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
let AuthfakeauthenticationService = class AuthfakeauthenticationService {
    constructor(http) {
        this.http = http;
        const storedUser = localStorage.getItem('currentUser');
        const parsedUser = storedUser ? JSON.parse(storedUser) : null;
        this.currentUserSubject = new BehaviorSubject(parsedUser);
        this.currentUser = this.currentUserSubject.asObservable();
    }
    get currentUserValue() {
        return this.currentUserSubject.value;
    }
    login(email, password) {
        return this.http.post(`/users/authenticate`, { email, password })
            .pipe(map(user => {
            if (user && user.token) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }
            return user;
        }));
    }
    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
};
AuthfakeauthenticationService = __decorate([
    Injectable({ providedIn: 'root' })
], AuthfakeauthenticationService);
export { AuthfakeauthenticationService };
//# sourceMappingURL=authfake.service.js.map