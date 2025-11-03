import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { DeepPartial } from '../interfaces/deep-partial.type';
import { mergeDeep } from '../utils/merge-deep';
import { VexLayoutService } from '../services/vex-layout.service';
import { vexConfigs } from './vex-configs';
import {
  VexColorScheme,
  VexConfig,
  VexConfigName,
  VexConfigs,
  VexThemeProvider
} from './vex-config.interface';
import { CSSValue } from '../interfaces/css-value.type';
import { map } from 'rxjs/operators';
import { VEX_CONFIG, VEX_THEMES } from '@vex/config/config.token';

@Injectable({
  providedIn: 'root'
})
export class VexConfigService {
  readonly configMap: VexConfigs = vexConfigs;
  readonly configs: VexConfig[] = Object.values(this.configMap);
  private _configSubject = new BehaviorSubject<VexConfig>(this.config);

  constructor(
    @Inject(VEX_CONFIG) private readonly config: VexConfig,
    @Inject(VEX_THEMES) private readonly themes: VexThemeProvider[],
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly layoutService: VexLayoutService
  ) {
    this.config$.subscribe((config) => this._updateConfig(config));
  }

  get config$(): Observable<VexConfig> {
    return this._configSubject.asObservable();
  }

  select<R>(selector: (config: VexConfig) => R): Observable<R> {
    return this.config$.pipe(map(selector));
  }

  setConfig(configName: VexConfigName) {
    const settings = this.configMap[configName];

    if (!settings) {
      throw new Error(`Config with name '${configName}' does not exist!`);
    }

    this._configSubject.next(settings);
  }

  updateConfig(config: DeepPartial<VexConfig>) {
    this._configSubject.next(
      mergeDeep({ ...this._configSubject.getValue() }, config)
    );
  }

  private _updateConfig(config: VexConfig): void {
    this._setLayoutClass(config.bodyClass);
    this._setStyle(config.style);
    this._setDensity();
    this._setDirection(config.direction);
    this._setSidenavState(config.sidenav.state);
    this._emitResize();
  }

  private _setStyle(style: VexConfig['style']): void {
    /**
     * Set light/dark mode
     */
    switch (style.colorScheme) {
      case VexColorScheme.LIGHT:
        this.document.body.classList.remove(VexColorScheme.DARK);
        this.document.body.classList.add(VexColorScheme.LIGHT);
        break;

      case VexColorScheme.DARK:
        this.document.body.classList.remove(VexColorScheme.LIGHT);
        this.document.body.classList.add(VexColorScheme.DARK);
        break;
    }

    /**
     * Set theme class
     */
    this.document.body.classList.remove(...this.themes.map((t) => t.className));
    this.document.body.classList.add(style.themeClassName);

    /**
     * Border Radius
     */
    this.document.body.style.setProperty(
      '--vex-border-radius',
      `${style.borderRadius.value}${style.borderRadius.unit}`
    );

    const buttonBorderRadius: CSSValue =
      style.button.borderRadius ?? style.borderRadius;
    this.document.body.style.setProperty(
      '--vex-button-border-radius',
      `${buttonBorderRadius.value}${buttonBorderRadius.unit}`
    );
  }

  private _setDensity(): void {
    if (!this.document.body.classList.contains('vex-mat-dense-default')) {
      this.document.body.classList.add('vex-mat-dense-default');
    }
  }

  /**
   * Emit event so charts and other external libraries know they have to resize on layout switch
   * @private
   */
  private _emitResize(): void {
    if (window) {
      window.dispatchEvent(new Event('resize'));
      setTimeout(() => window.dispatchEvent(new Event('resize')), 200);
    }
  }

  private _setDirection(direction: 'ltr' | 'rtl') {
    this.document.body.dir = direction;
  }

  private _setSidenavState(sidenavState: 'expanded' | 'collapsed'): void {
    sidenavState === 'expanded'
      ? this.layoutService.expandSidenav()
      : this.layoutService.collapseSidenav();
  }

  private _setLayoutClass(bodyClass: string): void {
    this.configs.forEach((c) => {
      if (this.document.body.classList.contains(c.bodyClass)) {
        this.document.body.classList.remove(c.bodyClass);
      }
    });

    this.document.body.classList.add(bodyClass);
  }
}
