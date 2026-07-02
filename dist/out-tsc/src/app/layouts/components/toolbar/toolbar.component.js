import { __decorate } from "tslib";
import { Component, DestroyRef, HostBinding, inject, Input } from '@angular/core';
import { filter, map, startWith, switchMap, take } from 'rxjs/operators';
import { MegaMenuComponent } from './mega-menu/mega-menu.component';
import { of } from 'rxjs';
import { NavigationComponent } from '../navigation/navigation.component';
import { ToolbarUserComponent } from './toolbar-user/toolbar-user.component';
import { ToolbarNotificationsComponent } from './toolbar-notifications/toolbar-notifications.component';
import { NavigationItemComponent } from '../navigation/navigation-item/navigation-item.component';
import { MatMenuModule } from '@angular/material/menu';
import { NavigationEnd, RouterLink } from '@angular/router';
import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { checkRouterChildsData } from "../../../../@vex/utils/check-router-childs-data";
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
let ToolbarComponent = class ToolbarComponent {
    toggleCollapse() {
        this.isDesktop$.pipe(take(1)).subscribe((isDesktop) => {
            if (!isDesktop) {
                this.sidenavOpen$.pipe(take(1)).subscribe((open) => {
                    open ? this.layoutService.closeSidenav() : this.layoutService.openSidenav();
                });
                return;
            }
            this.collapsed
                ? this.layoutService.expandSidenav()
                : this.layoutService.collapseSidenav();
        });
    }
    constructor(layoutService, configService, navigationService, popoverService, router) {
        this.layoutService = layoutService;
        this.configService = configService;
        this.navigationService = navigationService;
        this.popoverService = popoverService;
        this.router = router;
        this.showShadow = false;
        this.navigationItems$ = this.navigationService.items$;
        this.isHorizontalLayout$ = this.configService.config$.pipe(map((config) => config.layout === 'horizontal'));
        this.isVerticalLayout$ = this.configService.config$.pipe(map((config) => config.layout === 'vertical'));
        this.isNavbarInToolbar$ = this.configService.config$.pipe(map((config) => config.navbar.position === 'in-toolbar'));
        this.isNavbarBelowToolbar$ = this.configService.config$.pipe(map((config) => config.navbar.position === 'below-toolbar'));
        this.userVisible$ = this.configService.config$.pipe(map((config) => config.toolbar.user.visible));
        this.title$ = this.configService.select((config) => config.sidenav.title);
        this.isDesktop$ = this.layoutService.isDesktop$;
        this.megaMenuOpen$ = of(false);
        this.destroyRef = inject(DestroyRef);
        this.collapsed = false;
        this.sidenavOpen$ = this.layoutService.sidenavOpen$;
    }
    ngOnInit() {
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd), startWith(null), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => {
            this.showShadow = checkRouterChildsData(this.router.routerState.root.snapshot, (data) => data.toolbarShadowEnabled ?? false);
        });
    }
    openQuickpanel() {
        this.layoutService.openQuickpanel();
    }
    openSidenav() {
        this.layoutService.openSidenav();
    }
    openMegaMenu(origin) {
        this.megaMenuOpen$ = of(this.popoverService.open({
            content: MegaMenuComponent,
            origin,
            offsetY: 12,
            position: [
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top'
                },
                {
                    originX: 'end',
                    originY: 'bottom',
                    overlayX: 'end',
                    overlayY: 'top'
                }
            ]
        })).pipe(switchMap((popoverRef) => popoverRef.afterClosed$.pipe(map(() => false))), startWith(true));
    }
    openSearch() {
        this.layoutService.openSearch();
    }
};
__decorate([
    HostBinding('class.shadow-b')
], ToolbarComponent.prototype, "showShadow", void 0);
__decorate([
    Input()
], ToolbarComponent.prototype, "collapsed", void 0);
__decorate([
    Input()
], ToolbarComponent.prototype, "showCollapsePin$", void 0);
ToolbarComponent = __decorate([
    Component({
        selector: 'vex-toolbar',
        templateUrl: './toolbar.component.html',
        styleUrls: ['./toolbar.component.scss'],
        standalone: true,
        imports: [
            MatButtonModule,
            MatIconModule,
            NgIf,
            RouterLink,
            MatMenuModule,
            NgClass,
            NgFor,
            NavigationItemComponent,
            ToolbarNotificationsComponent,
            ToolbarUserComponent,
            NavigationComponent,
            AsyncPipe
        ]
    })
], ToolbarComponent);
export { ToolbarComponent };
//# sourceMappingURL=toolbar.component.js.map