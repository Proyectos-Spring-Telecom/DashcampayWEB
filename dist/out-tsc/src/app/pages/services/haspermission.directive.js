import { __decorate, __param } from "tslib";
// src/app/core/haspermission.directive.ts
import { Directive, Input, Optional } from '@angular/core';
let HasPermissionDirective = class HasPermissionDirective {
    constructor(templateRef, // ⬅️ hazlo opcional
    viewContainer, auth, elRef, renderer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
        this.auth = auth;
        this.elRef = elRef;
        this.renderer = renderer;
        this.required = [];
        this.isStructural = !!templateRef; // true si se usa *appHasPermission
    }
    set appHasPermission(permission) {
        const req = Array.isArray(permission) ? permission : [permission];
        this.required = req.filter(v => v != null).map(v => String(v).trim());
        this.updateView();
    }
    ngOnInit() {
        this.sub = this.auth.isAuthenticationChanged()?.subscribe(() => this.updateView());
    }
    ngOnDestroy() { this.sub?.unsubscribe(); }
    updateView() {
        const current = (this.auth.getPermissions() || []).map(p => String(p).trim());
        const allowed = this.required.length === 0
            ? true
            : this.required.some(r => current.includes(r));
        if (this.isStructural) {
            this.viewContainer.clear();
            if (allowed && this.templateRef)
                this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else {
            this.renderer.setStyle(this.elRef.nativeElement, 'display', allowed ? '' : 'none');
        }
    }
};
__decorate([
    Input()
], HasPermissionDirective.prototype, "appHasPermission", null);
HasPermissionDirective = __decorate([
    Directive({
        selector: '[appHasPermission]',
        standalone: true
    }),
    __param(0, Optional())
], HasPermissionDirective);
export { HasPermissionDirective };
//# sourceMappingURL=haspermission.directive.js.map