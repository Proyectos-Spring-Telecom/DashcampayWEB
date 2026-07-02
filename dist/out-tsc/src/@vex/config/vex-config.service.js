import { __decorate, __param } from "tslib";
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DOCUMENT } from '@angular/common';
import { mergeDeep } from '../utils/merge-deep';
import { vexConfigs } from './vex-configs';
import { VexColorScheme } from './vex-config.interface';
import { map } from 'rxjs/operators';
import { VEX_CONFIG, VEX_THEMES } from "./config.token";
let VexConfigService = class VexConfigService {
    constructor(config, themes, document, layoutService) {
        this.config = config;
        this.themes = themes;
        this.document = document;
        this.layoutService = layoutService;
        this.configMap = vexConfigs;
        this.configs = Object.values(this.configMap);
        this._configSubject = new BehaviorSubject(this.config);
        this.config$.subscribe((config) => this._updateConfig(config));
    }
    get config$() {
        return this._configSubject.asObservable();
    }
    select(selector) {
        return this.config$.pipe(map(selector));
    }
    setConfig(configName) {
        const settings = this.configMap[configName];
        if (!settings) {
            throw new Error(`Config with name '${configName}' does not exist!`);
        }
        this._configSubject.next(settings);
    }
    updateConfig(config) {
        this._configSubject.next(mergeDeep({ ...this._configSubject.getValue() }, config));
    }
    _updateConfig(config) {
        this._setLayoutClass(config.bodyClass);
        this._setStyle(config.style);
        this._setDensity();
        this._setDirection(config.direction);
        this._setSidenavState(config.sidenav.state);
        this._emitResize();
    }
    _setStyle(style) {
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
        this.document.body.style.setProperty('--vex-border-radius', `${style.borderRadius.value}${style.borderRadius.unit}`);
        const buttonBorderRadius = style.button.borderRadius ?? style.borderRadius;
        this.document.body.style.setProperty('--vex-button-border-radius', `${buttonBorderRadius.value}${buttonBorderRadius.unit}`);
    }
    _setDensity() {
        if (!this.document.body.classList.contains('vex-mat-dense-default')) {
            this.document.body.classList.add('vex-mat-dense-default');
        }
    }
    /**
     * Emit event so charts and other external libraries know they have to resize on layout switch
     * @private
     */
    _emitResize() {
        if (window) {
            window.dispatchEvent(new Event('resize'));
            setTimeout(() => window.dispatchEvent(new Event('resize')), 200);
        }
    }
    _setDirection(direction) {
        this.document.body.dir = direction;
    }
    _setSidenavState(sidenavState) {
        sidenavState === 'expanded'
            ? this.layoutService.expandSidenav()
            : this.layoutService.collapseSidenav();
    }
    _setLayoutClass(bodyClass) {
        this.configs.forEach((c) => {
            if (this.document.body.classList.contains(c.bodyClass)) {
                this.document.body.classList.remove(c.bodyClass);
            }
        });
        this.document.body.classList.add(bodyClass);
    }
};
VexConfigService = __decorate([
    Injectable({
        providedIn: 'root'
    }),
    __param(0, Inject(VEX_CONFIG)),
    __param(1, Inject(VEX_THEMES)),
    __param(2, Inject(DOCUMENT))
], VexConfigService);
export { VexConfigService };
//# sourceMappingURL=vex-config.service.js.map