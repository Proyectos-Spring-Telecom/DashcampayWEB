/**
 * @internal
 */
let { hasOwnProperty } = {};
/**
 * A config provider
 *
 * ### Example
 *
 * Set custom config provider.
 * ```typescript
 * import { NgModel } from '@angular/core';
 * import { ShowdownModule, ShowdownConfig } from 'ngx-vex-showdown';
 *
 * export class MyShowdownConfig extends ShowdownConfig {
 *   emoji = true;
 *   underscore = false;
 *   flavor = 'github';
 * }
 *
 * @NgModel({
 *   imports: [ ShowdownModule ],
 *   providers: [ {provide: ShowdownConfig, useClass: MyConverterOptions} ]
 * })
 * export class AppModule {}
 * ```
 */
export class VexShowdownConfig {
    constructor(options) {
        if (options) {
            this.merge(options);
        }
    }
    /**
     * Merge options
     *
     * @param options - A options object to merge.
     */
    merge(options) {
        for (let key in options) {
            if (hasOwnProperty.call(options, key)) {
                this[key] = options[key];
            }
        }
    }
}
//# sourceMappingURL=vex-showdown-config.provider.js.map