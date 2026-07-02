import { __decorate } from "tslib";
import { ChangeDetectionStrategy, Component, DestroyRef, HostBinding, inject, Input } from '@angular/core';
import { dropdownAnimation } from "../../../../../@vex/animations/dropdown.animation";
import { NavigationEnd, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { HasPermissionDirective } from "../../../../pages/services/haspermission.directive";
let SidenavItemComponent = class SidenavItemComponent {
    constructor(router, cd, navigationService, auth, user) {
        this.router = router;
        this.cd = cd;
        this.navigationService = navigationService;
        this.auth = auth;
        this.user = user;
        this.isOpen = false;
        this.isActive = false;
        this.isLink = this.navigationService.isLink;
        this.isDropdown = this.navigationService.isDropdown;
        this.isSubheading = this.navigationService.isSubheading;
        this.destroyRef = inject(DestroyRef);
    }
    get levelClass() {
        return `item-level-${this.level}`;
    }
    canSee(item) {
        const req = item?.permissions || [];
        if (!req.length)
            return true;
        const have = (this.auth.getPermissions() || []).map(p => String(p).trim());
        return req.map(String).some(p => have.includes(p));
    }
    visibleChildren(item) {
        const children = item?.children || [];
        return children.filter((c) => this.canSee(c));
    }
    ngOnInit() {
        const user = this.user.getUser();
        if (user.rol.nombre == 'Pasajero') {
            this.showRol = true;
        }
        else {
            this.showRol = false;
        }
        this.router.events
            .pipe(filter((event) => event instanceof NavigationEnd), takeUntilDestroyed(this.destroyRef))
            .subscribe(() => this.onRouteChange());
        this.navigationService.openChange$
            .pipe(filter(() => this.isDropdown(this.item)), takeUntilDestroyed(this.destroyRef))
            .subscribe((item) => this.onOpenChange(item));
        this.onRouteChange(); // Inicializa estado activo también al cargar
    }
    ngOnChanges(changes) {
        if (changes &&
            changes.hasOwnProperty('item')) {
            this.onRouteChange();
        }
    }
    toggleOpen() {
        this.isOpen = !this.isOpen;
        this.navigationService.triggerOpenChange(this.item);
        this.cd.markForCheck();
    }
    onOpenChange(item) {
        if (this.isDropdown(this.item) && this.isChildrenOf(this.item, item)) {
            return;
        }
        if (this.isDropdown(this.item) && this.hasActiveChilds(this.item)) {
            return;
        }
        if (this.item !== item) {
            this.isOpen = false;
            this.cd.markForCheck();
        }
    }
    onRouteChange() {
        if (this.isDropdown(this.item)) {
            const wasActive = this.isActive;
            this.isActive = this.hasActiveChilds(this.item);
            // Opcional: abre el menú si entra directo a ruta hija
            if (this.isActive) {
                this.isOpen = true;
                this.navigationService.triggerOpenChange(this.item);
            }
            else if (wasActive) {
                // Cierra el menú si ya no está activo (opcional)
                this.isOpen = false;
                this.navigationService.triggerOpenChange(this.item);
            }
            this.cd.markForCheck();
        }
        else if (this.isLink(this.item) && !this.isFunction(this.item.route)) {
            this.isActive = this.router.isActive(this.item.route, false);
            this.cd.markForCheck();
        }
    }
    isChildrenOf(parent, item) {
        if (parent.children.indexOf(item) !== -1) {
            return true;
        }
        return parent.children
            .filter((child) => this.isDropdown(child))
            .some((child) => this.isChildrenOf(child, item));
    }
    hasActiveChilds(parent) {
        return parent.children.some((child) => {
            if (this.isDropdown(child)) {
                return this.hasActiveChilds(child);
            }
            if (this.isLink(child) && !this.isFunction(child.route)) {
                return this.router.isActive(child.route, false);
            }
            return false;
        });
    }
    isFunction(prop) {
        return prop instanceof Function;
    }
};
__decorate([
    Input({ required: true })
], SidenavItemComponent.prototype, "item", void 0);
__decorate([
    Input({ required: true })
], SidenavItemComponent.prototype, "level", void 0);
__decorate([
    HostBinding('class')
], SidenavItemComponent.prototype, "levelClass", null);
SidenavItemComponent = __decorate([
    Component({
        selector: 'vex-sidenav-item',
        templateUrl: './sidenav-item.component.html',
        styleUrls: ['./sidenav-item.component.scss'],
        animations: [dropdownAnimation],
        changeDetection: ChangeDetectionStrategy.OnPush,
        standalone: true,
        imports: [
            NgIf,
            MatRippleModule,
            RouterLinkActive,
            RouterLink,
            MatIconModule,
            NgClass,
            NgFor,
            HasPermissionDirective
        ]
    })
], SidenavItemComponent);
export { SidenavItemComponent };
//# sourceMappingURL=sidenav-item.component.js.map