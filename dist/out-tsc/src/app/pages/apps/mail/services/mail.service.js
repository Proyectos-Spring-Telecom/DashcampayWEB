import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { fakeMails } from '../../../../../static-data/fakeMails';
import { map } from 'rxjs/operators';
let MailService = class MailService {
    constructor() {
        this.mails = new BehaviorSubject(this.sortAscending(fakeMails));
        this.mails$ = this.mails.asObservable();
        this.filterValue = new BehaviorSubject('');
        this.filterValue$ = this.filterValue.asObservable();
        this.filteredMails$ = combineLatest(this.mails$, this.filterValue$).pipe(map(([mails, filterValue]) => filterValue
            ? mails?.filter((mail) => JSON.stringify(mail)
                .toLowerCase()
                .includes(filterValue?.toLowerCase()))
            : mails));
    }
    markMailAsRead(mailId) {
        const mail = this.getMailById(mailId);
        if (!mail || mail.read) {
            return;
        }
        this.updateMail(mailId, {
            read: true
        });
    }
    updateMail(mailId, update) {
        const existingMail = this.getMailById(mailId);
        if (!existingMail) {
            return;
        }
        const mails = [
            ...this.mails.getValue().filter((m) => m.id !== mailId),
            {
                ...existingMail,
                ...update
            }
        ];
        this.mails.next(this.sortAscending(mails));
    }
    sortAscending(mails) {
        return mails
            .slice()
            .sort((a, b) => DateTime.fromISO(a.date) > DateTime.fromISO(b.date) ? -1 : 1);
    }
    getMailById(mailId) {
        return this.mails.getValue().find((m) => m.id === mailId);
    }
};
MailService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], MailService);
export { MailService };
//# sourceMappingURL=mail.service.js.map