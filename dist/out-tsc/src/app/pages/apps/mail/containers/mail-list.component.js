import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { fadeInUp400ms } from "../../../../../@vex/animations/fade-in-up.animation";
import { stagger40ms } from "../../../../../@vex/animations/stagger.animation";
import { trackById } from "../../../../../@vex/utils/track-by";
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NavigationEnd, RouterOutlet } from '@angular/router';
import { distinctUntilChanged, filter, map } from 'rxjs/operators';
import { getAllParams } from "../../../../../@vex/utils/check-router-childs-data";
import { MailListEntryComponent } from '../components/mail-list-entry/mail-list-entry.component';
import { VexScrollbarComponent } from "../../../../../@vex/components/vex-scrollbar/vex-scrollbar.component";
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
let MailListComponent = class MailListComponent {
    constructor(mailService, layoutService, router) {
        this.mailService = mailService;
        this.layoutService = layoutService;
        this.router = router;
        this.mails$ = this.mailService.filteredMails$;
        this.gtSm$ = this.layoutService.gtSm$;
        this.hasActiveMail$ = this.router.events.pipe(filter((event) => event instanceof NavigationEnd), map(() => getAllParams(this.router.routerState.root.snapshot)), map((params) => params.has('mailId')), distinctUntilChanged());
        this.trackById = trackById;
        this.selection = new SelectionModel(true, []);
    }
    ngOnInit() { }
    masterToggle(mails, change) {
        if (!mails) {
            return;
        }
        if (change.checked) {
            this.selection.select(...mails.map((mail) => mail.id));
        }
        else {
            this.selection.deselect(...mails.map((mail) => mail.id));
        }
    }
    isAllSelected(mails) {
        return (mails?.length > 0 && mails?.length === this.selection.selected?.length);
    }
    isSomeButNotAllSelected(mails) {
        return !this.isAllSelected(mails) && this.selection.hasValue();
    }
};
MailListComponent = __decorate([
    Component({
        selector: 'vex-mail-list',
        templateUrl: './mail-list.component.html',
        styleUrls: ['./mail-list.component.scss'],
        animations: [fadeInUp400ms, stagger40ms],
        standalone: true,
        imports: [
            NgIf,
            MatCheckboxModule,
            MatButtonModule,
            MatTooltipModule,
            MatIconModule,
            VexScrollbarComponent,
            NgFor,
            MailListEntryComponent,
            RouterOutlet,
            AsyncPipe
        ]
    })
], MailListComponent);
export { MailListComponent };
//# sourceMappingURL=mail-list.component.js.map