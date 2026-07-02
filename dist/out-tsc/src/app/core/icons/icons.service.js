import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let IconsService = class IconsService {
    constructor(domSanitizer, iconRegistry) {
        this.domSanitizer = domSanitizer;
        this.iconRegistry = iconRegistry;
        this.iconRegistry.addSvgIconResolver((name, namespace) => {
            switch (namespace) {
                case 'mat':
                    return this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/img/icons/material-design-icons/two-tone/${name}.svg`);
                case 'logo':
                    return this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/img/icons/logos/${name}.svg`);
                case 'flag':
                    return this.domSanitizer.bypassSecurityTrustResourceUrl(`assets/img/icons/flags/${name}.svg`);
                default:
                    return null;
            }
        });
    }
};
IconsService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], IconsService);
export { IconsService };
//# sourceMappingURL=icons.service.js.map