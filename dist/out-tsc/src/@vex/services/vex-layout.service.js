import { __decorate } from "tslib";
import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
let VexLayoutService = class VexLayoutService {
    constructor(breakpointObserver) {
        this.breakpointObserver = breakpointObserver;
        this._quickpanelOpenSubject = new BehaviorSubject(false);
        this.quickpanelOpen$ = this._quickpanelOpenSubject.asObservable();
        this._sidenavOpenSubject = new BehaviorSubject(false);
        this.sidenavOpen$ = this._sidenavOpenSubject.asObservable();
        this._sidenavCollapsedSubject = new BehaviorSubject(false);
        this.sidenavCollapsed$ = this._sidenavCollapsedSubject.asObservable();
        this._sidenavCollapsedOpenSubject = new BehaviorSubject(false);
        this.sidenavCollapsedOpen$ = this._sidenavCollapsedOpenSubject.asObservable();
        this.destroyRef = inject(DestroyRef);
        this._configPanelOpenSubject = new BehaviorSubject(false);
        this._searchOpen = new BehaviorSubject(false);
        this.searchOpen$ = this._searchOpen.asObservable();
        this.isDesktop$ = this.breakpointObserver
            .observe(`(min-width: 1280px)`)
            .pipe(map((state) => state.matches));
        this.ltLg$ = this.breakpointObserver
            .observe(`(max-width: 1279px)`)
            .pipe(map((state) => state.matches));
        this.gtMd$ = this.breakpointObserver
            .observe(`(min-width: 960px)`)
            .pipe(map((state) => state.matches));
        this.ltMd$ = this.breakpointObserver
            .observe(`(max-width: 959px)`)
            .pipe(map((state) => state.matches));
        this.gtSm$ = this.breakpointObserver
            .observe(`(min-width: 600px)`)
            .pipe(map((state) => state.matches));
        this.isMobile$ = this.breakpointObserver
            .observe(`(max-width: 599px)`)
            .pipe(map((state) => state.matches));
        this.isLtLg = () => this.breakpointObserver.isMatched(`(max-width: 1279px)`);
        this.isMobile = () => this.breakpointObserver.isMatched(`(max-width: 599px)`);
        this.configPanelOpen$ = this._configPanelOpenSubject.asObservable();
        /**
         * Expand Sidenav when we switch from mobile to desktop view
         */
        this.isDesktop$
            .pipe(filter((matches) => !matches), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.expandSidenav());
    }
    openQuickpanel() {
        this._quickpanelOpenSubject.next(true);
    }
    closeQuickpanel() {
        this._quickpanelOpenSubject.next(false);
    }
    openSidenav() {
        this._sidenavOpenSubject.next(true);
    }
    closeSidenav() {
        this._sidenavOpenSubject.next(false);
    }
    collapseSidenav() {
        this._sidenavCollapsedSubject.next(true);
    }
    expandSidenav() {
        this._sidenavCollapsedSubject.next(false);
    }
    collapseOpenSidenav() {
        this._sidenavCollapsedOpenSubject.next(true);
    }
    collapseCloseSidenav() {
        this._sidenavCollapsedOpenSubject.next(false);
    }
    openConfigpanel() {
        this._configPanelOpenSubject.next(true);
    }
    closeConfigpanel() {
        this._configPanelOpenSubject.next(false);
    }
    openSearch() {
        this._searchOpen.next(true);
    }
    closeSearch() {
        this._searchOpen.next(false);
    }
};
VexLayoutService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], VexLayoutService);
export { VexLayoutService };
//# sourceMappingURL=vex-layout.service.js.map