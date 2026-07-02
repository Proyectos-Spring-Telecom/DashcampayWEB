var VexPopoverService_1;
import { __decorate } from "tslib";
import { Injectable, Injector } from '@angular/core';
import { OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { VexPopoverRef } from './vex-popover-ref';
import { VexPopoverComponent } from './vex-popover.component';
let VexPopoverService = VexPopoverService_1 = class VexPopoverService {
    constructor(overlay, injector) {
        this.overlay = overlay;
        this.injector = injector;
    }
    open({ origin, content, data, width, height, position, offsetX, offsetY }) {
        const overlayRef = this.overlay.create(this.getOverlayConfig({
            origin,
            width,
            height,
            position,
            offsetX,
            offsetY
        }));
        const popoverRef = new VexPopoverRef(overlayRef, content, data);
        const injector = this.createInjector(popoverRef, this.injector);
        overlayRef.attach(new ComponentPortal(VexPopoverComponent, null, injector));
        return popoverRef;
    }
    static getPositions() {
        return [
            {
                originX: 'center',
                originY: 'top',
                overlayX: 'center',
                overlayY: 'bottom'
            },
            {
                originX: 'center',
                originY: 'bottom',
                overlayX: 'center',
                overlayY: 'top'
            }
        ];
    }
    createInjector(popoverRef, injector) {
        return Injector.create({
            providers: [
                {
                    provide: VexPopoverRef,
                    useValue: popoverRef
                }
            ],
            parent: injector
        });
    }
    getOverlayConfig({ origin, width, height, position, offsetX, offsetY }) {
        return new OverlayConfig({
            hasBackdrop: true,
            width,
            height,
            backdropClass: 'vex-popover-backdrop',
            positionStrategy: this.getOverlayPosition({
                origin,
                position,
                offsetX,
                offsetY
            }),
            scrollStrategy: this.overlay.scrollStrategies.reposition()
        });
    }
    getOverlayPosition({ origin, position, offsetX, offsetY }) {
        return this.overlay
            .position()
            .flexibleConnectedTo(origin)
            .withPositions(position || VexPopoverService_1.getPositions())
            .withFlexibleDimensions(true)
            .withDefaultOffsetY(offsetY || 0)
            .withDefaultOffsetX(offsetX || 0)
            .withTransformOriginOn('.vex-popover')
            .withPush(true);
    }
};
VexPopoverService = VexPopoverService_1 = __decorate([
    Injectable({
        providedIn: 'root'
    })
], VexPopoverService);
export { VexPopoverService };
//# sourceMappingURL=vex-popover.service.js.map