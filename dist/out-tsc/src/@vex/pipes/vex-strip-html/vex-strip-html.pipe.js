import { __decorate } from "tslib";
import { Pipe } from '@angular/core';
let VexStripHtmlPipe = class VexStripHtmlPipe {
    transform(html) {
        if (!html) {
            return '';
        }
        return html?.replace(/<[^>]*>?/gm, '');
    }
};
VexStripHtmlPipe = __decorate([
    Pipe({
        name: 'vexStripHtml',
        standalone: true
    })
], VexStripHtmlPipe);
export { VexStripHtmlPipe };
//# sourceMappingURL=vex-strip-html.pipe.js.map