import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
let EventService = class EventService {
    constructor() {
        this.handler = new Subject();
    }
    /**
       * Broadcast the event
       * @param type type of event
       * @param payload payload
       */
    broadcast(type, payload = {}) {
        this.handler.next({ type, payload });
    }
    /**
     * Subscribe to event
     * @param type type of event
     * @param callback call back function
     */
    subscribe(type, callback) {
        return this.handler.pipe(filter(event => event.type === type)).pipe(map(event => event.payload))
            .subscribe(callback);
    }
};
EventService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], EventService);
export { EventService };
//# sourceMappingURL=event.service.js.map