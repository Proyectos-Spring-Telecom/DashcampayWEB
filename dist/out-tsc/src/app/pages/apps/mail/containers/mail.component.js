import { __decorate } from "tslib";
import { Component, DestroyRef, inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs/operators';
import { MatDrawer, MatSidenavModule } from '@angular/material/sidenav';
import { scaleIn400ms } from "../../../../../@vex/animations/scale-in.animation";
import { fadeInRight400ms } from "../../../../../@vex/animations/fade-in-right.animation";
import { MailComposeComponent } from '../components/mail-compose/mail-compose.component';
import { ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { MailSidenavComponent } from '../components/mail-sidenav/mail-sidenav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
let MailComponent = class MailComponent {
    constructor(layoutService, mailService, configService, dialog) {
        this.layoutService = layoutService;
        this.mailService = mailService;
        this.configService = configService;
        this.dialog = dialog;
        this.isDesktop$ = this.layoutService.isDesktop$;
        this.ltLg$ = this.layoutService.ltLg$;
        this.drawerMode$ = this.isDesktop$.pipe(map((isDesktop) => (isDesktop ? 'side' : 'over')));
        this.isVerticalLayout$ = this.configService.select((config) => config.layout === 'vertical');
        this.drawerOpen = true;
        this.searchCtrl = new UntypedFormControl();
        this.destroyRef = inject(DestroyRef);
    }
    ngOnInit() {
        /**
         * Expand Drawer when we switch from mobile to desktop view
         */
        this.isDesktop$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((isDesktop) => {
            if (isDesktop) {
                this.drawer?.open();
            }
            else {
                this.drawer?.close();
            }
        });
        this.searchCtrl.valueChanges
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((value) => this.mailService.filterValue.next(value));
    }
    openCompose() {
        this.dialog.open(MailComposeComponent, {
            width: '100%',
            maxWidth: 600
        });
    }
};
__decorate([
    ViewChild(MatDrawer, { static: true })
], MailComponent.prototype, "drawer", void 0);
MailComponent = __decorate([
    Component({
        selector: 'vex-mail',
        templateUrl: './mail.component.html',
        styleUrls: ['./mail.component.scss'],
        animations: [scaleIn400ms, fadeInRight400ms],
        encapsulation: ViewEncapsulation.None,
        standalone: true,
        imports: [
            MatSidenavModule,
            NgIf,
            MatIconModule,
            MatButtonModule,
            MailSidenavComponent,
            ReactiveFormsModule,
            NgClass,
            RouterOutlet,
            AsyncPipe,
            MatInputModule
        ]
    })
], MailComponent);
export { MailComponent };
//# sourceMappingURL=mail.component.js.map