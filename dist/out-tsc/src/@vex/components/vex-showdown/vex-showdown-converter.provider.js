import { __decorate, __param } from "tslib";
import { Injectable, Optional } from '@angular/core';
import Showdown from 'showdown';
/**
 * @internal
 */
let { hasOwnProperty } = {};
/**
 * ### Example
 *
 * Setup as standalone
 * ```typescript
 * import { NgModule } from '@angular/core';
 * import { ShowdownConverter } from 'ngx-vex-showdown';
 *
 * @NgModule({
 *   providers: [ ShowdownConverter ];
 * })
 * export class AppModule {}
 * ```
 *
 * Use the converter instance.
 * ```typescript
 * import { Injectable } from '@angular/core';
 * import { ShowdownConverter } from 'ngx-vex-showdown';
 *
 * @Injectable()
 * export class SomeService {
 *   constructor(showdownConverter: ShowdownConverter) {
 *     let markdown: string = "**Some**";
 *     let html: string = showdownConverter.makeHtml(markdown);
 *     console.log(`some:\nmarkdown: ${markdown)\nhtml: ${html}\n`);
 *   }
 * }
 * ```
 */
let VexShowdownConverter = class VexShowdownConverter extends Showdown.Converter {
    constructor(config) {
        super(config && { extensions: config.extensions });
        this.setFlavor((config && config.flavor) || 'vanilla');
        if (config) {
            this.setOptions(config);
        }
    }
    /**
     * Set options to the converter.
     *
     * @param options - A options object to set.
     */
    setOptions(options) {
        for (let key in options) {
            if (hasOwnProperty.call(options, key)) {
                this.setOption(key, options[key]);
            }
        }
    }
};
VexShowdownConverter = __decorate([
    Injectable(),
    __param(0, Optional())
], VexShowdownConverter);
export { VexShowdownConverter };
//# sourceMappingURL=vex-showdown-converter.provider.js.map