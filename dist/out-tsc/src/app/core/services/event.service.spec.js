import { TestBed } from '@angular/core/testing';
import { EventService } from './event.service';
describe('EventService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(EventService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=event.service.spec.js.map