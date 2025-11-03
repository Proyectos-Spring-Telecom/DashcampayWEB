import { ModuleWithProviders, NgModule } from '@angular/core';
import Showdown from 'showdown';
import { VexShowdownConfig } from './vex-showdown-config.provider';
import { VexShowdownConverter } from './vex-showdown-converter.provider';
import { VexShowdownComponent } from './vex-showdown.component';
import { VexShowdownPipe } from './vex-showdown.pipe';
import { VexShowdownSourceDirective } from './vex-showdown-source.directive';

/**
 * @internal
 */
const DECLARATIONS = [
  VexShowdownComponent,
  VexShowdownPipe,
  VexShowdownSourceDirective
];

/**
 * ### Example
 *
 * Add `ShowdownModule` to app `imports`.
 * ```typescript
 * import { NgModule } from '@angular/core';
 * import { ShowdownModule } from 'ngx-vex-showdown';
 *
 * @NgModule({
 *   imports: [ ShowdownModule ];
 * })
 * export class AppModule {}
 * ```
 */
@NgModule({
  imports: [...DECLARATIONS],
  providers: [VexShowdownConverter],
  exports: DECLARATIONS
})
export class VexShowdownModule {
  /**
   * __Example :__
   *
   * Add `ShowdownModule` to app `imports` with config.
   * ```typescript
   * import { NgModule } from '@angular/core';
   * import { ShowdownModule } from 'ngx-vex-showdown';
   *
   * @NgModule({
   *   imports: [ ShowdownModule.forRoot({
   *     smartIndentationFix: true,
   *     foo: 'bar',
   *     flavor: 'github',
   *     extensions: [ {type:'listener', listeners: {'codeBlocks.after': console.log}} ]
   *   }) ];
   * })
   * export class AppModule {}
   * ```
   * @param config - A root converter config for all converter instances.
   */
  static forRoot(
    config: VexShowdownConfig | Showdown.ConverterOptions
  ): ModuleWithProviders<VexShowdownModule> {
    return {
      ngModule: VexShowdownModule,
      providers: [{ provide: VexShowdownConfig, useValue: config }]
    };
  }
}
