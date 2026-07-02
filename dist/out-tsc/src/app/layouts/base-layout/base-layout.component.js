import { __decorate, __param } from "tslib";
import { Component, ContentChild, DestroyRef, inject, Inject } from '@angular/core';
import { MatSidenavContainer, MatSidenavModule } from '@angular/material/sidenav';
import { NavigationEnd, RouterOutlet, Scroll } from '@angular/router';
import { filter, map, startWith, withLatestFrom } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { checkRouterChildsData } from "../../../@vex/utils/check-router-childs-data";
import { AsyncPipe, DOCUMENT, NgIf, NgTemplateOutlet } from '@angular/common';
import { SearchComponent } from '../components/toolbar/search/search.component';
import { VexProgressBarComponent } from "../../../@vex/components/vex-progress-bar/vex-progress-bar.component";
import { isNil } from "../../../@vex/utils/is-nil";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
let BaseLayoutComponent = class BaseLayoutComponent {
    constructor(layoutService, configService, router, document) {
        this.layoutService = layoutService;
        this.configService = configService;
        this.router = router;
        this.document = document;
        this.config$ = this.configService.config$;
        /**
         * Check if footer should be visible
         */
        this.isFooterVisible$ = combineLatest([
            /**
             * Check if footer is enabled in the config
             */
            this.configService.config$.pipe(map((config) => config.footer.visible)),
            /**
             * Check if footer is enabled on the current route
             */
            this.router.events.pipe(filter((event) => event instanceof NavigationEnd), startWith(null), map(() => checkRouterChildsData(this.router.routerState.root.snapshot, (data) => data.footerVisible ?? true)))
        ]).pipe(map(([configEnabled, routeEnabled]) => {
            if (isNil(routeEnabled)) {
                return configEnabled;
            }
            return configEnabled && routeEnabled;
        }));
        this.sidenavCollapsed$ = this.layoutService.sidenavCollapsed$;
        this.isDesktop$ = this.layoutService.isDesktop$;
        this.scrollDisabled$ = this.router.events.pipe(filter((event) => event instanceof NavigationEnd), startWith(null), map(() => checkRouterChildsData(this.router.routerState.root.snapshot, (data) => data.scrollDisabled ?? false)));
        this.searchOpen$ = this.layoutService.searchOpen$;
        this.destroyRef = inject(DestroyRef);
    }
    ngOnInit() {
        /**
         * Open sidenav on desktop when layout is not vertical
         * Close sidenav on mobile or when layout is vertical
         */
        combineLatest([
            this.isDesktop$,
            this.configService.select((config) => config.layout === 'vertical')
        ])
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(([isDesktop, isVerticalLayout]) => {
            if (isDesktop && !isVerticalLayout) {
                this.layoutService.openSidenav();
            }
            else {
                this.layoutService.closeSidenav();
            }
        });
        /**
         * Mobile only:
         * Close Sidenav after Navigating somewhere (e.g. when a user clicks a link in the Sidenav)
         */
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd), withLatestFrom(this.isDesktop$), filter(([event, matches]) => !matches), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.layoutService.closeSidenav());
    }
    ngAfterViewInit() {
        /**
         * Enable Scrolling to specific parts of the page using the Router
         */
        this.router.events
            .pipe(filter((e) => e instanceof Scroll), takeUntilDestroyed(this.destroyRef))
            .subscribe((e) => {
            if (e.position) {
                // backward navigation
                this.sidenavContainer.scrollable.scrollTo({
                    start: e.position[0],
                    top: e.position[1]
                });
            }
            else if (e.anchor) {
                // anchor navigation
                const scroll = (anchor) => this.sidenavContainer.scrollable.scrollTo({
                    behavior: 'smooth',
                    top: anchor.offsetTop,
                    left: anchor.offsetLeft
                });
                let anchorElem = this.document.getElementById(e.anchor);
                if (anchorElem) {
                    scroll(anchorElem);
                }
                else {
                    setTimeout(() => {
                        if (!e.anchor) {
                            return;
                        }
                        anchorElem = this.document.getElementById(e.anchor);
                        if (!anchorElem) {
                            return;
                        }
                        scroll(anchorElem);
                    }, 100);
                }
            }
            else {
                // forward navigation
                this.sidenavContainer.scrollable.scrollTo({
                    top: 0,
                    start: 0
                });
            }
        });
    }
};
__decorate([
    ContentChild(MatSidenavContainer, { static: true })
], BaseLayoutComponent.prototype, "sidenavContainer", void 0);
BaseLayoutComponent = __decorate([
    Component({
        selector: 'vex-base-layout',
        templateUrl: './base-layout.component.html',
        styleUrls: ['./base-layout.component.scss'],
        standalone: true,
        imports: [
            VexProgressBarComponent,
            SearchComponent,
            MatSidenavModule,
            NgTemplateOutlet,
            RouterOutlet,
            AsyncPipe,
            NgIf
        ]
    }),
    __param(3, Inject(DOCUMENT))
], BaseLayoutComponent);
export { BaseLayoutComponent };
//# sourceMappingURL=base-layout.component.js.map