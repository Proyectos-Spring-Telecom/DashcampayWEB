import { Injectable } from '@angular/core';
import { Mail } from '../interfaces/mail.interface';
import { DateTime } from 'luxon';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { fakeMails } from '../../../../../static-data/fakeMails';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  mails = new BehaviorSubject<Mail[]>(this.sortAscending(fakeMails));
  mails$ = this.mails.asObservable();

  filterValue = new BehaviorSubject<string>('');
  filterValue$ = this.filterValue.asObservable();

  filteredMails$ = combineLatest(this.mails$, this.filterValue$).pipe(
    map(([mails, filterValue]) =>
      filterValue
        ? mails?.filter((mail) =>
            JSON.stringify(mail)
              .toLowerCase()
              .includes(filterValue?.toLowerCase())
          )
        : mails
    )
  );

  constructor() {}

  markMailAsRead(mailId: Mail['id']) {
    const mail = this.getMailById(mailId);

    if (!mail || mail.read) {
      return;
    }

    this.updateMail(mailId, {
      read: true
    });
  }

  updateMail(mailId: Mail['id'], update: Partial<Mail>) {
    const existingMail = this.getMailById(mailId);

    if (!existingMail) {
      return;
    }

    const mails: Mail[] = [
      ...this.mails.getValue().filter((m) => m.id !== mailId),
      {
        ...existingMail,
        ...update
      }
    ];

    this.mails.next(this.sortAscending(mails));
  }

  sortAscending(mails: Mail[]) {
    return mails
      .slice()
      .sort((a, b) =>
        DateTime.fromISO(a.date) > DateTime.fromISO(b.date) ? -1 : 1
      );
  }

  getMailById(mailId: Mail['id']) {
    return this.mails.getValue().find((m) => m.id === mailId);
  }
}
