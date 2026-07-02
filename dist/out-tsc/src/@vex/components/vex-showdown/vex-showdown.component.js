import { __decorate, __param } from "tslib";
import { Component, Input, Optional, SecurityContext } from '@angular/core';
import { VexShowdownConverter } from './vex-showdown-converter.provider';
/**
 * @internal
 */
const MAP_OPTION = {
    '': true,
    true: true,
    false: false
};
/**
 * @internal
 */
let _toOption = (value) => MAP_OPTION.hasOwnProperty(value) ? MAP_OPTION[value] : value;
/**
 * The options keys for the dynamic properties set.
 * @internal
 */
const OPTIONS_PROPERTIES_KEYS = [
    'backslashEscapesHTMLTags',
    'completeHTMLDocument',
    'disableForced4SpacesIndentedSublists',
    'emoji',
    'encodeEmails',
    'ghCodeBlocks',
    'ghCompatibleHeaderId',
    'ghMentions',
    'ghMentionsLink',
    'headerLevelStart',
    'literalMidWordAsterisks',
    'literalMidWordUnderscores',
    'metadata',
    'noHeaderId',
    'omitExtraWLInCodeBlocks',
    'openLinksInNewWindow',
    'parseImgDimensions',
    'prefixHeaderId',
    'rawHeaderId',
    'rawPrefixHeaderId',
    'requireSpaceBeforeHeadingText',
    'simpleLineBreaks',
    'simplifiedAutoLink',
    'smartIndentationFix',
    'smoothLivePreview',
    'splitAdjacentBlockquotes',
    'strikethrough',
    'tables',
    'tablesHeaderId',
    'tasklists',
    'underline'
];
/**
 * A angular component for render `Markdown` to `HTML`.
 *
 * ### Example
 *
 * Setup as standalone
 * ```typescript
 * import { NgModule } from '@angular/core';
 * import { ShowdownComponent } from 'ngx-vex-showdown';
 *
 * @NgModule({
 *   declarations: [ ShowdownComponent ];
 * })
 * export class AppModule {}
 * ```
 *
 * Bind markdown value and options object
 * ```typescript
 * import { Component } from '@angular/core';
 * import Showdown from 'vex-showdown';
 *
 * @Component({
 *   selector: 'some',
 *   template: '<vex-showdown [value]="text" [options]="options"></vex-showdown>'
 * })
 * export class SomeComponent {
 *   text: string = `
 *     # Some header
 *     ---
 *     **Some bold**
 *   `;
 *   options: Showdown.ShowdownOptions = { smartIndentationFix: true };
 *   // ...
 * }
 * ```
 * Bind single option (it have properties for all vex-showdown options).
 * ```html
 * <vex-showdown emoji="true"  noHeaderId># Some text :+1:</vex-showdown>
 * ```
 *
 * Set static markdown value.
 * ```html
 * <vex-showdown value="___Some static value___" underline></vex-showdown>
 * ```
 *
 * Use as directive on anther element.
 * ```html
 * <div vex-showdown="# Div Element" headerLevelStart="2"></div>
 * ```
 *
 * Static markdown value in the element content.
 * ```html
 * <div>
 *    <vex-showdown smartIndentationFix>
 *       # List:
 *       * a
 *            * A
 *       * b
 *    </vex-showdown>
 * </div>
 * ```
 *
 * Set template reference variable.
 * ```html
 * <vex-showdown #sd></vex-showdown>
 * ```
 * Or
 * ```html
 * <div vex-showdown #sd="vex-showdown"></div>
 * ```
 */
let VexShowdownComponent = class VexShowdownComponent extends VexShowdownConverter {
    constructor(_elementRef, _domSanitizer, config) {
        super(config);
        this._elementRef = _elementRef;
        this._domSanitizer = _domSanitizer;
    }
    /**
     * Input alias to `value`.
     *
     * __Example :__
     *
     * ```html
     * <div [vex-showdown]="# Some Header"></div>
     * ```
     *
     * Equivalent to
     * ```html
     * <vex-showdown [value]="# Some Header"></vex-showdown>
     * ```
     */
    set showdown(value) {
        this.value = value;
    }
    /**
     * The vex-showdown options of the converter.
     *
     * __Example :__
     *
     * Bind options
     * ```typescript
     * import { Component } from '@angular/core';
     * import Showdown from 'vex-showdown';
     *
     * @Component({
     *   selector: `some`,
     *   template: `<vex-showdown [options]="options"># Some Header<vex-showdown>`
     * })
     * export class SomeComponent {
     *   options: Showdown.ShowdownOptions = {headerLevelStart: 3};
     *   // ...
     * }
     * ```
     * Or
     * ```html
     * <vex-showdown [options]="{smartIndentationFix: true}"> # Indentation Fix<vex-showdown>
     * ```
     */
    get options() {
        return this.getOptions();
    }
    set options(options) {
        this.setOptions(options);
    }
    /**
     * Enables html sanitize, it will sanitize the converter html output by [`DomSanitizer`](https://angular.io/api/platform-browser/DomSanitizer#sanitize).
     *
     * __Example :__
     *
     * ```typescript
     * import { Component } from '@angular/core';
     *
     * @Component({
     *   selector: 'some',
     *   styles: [`.box { width: 95%; padding: 5px; border: 1px solid black;}`],
     *   template: `
     *     <h3>Input</h3>
     *     <textarea class="box" [(ngModel)]="text"></textarea>
     *     <input type="checkbox" [(ngModel)]="sanitize"/> <b>Sanitize</b>
     *     <h3>Markdown</h3>
     *     <pre class="box"><code>{{ text }}</code></pre>
     *     <h3>Preview</h3>
     *     <div class="box">
     *       <vex-showdown #sd [value]="text" [sanitize]="sanitize"></vex-showdown>
     *     </div>
     *   `;
     * })
     * export class SomeComponent {
     *    text: string = `# A cool link
     * <a href="javascript:alert('Hello!')">click me</a>`;
     * }
     * ```
     */
    set sanitize(sanitize) {
        this._sanitize = _toOption(sanitize);
    }
    /**
     * A angular lifecycle method, Use on init to check if it `content` type and load the element `content` to `value`.
     * @internal
     */
    ngOnInit() {
        if (this.value === undefined &&
            this._elementRef.nativeElement.innerHTML.trim() !== '') {
            this.render(this._elementRef.nativeElement.innerHTML);
        }
    }
    /**
     * A angular lifecycle method, Use to call to render method after changes.
     * @internal
     */
    ngOnChanges() {
        this.render();
    }
    /**
     * Convert the markdown value of {@link VexShowdownComponent#value} to html and set the html result to the element content.
     *
     * __Example :__
     *
     * ```html
     * <textarea #textarea (change)="vex-showdown.render(textarea.value)"/># Some Header</textarea>
     * <vex-showdown #vex-showdown></vex-showdown>
     * ```
     * @param value - A markdown value to render (it will override the current value of `ShowdownComponent#value`)
     */
    render(value) {
        if (typeof value === 'string') {
            this.value = value;
        }
        if (typeof this.value === 'string') {
            let result = this.makeHtml(this.value);
            if (this._sanitize) {
                result =
                    this._domSanitizer?.sanitize(SecurityContext.HTML, result) ?? '';
            }
            this._elementRef.nativeElement.innerHTML = result;
        }
    }
};
__decorate([
    Input()
], VexShowdownComponent.prototype, "value", void 0);
__decorate([
    Input()
], VexShowdownComponent.prototype, "showdown", null);
__decorate([
    Input()
], VexShowdownComponent.prototype, "options", null);
__decorate([
    Input()
], VexShowdownComponent.prototype, "sanitize", null);
VexShowdownComponent = __decorate([
    Component({
        selector: 'vex-showdown,[vex-showdown]',
        template: '<ng-content></ng-content>',
        exportAs: 'vex-showdown',
        inputs: OPTIONS_PROPERTIES_KEYS,
        standalone: true
    }),
    __param(1, Optional()),
    __param(2, Optional())
], VexShowdownComponent);
export { VexShowdownComponent };
// Define options properties setter for angular directive and direct access
for (let key of OPTIONS_PROPERTIES_KEYS) {
    Object.defineProperty(VexShowdownComponent.prototype, key, {
        set(value) {
            this.setOption(key, _toOption(value));
        },
        configurable: true
    });
}
//# sourceMappingURL=vex-showdown.component.js.map