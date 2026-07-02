import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
let DashboardService = class DashboardService {
    constructor(http) {
        this.http = http;
    }
    obtenerMetricas(filtro) {
        return this.http.get(`${environment.API_SECURITY}/dashboard/metrics?filtro=${filtro}`);
    }
};
DashboardService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], DashboardService);
export { DashboardService };
//# sourceMappingURL=dashboard.service.js.map