import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { dropdownAnimation } from "../../../../../@vex/animations/dropdown.animation";
import { fadeInUp400ms } from "../../../../../@vex/animations/fade-in-up.animation";
import { VexDateFormatRelativePipe } from "../../../../../@vex/pipes/vex-date-format-relative/vex-date-format-relative.pipe";
import { MatRippleModule } from '@angular/material/core';
import { MailAttachmentComponent } from '../components/mail-attachment/mail-attachment.component';
import { MatMenuModule } from '@angular/material/menu';
import { MailLabelComponent } from '../components/mail-label/mail-label.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VexScrollbarComponent } from "../../../../../@vex/components/vex-scrollbar/vex-scrollbar.component";
import { AsyncPipe, DatePipe, NgClass, NgFor, NgIf } from '@angular/common';
let MailViewComponent = class MailViewComponent {
    constructor(route, mailService, layoutService, cd) {
        this.route = route;
        this.mailService = mailService;
        this.layoutService = layoutService;
        this.cd = cd;
        this.mail$ = combineLatest([
            this.route.paramMap.pipe(map((paramMap) => paramMap.get('mailId')), map((mailId) => (mailId != null ? Number.parseInt(mailId) : undefined))),
            this.mailService.mails$
        ]).pipe(map(([mailId, mails]) => mails?.find((m) => m.id === mailId)));
        this.gtSm$ = this.layoutService.gtSm$;
        this.dropdownOpen = true;
    }
    ngOnInit() { }
    toggleDropdown() {
        this.dropdownOpen = !this.dropdownOpen;
        this.cd.markForCheck();
    }
    ngOnDestroy() { }
};
MailViewComponent = __decorate([
    Component({
        selector: 'vex-mail-view',
        templateUrl: './mail-view.component.html',
        styleUrls: ['./mail-view.component.scss'],
        animations: [dropdownAnimation, fadeInUp400ms],
        standalone: true,
        imports: [
            NgIf,
            VexScrollbarComponent,
            MatButtonModule,
            RouterLink,
            MatIconModule,
            NgFor,
            MailLabelComponent,
            NgClass,
            MatMenuModule,
            MailAttachmentComponent,
            MatRippleModule,
            AsyncPipe,
            DatePipe,
            VexDateFormatRelativePipe
        ]
    })
], MailViewComponent);
export { MailViewComponent };
//# sourceMappingURL=mail-view.component.js.map