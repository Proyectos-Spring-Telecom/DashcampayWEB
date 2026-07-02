import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { VexHighlightDirective } from './vex-highlight.directive';
import { VEX_HIGHLIGHT_OPTIONS } from './vex-highlight.model';
/**
 * Import every language you wish to highlight here
 * NOTE: The name of each language must match the file name its imported from
 */
import xml from 'highlight.js/lib/languages/xml';
import scss from 'highlight.js/lib/languages/scss';
import typescript from 'highlight.js/lib/languages/typescript';
import { VexHighlightService } from './vex-highlight.service';
/**
 * Import every language you wish to highlight here
 * NOTE: The name of each language must match the file name its imported from
 */
export function hljsLanguages() {
    return [
        { name: 'typescript', func: typescript },
        { name: 'scss', func: scss },
        { name: 'xml', func: xml }
    ];
}
let VexHighlightModule = class VexHighlightModule {
};
VexHighlightModule = __decorate([
    NgModule({
        providers: [
            {
                provide: VEX_HIGHLIGHT_OPTIONS,
                useValue: {
                    languages: hljsLanguages
                }
            },
            VexHighlightService
        ],
        imports: [VexHighlightDirective],
        exports: [VexHighlightDirective]
    })
], VexHighlightModule);
export { VexHighlightModule };
//# sourceMappingURL=vex-highlight.module.js.map