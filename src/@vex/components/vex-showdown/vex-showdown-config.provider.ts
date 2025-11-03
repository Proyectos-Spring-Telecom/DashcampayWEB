import Showdown, { ShowdownExtension } from 'showdown';

/**
 * @internal
 */
let { hasOwnProperty } = {};

export interface ShowdownConfig extends Showdown.ConverterOptions {}

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
export class VexShowdownConfig implements Showdown.ConverterOptions {
  /**
   * @see https://github.com/showdownjs/showdown/blob/master/README.md#flavors
   */
  flavor?: Showdown.Flavor;
  extensions?:
    | (
        | (() => ShowdownExtension[] | ShowdownExtension)
        | ShowdownExtension[]
        | ShowdownExtension
        | string
      )[]
    | undefined;

  constructor(options?: VexShowdownConfig | Showdown.ConverterOptions) {
    if (options) {
      this.merge(options);
    }
  }

  /**
   * Merge options
   *
   * @param options - A options object to merge.
   */
  public merge(options: VexShowdownConfig | Showdown.ConverterOptions) {
    for (let key in options) {
      if (hasOwnProperty.call(options, key)) {
        (this as any)[key] = (options as any)[key];
      }
    }
  }
}
