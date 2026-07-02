import { __decorate } from "tslib";
import { Directive, EventEmitter, Input, Output } from '@angular/core';
let VexHighlightDirective = class VexHighlightDirective {
    constructor(_highlightService, _zone) {
        this._highlightService = _highlightService;
        this._zone = _zone;
        /** An optional array of language names and aliases restricting detection to only those languages.
         * The subset can also be set with configure, but the local parameter overrides the option if set.
         */
        this.languages = [];
        /** Stream that emits when code string is highlighted */
        this.highlighted = new EventEmitter();
    }
    ngOnChanges(changes) {
        if (changes['code'] &&
            changes['code'].currentValue !== changes['code'].previousValue) {
            this.highlightElement(this.code, this.languages);
        }
    }
    /**
     * Highlighting with language detection and fix markup.
     * @param code Accepts a string with the code to highlight
     * @param languages An optional array of language names and aliases restricting detection to only those languages.
     * The subset can also be set with configure, but the local parameter overrides the option if set.
     */
    highlightElement(code, languages) {
        this._zone.runOutsideAngular(() => {
            const res = this._highlightService.highlightAuto(code, languages);
            this.highlightedCode = res.value;
            this.highlighted.emit(res);
        });
    }
};
__decorate([
    Input()
], VexHighlightDirective.prototype, "languages", void 0);
__decorate([
    Input('vexHighlight')
], VexHighlightDirective.prototype, "code", void 0);
__decorate([
    Output()
], VexHighlightDirective.prototype, "highlighted", void 0);
VexHighlightDirective = __decorate([
    Directive({
        selector: '[vexHighlight]',
        host: {
            '[class.hljs]': 'true',
            '[innerHTML]': 'highlightedCode'
        },
        standalone: true
    })
], VexHighlightDirective);
export { VexHighlightDirective };
//# sourceMappingURL=vex-highlight.directive.js.map