import { __decorate, __param } from "tslib";
import { Inject, Injectable } from '@angular/core';
import { NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { filter, take } from 'rxjs/operators';
import { animate, style } from '@angular/animations';
let VexSplashScreenService = class VexSplashScreenService {
    constructor(router, document, animationBuilder) {
        this.router = router;
        this.document = document;
        this.animationBuilder = animationBuilder;
        this.splashScreenElem =
            this.document.body.querySelector('#vex-splash-screen') ?? undefined;
        if (this.splashScreenElem) {
            this.router.events
                .pipe(filter((event) => event instanceof NavigationEnd), take(1))
                .subscribe(() => this.hide());
        }
    }
    hide() {
        const player = this.animationBuilder
            .build([
            style({
                opacity: 1
            }),
            animate('400ms cubic-bezier(0.25, 0.8, 0.25, 1)', style({
                opacity: 0
            }))
        ])
            .create(this.splashScreenElem);
        player.onDone(() => this.splashScreenElem?.remove());
        player.play();
    }
};
VexSplashScreenService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(1, Inject(DOCUMENT))
], VexSplashScreenService);
export { VexSplashScreenService };
//# sourceMappingURL=vex-splash-screen.service.js.map