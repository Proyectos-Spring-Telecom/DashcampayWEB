import { __decorate, __param } from "tslib";
import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
let VexPlatformService = class VexPlatformService {
    constructor(document, rendererFactory2, platform) {
        this.document = document;
        this.rendererFactory2 = rendererFactory2;
        this.platform = platform;
        const renderer = this.rendererFactory2.createRenderer(null, null);
        if (this.platform.BLINK) {
            renderer.addClass(this.document.body, 'is-blink');
        }
    }
};
VexPlatformService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(0, Inject(DOCUMENT))
], VexPlatformService);
export { VexPlatformService };
//# sourceMappingURL=vex-platform.service.js.map