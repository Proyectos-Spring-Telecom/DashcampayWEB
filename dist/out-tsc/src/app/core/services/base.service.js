import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { ErrorMessage } from '../../entities/ErrorMessage';
let BaseServicesService = class BaseServicesService {
    constructor() { }
    handleError(error) {
        const errorMessage = new ErrorMessage();
        errorMessage.httpStatus = error.status;
        //console.log(error);
        return throwError(errorMessage);
    }
};
BaseServicesService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], BaseServicesService);
export { BaseServicesService };
//# sourceMappingURL=base.service.js.map