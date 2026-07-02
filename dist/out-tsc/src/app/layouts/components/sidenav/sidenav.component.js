import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { map, startWith, switchMap } from 'rxjs/operators';
import { of, combineLatest } from 'rxjs';
import { SidenavUserMenuComponent } from './sidenav-user-menu/sidenav-user-menu.component';
import { SearchModalComponent } from './search-modal/search-modal.component';
import { SidenavItemComponent } from './sidenav-item/sidenav-item.component';
import { VexScrollbarComponent } from "../../../../@vex/components/vex-scrollbar/vex-scrollbar.component";
import { MatRippleModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
let SidenavComponent = class SidenavComponent {
    constructor(navigationService, layoutService, configService, popoverService, dialog, users) {
        this.navigationService = navigationService;
        this.layoutService = layoutService;
        this.configService = configService;
        this.popoverService = popoverService;
        this.dialog = dialog;
        this.users = users;
        this.collapsed = false;
        this.collapsedOpen$ = this.layoutService.sidenavCollapsedOpen$;
        this.title$ = this.configService.config$.pipe(map((config) => config.sidenav.title));
        this.imageUrl$ = this.configService.config$.pipe(map((config) => config.sidenav.imageUrl));
        this.showCollapsePin$ = this.configService.config$.pipe(map((config) => config.sidenav.showCollapsePin));
        this.userVisible$ = this.configService.config$.pipe(map((config) => config.sidenav.user.visible));
        this.searchVisible$ = this.configService.config$.pipe(map((config) => config.sidenav.search.visible));
        this.userMenuOpen$ = of(false);
        this.items$ = this.navigationService.items$;
        this.isDesktop$ = this.layoutService.isDesktop$;
        this.sidenavOpen$ = this.layoutService.sidenavOpen$;
        this.sidenavMode$ = combineLatest([
            this.layoutService.isDesktop$,
            this.configService.select((config) => config.layout)
        ]).pipe(map(([isDesktop, layout]) => (!isDesktop || layout === 'vertical' ? 'over' : 'side')));
        this.showCloseInSidenav$ = combineLatest([
            this.sidenavMode$,
            this.sidenavOpen$
        ]).pipe(map(([mode, open]) => mode === 'over' && !!open));
        this.level = 0;
        this.isOpen = false;
        const sanitize = (value) => {
            return value && value !== 'null' ? value : '';
        };
        const user = this.users.getUser();
        this.showImage = user.fotoPerfil || 'assets/images/user_default.png';
        this.showNombre = sanitize(user.nombre);
        this.showApellidoPaterno = sanitize(user.apellidoPaterno);
        this.showApellidoMaterno = sanitize(user.apellidoMaterno);
        this.showRol = user.rol.nombre;
        this.showLogotipo =
            user?.logotipo ??
                user?.logotipoCliente ??
                user?.cliente?.logotipo ??
                user?.cliente?.Logotipo ??
                user?.Logotipo ??
                'assets/img/logo/DashCamPay_trasparente_large.png';
    }
    ngOnInit() { }
    closeSidenav() {
        this.layoutService.closeSidenav();
    }
    collapseOpenSidenav() {
        this.layoutService.collapseOpenSidenav();
    }
    collapseCloseSidenav() {
        this.layoutService.collapseCloseSidenav();
    }
    toggleCollapse() {
        this.collapsed
            ? this.layoutService.expandSidenav()
            : this.layoutService.collapseSidenav();
    }
    trackByRoute(index, item) {
        if (item.type === 'link') {
            return item.route;
        }
        return item.label;
    }
    openProfileMenu(origin) {
        this.userMenuOpen$ = of(this.popoverService.open({
            content: SidenavUserMenuComponent,
            origin,
            offsetY: -8,
            width: origin.clientWidth,
            position: [
                {
                    originX: 'center',
                    originY: 'top',
                    overlayX: 'center',
                    overlayY: 'bottom'
                }
            ]
        })).pipe(switchMap((popoverRef) => popoverRef.afterClosed$.pipe(map(() => false))), startWith(true));
    }
    openSearch() {
        this.dialog.open(SearchModalComponent, {
            panelClass: 'vex-dialog-glossy',
            width: '100%',
            maxWidth: '600px'
        });
    }
    get hasChildren() {
        return !!this.item?.children?.length;
    }
    toggleOpen() {
        this.isOpen = !this.isOpen;
    }
};
__decorate([
    Input()
], SidenavComponent.prototype, "collapsed", void 0);
__decorate([
    Input()
], SidenavComponent.prototype, "item", void 0);
__decorate([
    Input()
], SidenavComponent.prototype, "level", void 0);
SidenavComponent = __decorate([
    Component({
        selector: 'vex-sidenav',
        templateUrl: './sidenav.component.html',
        styleUrls: ['./sidenav.component.scss'],
        standalone: true,
        imports: [
            NgIf,
            MatButtonModule,
            MatIconModule,
            MatRippleModule,
            VexScrollbarComponent,
            NgFor,
            SidenavItemComponent,
            AsyncPipe
        ]
    })
], SidenavComponent);
export { SidenavComponent };
//# sourceMappingURL=sidenav.component.js.map